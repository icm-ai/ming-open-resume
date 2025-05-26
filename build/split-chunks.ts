import type { GetManualChunk, GetModuleInfo } from 'rollup'

export function splitChunks(): GetManualChunk {
  const cache = new Map<string, boolean>()
  return (id, { getModuleInfo }) => {
    if (
      isInNodeModules(id) &&
      !isCSSRequest(id) &&
      staticImportedByEntry(id, getModuleInfo, cache)
    ) {
      if (id.includes('@tiptap') || id.includes('prosemirror')) {
        return 'vendor-tiptap'
      }
      if (id.includes('react@19')) {
        return 'vendor-react'
      }
      return 'vendor'
    }
  }
}

function isInNodeModules(id: string): boolean {
  return id.includes('node_modules')
}

const CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/
export const isCSSRequest = (request: string): boolean => CSS_LANGS_RE.test(request)

function staticImportedByEntry(
  id: string,
  getModuleInfo: GetModuleInfo,
  cache: Map<string, boolean>,
  importStack: string[] = [],
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some(importer =>
    staticImportedByEntry(importer, getModuleInfo, cache, importStack.concat(id)),
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
