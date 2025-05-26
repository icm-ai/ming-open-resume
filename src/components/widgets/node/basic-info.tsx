/*
 * @Author: MingChen
 * @Date: 2025-02-15 19:05:56
 * @LastEditors: MingChen
 * @LastEditTime: 2025-02-19 20:32:55
 */
import { LinkIconComponent } from '@/components/widgets/link-icon.tsx'
import type { BasicInfoData } from '@/components/widgets/widgets-type.d.ts'
import { clsx } from 'clsx'

interface BasicInfoProps {
  data: BasicInfoData['propsData']
}

const BasicInfo = ({ data }: BasicInfoProps) => {
  const { avatarUrl, avatarSize, avatarRound, name, jobTitle, linksGroup } = data

  return (
    <div className="flex items-start py-4 gap-6 sm:gap-8"> {/* Changed flex-center to items-start, added gap */}
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="avatar"
          width={avatarSize || 100}
          height={avatarSize || 100}
          className={clsx(
            'flex-shrink-0', // Prevent avatar from shrinking
            avatarRound && 'rounded-full',
            'object-cover' // Added object-cover
          )}
          draggable={false}
          style={{ width: `${avatarSize || 100}px`, height: `${avatarSize || 100}px` }} // Explicit size for clarity
        />
      ) : null}
      <div className="flex-grow"> {/* Changed basis-0 to flex-grow for better responsiveness */}
        {/* Name & Position */}
        <div className="mb-3 flex flex-col items-start whitespace-nowrap sm:flex-row sm:items-end"> {/* Adjusted flex for responsiveness, increased margin */}
          <span className="mr-3 text-3xl font-bold font-heading text-foreground">{name}</span> {/* Increased size, font-bold, font-heading, text-foreground */}
          <span className="text-lg text-muted-foreground font-body">{jobTitle}</span> {/* Tailwind size, text-muted-foreground, font-body */}
        </div>
        {/* Links & Contact Info */}
        <ul className="space-y-1"> {/* Added space-y for vertical spacing between link groups */}
          {linksGroup.map((links, groupIndex) => (
            <li key={groupIndex}>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:flex-nowrap"> {/* Used gap for spacing */}
                {links.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center py-1" // Adjusted padding, removed fixed height and min-width
                  >
                    {/* link icon */}
                    <span className="flex-center mr-1.5 text-muted-foreground">{LinkIconComponent(item.icon)}</span> {/* Adjusted margin, icon color */}
                    {/* link content */}
                    <a
                      href={item.href || undefined}
                      className={clsx(
                        'font-mono text-sm text-foreground hover:text-primary', // font-mono, text size, color, hover state
                        item.href && 'underline'
                      )}
                      target="_blank"
                      rel="noopener noreferrer" // Added for security
                    >
                      {item.content}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { BasicInfo }
