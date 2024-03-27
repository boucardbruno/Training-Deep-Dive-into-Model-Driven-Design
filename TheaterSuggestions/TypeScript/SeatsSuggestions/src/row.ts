import { PricingCategory } from "./pricing-category";
import { Seat } from "./seat";
import { SeatingOptionNotAvailable } from "./seating-option-not-available";
import { SeatingOptionSuggested } from "./seating-option-suggested";

export class Row {
  constructor(public name: string, public seats: Seat[]) {}

  suggestSeatingOption = (partyRequested: number, pricingCategory: PricingCategory) => {
    for (const seat of this.seats) {
        if (seat.isAvailable() && seat.matchCategory(pricingCategory)) {
            const seatingOptionSuggested = new SeatingOptionSuggested(partyRequested, pricingCategory);
            seatingOptionSuggested.addSeat(seat);

            if (seatingOptionSuggested.matchExpectation()) {
                return seatingOptionSuggested;
            }
        }
    }

    return new SeatingOptionNotAvailable(partyRequested, pricingCategory);
}
}
