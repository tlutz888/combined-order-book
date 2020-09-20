module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parserOptions: {
    project: ['./tsconfig.client.json', './tsconfig.server.json', 
    // './src/types/**'
  ],
  },
};
