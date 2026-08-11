import { gradeToTopicsMapping } from "../../data/topics"
import { notFound } from "next/navigation"
import TabContent from "../../components/TabContent"
import Tabs from "../../components/Tabs"
import Breadcrumb from "@/app/components/Breadcrumb"
import LessonWrapper from "@/app/components/LessonWrapper"
import ExplorerWrapper from "@/app/components/ExplorerWrapper"
import Quiz from "@/app/components/Quiz"

interface TopicPageProps {
  params: Promise<{ grade: string, topic: string }> 
  searchParams: Promise<{ tab?: string }> 
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {

  const { grade:gradeSlug, topic: topicSlug } = await params
  const grade = gradeSlug.split('-').pop() ?? '' // is this the best choice? Will this ever be undefined?

  const activeTopics = gradeToTopicsMapping[grade ?? '']

  const activeTopic = activeTopics.find((t) => t.slug === topicSlug)
  const { tab: activeTab = 'lesson'} = await searchParams

if (!activeTopic) notFound()

  return (
    <main className="p-2 h-[calc(100dvh-60px)] flex flex-col">
      {/* STICKY TOP SECTION */}
      <div className="shrink-0">
        {/* BREADCRUMB */}
        <Breadcrumb gradeSlug={gradeSlug} grade={grade} activeTopic={activeTopic}/>

        {/* MAIN TOPIC HEADING */}
        <h1 className="text-3xl font-bold text-text-primary mt-1 mb-3">
          {activeTopic.name}
        </h1>

        {/* TABS */}
        <Tabs activeTab={activeTab} topicSlug={topicSlug} gradeSlug={gradeSlug}/>
      </div>

      {/* MAIN CONTENT */}
      {/* TODO: need add statuses for each tab */}
      <div className={`bg-content p-4 overflow-y-auto flex-1 min-h-0
        ${activeTab === 'lesson'
          ? 'rounded-tr rounded-lb rounded-rb'
          : 'rounded'}`}
          >
        <TabContent isActive={activeTab==='lesson'}>
          <LessonWrapper activeTopic={activeTopic} />
        </TabContent>

        <TabContent isActive={activeTab==='explorer'}>
          <ExplorerWrapper activeTopic={activeTopic} grade={grade} />
        </TabContent>
        
        <TabContent isActive={activeTab==='summary'}>
          hello
        </TabContent>

        <TabContent isActive={activeTab==='quiz'}>
            <Quiz gradeSlug={gradeSlug} topicSlug={topicSlug}/>
        </TabContent>
      </div>
    </main>
  )
}