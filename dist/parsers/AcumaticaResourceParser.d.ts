import { DefaultResourceParser, DefaultOperationParser } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
export declare class AcumaticaResourceParser extends DefaultResourceParser {
    getResources(document: OpenAPIV3.Document): Array<{
        name: string;
        value: string;
        description: string;
    }>;
}
export declare class AcumaticaOperationParser extends DefaultOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: any): string;
    value(operation: OpenAPIV3.OperationObject, context: any): string;
    action(operation: OpenAPIV3.OperationObject, context: any): string;
}
