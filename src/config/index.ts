type Config = {
  DEVELOPMENT: boolean;
  PRODUCTION: boolean;
};

declare const CONFIG: Config;

const _CONFIG = CONFIG;

export { _CONFIG as CONFIG };
