import Link from "next/link"
import GradePill from "./GradePill"

interface TopbarProps {
    activeGrade?: number
}

export default function Topbar({ activeGrade }: TopbarProps) {

    return (
        <div className="sticky top-0 h-14 border-b border-navy-mid px-6 flex items-center justify-between z-10">
            
            {/* logo with link to home */}
            <Link href="/" className="text-lg font-bold text-text-primary">
                <span className="text-brand-blue">Edu</span>Stat
            </Link>
            
            {/* grade pill - only mount if there is an active grade*/}
            {activeGrade && <GradePill activeGrade={activeGrade}/>}

            {/* sign up or log in links */}
            {/* <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-text-muted hover:text-text-primary">
                Log in
                </Link>
                <Link href="/signup" className="text-sm px-3 py-1 bg-brand-blue text-white rounded-lg">
                Sign up
                </Link>
            </div> 
            */}
        </div>
    )
}