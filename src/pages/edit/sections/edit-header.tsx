import { LogoGithub } from '@/components/common/svg-icons.tsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { colorPalettes, defaultPalette } from '@/const/colors.ts'
import { widgetsSchema } from '@/components/widgets/widgets-schema.ts'
import { getBasename } from '@/components/widgets/widgets-util.tsx'
import { encodeToBase64Url } from '@/lib/utils.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { type ChangeEvent, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const EditHeader = () => {
  const { t } = useTranslation()
  const widgets = useWidgetsStore(state => state.widgets)
  const resetWidgets = useWidgetsStore(state => state.resetWidgets)
  const setWidgets = useWidgetsStore(state => state.setWidgets)
  const setSelectedId = useWidgetsStore(state => state.setSelectedId)
  const navigate = useNavigate()

  const fontOptions = [
    { value: 'merriweather-open-sans', label: 'Merriweather + Open Sans' },
    { value: 'lato-raleway', label: 'Lato + Raleway' },
    { value: 'montserrat-roboto', label: 'Montserrat + Roboto' },
  ]

  const handleFontChange = (value: string) => {
    const root = document.documentElement
    switch (value) {
      case 'merriweather-open-sans':
        root.style.setProperty('--font-heading', 'Merriweather, serif')
        root.style.setProperty('--font-body', 'Open Sans, sans-serif')
        break
      case 'lato-raleway':
        root.style.setProperty('--font-heading', 'Raleway, sans-serif')
        root.style.setProperty('--font-body', 'Lato, sans-serif')
        break
      case 'montserrat-roboto':
        root.style.setProperty('--font-heading', 'Montserrat, sans-serif')
        root.style.setProperty('--font-body', 'Roboto, sans-serif')
        break
      default:
        // Optionally set a default font or clear the custom fonts
        root.style.removeProperty('--font-heading')
        root.style.removeProperty('--font-body')
        break
    }
  }

  const applyColorPalette = (paletteName: string) => {
    const selectedPalette = colorPalettes.find(p => p.name === paletteName) || defaultPalette;
    const root = document.documentElement;
    for (const [variable, value] of Object.entries(selectedPalette.colors)) {
      root.style.setProperty(variable, value);
    }
  };

  useEffect(() => {
    applyColorPalette(defaultPalette.name); // Apply default palette on mount
  }, []);

  const handleColorPaletteChange = (paletteName: string) => {
    applyColorPalette(paletteName);
    // Potentially save the selected palette name to local storage or a global state
    console.log('Selected color palette:', paletteName);
  };

  const inputRef = useRef<HTMLInputElement>(null)
  const handleImportConfig = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const json = e.target?.result as string
          const ret = widgetsSchema.safeParse(JSON.parse(json))
          if (ret.success) {
            const importedWidgets = ret.data
            setWidgets(importedWidgets)
            setSelectedId(importedWidgets.length ? importedWidgets[0].id : '')
            toast.success(t('Successfully imported configuration file'), {
              position: 'top-center',
            })
          } else {
            console.error(ret.error)
            toast.error(t('message.parseError'), {
              position: 'top-center',
            })
          }
        } catch (error) {
          console.error(error)
          toast.error(t('message.parseError'), {
            position: 'top-center',
          })
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClickExport = () => {
    const dataStr = JSON.stringify(widgets, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (getBasename(widgets) || 'resume-config') + '.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClickPreview = () => {
    const base64 = encodeToBase64Url(JSON.stringify(widgets))
    navigate('/preview?data=' + base64)
  }

  const handleClickPrint = () => {
    sessionStorage.setItem('PRINT', 'true')
    navigate('/print')
  }

  return (
    <div className="border-b-10 flex h-[52px] items-center justify-between border-b px-6">
      {/* github */}
      <a
        href="https://github.com/Arman19941113/dnd-resume"
        target="_blank"
        className="flex-center"
      >
        <LogoGithub
          width={20}
          height={20}
        />
        <span className="ml-1 text-sm underline">Github</span>
      </a>

      <div className="flex-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          onChange={handleImportConfig}
          style={{ display: 'none' }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          {t('common.importConfig')}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClickExport}
        >
          {t('common.exportConfig')}
        </Button>

        <Select onValueChange={handleFontChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t('common.selectFont')} />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleColorPaletteChange} defaultValue={defaultPalette.name}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('common.selectPalette')} />
          </SelectTrigger>
          <SelectContent>
            {colorPalettes.map(palette => (
              <SelectItem key={palette.name} value={palette.name}>
                {palette.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              {t('common.reset')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('message.confirmReset')}</AlertDialogTitle>
              <AlertDialogDescription>{t('message.resetWarning')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={resetWidgets}>{t('common.confirm')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClickPreview}
        >
          {t('common.preview')}
        </Button>
        <Button
          size="sm"
          onClick={handleClickPrint}
        >
          {t('common.print')}
        </Button>
      </div>
    </div>
  )
}
export { EditHeader }
