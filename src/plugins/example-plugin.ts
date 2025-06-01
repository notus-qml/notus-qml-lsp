/** @type {import('../types/plugin').Plugin} */
module.exports = {
    handlers: {
        'no-var': {
            create: (context: any) => ({
                VariableDeclaration: (node: any) => {
                    context.log(`Visiting node: ${node.name}`);
                    if (node.name === 'exampleVar') {
                        context.report({
                            message: 'Avoid using "var" error',
                            node,
                        });
                    }
                }
            })
        }
    }
};
