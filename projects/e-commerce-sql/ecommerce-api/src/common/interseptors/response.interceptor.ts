import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../responses/api-response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  { success: boolean; message: string; data: T | null }
> {
  intercept(
    _: ExecutionContext,
    next: CallHandler,
  ): Observable<{ success: boolean; message: string; data: T | null }> {
    return next.handle().pipe(
      map((response: ApiResponse<T>) => ({
        success: true,
        message: response.message,
        data: response.data,
      })),
    );
  }
}
