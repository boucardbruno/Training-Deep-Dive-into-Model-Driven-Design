import { PricingCategory } from "./pricing-category";
import { Seat } from "./seat";

/**
 * Occurs when a Suggestion is made.
 */
export class SuggestionMade {
  constructor(
    public readonly suggestedSeats: readonly Seat[],
    public readonly partyRequested: number,
    public readonly pricingCategory: PricingCategory
  ) {}

  seatNames = () => this.suggestedSeats.map(seat => seat.toString())

  matchExpectation = () => this.suggestedSeats.length === this.partyRequested

}
