export interface FetchLayerErrorOptions {
  status: number;
  statusText: string;
  body?: unknown;
}

export class FetchLayerError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body?: unknown;

  constructor(message: string, options: FetchLayerErrorOptions) {
    super(message);
    this.name = 'FetchLayerError';
    this.status = options.status;
    this.statusText = options.statusText;
    this.body = options.body;
  }
}
