import StraightLineSummary from "./StraightLineSummary"

interface SlugToSummary {
  [slug: string]: React.ComponentType
}

interface SummaryMap {
  [grade: string]: SlugToSummary
}

// Presence in this registry is what makes a summary exist — there is no
// separate flag to keep in sync. Keyed by grade first because slugs are not
// unique across grades (e.g. trigonometric-graphs is in both 10 and 11).
export const summaryRegistry: SummaryMap = {
  "10": { "straight-line-graphs": StraightLineSummary },
}
