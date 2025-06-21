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
        "textDocument/diagnostic": ["example-plugin"],
        "textDocument/completion": ["example-plugin"],
        "textDocument/codeAction": ["example-plugin"],
        "textDocument/didOpen": ["example-plugin"],
        "textDocument/didChange": ["example-plugin"],
        "textDocument/formatting": ["example-plugin"],
        "initialize": []
    }
};
