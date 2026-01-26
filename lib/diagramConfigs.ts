import { DiagramConfig } from '@/types';

export const diagram1: DiagramConfig = {
  nodes: [
    { id: '1', label: 'Custom Input', position: { x: 0, y: 75 }, color: '#4057a0', nodeType: 'textInput', placeholder: 'Type your input here...' },
    { id: '2', label: 'LLM', position: { x: 250, y: 75 }, color: '#f03c1e' },
    { id: '3', label: 'Dynamic Output', position: { x: 500, y: 75 }, color: '#20552b', nodeType: 'output' },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ],
  height: 'h-64',
};

export const diagram2: DiagramConfig = {
  nodes: [
    { id: '1', label: 'Custom Input', position: { x: 0, y: 30 }, color: '#4057a0', nodeType: 'textInput', placeholder: 'Type your input here...' },
    { id: '4', label: 'Hyperparameters', position: { x: 0, y: 250 }, color: '#d89921', nodeType: 'hyperparameters' },
    { id: '2', label: 'LLM', position: { x: 320, y: 250 }, color: '#f03c1e' },
    { id: '3', label: 'Dynamic Output', position: { x: 570, y: 250 }, color: '#20552b', nodeType: 'output' },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e4-2', source: '4', target: '2' },
  ],
  height: 'h-[400px]',
};

export const diagram3: DiagramConfig = {
  nodes: [
    { id: '1', label: 'Custom Input', position: { x: 0, y: 25 }, color: '#4057a0', nodeType: 'textInput', placeholder: 'Type your input here...' },
    { id: '4', label: 'Hyperparameters', position: { x: 0, y: 250 }, color: '#d89921', nodeType: 'hyperparameters' },
    { id: '5', label: 'System Prompt', position: { x: 0, y: 550 }, color: '#eee0ba', nodeType: 'textInput', placeholder: 'Define system behavior...' },
    { id: '2', label: 'LLM', position: { x: 320, y: 350 }, color: '#f03c1e' },
    { id: '3', label: 'Dynamic Output', position: { x: 570, y: 350 }, color: '#20552b', nodeType: 'output' },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e4-2', source: '4', target: '2' },
    { id: 'e5-2', source: '5', target: '2' },
  ],
  height: 'h-[700px]',
};

export const diagram4: DiagramConfig = {
  nodes: [
    { id: '1', label: 'Custom Input', position: { x: 0, y: 30 }, color: '#4057a0', nodeType: 'textInput', placeholder: 'Type your input here...' },
    { id: '4', label: 'Hyperparameters', position: { x: 0, y: 250 }, color: '#d89921', nodeType: 'hyperparameters' },
    { id: '5', label: 'System Prompt', position: { x: 0, y: 550 }, color: '#eee0ba', nodeType: 'textInput', placeholder: 'Define system behavior...' },
    { id: '6', label: 'Conversation History', position: { x: 0, y: 800 }, color: '#c4cae4' },
    { id: '2', label: 'LLM', position: { x: 320, y: 400 }, color: '#f03c1e' },
    { id: '3', label: 'Dynamic Output', position: { x: 570, y: 400 }, color: '#20552b', nodeType: 'output' },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e4-2', source: '4', target: '2' },
    { id: 'e5-2', source: '5', target: '2' },
    { id: 'e6-2', source: '6', target: '2' }
  ],
  height: 'h-[900px]',
  enableConversationHistory: true,
};

