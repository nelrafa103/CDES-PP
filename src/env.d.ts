interface ImportMetaEnv {
  readonly PUBLIC_STRAPI_KEY: string;
  readonly PUBLIC_STRAPI_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}