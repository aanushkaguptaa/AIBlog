import React, { useEffect } from 'react';
import ReactFlow, { Background, BackgroundVariant, Node, Edge, Controls, MarkerType, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';
import { TextInputNode } from './TextInputNode';
import { HyperparametersNode } from './HyperparametersNode';
import { SinusoidalEdge } from './SinusoidalEdge';
import { DiagramConfig } from '@/types';

const nodeTypes = {
  custom: CustomNode,
  textInput: TextInputNode,
  hyperparameters: HyperparametersNode,
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
  const initialNodes: Node[] = config.nodes.map((node) => ({
    id: node.id,
    type: node.nodeType || 'custom',
    position: node.position,
    draggable: true,
    data: {
      label: node.label,
      className: getColorClasses(),
      style: getColorStyles(node.color, isDark),
      placeholder: node.placeholder,
    },
  }));

  const initialEdges: Edge[] = config.edges.map((edge) => {
    const edgeColor = isDark ? '#ffffff' : '#6b7280';
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'sinusoidal',
      animated: edge.animated ?? true,
      style: {
        stroke: edgeColor,
        strokeWidth: 2,
        ...(edge.dashed ? { strokeDasharray: '5,5' } : {})
      },
      markerEnd: {
        type: MarkerType.Arrow,
        color: edgeColor,
      },
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when config or isDark changes
  useEffect(() => {
    const updatedNodes = config.nodes.map((node) => ({
      id: node.id,
      type: node.nodeType || 'custom',
      position: node.position,
      draggable: true,
      data: {
        label: node.label,
        className: getColorClasses(),
        style: getColorStyles(node.color, isDark),
        placeholder: node.placeholder,
      },
    }));
    setNodes(updatedNodes);
  }, [config.nodes, isDark, setNodes]);

  useEffect(() => {
    const edgeColor = isDark ? '#ffffff' : '#6b7280';
    const updatedEdges = config.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'sinusoidal',
      animated: edge.animated ?? true,
      style: {
        stroke: edgeColor,
        strokeWidth: 2,
        ...(edge.dashed ? { strokeDasharray: '5,5' } : {})
      },
      markerEnd: {
        type: MarkerType.Arrow,
        color: edgeColor,
      },
    }));
    setEdges(updatedEdges);
  }, [config.edges, isDark, setEdges]);

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