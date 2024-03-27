import { AuditoriumSeating } from "./auditorium-seating";
import { AuditoriumSeatingAdapter } from "./auditorium-seating-adapter";
import { PricingCategory } from "./pricing-category";
import { SuggestionMade } from "./suggestion-made";
import { SuggestionNotAvailable } from "./suggestion-not-available";
import { SuggestionsMade } from "./suggestions-made";

const NUMBER_OF_SUGGESTIONS = 3;

const giveMeSuggestionsFor = (
  auditoriumSeating: AuditoriumSeating,
  partyRequested: number,
  pricingCategory: PricingCategory
) => {
  const foundedSuggestions: SuggestionMade[] = [];

  for (let i = 0; i < NUMBER_OF_SUGGESTIONS; i++) {
    const seatingOptionSuggested = auditoriumSeating.suggestSeatingOptionFor(
      partyRequested,
      pricingCategory
    );

    if (seatingOptionSuggested.matchExpectation()) {
      seatingOptionSuggested.seats.forEach((seat) => seat.allocate());
      foundedSuggestions.push(
        new SuggestionMade(
          seatingOptionSuggested.seats,
          partyRequested,
          pricingCategory
        )
      );
    }
  }

  return [...foundedSuggestions];
};

export class SeatsAllocator {
  constructor(
    private readonly auditoriumSeatingAdapter: AuditoriumSeatingAdapter
  ) {}

  makeSuggestion = (
    showId: string,
    partyRequested: number
  ): SuggestionsMade => {

    const auditoriumSeating =
      this.auditoriumSeatingAdapter.getAuditoriumSeating(showId);

    const suggestionsMade = new SuggestionsMade(showId, partyRequested);

    suggestionsMade.add(
      giveMeSuggestionsFor(
        auditoriumSeating,
        partyRequested,
        PricingCategory.First
      )
    );
    suggestionsMade.add(
      giveMeSuggestionsFor(
        auditoriumSeating,
        partyRequested,
        PricingCategory.Second
      )
    );
    suggestionsMade.add(
      giveMeSuggestionsFor(
        auditoriumSeating,
        partyRequested,
        PricingCategory.Third
      )
    );
    suggestionsMade.add(
      giveMeSuggestionsFor(
        auditoriumSeating,
        partyRequested,
        PricingCategory.Mixed
      )
    );

    if (!suggestionsMade.matchExpectations()) {
      return new SuggestionNotAvailable(showId, partyRequested);
    }

    return suggestionsMade;
  };
}
