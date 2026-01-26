export interface Section {
    id: string;
    title: string;
}

export type ModelType =
    | "llama-3.1-8b-instant"
    | "openai/gpt-oss-120b"
    | "qwen/qwen3-32b"
    | "groq/compound";

export interface Hyperparameters {
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    stop?: string[];
}

export interface StreamChatRequest {
    model: ModelType;
    user_prompt: string;
    system_prompt?: string;
    hyperparameters?: Hyperparameters;
    save_conversation?: boolean;
    conversation_id?: string | null;
}

export interface StreamChatResponse {
    conversation_id?: string;
    model?: string;
    content?: string;
    finished?: boolean;
    error?: string;
}

export interface FlowNode {
    id: string;
    label: string;
    position: { x: number; y: number };
    color: string;
    nodeType?: 'default' | 'textInput' | 'hyperparameters' | 'output' | 'llm';
    placeholder?: string;
}

export interface FlowEdge {
    id: string;
    source: string;
    target: string;
    animated?: boolean;
    dashed?: boolean;
}

export interface DiagramConfig {
    nodes: FlowNode[];
    edges: FlowEdge[];
    height?: string;
    enableConversationHistory?: boolean;
}

export interface SocialShare {
    platform: 'twitter' | 'linkedin' | 'copy';
    url: string;
}