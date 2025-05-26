import type { TextContentData } from '@/components/widgets/widgets-type.d.ts'

interface TextContentProps {
  data: TextContentData['propsData']
}

const TextContent = ({ data }: TextContentProps) => {
  const { content } = data

  return (
    // Removed flex flex-col justify-center. Added font-body and text-foreground for theme inheritance.
    // Added some margin-bottom for spacing after the text block.
    <div
      className="tiptap font-body text-foreground mb-2" 
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}

export { TextContent }
