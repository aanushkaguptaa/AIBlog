import React from 'react';
import { Handle, Position } from 'reactflow';
import { ModelSelector } from './ModelSelector';
import { ModelType } from '@/types';

interface CustomNodeProps {
  data: {
    label: string;
    className: string;
    style?: React.CSSProperties;
    isLLM?: boolean;
    model?: ModelType;
    onModelChange?: (model: ModelType) => void;
    isDark?: boolean;
  };
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <div
        className={`px-4 py-3 rounded-2xl ${data.className} shadow-lg cursor-move`}
        style={{ minWidth: '150px', ...data.style }}
      >
        <div className="font-semibold text-sm mb-2">{data.label}</div>
        {data.isLLM && data.onModelChange && (
          <ModelSelector
            value={data.model || 'llama-3.1-8b-instant'}
            onChange={data.onModelChange}
            isDark={data.isDark || false}
          />
        )}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </>
  );
};