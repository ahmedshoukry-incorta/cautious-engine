import { Spec } from "swagger-schema-official";

export default {
  "swagger": "2.0",
  "host": "127.0.0.1:4000",
  "info": {
    "description": "This is the REST API for Incorta Central Management Console (CMC).",
    "version": "1.1.0",
    "title": "CMC API"
  },
  "basePath": "/cmc/api/v1",
  "tags": [
    {
      "name": "Authentication",
      "description": "Authentication user for security"
    },
    {
      "name": "cluster",
      "description": "Operations supported at cluster level"
    },
    {
      "name": "service",
      "description": "Operations supported at service level"
    },
    {
      "name": "node",
      "description": "Operations supported at node level"
    },
    {
      "name": "local",
      "description": "Operations supported at local node level"
    },
    {
      "name": "test",
      "description": "Operations used for testing external resources"
    },
    {
      "name": "tenant",
      "description": "Operations supported at tenant level"
    },
    {
      "name": "logs",
      "description": "Operations used for log files"
    },
    {
      "name": "config",
      "description": "Operations used for entity config"
    },
    {
      "name": "notebook",
      "description": "Operations supported at notebook level"
    },
    {
      "name": "misc",
      "description": "Operations used for miscellaneous"
    },
    {
      "name": "Configuration"
    }
  ],
  "schemes": [
    "http"
  ],
  "paths": {
    // "/version": {
    //   "get": {
    //     "tags": [
    //       "misc"
    //     ],
    //     "operationId": "getApiVersion",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "string"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/conf": {
    //   "post": {
    //     "tags": [
    //       "Configuration"
    //     ],
    //     "summary": "Deletes a cluster",
    //     "description": "set singleTenant flag in cmc.cfg",
    //     "operationId": "setSingleTenant",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       },
    //       {
    //         "name": "isSingleTenant",
    //         "in": "query",
    //         "type": "boolean",
    //         "description": "Cloud user data",
    //         "required": true
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "Single tenant flag set"
    //       },
    //       "401": {
    //         "description": "Invalid token."
    //       },
    //       "500": {
    //         "description": "Failed due to internal error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/auth/login": {
    //   "get": {
    //     "tags": [
    //       "Authentication"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "operationId": "login",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "type": "string",
    //         "description": "Basic base64.encode(username:password)",
    //         "required": true
    //       }
    //     ],
    //     "responses": {
    //       "201": {
    //         "description": "Token Created",
    //         "schema": {
    //           "$ref": "#/definitions/AccessToken"
    //         }
    //       },
    //       "422": {
    //         "description": "Unprocessable Entity. Please verify the parameters values are correct.",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/auth/refresh": {
    //   "get": {
    //     "tags": [
    //       "Authentication"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "operationId": "refresh",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "type": "string",
    //         "description": "Basic base64.encode(username:password)",
    //         "required": true
    //       }
    //     ],
    //     "responses": {
    //       "201": {
    //         "description": "Token Created",
    //         "schema": {
    //           "$ref": "#/definitions/AccessToken"
    //         }
    //       },
    //       "422": {
    //         "description": "Unprocessable Entity. Please verify the parameters values are correct.",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/auth/isLoggedIn": {
    //   "get": {
    //     "tags": [
    //       "Authentication"
    //     ],
    //     "operationId": "isLoggedIn",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string",
    //         "required": true
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "Valid token."
    //       },
    //       "401": {
    //         "description": "Invalid token."
    //       }
    //     }
    //   }
    // },
    // "/auth/cloudUser": {
    //   "post": {
    //     "tags": [
    //       "Authentication"
    //     ],
    //     "operationId": "createCloudUser",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       },
    //       {
    //         "name": "cloudUserData",
    //         "in": "body",
    //         "description": "Cloud user data",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/CloudUserCreate"
    //         }
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "User created."
    //       },
    //       "401": {
    //         "description": "Invalid token."
    //       },
    //       "500": {
    //         "description": "Failed due to internal error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/auth/logout": {
    //   "delete": {
    //     "tags": [
    //       "Authentication"
    //     ],
    //     "operationId": "logout",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "204": {
    //         "description": "Token Deleted"
    //       },
    //       "500": {
    //         "description": "Failed due to internal error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters": {
    //   "get": {
    //     "tags": [
    //       "cluster"
    //     ],
    //     "summary": "Lists available clusters",
    //     "description": "The system administrator can manage more than one cluster (e.g. UAT of couple of departments or DEV/UAT of the same one) from one CMC instance. Each cluster can have its own Zookeeper infrastructure or share the same one with other cluster(s). This function will retrieve the list of clusters available in the system.\n#\nThe cluster list is purely retrieved from CMC metadata but the status requires communication with the node agents. CMC UI will have to make another call to retrieve the cluster runtime status. A cluster is considered started when at least one of its nodes is up and running.\n",
    //     "operationId": "listClusters",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/Cluster"
    //           }
    //         }
    //       }
    //     }
    //   },
    //   "post": {
    //     "tags": [
    //       "cluster"
    //     ],
    //     "summary": "Add a new cluster",
    //     "description": "The is used to add the definition of a new cluster. The definition will be added to metadata only if the validation of all input parameters succeeds as follows\n1. #### Cluster Name\n   Ensure that this cluster name is not already used. CMC requires a uniuqe cluster name.\n   \n   #\n2. #### Zookeeper URL\n    CMC will try to connect to this Zookeeper to validate the connection string. If the connection succeeds then we move to the next step. If no, the operation fails and an error is returned indicating the failure reason. We should retun the same error details we get from Zookeeper client. UI will have a \"Test Connection\" option for Zookeeper URL.\n    \n    #\n3. #### Apache Helix\n    Create the cluster definition in Apache helix by calling Helix admin API to add this to its metadata. Initially the cluster will have no nodes.\n    \n    #\n4. #### Incorta Metadata Database\n    CMC will construct the JDBC connectio string, load the suitable driver and try to connect to the database with the user and password provided by the client. If it fails, the operation should fail and the JDBC or DB error will be returned to the client for the sake of debugging. If the connection succeeds, CMC will check if there are incorta tables already created there and the SYS tenant is already imported. If yes, CMC will enable the cluster flag and set the Zookeeper URL property. If no, then create the metadata tables, import SYS tenant and set cluster parameters (enabled = true, name and Zookeeper URL). CMC may ship with TMT and delegate the SYS tenant creation to it. UI will have a \"Test Connection\" option for Zookeeper URL.\n    \n    #\n5. #### Update CMC metadata\n    Finally and only if all the previous steps succeed, add the cluster definition to CMC metadata. Currently we are creating a file persistance provider to store metadata as XML files. One data folder under CMC installation folder and a folder named nodes to store one xml file for each node and another folder named clusters to store one xml file for each clsuter. An index file will map the cluster/node name to the xml file name so that we don't introduce any limitations on cluster/node name. A properties file under the data folder will store the relation between clusters and the nodes members of these clusters.\n",
    //     "operationId": "addCluster",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Cluster metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/ClusterCreate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Cluster"
    //         }
    //       },
    //       "400": {
    //         "description": "Cluster name already exists. Please use a different name."
    //       },
    //       "500": {
    //         "description": "Failed to update CMC metadata. This could be due to Helix failure to create cluster definition or because CMC failed to update its underlying metadata (file system or database if any).",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "502": {
    //         "description": "Connection failed. Please verify the connection parameters are correct.",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/brief": {
    //   "get": {
    //     "tags": [
    //       "cluster"
    //     ],
    //     "summary": "Lists available clusters brief definitions",
    //     "description": "The system administrator can manage more than one cluster. Cluster definition consists of list of cluster services and another list of cluster tenants. #\nThe cluster list is purely retrieved from CMC metadata.\n",
    //     "operationId": "listClustersDef",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/ClusterBrief"
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/config": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "Get cluster config",
    //     "operationId": "getClusterConfig",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "tags": [
    //       "cluster",
    //       "config"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "string"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    "/clusters/{clusterName}": {
      "parameters": [
        {
          "name": "clusterName",
          "in": "path",
          "required": true,
          "type": "string"
        }
      ],
      "get": {
        "tags": [
          "cluster"
        ],
        "summary": "Get cluster by name",
        "description": "The is used to retrieve the complete definition of a certain cluster including the nodes list of the cluster members. The static defition is retirieved from CMC metadata. Cluster \"status\" is a runtime information that will require a separate call to get the cluster status or the status of each member of the cluster. CMC UI should always make a lazy call for the status to enhance the page reponse time on the first render.\n#\nThe CMC backend will check the status of each node and should break the loop and mark it started with the first node that is reported as up. If all nodes are down then a cluster is considered stopped.\n",
        "operationId": "getCluster",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "description": "Bearer token",            
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Cluster"
            }
          },
          "404": {
            "description": "Cluster not found"
          }
        }
      },
      "post": {
        "tags": [
          "cluster"
        ],
        "summary": "Update an existing cluster",
        "description": "This function updates the definition of an exsting cluster. Name is not allowed to be changed and Zookeeper and metadata database is also something very critical to change.\n#\nAdditionally, changing icc_port for example may require cluster slowdown (not a full shutdown) until all nodes shut down the listener on the current port and start it up on the new one. User needs to be clearly informed with the consequences of his action(s).\n#\nIf the user still needs to perform the update, CMC backend will perform the required change to the cluster members and wait util all of them report a successful update, then it updates its metadata before it reports a successful execution to the client.\n#\nA version number must be included in the request body. The backend checks that this version number matches the version number stored in the CMC metadata. If not, the operation fails. This prevents corruption of data when multiple users are concurrently editing the same entity.\n",
        "operationId": "updateCluster",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "description": "Cluster metadata",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ClusterUpdate"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "description": "Bearer token",            
            "type": "string"
          }
        ],
        "responses": {
          "400": {
            "description": "Invalid resource properties",
            "schema": {
              "$ref": "#/definitions/ApiError"
            }
          },
          "404": {
            "description": "Cluster not found"
          },
          "409": {
            "description": "Invalid resource version"
          }
        }
      },
      "delete": {
        "tags": [
          "cluster"
        ],
        "summary": "Deletes a cluster",
        "description": "A cluster can only be deleted if it has no nodes joined. An attempt to remove the cluster from Helix is made. If successful, it is removed from the CMC metadata too.",
        "operationId": "deleteCluster",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "description": "Bearer token",            
            "type": "string"
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "404": {
            "description": "Cluster not found"
          }
        }
      }
    },
    // "/clusters/{clusterName}/upgradeMetadata": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "tags": [
    //       "cluster"
    //     ],
    //     "summary": "upgrade cluster metadata",
    //     "operationId": "upgradeMetadata",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "migrationsPw",
    //         "in": "query",
    //         "type": "string",
    //         "description": "base64.encode(password)"
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       }
    //     }
    //   }
    // },
    // "/manage/clusters": {
    //   "post": {
    //     "tags": [
    //       "cluster"
    //     ],
    //     "summary": "Manage all nodes of one or more clusters",
    //     "description": "This endpoint is used to manage the clusters' nodes. The supported commands are\n  - start\n  - stop\n  - kill\n  - restart\n",
    //     "operationId": "manageClusters",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "A list of cluster names alongside the management command",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "400": {
    //         "description": "Invalid command"
    //       },
    //       "500": {
    //         "description": "Command execution failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "List available tenants",
    //     "operationId": "listTenants",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/Tenant"
    //           }
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "post": {
    //     "summary": "Add a tenant",
    //     "operationId": "addTenant",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Tenant metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/TenantCreate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Tenant"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/import/tenant": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantPassword",
    //       "in": "header",
    //       "required": false,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "summary": "import tenant",
    //     "operationId": "importTenant",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Imported Tenant metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/TenantImport"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Tenant"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/listAllTenantsBackups": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "List all tenants backups",
    //     "operationId": "listAllTenantsBackups",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/TenantBackup"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/{tenantName}/listTenantBackups": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "List tenant backups",
    //     "operationId": "listTenantBackups",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/TenantBackup"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/{tenantName}/backupTenant": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "create tenant backup",
    //     "operationId": "backupTenant",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/restoreAndOverwrite": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "summary": "Restore tenant backup with overwrite",
    //     "operationId": "restoreAndOverwrite",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "tenantBackupId",
    //         "in": "query",
    //         "required": true,
    //         "type": "string",
    //         "description": "Tenant backup id"
    //       },
    //       {
    //         "name": "backup",
    //         "required": true,
    //         "in": "query",
    //         "type": "boolean",
    //         "default": false
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/restore": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "summary": "Restore tenant backup without overwrite",
    //     "operationId": "restore",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "TenantRestore",
    //         "in": "body",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/TenantRestore"
    //         },
    //         "description": "Restore tenant configuration"
    //       },
    //       {
    //         "name": "tenantBackupId",
    //         "in": "query",
    //         "required": true,
    //         "type": "string",
    //         "description": "Tenant backup id"
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/{tenantName}/config": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "Get tenant config",
    //     "operationId": "getTenantConfig",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "tags": [
    //       "tenant",
    //       "config"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/UpdateConfigResponse"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "post": {
    //     "summary": "Update tenant config",
    //     "operationId": "updateTenantConfig",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Tenant metadata",
    //         "required": true,
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/Config"
    //           }
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant",
    //       "config"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "string"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/{tenantName}": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "Get tenant by name",
    //     "operationId": "getTenant",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Tenant"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "post": {
    //     "summary": "Update tenant",
    //     "operationId": "updateTenant",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Tenant metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/TenantUpdate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "delete": {
    //     "summary": "Delete tenant",
    //     "operationId": "deleteTenant",
    //     "tags": [
    //       "tenant"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "backup",
    //         "required": true,
    //         "in": "query",
    //         "type": "boolean",
    //         "default": false
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/{tenantName}/export": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantPassword",
    //       "in": "header",
    //       "required": false,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "summary": "Export tenant",
    //     "operationId": "exportTenant",
    //     "consumes": [
    //       "application/x-www-form-urlencoded"
    //     ],
    //     "produces": [
    //       "application/zip"
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "file"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/tenants/{tenantName}/executeInspectorNow": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "tenantName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "summary": "immediate execution of the inspector job",
    //     "operationId": "executeInspectorNow",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "tags": [
    //       "tenant"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "string"
    //         }
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node"
    //     ],
    //     "summary": "Add a new node",
    //     "description": "A node is added to CMC metadata if the federation process succeeds. This includes the following steps-\n1. Try to connect to the node agent using the host name/ip and port number provided by the user. If not reacahable then the operation fails\n2. Check with node agent if the node is free for federation, if already federated then the operation fails.\n3. Ask the node agent to retrieve the node name for CMC to check uniqueness. If not unique generate a unique name and confirm with the end user to update it through node agent. No progress can be made before the name is unique for CMC.\n4. Ask node agent to federate the node under this CMC instance passing it the CMC instance ID generated by the installer.\n5. Node agent sets the CMC instance ID in the service.properties file (e.g. federation.instance=CMC_ID). If anything goes wrong (update fails for any reason) then return an expressive error otherwise return a success code for the federation process.\n6. Finally, the CMC metadata is updated to persist the new node information.\n",
    //     "operationId": "addNode",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Node metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/NodeCreate"
    //         }
    //       },
    //       {
    //         "name": "force",
    //         "in": "query",
    //         "type": "boolean",
    //         "description": "Bypass user confirmations",
    //         "default": false
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Node"
    //         }
    //       },
    //       "400": {
    //         "description": "This node's host:agent_port already exists. Use a different host:agent_port",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Node federation failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/charts": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "summary": "retrieve utilization charts info for cluster",
    //     "operationId": "getClusterCharts",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "tags": [
    //       "cluster"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "from",
    //         "in": "query",
    //         "type": "integer",
    //         "format": "int64",
    //         "required": true
    //       },
    //       {
    //         "name": "to",
    //         "in": "query",
    //         "type": "integer",
    //         "format": "int64",
    //         "required": true
    //       },
    //       {
    //         "name": "timeZone",
    //         "in": "query",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/ClusterCharts"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/nodes/discover": {
    //   "post": {
    //     "tags": [
    //       "node"
    //     ],
    //     "summary": "An endpoint to discover node",
    //     "description": "Connect to node agent and retrieve info about the node.",
    //     "operationId": "discoverNode",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "nodeData",
    //         "in": "body",
    //         "description": "Host and port of node agent",
    //         "required": true,
    //         "schema": {
    //           "type": "object",
    //           "required": [
    //             "host",
    //             "agent_port"
    //           ],
    //           "properties": {
    //             "host": {
    //               "type": "string"
    //             },
    //             "agent_port": {
    //               "type": "integer"
    //             }
    //           }
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/NodeDiscoveryInfo"
    //         }
    //       },
    //       "502": {
    //         "description": "Connection failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes/{nodeName}": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node"
    //     ],
    //     "summary": "Update an existing node",
    //     "description": "Update node data. The properties allowed are\n  1. #### agent_port\n      This updates the agent port on the node, and requires an agent restart. This means that we have to gracefully handle the in-flight requests between other CMC users and this agent.\n      \n      #\n  2. #### props\n      A map of key-value properties. These are node specific properties like (http_port, heap_size). It may require restarting incorta on the node depending on the property.\n      \n      #\n  3. #### name\n      Updates the node name in cmc metadata and node properties.\n \nA part from the above properties, a version number must be included in the request body. The backend checks that this version number matches the version number stored in the CMC metadata. If not, the operation fails. This prevents corruption of data when multiple users are concurrently editing the same entity.\n",
    //     "operationId": "updateNode",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Node metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/NodeUpdate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid resource properties",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "409": {
    //         "description": "Invalid resource version",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Failed to update the node",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "delete": {
    //     "tags": [
    //       "node"
    //     ],
    //     "summary": "Deletes a node",
    //     "description": "Given a federated node (not a member of any cluster), deleting it removes it from the control of this CMC instance as follows\n1. Requuest a node agent connection and call it to reset the CMC instance ID in the service properties file. If this succeds move to next step\n2. Delete the node defintion from CMC metadata and report a successful operation to the caller.\n",
    //     "operationId": "deleteNode",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "204": {
    //         "description": "No Content"
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes/{nodeName}/notebook": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node",
    //       "notebook"
    //     ],
    //     "summary": "Add a new notebook",
    //     "description": "",
    //     "operationId": "addNotebook",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Notebook metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/NotebookCreate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Notebook"
    //         }
    //       },
    //       "400": {
    //         "description": "Bad request",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Node federation failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes/{nodeName}/services": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node",
    //       "service"
    //     ],
    //     "summary": "Add a new service",
    //     "description": "",
    //     "operationId": "addService",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Service metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/ServiceCreate"
    //         }
    //       },
    //       {
    //         "name": "force",
    //         "in": "query",
    //         "type": "boolean",
    //         "description": "Bypass user confirmations",
    //         "default": false
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/Service"
    //         }
    //       },
    //       "400": {
    //         "description": "Bad request",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Node federation failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes/{nodeName}/notebooks/{notebookName}": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "notebookName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node",
    //       "notebook"
    //     ],
    //     "summary": "Update an existing notebook",
    //     "description": "",
    //     "operationId": "updateNotebook",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Notebook metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/NotebookUpdate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid resource properties",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "409": {
    //         "description": "Invalid resource version",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Failed to update the node",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "delete": {
    //     "tags": [
    //       "node",
    //       "notebook"
    //     ],
    //     "summary": "Deletes a notebook",
    //     "description": "",
    //     "operationId": "deleteNotebook",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "204": {
    //         "description": "No Content"
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes/{nodeName}/services/{serviceName}": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "serviceName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node",
    //       "service"
    //     ],
    //     "summary": "Update an existing service",
    //     "description": "",
    //     "operationId": "updateService",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Service metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/ServiceUpdate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid resource properties",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "409": {
    //         "description": "Invalid resource version",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Failed to update the node",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "delete": {
    //     "tags": [
    //       "node",
    //       "service"
    //     ],
    //     "summary": "Deletes a service",
    //     "description": "",
    //     "operationId": "deleteService",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "204": {
    //         "description": "No Content"
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/downloadLogs": {
    //   "post": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "Get service log files",
    //     "description": "",
    //     "operationId": "getServiceLogs",
    //     "produces": [
    //       "application/zip",
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "listOfLogFiles",
    //         "in": "body",
    //         "required": true,
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/LogFileMetadata"
    //           }
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "file"
    //         }
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/listLogs": {
    //   "get": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "List cluster log files",
    //     "description": "list incorta, tenant and catalina log files",
    //     "operationId": "listLogs",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "from",
    //         "in": "query",
    //         "type": "string",
    //         "x-example": "MM/DD/YYYY",
    //         "required": true
    //       },
    //       {
    //         "name": "to",
    //         "in": "query",
    //         "type": "string",
    //         "x-example": "MM/DD/YYYY",
    //         "required": true
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/LogFileMetadata"
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/summarize": {
    //   "post": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "Summarize list of log files",
    //     "description": "",
    //     "operationId": "summarizeLogFiles",
    //     "parameters": [
    //       {
    //         "name": "listOfLogFilesMetaData",
    //         "in": "body",
    //         "required": true,
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/LogFileMetadata"
    //           }
    //         }
    //       },
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/getSummaryProgress": {
    //   "get": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "get the progress of summarizing a list of log files",
    //     "description": "",
    //     "operationId": "getSummaryProgress",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid request",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/displaySummary": {
    //   "get": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "display summary of log files",
    //     "description": "",
    //     "operationId": "displaySummary",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "folderName",
    //         "in": "query",
    //         "description": "",
    //         "x-example": "summary_12/12/2012_12:12:12_admin",
    //         "type": "string"
    //       },
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "description": "",
    //         "x-example": "localCluster",
    //         "type": "string"
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid request",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/listSummaryFilesHistory": {
    //   "get": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "List summaries of the log files from the history",
    //     "description": "list all the previous summaries from the history",
    //     "operationId": "listSummaryFilesHistory",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "type": "string"
    //       },
    //       {
    //         "name": "from",
    //         "in": "query",
    //         "type": "string",
    //         "x-example": "MM/DD/YYYY",
    //         "required": true
    //       },
    //       {
    //         "name": "to",
    //         "in": "query",
    //         "type": "string",
    //         "x-example": "MM/DD/YYYY",
    //         "required": true
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/logSummaryMetadata"
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/downloadLogSummary": {
    //   "get": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "Get services log summary as json or csv",
    //     "description": "Get services log summary as json or csv",
    //     "operationId": "downloadLogSummary",
    //     "produces": [
    //       "application/zip"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "logSummaryName",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "type",
    //         "in": "query",
    //         "required": true,
    //         "type": "string",
    //         "enum": [
    //           "json",
    //           "csv"
    //         ]
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "file"
    //         }
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/logs/cancelLogSummaryRequest": {
    //   "get": {
    //     "tags": [
    //       "logs"
    //     ],
    //     "summary": "Cancel log summary request",
    //     "description": "",
    //     "operationId": "cancelLogSummaryRequest",
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/scheduler/listScheduledJobs": {
    //   "get": {
    //     "tags": [
    //       "scheduler"
    //     ],
    //     "summary": "List the scheduled jobs",
    //     "description": "list the scheduled jobs of the type tenants backup and restore",
    //     "operationId": "listScheduledJobs",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "jobType",
    //         "in": "query",
    //         "required": true,
    //         "type": "string",
    //         "enum": [
    //           "TENANT_BACKUP",
    //           "INSPECTOR_TOOL"
    //         ]
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "$ref": "#/definitions/ScheduledJob"
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // "/scheduler/createJob": {
    //   "post": {
    //     "tags": [
    //       "scheduler"
    //     ],
    //     "summary": "create a new job",
    //     "description": "schedule a new job of type tenant backup and restore",
    //     "operationId": "createJob",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "type": "string",
    //         "in": "query",
    //         "required": true
    //       },
    //       {
    //         "name": "job",
    //         "in": "body",
    //         "description": "the details of the job including jobid, tenant name, etc..",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/ScheduledJob"
    //         }
    //       },
    //       {
    //         "name": "jobType",
    //         "in": "query",
    //         "type": "string",
    //         "required": true,
    //         "enum": [
    //           "TENANT_BACKUP",
    //           "INSPECTOR_TOOL"
    //         ]
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/ScheduledJob"
    //         }
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/scheduler/deleteJobs": {
    //   "delete": {
    //     "tags": [
    //       "scheduler"
    //     ],
    //     "summary": "Deletes jobs",
    //     "description": "",
    //     "operationId": "deleteJobs",
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "type": "string",
    //         "in": "query",
    //         "required": true
    //       },
    //       {
    //         "name": "jobId",
    //         "in": "body",
    //         "required": true,
    //         "schema": {
    //           "type": "array",
    //           "items": {
    //             "type": "string"
    //           }
    //         }
    //       },
    //       {
    //         "name": "jobType",
    //         "in": "query",
    //         "type": "string",
    //         "required": true,
    //         "enum": [
    //           "TENANT_BACKUP",
    //           "INSPECTOR_TOOL"
    //         ]
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "204": {
    //         "description": "No Content"
    //       },
    //       "404": {
    //         "description": "job not found"
    //       }
    //     }
    //   }
    // },
    // "/scheduler/editJob": {
    //   "post": {
    //     "tags": [
    //       "scheduler"
    //     ],
    //     "summary": "edit the configuration of an existing job",
    //     "description": "",
    //     "operationId": "editJob",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "type": "string",
    //         "in": "query",
    //         "required": true
    //       },
    //       {
    //         "name": "job",
    //         "in": "body",
    //         "description": "the updated details of the job including jobid, tenant name, etc..",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/ScheduledJob"
    //         }
    //       },
    //       {
    //         "name": "jobId",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "jobType",
    //         "in": "query",
    //         "type": "string",
    //         "required": true,
    //         "enum": [
    //           "TENANT_BACKUP",
    //           "INSPECTOR_TOOL"
    //         ]
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid resource properties",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "job not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Failed to update the job",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/scheduler/setJobStatus": {
    //   "post": {
    //     "tags": [
    //       "scheduler"
    //     ],
    //     "summary": "suspend the execution of a job",
    //     "description": "",
    //     "operationId": "setJobStatus",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "type": "string",
    //         "in": "query",
    //         "required": true
    //       },
    //       {
    //         "name": "jobId",
    //         "in": "query",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "isSuspend",
    //         "in": "query",
    //         "type": "boolean",
    //         "default": false,
    //         "required": true
    //       },
    //       {
    //         "name": "jobType",
    //         "in": "query",
    //         "type": "string",
    //         "required": true,
    //         "enum": [
    //           "TENANT_BACKUP",
    //           "INSPECTOR_TOOL"
    //         ]
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid resource properties",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "404": {
    //         "description": "job not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "500": {
    //         "description": "Failed to update the job",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/connectors/enableConnector": {
    //   "post": {
    //     "tags": [
    //       "connectors"
    //     ],
    //     "summary": "enable connector",
    //     "operationId": "enableConnector",
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "in": "query",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "connectorName",
    //         "in": "query",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "enableConnector",
    //         "in": "query",
    //         "type": "boolean",
    //         "required": true
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid properties were requested",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/clusters/{clusterName}/nodes/{nodeName}/services/{serviceName}/memoryDiag": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "serviceName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "get": {
    //     "tags": [
    //       "node",
    //       "service"
    //     ],
    //     "summary": "Get service memory diagnostics",
    //     "description": "",
    //     "operationId": "getMemoryDiag",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/ServiceDiag"
    //         }
    //       },
    //       "404": {
    //         "description": "Node not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/clusters/{clusterName}/nodes/": {
    //   "parameters": [
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "node"
    //     ],
    //     "summary": "Manage node",
    //     "description": "This endpoint is used to manage the node. The supported commands are\n  - start\n  - stop\n  - kill\n  - restart\n",
    //     "operationId": "manageNode",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "A list of node names alongside the management command",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid command",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/clusters/{clusterName}/nodes/{nodeName}/notebook/": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "notebook"
    //     ],
    //     "summary": "Manage notebook",
    //     "description": "This endpoint is used to manage the notebook. The supported commands are\n  - start\n  - stop\n  - kill\n  - restart\n",
    //     "operationId": "manageNotebook",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "A list of notebook names alongside the management command",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid command",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/clusters/{clusterName}/nodes/{nodeName}/services/": {
    //   "parameters": [
    //     {
    //       "name": "nodeName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     },
    //     {
    //       "name": "clusterName",
    //       "in": "path",
    //       "required": true,
    //       "type": "string"
    //     }
    //   ],
    //   "post": {
    //     "tags": [
    //       "service"
    //     ],
    //     "summary": "Manage one or more services",
    //     "description": "This endpoint is used to manage the nodes. The supported commands are\n  - start\n  - stop\n  - kill\n  - restart\n",
    //     "operationId": "manageServices",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "A list of node names alongside the management command",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "400": {
    //         "description": "Invalid command",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/test/schema": {
    //   "post": {
    //     "tags": [
    //       "test"
    //     ],
    //     "summary": "An endpoint to test db schema",
    //     "description": "Connect to the DB and retrieve info about the schema.",
    //     "operationId": "testSchema",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "schemaData",
    //         "in": "body",
    //         "description": "JDBC connection metadata",
    //         "required": true,
    //         "schema": {
    //           "type": "object",
    //           "required": [
    //             "type",
    //             "url",
    //             "username",
    //             "password"
    //           ],
    //           "properties": {
    //             "type": {
    //               "type": "string",
    //               "enum": [
    //                 "oracle",
    //                 "mysql",
    //                 "derby"
    //               ]
    //             },
    //             "url": {
    //               "type": "string"
    //             },
    //             "username": {
    //               "type": "string"
    //             },
    //             "password": {
    //               "type": "string"
    //             },
    //             "migrations_user": {
    //               "type": "string"
    //             },
    //             "migrations_pw": {
    //               "type": "string"
    //             }
    //           }
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/DbSchemaInfo"
    //         }
    //       },
    //       "502": {
    //         "description": "Connection failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/test/zookeeper": {
    //   "post": {
    //     "tags": [
    //       "test"
    //     ],
    //     "summary": "An endpoint for testing ZooKeeper connection",
    //     "operationId": "testZK",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "zkData",
    //         "in": "body",
    //         "description": "Connect to the ZK and retrieve info.",
    //         "required": true,
    //         "schema": {
    //           "type": "object",
    //           "required": [
    //             "connection"
    //           ],
    //           "properties": {
    //             "connection": {
    //               "type": "string"
    //             }
    //           }
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "502": {
    //         "description": "Connection failed"
    //       }
    //     }
    //   }
    // },
    // "/test/entityNameValidity": {
    //   "post": {
    //     "tags": [
    //       "test"
    //     ],
    //     "summary": "An endpoint for testing entity name validity",
    //     "operationId": "testEntityNameValidity",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "entityInfo",
    //         "in": "body",
    //         "description": "Entity Information",
    //         "required": true,
    //         "schema": {
    //           "type": "object",
    //           "required": [
    //             "entity_name",
    //             "entity_type"
    //           ],
    //           "properties": {
    //             "node_name": {
    //               "type": "string"
    //             },
    //             "cluster_name": {
    //               "type": "string"
    //             },
    //             "entity_name": {
    //               "type": "string"
    //             },
    //             "entity_type": {
    //               "type": "string",
    //               "enum": [
    //                 "NODE",
    //                 "CLUSTER",
    //                 "SERVICE",
    //                 "NOTEBOOK"
    //               ]
    //             }
    //           }
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "409": {
    //         "description": "Invalid Entity Name"
    //       }
    //     }
    //   }
    // },
    // "/test/email/{clusterName}": {
    //   "post": {
    //     "tags": [
    //       "test"
    //     ],
    //     "summary": "An endpoint for testing email sending",
    //     "operationId": "testSendingEmail",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "clusterName",
    //         "in": "path",
    //         "required": true,
    //         "type": "string"
    //       },
    //       {
    //         "name": "emailMessage",
    //         "in": "body",
    //         "description": "email message info",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/EmailMessageTest"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "409": {
    //         "description": "Invalid Cluster Name"
    //       }
    //     }
    //   }
    // },
    // "/local": {
    //   "get": {
    //     "tags": [
    //       "local"
    //     ],
    //     "summary": "Get Local Node Info",
    //     "description": "",
    //     "operationId": "getLocalNode",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "totalServiceUtilization",
    //         "in": "query",
    //         "description": "total services CPU utilization",
    //         "type": "integer"
    //       },
    //       {
    //         "name": "totalUsedMemory",
    //         "in": "query",
    //         "description": "total incorta memory used by services",
    //         "type": "integer"
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/LocalEnvironment"
    //         }
    //       },
    //       "404": {
    //         "description": "Not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   },
    //   "post": {
    //     "summary": "Configure Local Environment",
    //     "operationId": "configureLocalEnvironment",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "data",
    //         "in": "body",
    //         "description": "Local Environment metadata",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/LocalEnvironmentCreate"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "tags": [
    //       "local"
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK"
    //       },
    //       "default": {
    //         "description": "Unexpected Error",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/local/getCmcInfo": {
    //   "get": {
    //     "tags": [
    //       "local"
    //     ],
    //     "summary": "Get Cmc Info",
    //     "description": "",
    //     "operationId": "getCmcInfo",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/CmcInfo"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/local/availableDiskSpace": {
    //   "get": {
    //     "tags": [
    //       "local"
    //     ],
    //     "summary": "Get available disk space",
    //     "description": "",
    //     "operationId": "getAvailableDiskSpace",
    //     "produces": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "directoryPath",
    //         "in": "query",
    //         "description": "directory path to get it's available disk space.",
    //         "type": "string",
    //         "required": true
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "OK",
    //         "schema": {
    //           "$ref": "#/definitions/AvailableDiskSpace"
    //         }
    //       },
    //       "404": {
    //         "description": "Not found",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/zookeeper": {
    //   "post": {
    //     "tags": [
    //       "local"
    //     ],
    //     "summary": "manage local zookeeper",
    //     "description": "This endpoint is used to manage the local node zookeeper. The supported commands are\n  - start\n  - stop\n",
    //     "operationId": "manageZookeeper",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "command",
    //         "in": "body",
    //         "description": "The command to execute on the local zookeeper",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "400": {
    //         "description": "Invalid command"
    //       },
    //       "500": {
    //         "description": "Command execution failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/spark": {
    //   "post": {
    //     "tags": [
    //       "local"
    //     ],
    //     "summary": "manage local spark",
    //     "description": "This endpoint is used to manage the local node spark. The supported commands are\n  - start\n  - stop\n",
    //     "operationId": "manageSpark",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "command",
    //         "in": "body",
    //         "description": "The command to execute on the local spark",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "400": {
    //         "description": "Invalid command"
    //       },
    //       "500": {
    //         "description": "Command execution failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/database": {
    //   "post": {
    //     "tags": [
    //       "local"
    //     ],
    //     "summary": "manage local database",
    //     "description": "This endpoint is used to manage the local database. The supported commands are\n  - start\n  - stop\n",
    //     "operationId": "manageDatabase",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "command",
    //         "in": "body",
    //         "description": "The command to execute on the local database",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Command"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "400": {
    //         "description": "Invalid command"
    //       },
    //       "500": {
    //         "description": "Command execution failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // },
    // "/manage/rectify": {
    //   "post": {
    //     "tags": [
    //       "cluster"
    //     ],
    //     "summary": "execute rectification action",
    //     "description": "This endpoint is used to execute rectification actions\n",
    //     "operationId": "rectify",
    //     "consumes": [
    //       "application/json"
    //     ],
    //     "parameters": [
    //       {
    //         "name": "rectification",
    //         "in": "body",
    //         "description": "Rectification object",
    //         "required": true,
    //         "schema": {
    //           "$ref": "#/definitions/Rectification"
    //         }
    //       },
    //       {
    //         "name": "Authorization",
    //         "in": "header",
    //         "description": "Bearer token",            
    //         "type": "string"
    //       }
    //     ],
    //     "responses": {
    //       "200": {
    //         "description": "rectification success message",
    //         "schema": {
    //           "type": "string"
    //         }
    //       },
    //       "400": {
    //         "description": "Invalid rectification action"
    //       },
    //       "500": {
    //         "description": "rectification failed",
    //         "schema": {
    //           "$ref": "#/definitions/ApiError"
    //         }
    //       }
    //     }
    //   }
    // }
  },
  "definitions": {
    "Config": {
      "type": "object",
      "properties": {
        "configKey": {
          "type": "string"
        },
        "configValue": {
          "type": "string"
        }
      }
    },
    "LogFileMetadata": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "logType": {
          "type": "string"
        },
        "clusterName": {
          "type": "string"
        },
        "nodeName": {
          "type": "string"
        },
        "tenantName": {
          "type": "string"
        },
        "serviceName": {
          "type": "string"
        },
        "serviceType": {
          "type": "string"
        },
        "date": {
          "type": "string"
        },
        "size": {
          "type": "integer",
          "format": "int64"
        }
      }
    },
    "logSummaryMetadata": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "folderName": {
          "type": "string"
        },
        "clusterName": {
          "type": "string"
        },
        "fileSize": {
          "type": "string"
        },
        "fileTimeStamp": {
          "type": "string"
        }
      }
    },
    "AccessToken": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        },
        "expires_in": {
          "type": "integer"
        },
        "type": {
          "type": "string",
          "default": "bearer"
        }
      }
    },
    "CmcInfo": {
      "type": "object",
      "properties": {
        "java_version": {
          "type": "string"
        }
      }
    },
    "LocalEnvironment": {
      "type": "object",
      "properties": {
        "environmentStatus": {
          "type": "string",
          "enum": [
            "NOT_READY",
            "READY",
            "NA"
          ]
        },
        "physicalMemory": {
          "type": "string"
        },
        "analytics_default_memory": {
          "type": "integer"
        },
        "loader_default_memory": {
          "type": "integer"
        },
        "sparkWorkerMemory": {
          "type": "integer"
        },
        "sparkAppMemory": {
          "type": "integer"
        },
        "sparkAppCores": {
          "type": "integer"
        },
        "sparkAppExecuters": {
          "type": "integer"
        },
        "installation_path": {
          "type": "string"
        },
        "is_windows_os": {
          "type": "boolean"
        },
        "is_cloud_environment": {
          "type": "boolean"
        }
      }
    },
    "FieldProperties": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "string"
        },
        "currentValue": {
          "type": "string"
        },
        "dirtyValue": {
          "type": "string"
        },
        "dirty": {
          "type": "boolean"
        },
        "requiresRestart": {
          "type": "boolean"
        },
        "readOnly": {
          "type": "boolean",
          "default": false
        },
        "dependsOn": {
          "type": "string"
        },
        "displayOrder": {
          "type": "integer"
        },
        "defaultValue": {
          "type": "string"
        },
        "hasMinimum": {
          "type": "boolean"
        },
        "hasMaximum": {
          "type": "boolean"
        },
        "minimumValue": {
          "type": "integer"
        },
        "maximumValue": {
          "type": "integer"
        },
        "type": {
          "type": "string"
        },
        "helpMessage": {
          "type": "string"
        },
        "allowedValues": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },      
    },
    "CloudUserCreate": {
      "type": "object",
      "required": [
        "cloudUsername",
        "cloudPassword"
      ],
      "properties": {
        "cloudUsername": {
          "type": "string"
        },
        "cloudPassword": {
          "type": "string"
        }
      }
    },
    "NodeDiscoveryInfo": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "availability": {
          "type": "string",
          "enum": [
            "FREE",
            "RECOVERABLE",
            "FEDERATED"
          ]
        },
        "os": {
          "type": "string"
        },
        "physical_memory": {
          "type": "string"
        },
        "cluster_name": {
          "type": "string"
        },
        "node_type": {
          "type": "string",
          "enum": [
            "LOCAL",
            "HA",
            "WEB"
          ]
        },
        "node_services": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "node_notebook": {
          "type": "string"
        }
      },      
    },
    "TenantBrief": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "Tenant": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "path": {
          "type": "string"
        },
        "enabled": {
          "type": "boolean"
        },
        "diskSpace": {
          "$ref": "#/definitions/AvailableDiskSpace"
        }
      },
    },
    "TenantImport": {
      "type": "object",
      "required": [
        "dataFile",
        "name",
        "super_user",
        "super_password",
        "super_email",
        "path",
        "enable_sharing_notifications",
        "importMode",
        "skipSchedulerExecution"
      ],
      "properties": {
        "dataFile": {
          "type": "string"
        },
        "propertiesFile": {
          "type": "string"
        },
        "skipSchedulerExecution": {
          "type": "boolean",
          "default": false
        },
        "name": {
          "type": "string"
        },
        "super_user": {
          "type": "string"
        },
        "super_password": {
          "type": "string"
        },
        "super_email": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "sender_email": {
          "type": "string"
        },
        "sender_pw": {
          "type": "string"
        },
        "enable_username_authentication": {
          "type": "boolean",
          "default": false
        },
        "sender_username": {
          "type": "string"
        },
        "smtp_host": {
          "type": "string",
          "default": "smtp.gmail.com"
        },
        "smtp_port": {
          "type": "integer",
          "default": 465
        },
        "enable_sharing_notifications": {
          "type": "boolean",
          "default": false
        },
        "importMode": {
          "type": "string",
          "enum": [
            "CONSOLIDATED",
            "SEPARATE"
          ]
        }
      }
    },
    "TenantCreate": {
      "type": "object",
      "required": [
        "name",
        "super_user",
        "super_password",
        "super_email",
        "has_samples",
        "path"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "super_user": {
          "type": "string"
        },
        "super_password": {
          "type": "string"
        },
        "super_email": {
          "type": "string"
        },
        "has_samples": {
          "type": "boolean"
        },
        "path": {
          "type": "string"
        },
        "sender_email": {
          "type": "string"
        },
        "sender_pw": {
          "type": "string"
        },
        "enable_username_authentication": {
          "type": "boolean",
          "default": false
        },
        "sender_username": {
          "type": "string"
        },
        "smtp_host": {
          "type": "string",
          "default": "smtp.gmail.com"
        },
        "smtp_port": {
          "type": "integer",
          "default": 465
        },
        "enable_sharing_notifications": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "TenantRestore": {
      "type": "object",
      "required": [
        "name",
        "super_user",
        "super_password",
        "super_email",
        "path"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "super_user": {
          "type": "string"
        },
        "super_password": {
          "type": "string"
        },
        "super_email": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "sender_email": {
          "type": "string"
        },
        "sender_pw": {
          "type": "string"
        },
        "enable_username_authentication": {
          "type": "boolean",
          "default": false
        },
        "sender_username": {
          "type": "string"
        },
        "smtp_host": {
          "type": "string",
          "default": "smtp.gmail.com"
        },
        "smtp_port": {
          "type": "integer",
          "default": 465
        },
        "enable_sharing_notifications": {
          "type": "boolean",
          "default": false
        },
        "skipSchedulerExecution": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "TenantBackupProperties": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "super_user": {
          "type": "string"
        },
        "super_email": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "sender_email": {
          "type": "string"
        },
        "enable_username_authentication": {
          "type": "boolean",
          "default": false
        },
        "sender_username": {
          "type": "string"
        },
        "smtp_host": {
          "type": "string",
          "default": "smtp.gmail.com"
        },
        "smtp_port": {
          "type": "integer",
          "default": 465
        },
        "enable_sharing_notifications": {
          "type": "boolean",
          "default": false
        },
        "skipSchedulerExecution": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "TenantBackup": {
      "type": "object",
      "properties": {
        "tenantBackupId": {
          "type": "string"
        },
        "tenantName": {
          "type": "string"
        },
        "creationDate": {
          "type": "integer",
          "format": "int64"
        },
        "tenantBackupProperties": {
          "$ref": "#/definitions/TenantBackupProperties"
        }
      }
    },
    "TenantUpdate": {
      "type": "object",
      "properties": {
        "version": {
          "type": "integer",
          "format": "int64"
        },
        "path": {
          "type": "string"
        },
        "enabled": {
          "type": "boolean"
        }
      },      
    },
    "ServiceBrief": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "NotebookBrief": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "Notebook": {
      "type": "object",
      "properties": {
        "port": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "node_name": {
          "type": "string"
        },
        "version": {
          "type": "integer",
          "format": "int64"
        },
        "cluster_name": {
          "type": "string"
        },
        "node_version": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "notebook_handshake_status": {
          "type": "string",
          "enum": [
            "CMC_UPGRADE",
            "NODE_UPGRADE",
            "COMPATIBLE",
            "NODE_DOWN",
            "NOT_COMPATIBLE"
          ]
        },
        "status": {
          "type": "string",
          "enum": [
            "Stopped",
            "Started",
            "Error"
          ]
        }
      },      
    },
    "NotebookUpdate": {
      "type": "object",
      "required": [
        "version"
      ],
      "properties": {
        "version": {
          "type": "integer",
          "format": "int64"
        },
        "port": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "NotebookCreate": {
      "type": "object",
      "required": [
        "port",
        "name"
      ],
      "properties": {
        "port": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "Service": {
      "type": "object",
      "properties": {
        "node_name": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "version": {
          "type": "integer",
          "format": "int64"
        },
        "need_upgrade": {
          "type": "boolean"
        },
        "node_version": {
          "type": "string"
        },
        "status": {
          "type": "string",
          "enum": [
            "Starting",
            "Started",
            "Stopping",
            "Stopped",
            "Error",
            "Processing",
            "Not Responding",
            "Stopping Tenants",
            "Starting Tenants",
            "Terminated Unexpectedly",
            "N/A"
          ]
        },
        "cluster_name": {
          "type": "string"
        },
        "assigned_on_heap_memory": {
          "type": "integer",
          "format": "int64"
        },
        "assigned_off_heap_memory": {
          "type": "integer",
          "format": "int64"
        },
        "used_on_heap_memory": {
          "type": "integer",
          "format": "int64"
        },
        "used_off_heap_memory": {
          "type": "integer",
          "format": "int64"
        },
        "pooled_memory": {
          "type": "integer",
          "format": "int64"
        },
        "URL": {
          "type": "string"
        },
        "service_handshake_status": {
          "type": "string",
          "enum": [
            "CMC_UPGRADE",
            "NODE_UPGRADE",
            "COMPATIBLE",
            "NODE_DOWN",
            "NOT_COMPATIBLE"
          ]
        },
        "config": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/definitions/FieldProperties"
          }
        },
        "validation_message": {
          "$ref": "#/definitions/Rectification"
        }
      },      
    },
    "ServiceDiag": {
      "type": "object",
      "properties": {
        "html": {
          "type": "string"
        }
      }
    },
    "LocalEnvironmentCreate": {
      "type": "object",
      "required": [
        "cluster",
        "analytics",
        "loader",
        "notebook",
        "spark_mode"
      ],
      "properties": {
        "spark_mode": {
          "type": "string",
          "enum": [
            "none",
            "bundled",
            "external"
          ]
        },
        "spark_worker_memory": {
          "type": "integer"
        },
        "cluster": {
          "$ref": "#/definitions/ClusterCreate"
        },
        "analytics": {
          "$ref": "#/definitions/ServiceCreate"
        },
        "loader": {
          "$ref": "#/definitions/ServiceCreate"
        },
        "notebook": {
          "$ref": "#/definitions/NotebookCreate"
        }
      },      
    },
    "AvailableDiskSpace": {
      "type": "object",
      "required": [
        "diskSpace",
        "unit"
      ],
      "properties": {
        "diskSpace": {
          "type": "string"
        },
        "unit": {
          "type": "string"
        }
      }
    },
    "Node": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "version": {
          "type": "integer",
          "format": "int64"
        },
        "cluster_name": {
          "type": "string"
        },
        "node_version": {
          "type": "string"
        },
        "host": {
          "type": "string"
        },
        "agent_port": {
          "type": "integer"
        },
        "analytics_default_memory": {
          "type": "integer"
        },
        "loader_default_memory": {
          "type": "integer"
        },
        "status": {
          "type": "string",
          "enum": [
            "online",
            "offline"
          ]
        },
        "type": {
          "type": "string",
          "enum": [
            "LOCAL",
            "HA",
            "WEB"
          ]
        },
        "node_handshake_status": {
          "type": "string",
          "enum": [
            "CMC_UPGRADE",
            "NODE_UPGRADE",
            "COMPATIBLE",
            "NODE_DOWN",
            "NOT_COMPATIBLE"
          ]
        },
        "services": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Service"
          }
        },
        "notebook": {
          "$ref": "#/definitions/Notebook"
        },
        "config": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/definitions/FieldProperties"
          }
        }
      },      
    },
    "ServiceCreate": {
      "type": "object",
      "required": [
        "name",
        "type",
        "server_port",
        "http_port",
        "http_redirect_port",
        "ajp_port",
        "ajp_redirect_port",
        "enable_https",
        "memory_size",
        "cores_utilization"
      ],
      "properties": {
        "name": {
          "type": "string"
        },
        "type": {
          "type": "string",
          "enum": [
            "ANALYTICS",
            "LOADER"
          ]
        },
        "server_port": {
          "type": "integer",
          "default": 8005
        },
        "http_port": {
          "type": "integer",
          "default": 8080
        },
        "http_redirect_port": {
          "type": "integer",
          "default": 8443
        },
        "ajp_port": {
          "type": "integer",
          "default": 8009
        },
        "ajp_redirect_port": {
          "type": "integer",
          "default": 8443
        },
        "enable_https": {
          "type": "boolean",
          "default": false
        },
        "memory_size": {
          "type": "integer"
        },
        "cores_utilization": {
          "type": "integer"
        }
      }
    },
    "NodeCreate": {
      "type": "object",
      "required": [
        "host",
        "agent_port",
        "cluster_name"
      ],
      "properties": {
        "host": {
          "type": "string"
        },
        "agent_port": {
          "type": "integer"
        },
        "cluster_name": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "ServiceUpdate": {
      "type": "object",
      "required": [
        "version"
      ],
      "properties": {
        "version": {
          "type": "integer",
          "format": "int64",
          "minimum": 0
        },
        "name": {
          "type": "string"
        },
        "config": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      },
      "minProperties": 2
    },
    "NodeUpdate": {
      "type": "object",
      "required": [
        "version"
      ],
      "properties": {
        "version": {
          "type": "integer",
          "format": "int64",
          "minimum": 0
        },
        "agent_port": {
          "type": "integer"
        },
        "host": {
          "type": "string"
        },
        "publichost": {
          "type": "string"
        }
      }
    },
    "ClusterBase": {
      "type": "object",
      "required": [
        "zookeeper",
        "7mada"
      ],
      "properties": {
        "7mada": {
          "type": "string"
        },
        "auto_start_services": {
          "type": "string",
          "enum": [
            "Enabled",
            "Disabled",
            "ForceDisabled"
          ]
        },
        "admin_alerts": {
          "type": "string",
          "enum": [
            "Enabled",
            "Disabled",
            "ForceDisabled"
          ]
        },
        "zookeeper": {
          "type": "string"
        },
        "enable_spark": {
          "type": "boolean",
          "default": false
        },
        "spark_master": {
          "type": "string"
        },
        "spark_app_memory": {
          "type": "integer"
        },
        "spark_app_cores": {
          "type": "integer"
        },
        "spark_app_executers": {
          "type": "integer"
        },
        "spark_ds_port": {
          "type": "integer"
        },
        "db_type": {
          "type": "string",
          "enum": [
            "oracle",
            "mysql",
            "derby"
          ]
        },
        "db_accounts": {
          "type": "string",
          "enum": [
            "standard",
            "separate"
          ],
          "default": "standard"
        },
        "db_connection": {
          "type": "string"
        },
        "db_user": {
          "type": "string"
        },
        "db_pw": {
          "type": "string"
        },
        "migrations_user": {
          "type": "string"
        },
        "migrations_pw": {
          "type": "string"
        },
        "admin_email": {
          "type": "string"
        },
        "path": {
          "type": "string"
        },
        "config": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      }
    },
    "NodeBrief": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "servicesList": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ServiceBrief"
          }
        },
        "notebook": {
          "$ref": "#/definitions/NotebookBrief"
        }
      }
    },
    "ClusterBrief": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "nodes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NodeBrief"
          }
        },
        "tenants": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TenantBrief"
          }
        }
      }
    },
    "Cluster": {
      "allOf": [
        {
          "$ref": "#/definitions/ClusterBase"
        },
        {
          "type": "object",
          "properties": {
            "has_notebook": {
              "type": "boolean",
              "default": false
            },
            "need_upgrade": {
              "type": "boolean"
            },
            "version": {
              "type": "integer",
              "format": "int64"
            },
            "name": {
              "type": "string"
            },
            "nodes": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Node"
              }
            },
            "connectors": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Connector"
              }
            },
            "tenants": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Tenant"
              }
            },
            "validation_message": {
              "$ref": "#/definitions/Rectification"
            },
            "notebook_status": {
              "type": "string",
              "enum": [
                "Started",
                "Stopped",
                "Starting",
                "Stopping",
                "N/A"
              ]
            },
            "analytics_status": {
              "type": "string",
              "enum": [
                "Starting",
                "Started",
                "Stopping",
                "Stopped",
                "Error",
                "Processing",
                "Not Responding",
                "Stopping Tenants",
                "Starting Tenants",
                "Terminated Unexpectedly",
                "N/A"
              ]
            },
            "loader_status": {
              "type": "string",
              "enum": [
                "Starting",
                "Started",
                "Stopping",
                "Stopped",
                "Error",
                "Processing",
                "Not Responding",
                "Stopping Tenants",
                "Starting Tenants",
                "Terminated Unexpectedly",
                "N/A"
              ]
            },
            "zookeeper_mode": {
              "type": "string",
              "enum": [
                "Bundled",
                "External"
              ]
            },
            "zookeeper_status": {
              "type": "string",
              "enum": [
                "Started",
                "Stopped"
              ],
              "default": "Stopped"
            },
            "spark_status": {
              "type": "string",
              "enum": [
                "Started",
                "Stopped",
                "Not Configured"
              ],
              "default": "Stopped"
            },
            "db_status": {
              "type": "string",
              "enum": [
                "Started",
                "Stopped"
              ],
              "default": "Stopped"
            },
            "spark_mode": {
              "type": "string",
              "enum": [
                "None",
                "Bundled",
                "External"
              ]
            },
            "base_url": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "LOCAL",
                "CUSTOM"
              ]
            },
            "singleTenant": {
              "type": "boolean",
              "default": true
            }
          }
        }
      ],      
    },
    "ClusterCreate": {
      "allOf": [
        {
          "$ref": "#/definitions/ClusterBase"
        },
        {
          "type": "object",
          "required": [
            "zookeeper",
            "db_type",
            "db_connection",
            "db_user",
            "db_pw",
            "name",
            "admin_email",
            "path",
            "enable_spark"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "devCluster",
              "minLength": 3
            },
            "type": {
              "type": "string",
              "enum": [
                "LOCAL",
                "CUSTOM"
              ]
            }
          }
        }
      ]
    },
    "ClusterUpdate": {
      "allOf": [
        {
          "$ref": "#/definitions/ClusterBase"
        },
        {
          "type": "object",
          "required": [
            "version"
          ],
          "properties": {
            "version": {
              "type": "integer",
              "format": "int64",
              "minimum": 0
            }
          }
        }
      ],
      "minProperties": 2
    },
    "Command": {
      "type": "object",
      "required": [
        "names",
        "action"
      ],
      "properties": {
        "names": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true
        },
        "action": {
          "type": "string",
          "enum": [
            "start",
            "stop",
            "kill",
            "restart"
          ]
        },
        "props": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      }
    },
    "DbSchemaInfo": {
      "type": "object",
      "required": [
        "empty"
      ],
      "properties": {
        "empty": {
          "type": "boolean"
        }
      }
    },
    "ApiError": {
      "type": "object",
      "required": [
        "type",
        "code",
        "message"
      ],
      "properties": {
        "type": {
          "type": "integer"
        },
        "code": {
          "type": "integer"
        },
        "message": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "stacktrace": {
          "type": "string"
        },
        "help": {
          "type": "string"
        }
      }
    },
    "EmailMessageTest": {
      "type": "object",
      "required": [
        "subject",
        "body",
        "to",
        "cc",
        "bcc"
      ],
      "properties": {
        "subject": {
          "type": "string"
        },
        "body": {
          "type": "string"
        },
        "to": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "cc": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "bcc": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "Rectification": {
      "type": "object",
      "required": [
        "message",
        "id"
      ],
      "properties": {
        "message": {
          "type": "string"
        },
        "id": {
          "type": "integer",
          "format": "int64",
          "minimum": 1
        },
        "actionName": {
          "type": "string"
        },
        "rectificationAction": {
          "$ref": "#/definitions/Command"
        }
      }
    },
    "TriggerDetails": {
      "type": "object",
      "properties": {
        "frequency": {
          "type": "string"
        },
        "startTime": {
          "type": "integer",
          "format": "int64"
        },
        "endTime": {
          "type": "integer",
          "format": "int64"
        },
        "timezone": {
          "type": "string"
        },
        "dayOfMonth": {
          "type": "integer"
        },
        "month": {
          "type": "integer"
        },
        "minute": {
          "type": "integer"
        },
        "weekDays": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "hours": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "dayOfWeek": {
          "type": "string"
        },
        "nth": {
          "type": "integer"
        },
        "interval": {
          "type": "integer"
        }
      }
    },
    "ScheduleDetails": {
      "type": "object",
      "properties": {
        "nextFireDate": {
          "type": "integer",
          "format": "int64"
        },
        "triggerDetails": {
          "$ref": "#/definitions/TriggerDetails"
        }
      }
    },
    "ScheduledJob": {
      "type": "object",
      "properties": {
        "jobId": {
          "type": "string"
        },
        "jobName": {
          "type": "string"
        },
        "tenantName": {
          "type": "string"
        },
        "numberOfBackups": {
          "type": "integer"
        },
        "status": {
          "type": "string",
          "enum": [
            "Active",
            "Suspended",
            "Completed"
          ]
        },
        "scheduleDetails": {
          "$ref": "#/definitions/ScheduleDetails"
        },
        "lastRun": {
          "$ref": "#/definitions/LastRun"
        }
      }
    },
    "LastRun": {
      "type": "object",
      "properties": {
        "Date": {
          "type": "integer",
          "format": "int64"
        },
        "Message": {
          "type": "string"
        },
        "Status": {
          "type": "boolean"
        }
      }
    },
    "UpdateConfigResponse": {
      "type": "object",
      "properties": {
        "config_string": {
          "type": "string"
        },
        "rectification": {
          "$ref": "#/definitions/Rectification"
        }
      }
    },
    "Connector": {
      "type": "object",
      "properties": {
        "connectorName": {
          "type": "string"
        },
        "connectorEnabled": {
          "type": "boolean",
          "default": false
        }
      }
    },
    "ClusterCharts": {
      "type": "object",
      "properties": {
        "server_timezone": {
          "type": "string"
        },
        "dimension": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int64"
          }
        },
        "groups": {
          "$ref": "#/definitions/ChartGroup"
        }
      }
    },
    "ChartGroup": {
      "type": "object",
      "properties": {
        "infrastructure": {
          "$ref": "#/definitions/InfrastructureCharts"
        },
        "nodes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/NodeCharts"
          }
        },
        "tenants": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/TenantCharts"
          }
        }
      }
    },
    "InfrastructureCharts": {
      "type": "object",
      "properties": {
        "db_state": {
          "$ref": "#/definitions/ChartArea"
        },
        "zookeeper_state": {
          "$ref": "#/definitions/ChartArea"
        },
        "spark_state": {
          "$ref": "#/definitions/ChartArea"
        },
        "notebook_state": {
          "$ref": "#/definitions/ChartArea"
        }
      }
    },
    "NodeCharts": {
      "type": "object",
      "properties": {
        "nodeName": {
          "type": "string"
        },
        "actions": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ClusterAction"
            }
          }
        },
        "charts": {
          "type": "object",
          "properties": {
            "used_disk": {
              "$ref": "#/definitions/ChartArea"
            },
            "cpu": {
              "$ref": "#/definitions/ChartArea"
            },
            "ram": {
              "$ref": "#/definitions/ChartArea"
            }
          }
        },
        "services": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ServiceCharts"
          }
        }
      }
    },
    "ServiceCharts": {
      "type": "object",
      "properties": {
        "serviceName": {
          "type": "string"
        },
        "actions": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ClusterAction"
            }
          }
        },
        "charts": {
          "type": "object",
          "properties": {
            "state": {
              "$ref": "#/definitions/ChartArea"
            },
            "memory": {
              "$ref": "#/definitions/ChartArea"
            },
            "processMemory": {
              "$ref": "#/definitions/ChartArea"
            },
            "cpu": {
              "$ref": "#/definitions/ChartArea"
            },
            "activeSessions": {
              "$ref": "#/definitions/ChartArea"
            }
          }
        }
      }
    },
    "TenantCharts": {
      "type": "object",
      "properties": {
        "tenantName": {
          "type": "string"
        },
        "used_disk": {
          "$ref": "#/definitions/ChartArea"
        },
        "queued_jobs": {
          "$ref": "#/definitions/ChartArea"
        },
        "running_jobs": {
          "$ref": "#/definitions/ChartArea"
        }
      }
    },
    "ClusterAction": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "start": {
          "type": "integer",
          "format": "int64"
        },
        "end": {
          "type": "integer",
          "format": "int64"
        },
        "status_color": {
          "type": "string"
        },
        "color": {
          "type": "string"
        },
        "desc": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "ChartArea": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "actions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "data": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Series"
          }
        }
      }
    },
    "Series": {
      "type": "object",
      "required": [
        "values"
      ],
      "properties": {
        "series_type": {
          "type": "string",
          "enum": [
            "line",
            "status"
          ]
        },
        "color": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "unit": {
          "type": "string",
          "enum": [
            "bytes",
            "percentage"
          ]
        },
        "mapping": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "color": {
                "type": "string"
              }
            }
          }
        },
        "values": {
          "type": "array",
          "items": {
            "type": "number",
            "format": "double"
          }
        },
        "tooltips": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "current": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      }
    }
  }
} as Spec