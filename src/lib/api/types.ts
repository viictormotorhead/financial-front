export type ApiEnvelope<T> = Readonly<{
  status: string;
  message: string;
  data: T;
}>;

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
