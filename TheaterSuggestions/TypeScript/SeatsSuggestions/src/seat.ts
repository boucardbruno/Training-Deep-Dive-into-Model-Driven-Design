import { PricingCategory } from "./pricing-category";
import { SeatAvailability } from "./seat-availability";

export class Seat {
  constructor(
    private readonly rowName: string,
    private readonly seatNumber: number,
    private readonly pricingCategory: PricingCategory, // TODO not used ??
    private seatAvailability: SeatAvailability
  ) {}

  isAvailable = () => this.seatAvailability === SeatAvailability.Available;

  matchCategory = (pricingCategory: PricingCategory) => {
    if (pricingCategory === PricingCategory.Mixed) {
        return true;
    }
    return this.pricingCategory === pricingCategory;
  }

  allocate = () => {
    if (this.seatAvailability == SeatAvailability.Available) {
      this.seatAvailability = SeatAvailability.Allocated;
    }
  }

  updateCategory = (seatAvailability: SeatAvailability) => {
    this.seatAvailability = seatAvailability;
  };

  toString = () => `${this.rowName}${this.seatNumber}`;
}
