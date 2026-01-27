import { StreamChatRequest, StreamChatResponse } from '@/types';

export async function* streamChat(request: StreamChatRequest): AsyncGenerator<StreamChatResponse> {
    const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();

                    // Skip empty data or SSE comments/metadata
                    if (!data || data === '[DONE]' || !data.startsWith('{')) {
                        continue;
                    }

                    try {
                        const parsed: StreamChatResponse = JSON.parse(data);
                        yield parsed;
                    } catch (e) {
                        console.error('Failed to parse SSE data:', e);
                        console.error('Problematic data:', data);
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}
