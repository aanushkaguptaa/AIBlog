import React from 'react';
import { ModelType } from '@/types';

interface ModelSelectorProps {
    value: ModelType;
    onChange: (model: ModelType) => void;
    isDark: boolean;
}

const models: { value: ModelType; label: string }[] = [
    { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B' },
    { value: 'openai/gpt-oss-120b', label: 'GPT OSS 120B' },
    { value: 'qwen/qwen3-32b', label: 'Qwen3 32B' },
    { value: 'groq/compound', label: 'Groq Compound' },
];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ value, onChange, isDark }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as ModelType)}
            className="nodrag w-full px-2 py-1 text-xs rounded border border-current/30 bg-transparent focus:outline-none focus:ring-1 focus:ring-current/50 cursor-pointer"
            style={{
                color: 'inherit',
            }}
        >
            {models.map((model) => (
                <option
                    key={model.value}
                    value={model.value}
                    className={isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}
                >
                    {model.label}
                </option>
            ))}
        </select>
    );
};
