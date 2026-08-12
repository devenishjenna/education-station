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
            <li className="px-3 py-2 text-sm border-l-4 border-transparent flex items-center gap-2
                text-text-muted opacity-40 cursor-not-allowed">
                <span>{topic.isDone ? '✓' : '○'}</span>
                <span>{topic.name}</span>
            </li>
        )
    }

    return (
        <Link href={`/grade-${grade}/${topic.slug}`}>
            <li className={`px-3 py-2 cursor-pointer text-sm border-l-4 flex items-center gap-2
                ${isActive
                ? "bg-navy-mid border-brand-blue text-text-primary font-semibold"
                : "text-text-muted border-transparent hover:bg-navy-mid"}`}>
                <span>{topic.isDone ? '✓' : '○'}</span>
                <span>{topic.name}</span>
            </li>
        </Link>
    )
}