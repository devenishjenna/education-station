import { Topic } from '../data/topics'
import { summaryRegistry } from './summaries/registry'

interface SummaryWrapperProps {
  activeTopic: Topic
  grade: string
}

export default function SummaryWrapper({ activeTopic, grade }: SummaryWrapperProps) {
  const Summary = summaryRegistry[grade]?.[activeTopic.slug]

  if (!Summary) return <div>Summary coming soon...</div>

  return <Summary />
}
