const erc20Json = {
  "contractName": "ERC20",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "who",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.18;\n\nimport \"./ERC20Basic.sol\";\n\n\n/**\n * @title ERC20 interface\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 is ERC20Basic {\n  function allowance(address owner, address spender) public view returns (uint256);\n  function transferFrom(address from, address to, uint256 value) public returns (bool);\n  function approve(address spender, uint256 value) public returns (bool);\n  event Approval(address indexed owner, address indexed spender, uint256 value);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
  "ast": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        5811
      ]
    },
    "id": 5812,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5770,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".18"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:22"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 5771,
        "nodeType": "ImportDirective",
        "scope": 5812,
        "sourceUnit": 5844,
        "src": "26:26:22",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5772,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5843,
              "src": "162:10:22",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$5843",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 5773,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:22"
          }
        ],
        "contractDependencies": [
          5843
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 5811,
        "linearizedBaseContracts": [
          5811,
          5843
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5782,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5778,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5775,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5782,
                  "src": "196:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5774,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5777,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5782,
                  "src": "211:15:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5776,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 5781,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5780,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5782,
                  "src": "249:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5779,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:9:22"
            },
            "scope": 5811,
            "src": "177:81:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5793,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5789,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5784,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "283:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5783,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5786,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "297:10:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5785,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "297:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5788,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "309:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5787,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "309:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:41:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 5792,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5791,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "340:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5790,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "340:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "339:6:22"
            },
            "scope": 5811,
            "src": "261:85:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5802,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5798,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5795,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5802,
                  "src": "366:15:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5794,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "366:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5797,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5802,
                  "src": "383:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5796,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "383:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "365:32:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 5801,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5800,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5802,
                  "src": "414:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5799,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "414:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "413:6:22"
            },
            "scope": 5811,
            "src": "349:71:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5810,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5804,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5810,
                  "src": "438:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5803,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "438:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5806,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5810,
                  "src": "461:23:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5805,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "461:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5808,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5810,
                  "src": "486:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5807,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "486:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "437:63:22"
            },
            "src": "423:78:22"
          }
        ],
        "scope": 5812,
        "src": "144:359:22"
      }
    ],
    "src": "0:504:22"
  },
  "legacyAST": {
    "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20.sol",
    "exportedSymbols": {
      "ERC20": [
        5811
      ]
    },
    "id": 5812,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5770,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".18"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:22"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol",
        "file": "./ERC20Basic.sol",
        "id": 5771,
        "nodeType": "ImportDirective",
        "scope": 5812,
        "sourceUnit": 5844,
        "src": "26:26:22",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5772,
              "name": "ERC20Basic",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5843,
              "src": "162:10:22",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ERC20Basic_$5843",
                "typeString": "contract ERC20Basic"
              }
            },
            "id": 5773,
            "nodeType": "InheritanceSpecifier",
            "src": "162:10:22"
          }
        ],
        "contractDependencies": [
          5843
        ],
        "contractKind": "contract",
        "documentation": "@title ERC20 interface\n@dev see https://github.com/ethereum/EIPs/issues/20",
        "fullyImplemented": false,
        "id": 5811,
        "linearizedBaseContracts": [
          5811,
          5843
        ],
        "name": "ERC20",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": null,
            "documentation": null,
            "id": 5782,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "allowance",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5778,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5775,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5782,
                  "src": "196:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5774,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "196:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5777,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5782,
                  "src": "211:15:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5776,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "211:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "195:32:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 5781,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5780,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5782,
                  "src": "249:7:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5779,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "249:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "248:9:22"
            },
            "scope": 5811,
            "src": "177:81:22",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5793,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "transferFrom",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5789,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5784,
                  "name": "from",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "283:12:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5783,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "283:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5786,
                  "name": "to",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "297:10:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5785,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "297:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5788,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "309:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5787,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "309:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "282:41:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 5792,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5791,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5793,
                  "src": "340:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5790,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "340:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "339:6:22"
            },
            "scope": 5811,
            "src": "261:85:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": null,
            "documentation": null,
            "id": 5802,
            "implemented": false,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "approve",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5798,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5795,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5802,
                  "src": "366:15:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5794,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "366:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5797,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5802,
                  "src": "383:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5796,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "383:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "365:32:22"
            },
            "payable": false,
            "returnParameters": {
              "id": 5801,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5800,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5802,
                  "src": "414:4:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5799,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "414:4:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "413:6:22"
            },
            "scope": 5811,
            "src": "349:71:22",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5810,
            "name": "Approval",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5809,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5804,
                  "indexed": true,
                  "name": "owner",
                  "nodeType": "VariableDeclaration",
                  "scope": 5810,
                  "src": "438:21:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5803,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "438:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5806,
                  "indexed": true,
                  "name": "spender",
                  "nodeType": "VariableDeclaration",
                  "scope": 5810,
                  "src": "461:23:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5805,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "461:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5808,
                  "indexed": false,
                  "name": "value",
                  "nodeType": "VariableDeclaration",
                  "scope": 5810,
                  "src": "486:13:22",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5807,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "486:7:22",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "437:63:22"
            },
            "src": "423:78:22"
          }
        ],
        "scope": 5812,
        "src": "144:359:22"
      }
    ],
    "src": "0:504:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.23+commit.124ca40d.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-06-05T21:24:56.601Z"
}

module.exports = erc20Json