import { DefaultOperationParser } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
export declare class AcumaticaOperationParser extends DefaultOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: any): string;
    value(operation: OpenAPIV3.OperationObject, context: any): string;
    action(operation: OpenAPIV3.OperationObject, context: any): string;
}
