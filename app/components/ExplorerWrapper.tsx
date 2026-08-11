import { Topic } from '../data/topics'
import { explorerRegistry } from './explorers/registry'

interface ExplorerWrapperProps {
  activeTopic: Topic
  grade: string
}

export default function ExplorerWrapper({ activeTopic, grade }: ExplorerWrapperProps) {
  const Explorer = explorerRegistry[grade]?.[activeTopic.slug]

  if (!Explorer) return <div>Explorer coming soon...</div>

  return <Explorer />
}
