export enum StatusCodes {
	NOT_FOUND = 404,
	OKAY = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	INTERNAL_SERVER_ERROR = 500
}

export interface StatusResponse {
	message: string;
}
