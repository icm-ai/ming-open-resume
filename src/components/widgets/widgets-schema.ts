import { z } from 'zod'

const linkItemSchema = z.object({
  href: z.string(),
  content: z.string(),
  icon: z.string(),
})

const basicInfoSchema = z.object({
  type: z.literal('BasicInfo'),
  id: z.string(),
  data: z.object({
    propsData: z.object({
      avatarUrl: z.string(),
      avatarSize: z.number(),
      avatarRound: z.boolean(),
      name: z.string(),
      jobTitle: z.string(),
      linksGroup: z.tuple([
        z.array(linkItemSchema),
        z.array(linkItemSchema),
        z.array(linkItemSchema),
      ]),
    }),
    styleData: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const titleSectionSchema = z.object({
  type: z.literal('TitleSection'),
  id: z.string(),
  data: z.object({
    propsData: z.object({
      title: z.string(),
    }),
    styleData: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const experienceTimeSchema = z.object({
  type: z.literal('ExperienceTime'),
  id: z.string(),
  data: z.object({
    propsData: z.object({
      title: z.string(),
      dateRange: z.string(),
    }),
    styleData: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const textContentSchema = z.object({
  type: z.literal('TextContent'),
  id: z.string(),
  data: z.object({
    propsData: z.object({
      content: z.string(),
    }),
    styleData: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const imageSectionSchema = z.object({
  type: z.literal('ImageSection'),
  id: z.string(),
  data: z.object({
    propsData: z.object({
      url: z.string(),
      imageSize: z.number(),
      borderRadius: z.number().optional().default(0),
    }),
    styleData: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const widgetSchema = z.discriminatedUnion('type', [
  basicInfoSchema,
  titleSectionSchema,
  experienceTimeSchema,
  textContentSchema,
  imageSectionSchema,
])

// Schema for individual items within the VisualList
export const visualListItemSchema = z.object({
  icon: z.string(), // For icon name or path
  label: z.string(),
  level: z.number().min(0).max(5).optional(), // Proficiency level, e.g., 0-5 stars/dots
})

// Schema for the VisualList component itself
export const visualListSchema = z.object({
  type: z.literal('VisualList'),
  id: z.string(),
  data: z.object({
    propsData: z.object({
      title: z.string(),
      items: z.array(visualListItemSchema),
      layout: z.enum(['grid', 'list']), // How items are displayed
      iconStyle: z.enum(['circle', 'square', 'none']), // Visual style for the icon/level display
    }),
    styleData: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

// Add VisualListSchema to the main discriminated union
export const widgetSchema = z.discriminatedUnion('type', [
  basicInfoSchema,
  titleSectionSchema,
  experienceTimeSchema,
  textContentSchema,
  imageSectionSchema,
  visualListSchema, // Added new schema
])

export const widgetsSchema = widgetSchema.array()
