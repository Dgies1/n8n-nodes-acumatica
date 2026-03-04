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
exports.ACM_Default_24_200_001 = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const n8n_openapi_node_1 = require("@devlikeapro/n8n-openapi-node");
const AcumaticaResourceParser_1 = require("../../parsers/AcumaticaResourceParser");
const AcumaticaOperationParser_1 = require("../../parsers/AcumaticaOperationParser");
const doc = __importStar(require("./swagger.json"));
const parser = new n8n_openapi_node_1.N8NPropertiesBuilder(doc, {
    resource: new AcumaticaResourceParser_1.AcumaticaResourceParser(),
    operation: new AcumaticaOperationParser_1.AcumaticaOperationParser()
});
const properties = parser.build();
class ACM_Default_24_200_001 {
    constructor() {
        this.description = {
            displayName: 'Acumatica API - Endpoint Default 24 200 001',
            name: 'acumaticaDefault24200001',
            icon: 'file:acu.png',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with Acumatica Endpoint Default/24.200.001',
            defaults: { name: 'Your Service' },
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [{ name: 'acumaticaOAuth2Api', required: true }],
            requestDefaults: {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                baseURL: '={{$credentials.url}}',
            },
            properties: properties,
        };
    }
}
exports.ACM_Default_24_200_001 = ACM_Default_24_200_001;
