import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_BR, MAX_IMAGE_SIZE, MIN_IMAGE_BR, MIN_IMAGE_SIZE } from '@/const/dom.ts'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const ImageSectionForm = ({
  data,
  onChange,
}: {
  data: ImageSectionData
  onChange: (value: ImageSectionData) => void
}) => {
  const { t } = useTranslation()
  const { propsData } = data
  const { url, imageSize, borderRadius } = propsData

  const handleEventChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: value,
      },
    })
  }

  const handleValueChange = (name: keyof ImageSectionData['propsData'], value: string | number) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: Number(value),
      },
    })
  }

  return (
    <div>
      {/* Image URL */}
      <div>
        <div className="form-label">
          <span>{t('form.imageUrl')}</span>
        </div>
        <Input
          name="url"
          value={url}
          placeholder={t('form.enterImageUrl')}
          onChange={handleEventChange}
        />
      </div>
      {/* Image Size */}
      <div>
        <div className="form-label">
          <span>{t('form.imageSize')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="imageSize"
            type="number"
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            value={imageSize}
            onChange={e => handleValueChange('imageSize', e.target.value)}
          />
          <Slider
            value={[imageSize]}
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            step={1}
            onValueChange={val => handleValueChange('imageSize', val[0])}
          />
        </div>
      </div>
      {/* Border Radius */}
      <div>
        <div className="form-label">
          <span>{t('form.borderRadius')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            type="number"
            name="borderRadius"
            value={borderRadius}
            min={MIN_IMAGE_BR}
            max={MAX_IMAGE_BR}
            onChange={e => handleValueChange('borderRadius', e.target.value)}
          />
          <Slider
            value={[borderRadius]}
            min={MIN_IMAGE_BR}
            max={MAX_IMAGE_BR}
            step={1}
            onValueChange={val => handleValueChange('borderRadius', val[0])}
          />
        </div>
      </div>
    </div>
  )
}

export { ImageSectionForm }
