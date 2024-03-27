import {
  AuditoriumLayoutRepository,
  ReservationsProvider,
} from "external-dependencies";
import { AuditoriumSeatingAdapter } from "./auditorium-seating-adapter";
import { PricingCategory } from "./pricing-category";
import { Seat } from "./seat";
import { SeatAvailability } from "./seat-availability";

describe("Seat", () => {
  it("should be a value type", () => {

    const firstInstance = new Seat(
      "A",
      1,
      PricingCategory.Second,
      SeatAvailability.Available
    );
    const secondInstance = new Seat(
      "A",
      1,
      PricingCategory.Second,
      SeatAvailability.Available
    );

    // Two different instances with same values should be equals
    // TODO is test supposed to fail here ?
    expect(JSON.stringify(secondInstance)).toEqual(JSON.stringify(firstInstance));

    // Should not mutate existing instance
    secondInstance.allocate();
    expect(JSON.stringify(secondInstance)).toEqual(JSON.stringify(firstInstance));
  });
});
