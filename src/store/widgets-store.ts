import { widgetsSchema } from '@/components/widgets/widgets-schema.ts'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { createDefaultData } from '@/components/widgets/widgets-util.tsx'
import { S_N_WIDGET } from '@/const/storage.ts'
import i18n from '@/i18n'
import { storage } from '@/lib/utils.ts'
import { toast } from 'sonner'
import { create } from 'zustand'

interface PageState {
  widgets: WidgetNode[]
  selectedId: string | null
  selectedWidget: () => WidgetNode | null

  addWidget: (widget: WidgetNode) => void
  removeWidget: (id: string) => void
  setWidgets: (widgets: WidgetNode[]) => void
  resetWidgets: () => void
  setSelectedId: (id: string) => void
}

const useWidgetsStore = create<PageState>()((set, get) => {
  let widgets: WidgetNode[] = []
  const json = storage.get(S_N_WIDGET)
  if (json) {
    const ret = widgetsSchema.safeParse(json)
    if (ret.success) {
      widgets = ret.data
    } else {
      console.error(ret.error)
      setTimeout(() => {
        toast.error(i18n.t('message.parseError'), {
          position: 'top-center',
        })
      }, 100)
    }
  } else {
    // initial data
    widgets = createDefaultData()
  }
  const selectedId = widgets.length ? widgets[0].id : null

  return {
    widgets,
    selectedId,
    selectedWidget: () => {
      const { widgets, selectedId } = get()
      return widgets.find(item => item.id === selectedId) || null
    },

    addWidget: (widget: WidgetNode) => {
      set(({ selectedId, widgets }) => {
        const newWidgets = [...widgets]
        if (!selectedId) {
          newWidgets.push(widget)
        } else {
          const index = widgets.findIndex(item => item.id === selectedId)
          if (index === -1) {
            newWidgets.push(widget)
          } else {
            newWidgets.splice(index + 1, 0, widget)
          }
        }
        storage.set(S_N_WIDGET, newWidgets)
        return {
          widgets: newWidgets,
          selectedId: widget.id,
        }
      })
    },
    removeWidget: (id: string) => {
      set(({ widgets }) => {
        const index = widgets.findIndex(item => item.id === id)
        const newWidgets = widgets.filter(widget => widget.id !== id)
        const selectedId =
          newWidgets.length === 0
            ? null // Last one deleted
            : newWidgets.length > index
              ? newWidgets[index].id // Focus on next widget
              : newWidgets.length === index
                ? newWidgets[index - 1].id // Deleted the last one
                : null
        storage.set(S_N_WIDGET, newWidgets)
        return {
          widgets: newWidgets,
          selectedId,
        }
      })
    },
    setWidgets: (widgets: WidgetNode[]) => {
      set({ widgets })
      storage.set(S_N_WIDGET, widgets)
    },
    resetWidgets: () => {
      set({ widgets: [], selectedId: null })
      storage.remove(S_N_WIDGET)
    },
    setSelectedId: (id: string) => set({ selectedId: id }),
  }
})

/**
 * auto scroll selected widget into view
 */
useWidgetsStore.subscribe((state, prevState) => {
  const { selectedId } = state
  if (!selectedId) return
  if (selectedId === prevState.selectedId) return

  // wait react render, or use hooks but more complex
  setTimeout(() => {
    const element = document.getElementById(selectedId)
    if (!element) return

    const rect = element.getBoundingClientRect()
    const inView = rect.top >= 68 && rect.bottom <= window.innerHeight - 16
    if (!inView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  })
})

export { useWidgetsStore }
