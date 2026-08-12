"use client"

import { gradeToTopicsMapping, Topic } from "../data/topics"
import { usePathname } from 'next/navigation'
import NavItem from './NavItem'

interface SidebarProps {
    activeGrade: number
}

export default function Sidebar({ activeGrade }: SidebarProps) {
    
    const pathname = usePathname()
    const activeSlug =pathname.split('/').pop()?.toLowerCase()
    
    // TODO: this is repeated
    // create an object with topics grouped by sections
    const activeTopics = gradeToTopicsMapping[activeGrade ?? '']

    const groupedSections: Record<string, Topic[]> = activeTopics.reduce((accumulator, topic) => {
        const section = topic.section

        if (!accumulator[section]) {
            accumulator[section] = []
        }
        accumulator[section].push(topic)
        return accumulator

        }, {} as Record<string, Topic[]>)
// TODO: potentially blur background for sidebar
// and make scroll bar visible at all times so that user knows that there are more optiosn to scroll
    return (    
        <ul className='bg-navy-deep sticky top-16 m-2 p-2 border border-white/[0.07] rounded-xl max-w-70 overflow-y-auto'
        style={{height: 'calc(100dvh - 72px)'}}>
            {Object.entries(groupedSections).map(([section, topics]) => {
                return <div key={section}>
                <div className='text-[13px] font-semibold text-brand-blue uppercase tracking-[0.2em] px-3 pt-4 pb-2'
                >{section}
                </div>
                {topics.map((topic) => <NavItem 
                    key={topic.id}
                    topic={topic}
                    grade={activeGrade}
                    isActive={topic.slug === activeSlug}/>)}
                </div>})}
        </ul>
    )
}

