import { LogoGithub, LogoGmail, LogoJuejin } from '@/components/common/svg-icons.tsx'
import { Cake, Link, Mail, MapPin, Phone } from 'lucide-react'

export const linkIconNames = [
  'link',
  'location',
  'cake',
  'phone',
  'github',
  'juejin',
  'mail',
  'gmail',
] as const
export type LinkIconNames = (typeof linkIconNames)[number]

export const LinkIconComponent = (icon: string) => {
  const props = { width: '1em', height: '1em' }
  switch (icon) {
    case 'link':
      return <Link {...props} />
    case 'location':
      return <MapPin {...props} />
    case 'cake':
      return <Cake {...props} />
    case 'phone':
      return <Phone {...props} />
    case 'github':
      return <LogoGithub {...props} />
    case 'juejin':
      return <LogoJuejin {...props} />
    case 'mail':
      return <Mail {...props} />
    case 'gmail':
      return <LogoGmail {...props} />
    default:
      return <Link {...props} />
  }
}
