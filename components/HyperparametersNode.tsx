import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Hyperparameters } from '@/types';

interface HyperparametersNodeProps {
    data: {
        label: string;
        className: string;
        style?: React.CSSProperties;
        onValueChange?: (params: Hyperparameters) => void;
    };
}

export const HyperparametersNode: React.FC<HyperparametersNodeProps> = ({ data }) => {
    const [topK, setTopK] = useState(50);
    const [topP, setTopP] = useState(0.9);
    const [temperature, setTemperature] = useState(1.0);
    const [maxTokens, setMaxTokens] = useState(1000);
    const [stop, setStop] = useState('');
    const [repeatPenalty, setRepeatPenalty] = useState(1.0);

    useEffect(() => {
        const params: Hyperparameters = {
            top_k: topK,
            top_p: topP,
            temperature,
            max_tokens: maxTokens,
            repetition_penalty: repeatPenalty,
            ...(stop ? { stop: stop.split(',').map(s => s.trim()) } : {}),
        };
        data.onValueChange?.(params);
    }, [topK, topP, temperature, maxTokens, stop, repeatPenalty, data.onValueChange]);

    return (
        <>
            <Handle type="target" position={Position.Left} className="w-3 h-3" />
            <div
                className={`px-4 py-3 rounded-2xl ${data.className} shadow-lg cursor-move`}
                style={{ minWidth: '280px', ...data.style }}
            >
                <div className="font-semibold text-sm mb-3">{data.label}</div>

                <div className="space-y-3 text-xs nodrag">
                    {/* top_k */}
                    <div>
                        <label className="block mb-1 font-medium">top_k</label>
                        <input
                            type="number"
                            value={topK}
                            onChange={(e) => setTopK(Number(e.target.value))}
                            className="w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
                        />
                    </div>

                    {/* top_p */}
                    <div>
                        <label className="block mb-1 font-medium">top_p</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="1"
                            value={topP}
                            onChange={(e) => setTopP(Number(e.target.value))}
                            className="w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
                        />
                    </div>

                    {/* temperature */}
                    <div>
                        <label className="block mb-1 font-medium">temperature: {temperature.toFixed(2)}</label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.01"
                            value={temperature}
                            onChange={(e) => setTemperature(Number(e.target.value))}
                            className="w-full accent-current"
                        />
                    </div>

                    {/* max_tokens */}
                    <div>
                        <label className="block mb-1 font-medium">max_tokens</label>
                        <input
                            type="number"
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(Number(e.target.value))}
                            className="w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
                        />
                    </div>

                    {/* stop */}
                    <div>
                        <label className="block mb-1 font-medium">stop</label>
                        <input
                            type="text"
                            value={stop}
                            onChange={(e) => setStop(e.target.value)}
                            placeholder="e.g., \n, ."
                            className="w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
                        />
                    </div>

                    {/* repeat_penalty */}
                    <div>
                        <label className="block mb-1 font-medium">repeat_penalty: {repeatPenalty.toFixed(2)}</label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.01"
                            value={repeatPenalty}
                            onChange={(e) => setRepeatPenalty(Number(e.target.value))}
                            className="w-full accent-current"
                        />
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Right} className="w-3 h-3" />
        </>
    );
};
