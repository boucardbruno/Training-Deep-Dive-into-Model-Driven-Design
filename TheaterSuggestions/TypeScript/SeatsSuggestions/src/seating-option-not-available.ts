import { PricingCategory } from "./pricing-category";
import { Seat } from "./seat";
import { SeatingOptionSuggested } from "./seating-option-suggested";

export class SeatingOptionNotAvailable extends SeatingOptionSuggested {

  constructor(
    partyRequested: number,
    pricingCategory: PricingCategory
  ) {
    super(partyRequested, pricingCategory);
  }

}
