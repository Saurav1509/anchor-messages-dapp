/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anchor_user_message.json`.
 */
export type AnchorUserMessage = {
  "address": "BLMmDFCJ9GGATDR92GFS7VPbRHiedwy35PFtuaTKwVB8",
  "metadata": {
    "name": "anchorUserMessage",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addUserMessage",
      "discriminator": [
        247,
        97,
        72,
        111,
        130,
        192,
        115,
        179
      ],
      "accounts": [
        {
          "name": "userMessage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "name"
              },
              {
                "kind": "account",
                "path": "initializer"
              }
            ]
          }
        },
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteUserMessage",
      "discriminator": [
        191,
        211,
        200,
        247,
        249,
        29,
        120,
        167
      ],
      "accounts": [
        {
          "name": "userMessage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "name"
              },
              {
                "kind": "account",
                "path": "initializer"
              }
            ]
          }
        },
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateUserMessage",
      "discriminator": [
        139,
        51,
        230,
        127,
        243,
        150,
        69,
        101
      ],
      "accounts": [
        {
          "name": "userMessage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "name"
              },
              {
                "kind": "account",
                "path": "initializer"
              }
            ]
          }
        },
        {
          "name": "initializer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userMessageState",
      "discriminator": [
        123,
        0,
        67,
        151,
        92,
        126,
        94,
        193
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameTooLong",
      "msg": "User name too long"
    },
    {
      "code": 6001,
      "name": "messageTooLong",
      "msg": "User Message too long"
    }
  ],
  "types": [
    {
      "name": "userMessageState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    }
  ]
};
