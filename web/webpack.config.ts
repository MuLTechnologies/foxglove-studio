// SPDX-License-Identifier: MPL-2.0

import path from "path";
import { Configuration, DefinePlugin } from 'webpack';

import {
  ConfigParams,
  devServerConfig,
  mainConfig,
} from "@lichtblick/suite-web/src/webpackConfigs";
import packageJson from "../package.json";

const params: ConfigParams = {
  outputPath: path.resolve(__dirname, ".webpack"),
  contextPath: path.resolve(__dirname, "src"),
  entrypoint: "./entrypoint.tsx",
  prodSourceMap: "source-map",
  version: packageJson.version,
};

const defineEnvVars = new DefinePlugin({
  'process.env.IS_IMMUTABLE': JSON.stringify(process.env.IS_IMMUTABLE)
});

// Set the build arg IS_IMMUTABLE
function getConfigurations(env: unknown, argv: any): [Configuration, Configuration] {
  // Obtain the configurations from the imported functions
  const devServerCfg: Configuration = devServerConfig(params);
  const mainCfg: Configuration = mainConfig(params)(env, argv);

  // Ensure plugins arrays are properly initialized
  devServerCfg.plugins = (devServerCfg.plugins || []).concat(defineEnvVars);
  mainCfg.plugins = (mainCfg.plugins || []).concat(defineEnvVars);

  return [devServerCfg, mainCfg];
}

export default getConfigurations;
