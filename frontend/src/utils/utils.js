import path from "path";
import getConfig from "next/config";

export const serverPath = (staticFilePath) =>
  path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath);

export const otherExport = {};
