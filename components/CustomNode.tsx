import React from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string;
    className: string;
    style?: React.CSSProperties;
  };
}

export const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <div
        className={`px-6 py-3 rounded-2xl ${data.className} shadow-lg cursor-move`}
        style={{ minWidth: '120px', ...data.style }}
      >
        <div className="font-semibold text-center whitespace-nowrap">
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </>
  );
};