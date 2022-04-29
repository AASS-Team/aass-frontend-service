import {AnalysisStatus} from "@/types/analysis-status.enum";

export default {
    methods: {
        mapStatus(status: AnalysisStatus) {
            if (status === AnalysisStatus.IN_PROGRESS) {
                return "rozpracované";
            } else if (status === AnalysisStatus.PENDING) {
                return "v poradí"
            }
            return "hotovo"
        }
    }
};
