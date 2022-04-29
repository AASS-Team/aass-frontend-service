export interface Tool {
	id: string;
	name: string;
	type: string;
	available: boolean;
}

export interface State {
	tools: Tool[];
	tool: Tool;
}

export interface Getters {
	tools: Tool[];
	tool: Tool;
}

export type Actions = {
	fetchTools: () => Promise<void>;
	fetchTool: (id: string) => Promise<void>;
	saveTool: (tool: Tool) => Promise<void>;
	updateTool: (payload: { id: string; tool: Tool }) => Promise<void>;
	deleteTool: (id: string) => Promise<void>;
	resetState: () => Promise<void>;
};
