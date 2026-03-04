"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcumaticaOAuth2Api = void 0;
class AcumaticaOAuth2Api {
    constructor() {
        this.name = 'acumaticaOAuth2Api';
        this.displayName = 'Acumatica OAuth2 API';
        this.documentationUrl = 'https://help.acumatica.com/';
        this.extends = ['oAuth2Api'];
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'authorizationCode',
            },
            {
                displayName: 'Acumatica Instance URL',
                name: 'url',
                type: 'string',
                default: '',
                placeholder: 'https://yourinstance.acumatica.com',
                description: 'Base URL of your Acumatica instance (without tenant path)',
                required: true,
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'string',
                default: '',
                placeholder: '88358B02-A48D-A50E-F710-39C1636C30F6@MyTenant',
                description: 'Client ID with tenant suffix (e.g., GUID@TenantName)',
                required: true,
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
            {
                displayName: 'Authorization URL',
                name: 'authUrl',
                type: 'string',
                default: '',
                placeholder: 'https://yourinstance.acumatica.com/identity/connect/authorize',
                description: 'OAuth2 authorization endpoint. Format: {instanceUrl}/identity/connect/authorize',
                required: true,
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'string',
                default: '',
                placeholder: 'https://yourinstance.acumatica.com/identity/connect/token',
                description: 'OAuth2 token endpoint. Format: {instanceUrl}/identity/connect/token',
                required: true,
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'hidden',
                default: 'api offline_access',
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'body',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.oauthTokenData.access_token}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.url}}',
                url: '/entity/Default/24.200.001',
                method: 'GET',
            },
        };
    }
}
exports.AcumaticaOAuth2Api = AcumaticaOAuth2Api;
