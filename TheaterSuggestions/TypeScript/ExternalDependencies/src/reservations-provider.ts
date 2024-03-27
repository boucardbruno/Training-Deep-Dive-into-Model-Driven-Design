export type ReservedSeatsDto = {
  ReservedSeats: readonly string[];
};
import fs from "fs";
import path from "path";
import { findStubDirectory } from "./file-helper";

export class ReservationsProvider {
  constructor(private memoryStorage: Record<string, ReservedSeatsDto> = {}) {
    const stubDirectory = findStubDirectory();
    const auditoriumDirectory = path.resolve(
      stubDirectory,
      "AuditoriumLayouts"
    );
    const jsonFileNames = fs.readdirSync(auditoriumDirectory);
    jsonFileNames
      .filter((fileName) => fileName.endsWith("_booked_seats.json"))
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
  // TODO GetReservedSeats or getReservedSeats
  getReservedSeats = (id: string): ReservedSeatsDto =>
    this.memoryStorage[id] || { ReservedSeats: [] };
}
