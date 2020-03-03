module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: [
    "prettier",
    '@typescript-eslint'
  ],
  rules: {
    camelcase: "off", // turn camelcase check off because of api responses
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-array-constructor": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-dupe-class-members": "off",
    "no-prototype-builtins": "off",
  }
}
