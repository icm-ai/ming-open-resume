import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import type { StyleData } from '@/components/widgets/widgets-type'
import { MAX_MARGIN_VAL, MIN_MARGIN_VAL } from '@/const/dom.ts'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface StyleFormProps {
  styleData: StyleData
  onStyleChange: (styleData: StyleData) => void
}

function StyleForm({ styleData, onStyleChange }: StyleFormProps) {
  const { t } = useTranslation()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onStyleChange({
      ...styleData,
      [name]: Number(value) || 0,
    })
  }

  const handleSliderChange = (name: string, value: number) => {
    onStyleChange({
      ...styleData,
      [name]: value,
    })
  }

  return (
    <ul>
      <li>
        <div className="form-label">
          <span>{t('form.marginTop')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="marginTop"
            type="number"
            min={MIN_MARGIN_VAL}
            max={MAX_MARGIN_VAL}
            value={styleData.marginTop}
            onChange={handleInputChange}
          />
          <Slider
            value={[styleData.marginTop]}
            max={MAX_MARGIN_VAL}
            step={1}
            onValueChange={val => handleSliderChange('marginTop', val[0])}
          />
        </div>
      </li>
      <li>
        <div className="form-label">
          <span>{t('form.marginBottom')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="marginBottom"
            type="number"
            min={MIN_MARGIN_VAL}
            max={MAX_MARGIN_VAL}
            value={styleData.marginBottom}
            onChange={handleInputChange}
          />
          <Slider
            value={[styleData.marginBottom]}
            max={MAX_MARGIN_VAL}
            step={1}
            onValueChange={val => handleSliderChange('marginBottom', val[0])}
          />
        </div>
      </li>
    </ul>
  )
}

export { StyleForm }
