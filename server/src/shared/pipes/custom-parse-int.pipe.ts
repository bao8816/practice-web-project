import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { AppException } from '../exceptions/exceptions';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            const paramName = metadata.data || 'parameter';
            throw AppException.BadRequest(`This param must be a valid number: ${paramName}`);
        }
        return val;
    }
}
