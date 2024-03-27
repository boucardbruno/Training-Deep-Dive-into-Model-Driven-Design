import fs from "fs";
import path from "path";
import { findStubDirectory } from "./file-helper";

// TODO naming Number?
// TODO Category or category?

export type CorridorDto = {
  Number: number;
  InvolvedRowNames: string[]; // TODO readonly or not ?
};
export type SeatDto = {
  Name: string;
  Category: number;
};
export type AuditoriumDto = {
  Rows: Record<string, readonly SeatDto[]>;
  Corridors: CorridorDto[];
};

export class AuditoriumLayoutRepository {
  constructor(private memoryStorage: Record<string, AuditoriumDto> = {}) {
    const stubDirectory = findStubDirectory();
    const auditoriumDirectory = path.resolve(
      stubDirectory,
      "AuditoriumLayouts"
    );
    const jsonFileNames = fs.readdirSync(auditoriumDirectory);
    jsonFileNames
      .filter((fileName) => fileName.endsWith("_theater.json"))
      .forEach((fileName) => {
        const filePath = path.resolve(
          stubDirectory,
          "AuditoriumLayouts",
          fileName
        );
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const id = fileName.split("-")[0];
        memoryStorage[id] = JSON.parse(rawContent);
      });
  }

  // TODO showId?
  // TODO sync method?
  getAuditoriumLayoutFor = (id: string): AuditoriumDto =>
    this.memoryStorage[id] || { Rows: [], Corridors: [] };
}
