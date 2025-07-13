// TODO change this file, this way of recovering is bad 
export default {
    rules: {
        "textDocument/diagnostic": ["example-rule"],
        "textDocument/completion": ["example-rule"],
        "textDocument/codeAction": ["example-rule"],
        "textDocument/didOpen": ["example-rule"],
        "textDocument/didChange": ["example-rule"],
        "textDocument/formatting": ["example-rule"],
        "initialize": []
    },
    plugins: {
        "textDocument/diagnostic": ["property-needs-prefix-plugin", "property-definition-needs-prefix-plugin"],
        "textDocument/completion": ["property-needs-prefix-plugin"],
        "textDocument/codeAction": ["property-needs-prefix-plugin"],
        "textDocument/didOpen": ["property-needs-prefix-plugin"],
        "textDocument/didChange": ["property-needs-prefix-plugin"],
        "textDocument/formatting": ["property-needs-prefix-plugin"],
        "initialize": []
    }
};
