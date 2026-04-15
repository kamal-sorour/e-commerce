export interface ApiSuccessResponse<T = unknown> {
  data: T;
  status: number;
}

export interface ActionErrorResponse {
  success: false;
  message: string;
  data?: null;
}

export interface ActionSuccessResponse {
  success: true;
  message: string;
}

export type ActionResponse = ActionSuccessResponse | ActionErrorResponse;

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred";
}
