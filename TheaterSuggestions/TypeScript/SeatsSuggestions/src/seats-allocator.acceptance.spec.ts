//import { AuditoriumLayoutRepository }  from 'external-dependencies';

import {
  AuditoriumLayoutRepository,
  ReservationsProvider
} from "external-dependencies";
import { AuditoriumSeatingAdapter } from "./auditorium-seating-adapter";
import { PricingCategory } from "./pricing-category";
import { SeatsAllocator } from "./seats-allocator"; // TODO Seat or Seats

describe("Seats allocator", () => {
  it("should return SeatsNotAvailable when Auditorium has all its seats already reserved", () => {
    // Madison Auditorium-5
    //      1   2   3   4   5   6   7   8   9  10
    // A : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    // B : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    const showId = "5";
    const partyRequested = 1;

    const auditoriumLayoutAdapter = new AuditoriumSeatingAdapter(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );

    const seatsAllocator = new SeatsAllocator(auditoriumLayoutAdapter);

    const suggestionMade = seatsAllocator.makeSuggestion(
      showId,
      partyRequested
    );

    expect(suggestionMade.partyRequested).toEqual(partyRequested);
    expect(suggestionMade.showId).toEqual(showId);
  });

  it("should suggest one seat when Auditorium contains one available seat only", () => {
    // Madison Auditorium-5
    //      1   2   3   4   5   6   7   8   9  10
    // A : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    // B : (2) (2) (1) (1) (1) (1) (1) (1) (2) (2)
    const showId = "1";
    const partyRequested = 1;

    const auditoriumLayoutAdapter = new AuditoriumSeatingAdapter(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );

    const seatsAllocator = new SeatsAllocator(auditoriumLayoutAdapter);

    const suggestionsMade = seatsAllocator.makeSuggestion(
      showId,
      partyRequested
    );

    console.log(
      JSON.stringify(suggestionsMade.seatNames(PricingCategory.First))
    );
    expect(suggestionsMade.seatNames(PricingCategory.First)).toEqual(["A3"]);
  });

  it("should offer several suggestions ie 1 per PricingCategory and other one without category affinity", () => {
    // New Amsterdam-18
    //
    //     1   2   3   4   5   6   7   8   9  10
    //  A: 2   2   1   1   1   1   1   1   2   2
    //  B: 2   2   1   1   1   1   1   1   2   2
    //  C: 2   2   2   2   2   2   2   2   2   2
    //  D: 2   2   2   2   2   2   2   2   2   2
    //  E: 3   3   3   3   3   3   3   3   3   3
    //  F: 3   3   3   3   3   3   3   3   3   3
    const showId = "18";
    const partyRequested = 1;

    const auditoriumLayoutAdapter = new AuditoriumSeatingAdapter(
      new AuditoriumLayoutRepository(),
      new ReservationsProvider()
    );

    const seatsAllocator = new SeatsAllocator(auditoriumLayoutAdapter);

    const suggestionsMade = seatsAllocator.makeSuggestion(
      showId,
      partyRequested
    );

    expect(suggestionsMade.seatNames(PricingCategory.First)).toEqual(
      expect.arrayContaining(["A3", "A4", "A5"])
    );
    expect(suggestionsMade.seatNames(PricingCategory.Second)).toEqual(
      expect.arrayContaining(["A1", "A2", "A9"])
    );
    expect(suggestionsMade.seatNames(PricingCategory.Third)).toEqual(
      expect.arrayContaining(["E1", "E2", "E3"])
    );

    // BUG!!! => return A6, A7, A8 instead of the expected A1, A2, A3
    expect(suggestionsMade.seatNames(PricingCategory.Mixed)).toEqual(
      expect.arrayContaining(["A1", "A2", "A3"])
    );
  });
});
