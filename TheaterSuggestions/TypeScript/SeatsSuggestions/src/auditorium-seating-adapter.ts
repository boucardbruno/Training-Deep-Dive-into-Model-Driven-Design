import {
  AuditoriumDto,
  AuditoriumLayoutRepository,
  ReservationsProvider,
  ReservedSeatsDto,
} from "external-dependencies";
import { AuditoriumSeating } from "./auditorium-seating";
import { PricingCategory } from "./pricing-category";
import { Row } from "./row";
import { Seat } from "./seat";
import { SeatAvailability } from "./seat-availability";

/**
 * Adapt Dtos coming from the external dependencies (ReservationsProvider, AuditoriumLayoutRepository) to
 * AuditoriumSeating instances.
 */
 export class AuditoriumSeatingAdapter {
  constructor(
    private auditoriumLayoutRepository: AuditoriumLayoutRepository,
    private reservationsProvider: ReservationsProvider
  ) {}

  // TODO getAuditoriumSeatingFor or getAuditoriumLayoutFor
  // TODO reservationsProvider or reservedSeatsRepository
  getAuditoriumSeating = (showId: string): AuditoriumSeating =>
    this.adapt(
      this.auditoriumLayoutRepository.getAuditoriumLayoutFor(showId),
      this.reservationsProvider.getReservedSeats(showId)
    );

  private adapt = (
    auditoriumDto: AuditoriumDto,
    reservedSeatsDto: ReservedSeatsDto
  ): AuditoriumSeating => {
    const rows: Record<string, Row> = {};

    for (const [rowName, seatDtos] of Object.entries(auditoriumDto.Rows)) {
      const seats: Seat[] = [];
      for (const seatDto of seatDtos) {
        const seatNumber = extractNumber(seatDto.Name);
        const pricingCategory = seatDto.Category as PricingCategory;
        const isReserved = reservedSeatsDto.ReservedSeats.includes(
          seatDto.Name
        );
        seats.push(
          new Seat(
            rowName,
            seatNumber,
            pricingCategory,
            isReserved ? SeatAvailability.Reserved : SeatAvailability.Available
          )
        );
      }
      rows[rowName] = new Row(rowName, seats);
    }
    return new AuditoriumSeating(rows);
  };
}
const extractNumber = (name: string) => parseInt(name.substring(1), 10);