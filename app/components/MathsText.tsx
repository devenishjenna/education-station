import { InlineMath, BlockMath } from 'react-katex'

interface MathsTextProps {
  text: string
  styling?: string
}

interface MathsTextFOProps {
  x: number // coords of foreign object
  y: number 
  width: number // width of foreign object
  height: number // height of foreign object
  children: string
  styling?: string // className injection
}

export function MathsText({ text, styling }: MathsTextProps) {
  const segments = text.split('$')
  return (
    <div className={`${styling}`}>
      {segments.map((seg, i) => {
        if (seg === '') return null
        return i % 2 === 0
          ? <span key={i}>{seg}</span>
          : <InlineMath key={i} math={seg} />
      })}
    </div>
  )
}

export function MathsTextFO({ x, y, width, height, styling, children }: MathsTextFOProps) {
  return <foreignObject x={x} y={y} width={width} height={height}>
    <MathsText text={children} styling={`${styling}`}/>
  </foreignObject>
} 