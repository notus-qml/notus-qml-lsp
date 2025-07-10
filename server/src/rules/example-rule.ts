/** @type {import('../types/rule').Rules} */
module.exports = {
    handlers: {
        'no-identification': {
            create: (context: any) => ({
                ui_property: (node: any) => {
                    context.log(`Visiting node: ${node.type}`);
                    if (node.type === 'exampleVar') {
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
