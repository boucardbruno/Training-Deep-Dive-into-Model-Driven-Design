import fs from "fs";
import path from "path";

export const findStubDirectory = () => {
  const pathSegments = [__dirname];
  let currentPath = "./Stubs";
  while (!fs.existsSync(currentPath)) {
    pathSegments.push("../");
    currentPath = path.resolve(...pathSegments, "Stubs");
  }
  return currentPath;
};
