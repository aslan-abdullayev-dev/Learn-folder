export class ApiResponse<T> {
  message: string;
  data: T | null;

  constructor(message: string, data: T | null = null) {
    this.message = message;
    this.data = data;
  }
}
