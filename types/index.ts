export interface Section {
    id: string;
    title: string;
}

export interface FlowNode {
    id: string;
    label: string;
    position: { x: number; y: number };
    color: string;
    nodeType?: 'default' | 'textInput' | 'hyperparameters';
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
}

export interface SocialShare {
    platform: 'twitter' | 'linkedin' | 'copy';
    url: string;
}