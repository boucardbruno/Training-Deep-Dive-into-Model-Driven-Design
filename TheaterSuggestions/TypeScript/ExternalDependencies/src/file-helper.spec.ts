import fs from "fs";
import { findStubDirectory } from "./file-helper";

describe("File helper", () => {
  it("should find json stub directory", () => {
    const directory = findStubDirectory();
    expect(fs.existsSync(`${directory}/AuditoriumLayouts`)).toBeTruthy();
  });
});
