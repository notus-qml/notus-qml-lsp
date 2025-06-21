const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
    baseUrl: './build',
    paths: {
        '@/*': ['./src/*']
    }
});

require('./build/index.js');
