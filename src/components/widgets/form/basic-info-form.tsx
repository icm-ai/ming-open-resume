import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import { AvatarRoundedSelect } from '@/components/widgets/form/avatar/avatar-rounded-select.tsx'
import { ContactsForm } from '@/components/widgets/form/contacts/contacts-form.tsx'
import type { BasicInfoData, LinkItemData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_AVATAR_SIZE, MIN_AVATAR_SIZE } from '@/const/dom.ts'
import { produce } from 'immer'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const BasicInfoForm = ({
  data,
  onChange,
}: {
  data: BasicInfoData
  onChange: (value: BasicInfoData) => void
}) => {
  const { t } = useTranslation()
  const { propsData } = data
  const { avatarUrl, avatarSize, avatarRound, name, jobTitle, linksGroup } = propsData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: value,
      },
    })
  }

  const handleAvatarSizeChange = (value: string | number) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        avatarSize: Number(value),
      },
    })
  }

  const handleAvatarRoundChange = (isRound: boolean) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        avatarRound: isRound,
      },
    })
  }

  const handleLinkGroupChange = (groupIndex: number, linkGroup: LinkItemData[]) => {
    const nextState = produce(linksGroup, draft => {
      draft[groupIndex] = linkGroup
    })
    onChange({
      ...data,
      propsData: {
        ...propsData,
        linksGroup: nextState,
      },
    })
  }

  return (
    <div>
      {/* Avatar URL */}
      <div>
        <div className="form-label">
          <span>{t('form.avatarUrl')}</span>
        </div>
        <div className="flex items-center justify-between">
          <Input
            className="mr-4 w-32"
            name="avatarUrl"
            value={avatarUrl}
            placeholder={t('form.enterAvatarUrl')}
            onChange={handleChange}
          />
          <AvatarRoundedSelect
            url={avatarUrl}
            rounded={avatarRound}
            onChange={handleAvatarRoundChange}
          />
        </div>
      </div>
      {/* Avatar Size */}
      <div>
        <div className="form-label">
          <span>{t('form.avatarSize')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="avatarSize"
            type="number"
            min={MIN_AVATAR_SIZE}
            max={MAX_AVATAR_SIZE}
            value={avatarSize}
            onChange={e => handleAvatarSizeChange(e.target.value)}
          />
          <Slider
            value={[avatarSize]}
            min={MIN_AVATAR_SIZE}
            max={MAX_AVATAR_SIZE}
            step={1}
            onValueChange={val => handleAvatarSizeChange(val[0])}
          />
        </div>
      </div>
      {/* Name */}
      <div>
        <div className="form-label">
          <span>{t('form.name')}</span>
        </div>
        <Input
          name="name"
          value={name}
          placeholder={t('form.enterName')}
          onChange={handleChange}
        />
      </div>
      {/* Position */}
      <div>
        <div className="form-label">
          <span>{t('form.position')}</span>
        </div>
        <Input
          name="jobTitle"
          value={jobTitle}
          placeholder={t('form.enterPosition')}
          onChange={handleChange}
        />
      </div>
      {/* Contact Information */}
      <div>
        <div className="form-label">
          <span>{t('form.contactInfo1')}</span>
        </div>
        <ContactsForm
          data={linksGroup[0]}
          onChange={data => handleLinkGroupChange(0, data)}
        />
        <div className="form-label">
          <span>{t('form.contactInfo2')}</span>
        </div>
        <ContactsForm
          data={linksGroup[1]}
          onChange={data => handleLinkGroupChange(1, data)}
        />
        <div className="form-label">
          <span>{t('form.contactInfo3')}</span>
        </div>
        <ContactsForm
          data={linksGroup[2]}
          onChange={data => handleLinkGroupChange(2, data)}
        />
      </div>
    </div>
  )
}

export { BasicInfoForm }
