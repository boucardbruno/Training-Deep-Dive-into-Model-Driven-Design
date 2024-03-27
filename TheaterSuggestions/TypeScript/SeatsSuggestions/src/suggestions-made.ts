import { PricingCategory } from "./pricing-category";
import { SuggestionMade } from "./suggestion-made";

/**
 * Occurs when a bunch of Suggestion are made.
 */
export class SuggestionsMade {
  private forCategory: Record<PricingCategory, SuggestionMade[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
  };

  constructor(
    public readonly showId: string,
    public readonly partyRequested: number
  ) {}

  seatNames = (pricingCategory: PricingCategory): string[] =>
    this.forCategory[pricingCategory].flatMap((suggestionMade) => suggestionMade.seatNames());

  add = (suggestions: SuggestionMade[]) => {
    suggestions.forEach((suggestionMade) =>
      this.forCategory[suggestionMade.pricingCategory].push(suggestionMade)
    );
  };

  matchExpectations = () => {
    return Object.values(this.forCategory)
      .flat()
      .some((suggestionMade) => suggestionMade.matchExpectation());
  };

}
