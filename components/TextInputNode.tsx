import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface TextInputNodeProps {
    data: {
        label: string;
        className: string;
        style?: React.CSSProperties;
        placeholder?: string;
    };
}

export const TextInputNode: React.FC<TextInputNodeProps> = ({ data }) => {
    const [value, setValue] = useState('');

    return (
        <>
            <Handle type="target" position={Position.Left} className="w-3 h-3" />
            <div
                className={`px-4 py-3 rounded-2xl ${data.className} shadow-lg cursor-move`}
                style={{ minWidth: '200px', ...data.style }}
            >
                <div className="font-semibold text-sm mb-2">{data.label}</div>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={data.placeholder || 'Enter text...'}
                    className="w-full px-3 py-2 rounded-lg border border-current/30 bg-white/10 dark:bg-black/10 resize-none focus:outline-none focus:ring-2 focus:ring-current/50 text-sm nodrag"
                    rows={3}
                />
            </div>
            <Handle type="source" position={Position.Right} className="w-3 h-3" />
        </>
    );
};
