import { Button } from '@/components/ui/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import type { LinkIconNames } from '@/components/widgets/link-icon.tsx'
import { LinkIconComponent, linkIconNames } from '@/components/widgets/link-icon.tsx'
import { useState } from 'react'

interface LinkIconSelectProps {
  value: string
  onChange: (value: LinkIconNames) => void
  className?: string
}

const IconSelect = ({ value, onChange, className }: LinkIconSelectProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClickIcon = (name: LinkIconNames) => {
    onChange(name)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          className={className}
          variant="outline"
          size="icon"
        >
          {LinkIconComponent(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52"
        align="start"
      >
        <div className="flex flex-wrap justify-between">
          {linkIconNames.map(name => (
            <Button
              key={name}
              variant="outline"
              size="icon"
              className="mb-2"
              onClick={() => handleClickIcon(name)}
            >
              {LinkIconComponent(name)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { IconSelect }
