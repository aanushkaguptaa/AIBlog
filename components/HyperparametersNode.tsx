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
    const [topP, setTopP] = useState(0.9);
    const [temperature, setTemperature] = useState(1.0);
    const [maxTokens, setMaxTokens] = useState(600);
    const [stop, setStop] = useState('');
    useEffect(() => {
        const params: Hyperparameters = {
            top_p: topP,
            temperature,
            max_tokens: maxTokens,
            ...(stop ? { stop: stop.split(',').map(s => s.trim()) } : {}),
        };
        data.onValueChange?.(params);
    }, [topP, temperature, maxTokens, stop, data.onValueChange]);

    return (
        <>
            <Handle type="target" position={Position.Left} className="w-3 h-3" />
            <div
                className={`px-4 py-3 rounded-2xl ${data.className} shadow-lg cursor-move`}
                style={{ minWidth: '280px', ...data.style }}
            >
                <div className="font-semibold text-sm mb-3">{data.label}</div>

                <div className="space-y-3 text-xs nodrag">

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
                            className="nodrag w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
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
                            className="nodrag w-full accent-current"
                        />
                    </div>

                    {/* max_tokens */}
                    <div>
                        <label className="block mb-1 font-medium">max_tokens</label>
                        <input
                            type="number"
                            min="1"
                            max="600"
                            value={maxTokens}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val <= 600) setMaxTokens(val);
                            }}
                            className="nodrag w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
                        />
                    </div>

                    {/* stop */}
                    <div>
                        <label className="block mb-1 font-medium">
                            stop {stop && `(${stop.split(',').filter(s => s.trim()).length}/4)`}
                        </label>
                        <input
                            type="text"
                            value={stop}
                            onChange={(e) => {
                                const value = e.target.value;
                                const sequences = value.split(',').filter(s => s.trim());
                                if (sequences.length <= 4) {
                                    setStop(value);
                                }
                            }}
                            placeholder="e.g., \n, . (max 4, comma-separated)"
                            className="nodrag w-full px-2 py-1 rounded border border-current/30 bg-white/10 dark:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current/50"
                        />
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Right} className="w-3 h-3" />
        </>
    );
};
