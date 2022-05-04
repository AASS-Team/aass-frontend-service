import {Tool} from "@/store/tool/tool.types";
import {Lab} from "@/store/lab/lab.types";
import {User} from "@/store/user/user.types"
import {Sample} from "@/store/sample/sample.types"
import {AnalysisStatus} from "@/types/analysis-status.enum";

export interface Analysis {
	id: string;
	sample: Sample;
	laborant: User;
	lab: Lab;
	status: AnalysisStatus;
	structure: string | null;
	created_at: string | null;
	started_at:  string | null;
	ended_at: string | null;
	tools: Tool[];
}

export interface State {
	analyses: Analysis[];
	analysis: Analysis;
}

export interface Getters {
	analyses: Analysis[];
	analysis: Analysis;
}

export type Actions = {
	fetchAnalyses: () => Promise<void>;
	fetchAnalysis: (id: string) => Promise<void>;
	saveAnalysis: (analysis: Analysis) => Promise<void>;
	updateAnalysis: (payload: { id: string; analysis: Analysis }) => Promise<void>;
	deleteAnalysis: (id: string) => Promise<void>;
	resetState: () => Promise<void>;
};
