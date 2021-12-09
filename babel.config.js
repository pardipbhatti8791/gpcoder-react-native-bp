const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
    [
        'module-resolver',
        {
            root: ['./src'],
            extensions: [
                '.ios.js',
                '.android.js',
                '.js',
                '.ts',
                '.tsx',
                '.json',
            ],
            alias: {
                'tests': ['./tests/'],
                '@root': './src',
            },
        },
    ],
    'react-native-reanimated/plugin',
];

module.exports = { presets, plugins };
