export interface ResponseDataWrapper<T> extends ResponseBase {
	data: T;
}

export interface ResponseBase {
	success: boolean;
}
