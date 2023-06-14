module.exports = {
  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        project: './tsconfig.jest.json',
      },
    },
  ],
};
