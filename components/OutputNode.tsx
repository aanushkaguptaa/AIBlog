import React from 'react';
import { Handle, Position } from 'reactflow';

interface OutputNodeProps {
    data: {
        label: string;
        className: string;
        style?: React.CSSProperties;
        output?: string;
        isLoading?: boolean;
        error?: string;
        onRun?: () => void;
    };
}

export const OutputNode: React.FC<OutputNodeProps> = ({ data }) => {
    const hasOutput = data.output && data.output.length > 0;
    const showRunButton = !hasOutput && !data.isLoading && !data.error;

    return (
        <>
            <Handle type="target" position={Position.Left} className="w-3 h-3" />
            <div
                className={`px-4 py-3 rounded-2xl ${data.className} shadow-lg cursor-move`}
                style={{ minWidth: '200px', maxWidth: '400px', ...data.style }}
            >
                <div className="font-semibold text-sm mb-2">{data.label}</div>

                {showRunButton && (
                    <button
                        onClick={data.onRun}
                        className="nodrag w-full px-3 py-2 text-sm font-medium rounded-lg border-2 border-current/50 bg-transparent hover:bg-current/10 transition-colors cursor-pointer"
                    >
                        Run
                    </button>
                )}

                {data.isLoading && (
                    <div className="text-xs opacity-70 animate-pulse">
                        Generating response...
                    </div>
                )}

                {data.error && (
                    <div className="text-xs p-2 rounded bg-red-500/20 border border-red-500/50">
                        {data.error}
                    </div>
                )}

                {hasOutput && (
                    <div className="text-xs whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                        {data.output}
                    </div>
                )}
            </div>
        </>
    );
};
