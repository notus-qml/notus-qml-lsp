/** @type {import('../types/rule').Rules} */
module.exports = {
    handlers: {
        'no-identification': {
            create: (context: any) => ({
                VariableDeclaration: (node: any) => {
                    context.log(`Visiting node: ${node.name}`);
                    if (node.name === 'exampleVar') {
                        context.report({
                            message: 'Id no identification',
                            node,
                        });
                    }
                }
            })
        }
    }
};
