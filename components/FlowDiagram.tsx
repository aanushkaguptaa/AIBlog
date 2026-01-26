import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, { Background, BackgroundVariant, Node, Edge, Controls, MarkerType, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';
import { TextInputNode } from './TextInputNode';
import { HyperparametersNode } from './HyperparametersNode';
import { OutputNode } from './OutputNode';
import { SinusoidalEdge } from './SinusoidalEdge';
import { DiagramConfig, ModelType, Hyperparameters } from '@/types';
import { streamChat } from '@/lib/apiClient';

const nodeTypes = {
  custom: CustomNode,
  textInput: TextInputNode,
  hyperparameters: HyperparametersNode,
  output: OutputNode,
};

const edgeTypes = {
  sinusoidal: SinusoidalEdge,
};

interface FlowDiagramProps {
  config: DiagramConfig;
  isDark: boolean;
}

const getColorStyles = (color: string, isDark: boolean) => {
  if (color.startsWith('#')) {
    return {
      backgroundColor: isDark ? `${color}33` : `${color}22`,
      borderColor: color,
      color: isDark ? '#ffffff' : '#000000',
    };
  }
  return {};
};

const getColorClasses = () => {
  return 'border-2';
};

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ config, isDark }) => {
  // State for node values
  const [selectedModel, setSelectedModel] = useState<ModelType>('llama-3.1-8b-instant');
  const [userPrompt, setUserPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [hyperparameters, setHyperparameters] = useState<Hyperparameters>({});
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Memoize callbacks to prevent infinite re-renders
  const handleUserPromptChange = useCallback((value: string) => {
    setUserPrompt(value);
  }, []);

  const handleSystemPromptChange = useCallback((value: string) => {
    setSystemPrompt(value);
  }, []);

  const handleHyperparametersChange = useCallback((params: Hyperparameters) => {
    setHyperparameters(params);
  }, []);

  const handleRun = useCallback(async () => {
    if (!userPrompt.trim()) {
      setError('Please enter a user prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      const request = {
        model: selectedModel,
        user_prompt: userPrompt,
        ...(systemPrompt ? { system_prompt: systemPrompt } : {}),
        hyperparameters,
        save_conversation: config.enableConversationHistory || false,
        conversation_id: conversationId,
      };

      let accumulatedOutput = '';
      let newConversationId: string | null = null;

      for await (const chunk of streamChat(request)) {
        if (chunk.error) {
          // Check for rate limit error
          if (chunk.error.toLowerCase().includes('rate limit')) {
            setError('Please use a different model, we\'ve hit the rate limit for this model');
          } else {
            setError(chunk.error);
          }
          break;
        }

        if (chunk.conversation_id) {
          newConversationId = chunk.conversation_id;
        }

        if (chunk.content) {
          accumulatedOutput += chunk.content;
          setOutput(accumulatedOutput);
        }

        if (chunk.finished) {
          break;
        }
      }

      if (newConversationId && config.enableConversationHistory) {
        setConversationId(newConversationId);
      }
    } catch (err) {
      console.error('Error running diagram:', err);
      setError('Failed to connect to the API. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  }, [userPrompt, systemPrompt, selectedModel, hyperparameters, conversationId, config.enableConversationHistory]);

  // Build nodes with callbacks
  const buildNodes = useCallback((): Node[] => {
    return config.nodes.map((node) => {
      const baseData = {
        label: node.label,
        className: getColorClasses(),
        style: getColorStyles(node.color, isDark),
        placeholder: node.placeholder,
      };

      // Handle different node types
      if (node.label === 'LLM') {
        return {
          id: node.id,
          type: 'custom',
          position: node.position,
          draggable: true,
          data: {
            ...baseData,
            isLLM: true,
            model: selectedModel,
            onModelChange: setSelectedModel,
            isDark,
          },
        };
      }

      if (node.label === 'Custom Input') {
        return {
          id: node.id,
          type: 'textInput',
          position: node.position,
          draggable: true,
          data: {
            ...baseData,
            onValueChange: handleUserPromptChange,
          },
        };
      }

      if (node.label === 'System Prompt') {
        return {
          id: node.id,
          type: 'textInput',
          position: node.position,
          draggable: true,
          data: {
            ...baseData,
            onValueChange: handleSystemPromptChange,
          },
        };
      }

      if (node.label === 'Hyperparameters') {
        return {
          id: node.id,
          type: 'hyperparameters',
          position: node.position,
          draggable: true,
          data: {
            ...baseData,
            onValueChange: handleHyperparametersChange,
          },
        };
      }

      if (node.label === 'Dynamic Output') {
        return {
          id: node.id,
          type: 'output',
          position: node.position,
          draggable: true,
          data: {
            ...baseData,
            output,
            isLoading,
            error,
            onRun: handleRun,
          },
        };
      }

      // Default node (e.g., Conversation History)
      return {
        id: node.id,
        type: node.nodeType || 'custom',
        position: node.position,
        draggable: true,
        data: baseData,
      };
    });
  }, [config.nodes, isDark, selectedModel, output, isLoading, error, handleRun]);

  const buildEdges = useCallback((): Edge[] => {
    const edgeColor = isDark ? '#ffffff' : '#6b7280';
    return config.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'sinusoidal',
      animated: edge.animated ?? true,
      style: {
        stroke: edgeColor,
        strokeWidth: 2,
        ...(edge.dashed ? { strokeDasharray: '5,5' } : {}),
      },
      markerEnd: {
        type: MarkerType.Arrow,
        color: edgeColor,
      },
    }));
  }, [config.edges, isDark]);

  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges());

  // Update nodes when dependencies change
  useEffect(() => {
    setNodes(buildNodes());
  }, [buildNodes, setNodes]);

  // Update edges when dependencies change
  useEffect(() => {
    setEdges(buildEdges());
  }, [buildEdges, setEdges]);

  return (
    <div className={`${config.height || 'h-64'} w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnDrag={false}
        panOnScroll={true}
        zoomOnScroll={true}
        attributionPosition="bottom-right"
        className={isDark ? 'bg-gray-900' : 'bg-gray-50'}
      >
        <Background variant={BackgroundVariant.Dots} color={isDark ? '#4b5563' : '#9ca3af'} gap={16} size={1} />
        <Controls className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} />
      </ReactFlow>
    </div>
  );
};