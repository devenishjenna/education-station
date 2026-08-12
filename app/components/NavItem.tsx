import { Topic } from "../data/topics"
import Link from "next/link"

interface NavItemProps {
    topic: Topic
    grade: number
    isActive: boolean
}

export default function NavItem({ topic, grade, isActive }: NavItemProps) {

    // No content behind this topic yet, so it is not a link.
    if (!topic.hasVideo) {
        return (
            <li className="px-3 py-1.5 text-sm border-l-4 border-transparent flex items-center gap-2.5
                text-text-muted opacity-40">
                <span className="text-[10px] leading-none">{topic.isDone ? '✓' : '○'}</span>
                <span className="text-base">{topic.name}</span>
            </li>
        )
    }

    return (
        <Link href={`/grade-${grade}/${topic.slug}`}>
            <li className={`px-3 py-1.5 cursor-pointer text-sm border-l-4 flex items-center gap-2.5
                transition-colors duration-150
                ${isActive
                ? "bg-navy-mid border-brand-blue text-text-primary font-semibold"
                : "text-text-muted border-transparent hover:bg-navy-mid hover:text-text-primary"}`}>
                <span className={`text-[10px] leading-none ${isActive ? "text-brand-blue" : "text-text-muted/60"}`}>
                    {topic.isDone ? '✓' : '○'}
                </span>
                <span className="text-base">{topic.name}</span>
            </li>
        </Link>
    )
}