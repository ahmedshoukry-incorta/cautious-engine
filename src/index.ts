/**
 * 1. Bundle swagger file (dereference all refs)
 * 2. Read the bundled Swagger File
 * 3. Map each API so it can be searchable by the API path + method. for example:
 * 
 *  --------------------------------------------------------------------------      
 *  |   /api/v1/clusters:                       post /api/v1/clusters:       |
 *  |       post:               --------->>>>       .....                    |  
 *  |           ....                                                         |  
 *  |                                                                        |  
 *  --------------------------------------------------------------------------     
 *  
 * 4. Map each API to AJV schema (Node: one API can be mapped to multiple AJV schemas)
 *    and should be also searchable easilty using API path + method
 * 5. In AutoMock before intercepting the request using the mock, validate the request using AJV schemas
 * 6. if valid -->> fulfill
 * 7. else -->> test should be failed
 * 8. failed test reason should be descriptive, print the request path, method, payload 
 *    and print the received Payload/Response and the expected Payload/Response depending whether it was invalid request/response
 */

import SwaggerParser from '@apidevtools/swagger-parser';
import SwaggerSpec from './swagger';
import { promises as fsPromises } from 'fs';
import { ajvSchema, validateSchema } from './util';
import { Schema, Spec } from 'swagger-schema-official';
import Ajv from "ajv";
import openApi from 'ajv-openapi';

const ajv = openApi(new Ajv(), {
    useDraft04: false
});


