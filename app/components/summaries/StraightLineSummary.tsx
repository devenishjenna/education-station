import { MathsText } from "../MathsText"

// Colour convention, matching the explorer and the lesson figures:
// coral = gradient (m), green = y-intercept (c), blue = general structure.
interface SectionProps {
  title: string
  accent: string          // left border colour class
  children: React.ReactNode
}

function Section({ title, accent, children }: SectionProps) {
  return (
    <div className={`border-l-4 ${accent} bg-white/60 rounded-r-lg px-4 py-3 flex flex-col gap-2`}>
      <h3 className="font-semibold text-lg">{title}</h3>
      {children}
    </div>
  )
}

export default function StraightLineSummary() {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">

      <Section title="The standard form" accent="border-brand-blue">
        <MathsText text="Every straight line can be written as $y = mx + c$." styling="text-base" />
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li><MathsText text="$m$ is the gradient — how steep the line is" styling="text-base" /></li>
          <li><MathsText text="$c$ is the $y$-intercept — where the line crosses the $y$-axis" styling="text-base" /></li>
        </ul>
      </Section>

      <Section title="Gradient (m)" accent="border-brand-coral">
        <MathsText
          text="The gradient measures how much $y$ changes for each step in $x$ — rise over run."
          styling="text-base"
        />
        <MathsText text="$m = \frac{y_2 - y_1}{x_2 - x_1}$" styling="text-xl py-1" />
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li><MathsText text="$m > 0$ — the line slopes upward from left to right" styling="text-base" /></li>
          <li><MathsText text="$m < 0$ — the line slopes downward from left to right" styling="text-base" /></li>
          <li><MathsText text="$m = 0$ — the line is horizontal" styling="text-base" /></li>
          <li><MathsText text="The steeper the line, the larger $|m|$" styling="text-base" /></li>
        </ul>
        <MathsText text="Parallel lines have equal gradients." styling="text-base" />
      </Section>

      <Section title="y-intercept (c)" accent="border-brand-green">
        <MathsText
          text="The $y$-intercept is where the line crosses the $y$-axis. It is always at the point $(0,\ c)$."
          styling="text-base"
        />
        <MathsText text="Find it by setting $x = 0$:  $y = m(0) + c = c$" styling="text-base" />
        <MathsText
          text="Changing $c$ slides the line up or down without changing its steepness."
          styling="text-base"
        />
      </Section>
      
    </div>
  )
}
