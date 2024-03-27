import { PricingCategory } from "./pricing-category";
import { Row } from "./row";
import { SeatingOptionNotAvailable } from "./seating-option-not-available";
import { SeatingOptionSuggested } from "./seating-option-suggested";

export class AuditoriumSeating {
  private _rows: Record<string, Row>;

  constructor(rows: Record<string, Row>) {
    this._rows = { ...rows };
  }

  suggestSeatingOptionFor = (
    partyRequested: number,
    pricingCategory: PricingCategory
  ): SeatingOptionSuggested => {
    for (const row of Object.values(this._rows)) {
      const seatingOptionSuggested: SeatingOptionSuggested =
        row.suggestSeatingOption(partyRequested, pricingCategory);

      if (seatingOptionSuggested.matchExpectation()) {
        // Cool, we mark the seat as Allocated (that we turns into a SuggestionMode)
        return seatingOptionSuggested;
      }
    }

    return new SeatingOptionNotAvailable(partyRequested, pricingCategory);
  }

  get rows(): Readonly<Record<string, Row>> {
    return this._rows;
  }
}
