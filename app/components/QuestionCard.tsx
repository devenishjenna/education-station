"use client"

import { useState } from "react"

import { Question } from "../data/quizData"
import { MathsText } from './MathsText'

interface QuestionCardProps {
  currentQuestion: Question
  onAnswered: (correct: boolean) => void
  questionIndex: number
  totalQuestions: number
}

export default function QuestionCard({ currentQuestion, onAnswered, questionIndex, totalQuestions }: QuestionCardProps) {

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const isAnswered = selectedOption !== null

  function handleSelect(i: number) {
    if (isAnswered) return //this means the option can't be selected again or options can't change
    
    setSelectedOption(i)
    if (i === currentQuestion.answerIndex) {
      onAnswered(true)
    } else {
      onAnswered(false)
    }
  }

  return <div className='relative border-2 rounded-2xl flex flex-col gap-2 border-brand-blue my-1 p-2 overflow-hidden'>

      {/* QUESTION LABEL */}
      <div className="absolute -top-0.5 right-10 bg-brand-blue text-white text-xs font-medium px-3.5 py-1.5 rounded-b-lg">
        Q{questionIndex + 1} of {totalQuestions}
      </div>

      {/* QUESTION */}
      <span className="text-deep-navy text-base my-2 pl-1"><MathsText text={currentQuestion.question} styling="text-base"/></span>

      {/* OPTIONS */}
      {currentQuestion.options.map((option, i) => 
        <button 
          key={option}
          onClick={() => handleSelect(i)}
          disabled={isAnswered} //disabled clickability
          className={`flex items-center gap-4 p-5 rounded-lg bg-brand-blue/10 border  
                    text-deep-navy text-md
                    ${isAnswered ? 'cursor-default ' : 'cursor-pointer transition-colors duration-150 hover:bg-brand-blue/20 hover:border-brand-blue'}
                    ${isAnswered 
                      ? (selectedOption === i 
                        ? (selectedOption === currentQuestion.answerIndex ? 'bg-brand-green/20 border-brand-green' : 'bg-red-400/20 border-red-400')
                        : (currentQuestion.answerIndex === i ? 'bg-brand-green/20 border-brand-green transition-colors duration-50': 'border-text-muted/50'))
                      : 'border-text-muted/50'}
                    `}
        >
          <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-brand-blue/70 border-2 border-white
                  text-white text-xs ring-1 ring-brand-blue font-medium shadow-[0_0_8px_2px_var(--color-brand-blue)]/55" // TODO: update styling when isAnswered is true
          >{String.fromCharCode(i + 65)}</span>
          <MathsText text={option} styling="text-base"/>
        </button>
      )}

      {/* ANSWER EXPLANATION */}
      <div
      className={`p-2 transition-all duration-300 bg-brand-green/20 rounded-lg
        ${isAnswered && selectedOption !== currentQuestion.answerIndex
          ? ""
          : "hidden"
        }`}
      ><MathsText text={currentQuestion.answerExplanation} styling="text-base"/></div>

  </div>
}