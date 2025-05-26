/*
 * @Author: MingChen
 * @Date: 2025-02-15 19:05:56
 * @LastEditors: MingChen
 * @LastEditTime: 2025-02-19 16:24:17
 */
import type { ExperienceTimeData } from '@/components/widgets/widgets-type.d.ts'

interface ExperienceTimeProps {
  data: ExperienceTimeData['propsData']
}

const ExperienceTime = ({ data }: ExperienceTimeProps) => {
  const { title, dateRange } = data

  return (
    // Added small bottom margin for spacing with potential content below
    <div className="flex flex-wrap items-center justify-between gap-x-4 py-1.5 mb-1"> 
      <h4 className="text-lg font-semibold font-body text-foreground">{title}</h4> {/* Tailwind size, semibold, font-body, themed color */}
      <span className="text-sm font-body text-muted-foreground">{dateRange}</span> {/* font-body, themed color for muted text */}
    </div>
  )
}
export { ExperienceTime }
