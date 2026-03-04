"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcumaticaOperationParser = exports.AcumaticaResourceParser = void 0;
const n8n_openapi_node_1 = require("@devlikeapro/n8n-openapi-node");
const lodash = __importStar(require("lodash"));
class AcumaticaResourceParser extends n8n_openapi_node_1.DefaultResourceParser {
    // Extract entity names from paths like "/{entity}"
    getResources(document) {
        const entities = new Set();
        // Parse paths to extract entity names
        Object.keys(document.paths).forEach(path => {
            // Match patterns like /SalesOrder, /Customer, etc.
            const match = path.match(/^\/([A-Z][a-zA-Z]+)(?:\/|$)/);
            if (match && match[1] !== 'entity') {
                entities.add(match[1]);
            }
        });
        return Array.from(entities).sort().map(entity => ({
            name: lodash.startCase(entity),
            value: entity,
            description: `Operations for ${lodash.startCase(entity)}`
        }));
    }
}
exports.AcumaticaResourceParser = AcumaticaResourceParser;
class AcumaticaOperationParser extends n8n_openapi_node_1.DefaultOperationParser {
    name(operation, context) {
        var _a, _b;
        const method = context.method.toUpperCase();
        switch (method) {
            case 'GET':
                return ((_a = operation.operationId) === null || _a === void 0 ? void 0 : _a.includes('GetList')) ? 'Get List' : 'Get';
            case 'PUT':
                return 'Insert/Update';
            case 'DELETE':
                return 'Delete';
            case 'POST':
                // Handle action endpoints
                return ((_b = operation.operationId) === null || _b === void 0 ? void 0 : _b.includes('action')) ? 'Execute Action' : 'Create';
            default:
                return lodash.startCase(method);
        }
    }
    value(operation, context) {
        var _a, _b;
        const method = context.method.toLowerCase();
        switch (method) {
            case 'get':
                return ((_a = operation.operationId) === null || _a === void 0 ? void 0 : _a.includes('GetList')) ? 'getList' : 'get';
            case 'put':
                return 'upsert';
            case 'delete':
                return 'delete';
            case 'post':
                return ((_b = operation.operationId) === null || _b === void 0 ? void 0 : _b.includes('action')) ? 'action' : 'create';
            default:
                return method;
        }
    }
    action(operation, context) {
        return this.name(operation, context);
    }
}
exports.AcumaticaOperationParser = AcumaticaOperationParser;
