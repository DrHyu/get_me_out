module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-unresolved": [2, { ignore: ["next/.*"] }],
    "operator-linebreak": ["error", "after"],
    "comma-dangle": ["error", "only-multiline"],
    "react/jsx-props-no-spreading": "off",
    "implicit-arrow-linebreak": ["off", "below"],
  },
  globals: {
    React: "writable",
  },
};
