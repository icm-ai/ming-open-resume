import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '@/const/dom.ts'

interface ImageSectionProps {
  data: ImageSectionData['propsData']
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { url, imageSize, borderRadius } = data

  let sizeCls = `${imageSize}%`
  // range limit
  if (imageSize < MIN_IMAGE_SIZE) {
    sizeCls = `${MIN_IMAGE_SIZE}%`
  } else if (imageSize > MAX_IMAGE_SIZE) {
    sizeCls = `${MAX_IMAGE_SIZE}%`
  }

  return (
    // Replaced flex-center with standard Tailwind. Added padding.
    <div className="flex items-center justify-center py-4 drop-shadow-lg"> 
      <img
        style={{ 
          width: sizeCls, 
          borderRadius: `${borderRadius}px` // Explicitly using px for borderRadius
        }}
        src={url}
        alt={url ? url.split('/').pop() || 'resume-image' : 'resume-image'} // Basic alt text from URL
        draggable="false"
        className="max-w-full h-auto object-contain" // Ensure image scales nicely within its bounds
      />
    </div>
  )
}

export { ImageSection }
