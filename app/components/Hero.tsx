"use client"

import { useState } from "react"
import { GradeSelector } from "./GradeSelectionModal"

export default function Hero() {

    const [modalOpen, setModalOpen] = useState(false)

    return <>
        <div className="relative flex flex-col items-center justify-center px-6 min-h-[calc(100dvh-56px)]">

          {/* ellipse background to help hero stand out */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 50% 45% at 50% 45%, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.7) 45%, transparent 75%)'
            }}
          />

          <div className="relative z-10 text-center max-w-2xl flex flex-col items-center gap-6">

            <span className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              CAPS aligned · South Africa
            </span>

            <h1 className="text-6xl font-bold text-text-primary leading-[1.1] tracking-tight text-balance">
              Master maths.<br />
              <span className="text-brand-blue">Actually understand it.</span>
            </h1>

            <p className="text-text-muted text-lg leading-relaxed max-w-sm text-balance">
              Interactive lessons, real explanations, and quizzes built for South African students.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="group mt-2 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-8 py-3.5 text-base font-semibold text-text-primary shadow-lg shadow-brand-blue/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/40 active:translate-y-0 cursor-pointer"
            >
              Start learning!
              <span className="transition-transform duration-200 group-hover:translate-x-1">➜</span>
            </button>

            <p className="text-xl text-text-muted">
              Explore the first topic for free!
            </p>

          </div>
        </div>

        <GradeSelector
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
    </>
}
