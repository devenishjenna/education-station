import StraightLineExplorer from "./StraightLineExplorer"

interface SlugToExplorer {
  [slug: string]: React.ComponentType
}

interface ExplorerMap {
  [grade: string]: SlugToExplorer
}

// Presence in this registry is what makes an explorer exist — there is no
// separate flag to keep in sync. Keyed by grade first because slugs are not
// unique across grades (e.g. trigonometric-graphs is in both 10 and 11).
export const explorerRegistry: ExplorerMap = {
  "10": { "straight-line-graphs": StraightLineExplorer },
}