function ajvValidate(schema: any, data: any) {
    const errors: any[] = [];
    if (schema.allOf) {
        const notFoundErrors: string[] = [];
        schema.allOf.forEach((requestSchema: Schema) => {            
            const validate = ajv.compile(requestSchema);
            const isValid = validate(data);
            if (!isValid) errors.push(validate.errors);
        });
        if (errors.length) {
            throw new Error(`Expected to match all schemas\n ${errors}`)
        }
        // if (notFoundErrors.length === schema.allOf.length) {
        //     console.log(notFoundErrors)
        //     throw new Error(`${notFoundErrors} Line: 55`);
        // }
        validateSchema(schema.allOf, data);
    } else if (schema.anyOf) {
        const notFoundErrors: string[] = [];
        const validSchemas: Schema[] = [];
        schema.anyOf.forEach((requestSchema: Schema) => {
            const validate = ajv.compile(requestSchema);
            const isValid = validate(data);
            if (!isValid) errors.push(validate.errors)
            else validSchemas.push(requestSchema);
        });
        if (errors.length === schema.anyOf.length) {
            throw new Error(`Expected to match any of the schemas\n ${errors}`)
        }
        // validSchemas.forEach(validSchema => {
        //     if (validSchema.properties) {
        //         try {
        //             validateSchema(validSchema.properties, data);
        //         } catch (error: any) {
        //             notFoundErrors.push(error.message);
        //         }
        //     }
        // });
        // if (notFoundErrors.length === validSchemas.length) {
        //     throw new Error(`${notFoundErrors} Line: 79`);
        // }
        validateSchema(validSchemas, data);
    } else if (schema.oneOf) {
        const notFoundErrors: string[] = [];
        const validSchemas: Schema[] = [];
        schema.oneOf.forEach((requestSchema: Schema) => {
            const validate = ajv.compile(requestSchema);
            const isValid = validate(data);
            if (!isValid) errors.push(validate.errors)
            else validSchemas.push(requestSchema);
        });
        if (errors.length !== schema.oneOf.length - 1) {
            throw new Error(`Expected only of the schemas\n ${errors}`)
        }
        // if (validSchemas[0].properties) {
        //     try {
        //         validateSchema(validSchemas[0].properties, data);
        //     } catch (error: any) {
        //         notFoundErrors.push(error.message);
        //     }
        // }
        // if (notFoundErrors.length) {
        //     throw new Error(`${notFoundErrors[0]} Line: 101`);
        // }
        validateSchema(validSchemas, data);
    } else if (schema.type) {
        const notFoundErrors: string[] = [];
        const validate = ajv.compile(schema);
        const isValid = validate(data);
        if (!isValid) errors.push(validate.errors);

        if (schema.properties) {
            try {
                validateSchema(schema.properties, data);
            } catch (error: any) {
                notFoundErrors.push(error.message);
            }
        }
        if (notFoundErrors.length) {
            throw new Error(`${notFoundErrors[0]} Line: 117`);
        }
    } else {
        throw new Error(`Unkown Request Type ${schema}`);
    }
}
async function main(test:any, baseURL = '/cmc/api/v1') {
    console.log('Dereferncing swagger.ts');
    const bundledSwagger = await SwaggerParser.dereference(SwaggerSpec) as Spec;
    console.log('Writing derefernced swagger to "./src/bundled-swagger.json"');
    await fsPromises.writeFile('./src/bundled-swagger.json', JSON.stringify(bundledSwagger, null, 2), 'utf-8');
    console.log('Mapping derefernced swagger to AJV schema');
    const ajvSchemaObj = ajvSchema(bundledSwagger);
    console.log('Writing ajv schema to "ajv-schema.json"');
    await fsPromises.writeFile('./src/ajv-schema.json', JSON.stringify(ajvSchemaObj, null, 2), 'utf-8');
    // /cmc/api/v1/clusters/localCluster/nodes/local-node
    const urlWithoutBaseurl = `${test.method.toUpperCase()} ${test.url.replace(baseURL, '')}`;
    const hasQuery = urlWithoutBaseurl.split('?').length > 0;
    // /clusters/localCluster/nodes/local-node
    // const paths = urlWithoutBaseurl.split('/');
    // [clusters, localCluster, nodes, local-node]
    // --------------------------------
    // GET /clusters/{clusterName}/nodes/{nodeName}
    const matchedSchemas = Object.keys(ajvSchemaObj).
        filter(path => {
            if (!new RegExp(path).test(urlWithoutBaseurl)) return false;
            if (hasQuery && !ajvSchemaObj[path].parameters?.query) return false;

            const paths = path.split('\\/');
            const urlPaths = urlWithoutBaseurl.split('/');
            if (paths.length !== urlPaths.length) return false;
            if (!paths.every((_, index) => new RegExp(paths[index]).test(urlPaths[index]))) return false;

            // if (!hasQuery) return true;

            // const queries = urlWithoutBaseurl.split('?')[1].split('&');            
        }).
        map(path => ({[path]: ajvSchemaObj[path]}));    
    
    
await fsPromises.writeFile('./src/ajv-schema-matched.json', JSON.stringify(matchedSchemas, null, 2), 'utf-8');

    // const apiPath = `${test.method.toUpperCase()} ${test.url}`;
    // const obj = ajvSchemaObj[apiPath];
    // if (obj.request) {
    //     ajvValidate(obj.request, test.postData);
    // }

    // if (obj.responses) {
    //     if (obj.responses[test.response.status]) {
    //         ajvValidate(obj.responses[test.response.status], test.response.body);
    //         // validateSchemaMain(obj.responses[test.response.status], test.response.body);
    //         // const validate = ajv.compile(obj.responses[test.response.status]);
    //         // const valid = validate(test.response.body);
    //         // if (!valid) errors.push(validate.errors)
    //     } else if (obj.responses.default) {
    //         ajvValidate(obj.responses[test.response.default], test.response.body);
    //         // validateSchemaMain(obj.responses.default, test.response.body);
    //         // const validate = ajv.compile(obj.responses.default);
    //         // const valid = validate(test.response.body);
    //         // if (!valid) errors.push(validate.errors)
    //     } else {
    //         throw new Error('No matching response found');
    //     }
    // }

    console.log('DONE');
}

const getLocalTest1 = {
    "method": "GET",
    "url": "/local",
    "postData": null,
    "response": {
        "status": 200,
        "body": {
            "environmentStatus": "NOT_READY",
            "physicalMemory": "7 GB",
            "analytics_default_memory": 1,
            "loader_default_memory": 4,
            // "sparkWorkerMemory": null,
            // "sparkAppMemory": null,
            // "sparkAppCores": null,
            // "sparkAppExecuters": null,
            "installation_path": "/home/incorta/IncortaAnalytics2/Tenants",
            "is_windows_os": false,
            "is_cloud_environment": false
        },
        "contentType": "json"
    }
};

