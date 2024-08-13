module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/prefer-as-const": "warn", // Warning de la regla que requiere const en lugar de type assertion
    "@typescript-eslint/no-unused-vars": "warn", // Warning de la regla que indica variables no usadas
    "no-extra-semi": "warn", // Warning de la regla que prohíbe los puntos y comas innecesarios
  },
};
