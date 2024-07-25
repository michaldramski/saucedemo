import wp from '@cypress/webpack-preprocessor';
require('cypress-grep');

export default (on) => {
    const options = {
        webpackOptions: {
            resolve: {
                extensions: ['.ts', '.js'],
            },
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'ts-loader',
                            },
                        ],
                    },
                ],
            },
        },
    };
    on('file:preprocessor', wp(options));
};
