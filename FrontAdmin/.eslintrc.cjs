module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    /* "prettier/prettier": "warn",  */// Se muestra los errores de Prettier como warnings
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-extra-semi": "warn",
    "no-mixed-spaces-and-tabs": "warn",
  },
};
