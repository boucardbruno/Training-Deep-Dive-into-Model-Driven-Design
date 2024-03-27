import {
  AuditoriumLayoutRepository,
  ReservationsProvider,
} from "external-dependencies";
import { AuditoriumSeatingAdapter } from "./auditorium-seating-adapter";

describe("Auditorium seating", () => {
  it("should be a value type", () => {
    const auditoriumLayoutAdapter = new AuditoriumSeatingAdapter(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );
    const showIdWithoutReservationYet = "18";
    const auditoriumSeatingFirstInstance =
      auditoriumLayoutAdapter.getAuditoriumSeating(showIdWithoutReservationYet);
    const auditoriumSeatingSecondInstance =
      auditoriumLayoutAdapter.getAuditoriumSeating(showIdWithoutReservationYet);

    // Two different instances with same values should be equals
    expect(JSON.stringify(auditoriumSeatingSecondInstance)).toEqual(
      JSON.stringify(auditoriumSeatingFirstInstance)
    );

    // Should not mutate existing instance
    Object.values(auditoriumSeatingSecondInstance.rows)[0].seats[0].allocate();
    expect(JSON.stringify(auditoriumSeatingSecondInstance)).toEqual(
      JSON.stringify(auditoriumSeatingFirstInstance)
    );
  });
});
