import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import { N8NPropertiesBuilder } from '@devlikeapro/n8n-openapi-node';
import { AcumaticaResourceParser } from '../../parsers/AcumaticaResourceParser';
import { AcumaticaOperationParser } from '../../parsers/AcumaticaOperationParser';
import * as doc from './swagger.json';

const parser = new N8NPropertiesBuilder(doc, {
  resource: new AcumaticaResourceParser(),
  operation: new AcumaticaOperationParser()
});
const properties = parser.build();

export class ACM_Default_23_200_001 implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Acumatica API - Endpoint Default 23 200 001',
    name: 'acumaticaDefault23200001',
    icon: 'file:acu.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Acumatica Endpoint Default/23.200.001',
    defaults: { name: 'Acumatica 23.200.001' },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: 'acumaticaOAuth2Api', required: true }],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: '={{$credentials.url}}',
      qs: {
        company: '={{$credentials.company}}',
      },
    },
    properties: properties,
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const credentials = await this.getCredentials('acumaticaOAuth2Api');
    const baseURL = credentials.url as string;
    const company = credentials.company as string;
    const results: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter('resource', i) as string;
      const operation = this.getNodeParameter('operation', i) as string;

      let method = 'GET';
      if (operation === 'getList') method = 'GET';
      else if (operation === 'get') method = 'GET';
      else if (operation === 'upsert') method = 'PUT';
      else if (operation === 'create') method = 'POST';
      else if (operation === 'delete') method = 'DELETE';
      else if (operation === 'action') method = 'POST';

      // Build URL
      let url = `${baseURL}/entity/Default/23.200.001/${resource}`;

      // Get optional ID parameter - check node param first, then input item
      try {
        const id = this.getNodeParameter('id', i) as string;
        if (id) url += `/${id}`;
      } catch {
        const inputId = (items[i].json as any)._orderId;
        if (inputId) url += `/${inputId}`;
      }

      // Build body - for write operations always use input item data
      let body: object | undefined = undefined;
      if (['upsert', 'create', 'action'].includes(operation)) {
        body = items[i].json as object;
      }

      // Get optional query params
      const qs: Record<string, string> = { company };
      try {
        const select = this.getNodeParameter('$select', i) as string;
        if (select) qs['$select'] = select;
      } catch {}
      try {
        const filter = this.getNodeParameter('$filter', i) as string;
        if (filter) qs['$filter'] = filter;
      } catch {}
      try {
        const top = this.getNodeParameter('$top', i) as number;
        if (top) qs['$top'] = String(top);
      } catch {}

      const options = {
        method,
        url,
        qs,
        body,
        json: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const response = await this.helpers.requestOAuth2.call(
        this,
        'acumaticaOAuth2Api',
        options,
      );

      const parsed = typeof response === 'string' ? JSON.parse(response) : response;
      const responseData = Array.isArray(parsed) ? parsed : [parsed];
      results.push(...responseData.map(item => ({ json: item })));
    }

    return [results];
  }
}