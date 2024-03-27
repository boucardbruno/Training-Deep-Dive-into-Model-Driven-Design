import { PricingCategory } from "./pricing-category";
import { Seat } from "./seat";

export class SeatingOptionSuggested {
  public readonly seats: Seat[] = [];

  constructor(
    private partyRequested: number,
    private pricingCategory: PricingCategory // TODO not used ??
  ) {}

  addSeat = (seat: Seat) => {
    this.seats.push(seat);
  };

  matchExpectation = () => this.seats.length == this.partyRequested;
}
