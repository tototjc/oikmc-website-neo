import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: [
    postcssPresetEnv({
      env: 'development',
      debug: true,
      features: {
        'nesting-rules': [
          'auto',
          {
            edition: '2024-02',
          },
        ],
      },
    }),
  ],
}
