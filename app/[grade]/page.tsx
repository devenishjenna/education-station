import { gradeToTopicsMapping, Topic } from "../data/topics"
import Link from "next/link"

interface GradePageProps {
  params: Promise<{ grade: string}>
}

// blue = video, green = quiz, purple = explorer.
function IconBubble({ icon, label, colour_styling }: { icon: string, label: string, colour_styling: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${colour_styling}`}>
      <span className="text-md leading-none">{icon}</span>
      {label}
    </span>
  )
}

export default async function GradePage({ params }: GradePageProps) {

  const { grade:gradeSlug } = await params
  const grade = gradeSlug.split('-').pop()

  const activeTopics = gradeToTopicsMapping[grade ?? '']

  // create an object with topics grouped by sections
  const groupedSections: Record<string, Topic[]> = activeTopics.reduce((accumulator, topic) => {
    const section = topic.section

    if (!accumulator[section]) {
      accumulator[section] = []
    }
    accumulator[section].push(topic)
    return accumulator

  }, {} as Record<string, Topic[]>)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Grade {grade}</h1>

      <div className="flex flex-col gap-8">
        {Object.entries(groupedSections).map(([section, topics]) => (
          <div key={section}>
            <h2 className="text-lg font-semibold uppercase tracking-widest mb-3 text-brand-blue">
              {section}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {topics.map((topic) =>
                <Link
                  key={topic.id}
                  href={`/${gradeSlug}/${topic.slug}`}
                  className="flex flex-col gap-2 rounded-xl border border-white/10 border-l-4 border-l-brand-blue
                    bg-navy-mid p-4 text-text-primary transition-all duration-200
                    hover:bg-navy-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40"
                >
                  <span className="font-semibold">{topic.name}</span>
                  <span className="text-sm text-text-muted leading-relaxed">{topic.description}</span>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <IconBubble
                      icon="▶"
                      label={`${topic.videoCount} video${topic.videoCount !== 1 ? 's' : ''}`}
                      colour_styling="bg-brand-blue/10 text-brand-blue"
                    />
                    {topic.hasExplorer && (
                      <IconBubble
                        icon="✦"
                        label="Explorer"
                        colour_styling="bg-brand-purple/10 text-brand-purple"
                      />
                    )}
                    <IconBubble
                      icon="☰"
                      label="Summary"
                      colour_styling="bg-brand-green/10 text-brand-amber"
                    />
                    <IconBubble
                      icon="✎"
                      label={`${topic.quizCount} quiz${topic.quizCount !== 1 ? 'zes' : ''}`}
                      colour_styling="bg-brand-green/10 text-brand-green"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
