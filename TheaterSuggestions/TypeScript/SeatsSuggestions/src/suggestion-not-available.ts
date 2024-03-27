import { Seat } from "./seat";
import { SuggestionsMade } from "./suggestions-made";

/**
 * Occurs when a Suggestion that does not meet expectation is made.
 */
export class SuggestionNotAvailable extends SuggestionsMade {
  constructor(showId: string, partyRequested: number) {
    super(showId, partyRequested);
  }
 
}
