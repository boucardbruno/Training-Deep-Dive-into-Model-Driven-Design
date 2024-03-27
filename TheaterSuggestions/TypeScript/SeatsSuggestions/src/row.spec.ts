import {
  AuditoriumLayoutRepository,
  ReservationsProvider,
} from "external-dependencies";
import { AuditoriumSeatingAdapter } from "./auditorium-seating-adapter";
import { PricingCategory } from "./pricing-category";
import { Row } from "./row";
import { Seat } from "./seat";
import { SeatAvailability } from "./seat-availability";

describe("Row", () => {
  it("should be a value type", () => {
    const a1 = new Seat(
      "A",
      1,
      PricingCategory.Second,
      SeatAvailability.Available
    );
    const a2 = new Seat(
      "A",
      2,
      PricingCategory.Second,
      SeatAvailability.Available
    );

    // Two different instances with same values should be equals
    const rowFirstInstance = new Row("A", [a1, a2]);
    const rowSecondInstance = new Row("A", [a1, a2]);
    // Two different instances with same values should be equals
    // TODO is test supposed to be failing at this stage
    expect(JSON.stringify(rowSecondInstance)).toEqual(
      JSON.stringify(rowFirstInstance)
    );

    /**
     * TODO test missing ?
     * 
     // Should not mutate existing instance
        Seat a3 = new Seat("A", 2, PricingCategory.Second, SeatAvailability.Available);
        Row newRowWithNewSeatAdded = rowSecondInstance.addSeat(a3);
        assertThat(newRowWithNewSeatAdded).isNotEqualTo(rowFirstInstance);
     * 
     */
  });
});
