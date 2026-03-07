import {
    DefaultResourceParser,
    DefaultOperationParser
} from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';
import * as lodash from 'lodash';

export class AcumaticaResourceParser extends DefaultResourceParser {
    value(tag: OpenAPIV3.TagObject): string {
        // Return tag name as-is to preserve SalesOrder, Customer etc for use in URL
        return tag.name;
    }

    name(tag: OpenAPIV3.TagObject): string {
        // Add spaces for display: SalesOrder -> Sales Order
        return tag.name.replace(/([A-Z])/g, ' $1').trim();
    }
}

export class AcumaticaOperationParser extends DefaultOperationParser {
    name(operation: OpenAPIV3.OperationObject, context: any): string {
        const method = context.method.toUpperCase();

        switch (method) {
            case 'GET':
                return operation.operationId?.includes('GetList') ? 'Get List' : 'Get';
            case 'PUT':
                return 'Insert/Update';
            case 'DELETE':
                return 'Delete';
            case 'POST':
                return operation.operationId?.includes('action') ? 'Execute Action' : 'Create';
            default:
                return lodash.startCase(method);
        }
    }

    value(operation: OpenAPIV3.OperationObject, context: any): string {
        const method = context.method.toLowerCase();

        switch (method) {
            case 'get':
                return operation.operationId?.includes('GetList') ? 'getList' : 'get';
            case 'put':
                return 'upsert';
            case 'delete':
                return 'delete';
            case 'post':
                return operation.operationId?.includes('action') ? 'action' : 'create';
            default:
                return method;
        }
    }

    action(operation: OpenAPIV3.OperationObject, context: any): string {
        return this.name(operation, context);
    }
}