import nextVitals from "eslint-config-next/core-web-vitals.js";

const config = [
  ...nextVitals,
  {
    rules: {
      "@next/next/no-img-element": "off"
    }
  }
];

export default config;
