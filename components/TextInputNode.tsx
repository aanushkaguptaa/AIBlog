import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface TextInputNodeProps {
    data: {
        label: string;
        className: string;
        style?: React.CSSProperties;
        placeholder?: string;
        onValueChange?: (value: string) => void;
    };
}

export const TextInputNode: React.FC<TextInputNodeProps> = ({ data }) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        data.onValueChange?.(newValue);
    };

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
                    onChange={handleChange}
                    placeholder={data.placeholder || 'Enter text...'}
                    className="nodrag w-full px-2 py-1 text-xs rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50 resize-none"
                    rows={3}
                    style={{ color: 'inherit' }}
                />
            </div>
            <Handle type="source" position={Position.Right} className="w-3 h-3" />
        </>
    );
};
