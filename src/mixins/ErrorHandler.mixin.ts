import { AxiosError } from 'axios';

export function handleErrors(e: AxiosError) {
	let targetErrors: unknown;

	if (e.response?.data?.errors) {
		if (Array.isArray(e.response.data.errors))
			targetErrors = e.response.data.errors;
		if ('detail' in e.response.data.errors) {
			targetErrors = e.response.data.errors.detail;
		}
		if ('errors' in e.response.data.errors) {
			targetErrors = e.response.data.errors.errors;
		}
	} else {
		targetErrors = e.response?.data?.error ?? e.message;
	}

	if (Array.isArray(targetErrors)) return targetErrors;

	if (typeof targetErrors === 'string') {
		return targetErrors;
	}

	if (typeof targetErrors === 'object' && targetErrors !== null) {
		return Object.entries(targetErrors)
			.map(([k, v]) => `${k}: ${v}`)
			.join('\n');
	}
}

export default {
	methods: {
		handleErrors
	}
};
