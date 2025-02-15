import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiError {
  message: string | string[];
  error: string;
  statusCode: number;
}

interface ErrorStrategy {
  handle(error: unknown): string;
}

class ApiErrorStrategy implements ErrorStrategy {
  handle(error: FetchBaseQueryError): string {
    if ('data' in error) {
      const apiError = error.data as ApiError;
      return Array.isArray(apiError.message) 
        ? apiError.message[0] 
        : apiError.message;
    }
    return 'Error de conexión';
  }
}

class DefaultErrorStrategy implements ErrorStrategy {
  handle(error: unknown): string {
    return 'Ocurrió un error inesperado';
  }
}

export class ErrorHandler {
  private strategy: ErrorStrategy;

  constructor() {
    this.strategy = new DefaultErrorStrategy();
  }

  handleError(error: unknown): string {
    if (this.isFetchBaseQueryError(error)) {
      this.strategy = new ApiErrorStrategy();
    }
    return this.strategy.handle(error);
  }

  private isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
  }
}