const getLocalClusterDetailsTest = {
    "method": "GET",
    "url": "/clusters/{clusterName}",
    "postData": null,
    "response": {
        "status": 200,
        "body": {
            "auto_start_services": "Enabled",
            "admin_alerts": "Disabled",
            "zookeeper": "localhost:2181",
            "7mada": "blah blah",
            "enable_spark": false,
            "spark_master": null,
            "spark_app_memory": null,
            "spark_app_cores": null,
            "spark_app_executers": null,
            "spark_ds_port": null,
            "db_type": "derby",
            "db_accounts": "standard",
            "db_connection": "jdbc:derby://localhost:1527/incortaMetadata;create=true",
            "db_user": "incorta_admin_user",
            "db_pw": "NjeTaXPW9N0LYqGgfd+66PrmSge0JapKuJDqnunjj00=",
            "migrations_user": null,
            "migrations_pw": null,
            "admin_email": "a@a",
            "path": "/home/incorta/IncortaAnalytics/Tenants",
            "config": {
                "SPARK_MASTER_URL": "spark://ip-10-0-28-189.us-east-2.compute.internal:7077",
                "MAIL_HOST": "",
                "MAIL_SSL_ENABLED": "true",
                "MAIL_SOCKET_FACTORY_PORT": "465",
                "MAIL_AUTHENTICATION": "true",
                "MAIL_PORT": "",
                "MAIL_PROTOCOL": "smtp",
                "MAIL_EWS_URL": "",
                "SERVICE_MAIL_USE_SENDER_USERNAME_BY_DEFAULT": "false",
                "SERVICE_MAIL_USERNAME": "",
                "SERVICE_MAIL_ADDRESS": "",
                "SERVICE_MAIL_PERSONAL_NAME": "Incorta Analytics",
                "SERVICE_MAIL_PASSWORD": "",
                "MAIL_SOCKET_FACTORY_CLASS": "javax.net.ssl.SSLSocketFactory"
            },
            "has_notebook": true,
            "need_upgrade": false,
            "version": 2,
            "name": "localCluster",
            "nodes": [
                {
                    "name": "localNode",
                    "version": 1,
                    "cluster_name": "localCluster",
                    "node_version": "2022.9.0-master",
                    "host": "10.0.28.189",
                    "agent_port": 4500,
                    "analytics_default_memory": 6,
                    "loader_default_memory": 6,
                    "status": "online",
                    "type": "LOCAL",
                    "node_handshake_status": "COMPATIBLE",
                    "services": [
                        {
                            "node_name": "localNode",
                            "name": "analyticsService",
                            "version": 1,
                            "need_upgrade": false,
                            "node_version": "2022.9.0-master",
                            "status": "Stopped",
                            "cluster_name": "localCluster",
                            "assigned_on_heap_memory": 1,
                            "assigned_off_heap_memory": 1,
                            "used_on_heap_memory": -1,
                            "used_off_heap_memory": -1,
                            "pooled_memory": -1,
                            "URL": "http://10.0.28.189:8080",
                            "service_handshake_status": "COMPATIBLE",
                            "config": {
                                "ajpredirectport": {
                                    "displayName": "AJP Redirect Port",
                                    "currentValue": "8443",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 5,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "memorysize": {
                                    "displayName": "On Heap Memory (GB)",
                                    "currentValue": "1",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 7,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "type": {
                                    "displayName": "Type",
                                    "currentValue": "ANALYTICS",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": true,
                                    "dependsOn": "",
                                    "displayOrder": 0,
                                    "defaultValue": "ANALYTICS",
                                    "hasMinimum": false,
                                    "hasMaximum": false,
                                    "minimumValue": 0,
                                    "maximumValue": 0,
                                    "type": "enum",
                                    "helpMessage": "",
                                    "allowedValues": ["ANALYTICS", "LOADER"]
                                },
                                "cores": {
                                    "displayName": "CPU Utilization (%)",
                                    "currentValue": "25",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 9,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": true,
                                    "minimumValue": 25,
                                    "maximumValue": 95,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "ajpport": {
                                    "displayName": "AJP Port",
                                    "currentValue": "8009",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 4,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "tomcatserverport": {
                                    "displayName": "Tomcat Server Port",
                                    "currentValue": "8005",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 1,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "httpport": {
                                    "displayName": "HTTP Port",
                                    "currentValue": "8080",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 2,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "maxengineoffheap": {
                                    "displayName": "Off Heap Memory (GB)",
                                    "currentValue": "1",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 8,
                                    "defaultValue": "5",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "httpredirectport": {
                                    "displayName": "HTTP Redirect Port",
                                    "currentValue": "8443",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 3,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                }
                            },
                            "validation_message": null
                        },
                        {
                            "node_name": "localNode",
                            "name": "loaderService",
                            "version": 1,
                            "need_upgrade": false,
                            "node_version": "2022.9.0-master",
                            "status": "Stopped",
                            "cluster_name": "localCluster",
                            "assigned_on_heap_memory": 1,
                            "assigned_off_heap_memory": 3,
                            "used_on_heap_memory": -1,
                            "used_off_heap_memory": -1,
                            "pooled_memory": -1,
                            "URL": "http://10.0.28.189:8081",
                            "service_handshake_status": "COMPATIBLE",
                            "config": {
                                "memorysize": {
                                    "displayName": "On Heap Memory (GB)",
                                    "currentValue": "1",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 7,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "cores": {
                                    "displayName": "CPU Utilization (%)",
                                    "currentValue": "25",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 9,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": true,
                                    "minimumValue": 25,
                                    "maximumValue": 95,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "tomcatserverport": {
                                    "displayName": "Tomcat Server Port",
                                    "currentValue": "8006",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 1,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "httpport": {
                                    "displayName": "HTTP Port",
                                    "currentValue": "8081",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 2,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "maxengineoffheap": {
                                    "displayName": "Off Heap Memory (GB)",
                                    "currentValue": "3",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 8,
                                    "defaultValue": "5",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                },
                                "type": {
                                    "displayName": "Type",
                                    "currentValue": "LOADER",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": true,
                                    "dependsOn": "",
                                    "displayOrder": 0,
                                    "defaultValue": "ANALYTICS",
                                    "hasMinimum": false,
                                    "hasMaximum": false,
                                    "minimumValue": 0,
                                    "maximumValue": 0,
                                    "type": "enum",
                                    "helpMessage": "",
                                    "allowedValues": ["ANALYTICS", "LOADER"]
                                },
                                "httpredirectport": {
                                    "displayName": "HTTP Redirect Port",
                                    "currentValue": "8444",
                                    "dirtyValue": "",
                                    "dirty": false,
                                    "requiresRestart": false,
                                    "readOnly": false,
                                    "dependsOn": "",
                                    "displayOrder": 3,
                                    "defaultValue": "",
                                    "hasMinimum": true,
                                    "hasMaximum": false,
                                    "minimumValue": 1,
                                    "maximumValue": 0,
                                    "type": "integer",
                                    "helpMessage": "",
                                    "allowedValues": []
                                }
                            },
                            "validation_message": null
                        }
                    ],
                    "notebook": {
                        "port": 5500,
                        "name": "localNotebook",
                        "node_name": "localNode",
                        "version": 1,
                        "cluster_name": "localCluster",
                        "node_version": "2022.9.0-master",
                        "type": "NOTEBOOK",
                        "notebook_handshake_status": "COMPATIBLE",
                        "status": "Stopped"
                    },
                    "config": {
                        "installationdate": {
                            "displayName": "Installation Date",
                            "currentValue": "Sep/04/2022-01:56-PM",
                            "dirtyValue": "",
                            "dirty": false,
                            "requiresRestart": false,
                            "readOnly": false,
                            "dependsOn": "",
                            "displayOrder": 3,
                            "defaultValue": "",
                            "hasMinimum": false,
                            "hasMaximum": false,
                            "minimumValue": 0,
                            "maximumValue": 0,
                            "type": "string",
                            "helpMessage": "",
                            "allowedValues": []
                        },
                        "installationversion": {
                            "displayName": "Installation Version",
                            "currentValue": "2022.9.0-master",
                            "dirtyValue": "",
                            "dirty": false,
                            "requiresRestart": false,
                            "readOnly": false,
                            "dependsOn": "",
                            "displayOrder": 2,
                            "defaultValue": "",
                            "hasMinimum": false,
                            "hasMaximum": false,
                            "minimumValue": 0,
                            "maximumValue": 0,
                            "type": "string",
                            "helpMessage": "",
                            "allowedValues": []
                        },
                        "physicalmemory": {
                            "displayName": "Total Physical Memory",
                            "currentValue": "7 GB",
                            "dirtyValue": "",
                            "dirty": false,
                            "requiresRestart": false,
                            "readOnly": false,
                            "dependsOn": "",
                            "displayOrder": 1,
                            "defaultValue": "5",
                            "hasMinimum": false,
                            "hasMaximum": false,
                            "minimumValue": 0,
                            "maximumValue": 0,
                            "type": "long",
                            "helpMessage": "",
                            "allowedValues": []
                        },
                        "nodepath": {
                            "displayName": "Node Path",
                            "currentValue": "/home/incorta/IncortaAnalytics/IncortaNode",
                            "dirtyValue": "",
                            "dirty": false,
                            "requiresRestart": false,
                            "readOnly": false,
                            "dependsOn": "",
                            "displayOrder": 4,
                            "defaultValue": "",
                            "hasMinimum": false,
                            "hasMaximum": false,
                            "minimumValue": 0,
                            "maximumValue": 0,
                            "type": "string",
                            "helpMessage": "",
                            "allowedValues": []
                        },
                        "publichost": {
                            "displayName": "Public IP",
                            "currentValue": "10.0.28.189",
                            "dirtyValue": "",
                            "dirty": false,
                            "requiresRestart": false,
                            "readOnly": false,
                            "dependsOn": "",
                            "displayOrder": 0,
                            "defaultValue": "",
                            "hasMinimum": false,
                            "hasMaximum": false,
                            "minimumValue": 0,
                            "maximumValue": 0,
                            "type": "string",
                            "helpMessage": "",
                            "allowedValues": []
                        }
                    }
                }
            ],
            "connectors": [
                { "connectorName": "oracle.sales.cloud", "connectorEnabled": false },
                { "connectorName": "smartsheet", "connectorEnabled": false },
                { "connectorName": "jira", "connectorEnabled": false },
                { "connectorName": "json", "connectorEnabled": false },
                { "connectorName": "xml", "connectorEnabled": false },
                { "connectorName": "customCdata", "connectorEnabled": true },
                { "connectorName": "cosmosdb", "connectorEnabled": false }
            ],
            "tenants": [],
            "validation_message": null,
            "notebook_status": "Stopped",
            "analytics_status": "Stopped",
            "loader_status": "Stopped",
            "zookeeper_mode": "Bundled",
            "zookeeper_status": "Started",
            "spark_status": "Stopped",
            "db_status": "Started",
            "spark_mode": "Bundled",
            "base_url": null,
            "type": "LOCAL",
            "singleTenant": true
        },
        "contentType": "json"
    }
};

const getLocalTest2 = {
    "method": "GET",
    "url": "/cmc/api/v1/local",
    "postData": null,
    "response": {
        "status": 200,
        "body": {
            "environmentStatus": "NOT_READY",
            "physicalMemory": "7 GB",
            "analytics_default_memory": 1,
            "loader_default_memory": 4,
            "sparkWorkerMemory": null,
            "sparkAppMemory": null,
            "sparkAppCores": null,
            "sparkAppExecuters": null,
            "installation_path": "/home/incorta/IncortaAnalytics2/Tenants",
            "is_windows_os": false,
            "is_cloud_environment": false
        },
        "contentType": "json"
    }
};

const postLocalTest1 = {
    "method": "POST",
    "url": "/cmc/api/v1/local",
    "postData": "{\"cluster\":{\"db_type\":\"derby\",\"db_connection\":\"jdbc:mysql://<HOST>:<PORT>/<DATABASE_NAME>?useUnicode=yes&characterEncoding=UTF-8\",\"db_accounts\":\"standard\",\"admin_email\":\"sys@admin.email\",\"path\":\"/home/incorta/IncortaAnalytics2/Tenants\",\"spark_app_memory\":1,\"spark_app_cores\":1,\"spark_app_executers\":1,\"spark_ds_port\":5542,\"auto_start_services\":\"Disabled\",\"admin_alerts\":\"Disabled\"},\"analytics\":{\"server_port\":8005,\"http_port\":8080,\"http_redirect_port\":8443,\"ajp_port\":8009,\"ajp_redirect_port\":8443,\"memory_size\":1,\"cores_utilization\":25},\"loader\":{\"server_port\":8006,\"http_port\":8081,\"http_redirect_port\":8444,\"memory_size\":4,\"cores_utilization\":25},\"spark_mode\":\"none\",\"spark_worker_memory\":1,\"notebook\":{\"port\":5500}}",
    "response": { "status": 200 }
};

main(getLocalClusterDetailsTest);
