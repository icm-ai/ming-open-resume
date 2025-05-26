/*
 * @Author: MingChen
 * @Date: 2025-02-15 19:05:56
 * @LastEditors: MingChen
 * @LastEditTime: 2025-02-19 16:28:01
 */
import type { TitleSectionData } from '@/components/widgets/widgets-type.d.ts'

interface TitleSectionProps {
  data: TitleSectionData['propsData']
}

const TitleSection = ({ data }: TitleSectionProps) => {
  const { title } = data

  return (
    // Removed fixed height, using padding. Added bottom margin for spacing.
    // Using a left border for the accent line.
    <div className="py-2 mb-3 border-l-4 border-primary pl-3"> 
      <h2 className="text-2xl font-semibold font-heading text-foreground"> {/* Adjusted font size, weight, family, and color */}
        {title}
      </h2>
    </div>
  )
}

export { TitleSection }
