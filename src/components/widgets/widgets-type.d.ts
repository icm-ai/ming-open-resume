import Element = React.JSX.Element

export type WidgetType =
  | 'BasicInfo'
  | 'TitleSection'
  | 'ExperienceTime'
  | 'TextContent'
  | 'ImageSection'

export interface WidgetMaterial {
  type: WidgetType
  icon: Element
  title: string
}

export type WidgetNode =
  | {
      type: 'BasicInfo'
      id: string
      data: BasicInfoData
    }
  | {
      type: 'TitleSection'
      id: string
      data: TitleSectionData
    }
  | {
      type: 'ExperienceTime'
      id: string
      data: ExperienceTimeData
    }
  | {
      type: 'TextContent'
      id: string
      data: TextContentData
    }
  | {
      type: 'ImageSection'
      id: string
      data: ImageSectionData
    }

export interface StyleData {
  marginTop: number
  marginBottom: number
}
interface CommonStyleData {
  styleData: StyleData
}

export interface BasicInfoData extends CommonStyleData {
  propsData: {
    avatarUrl: string
    avatarSize: number
    avatarRound: boolean
    name: string
    jobTitle: string
    linksGroup: [LinkGroupData, LinkGroupData, LinkGroupData]
  }
}
export type LinkGroupData = LinkItemData[]
export interface LinkItemData {
  href: string
  content: string
  icon: string
}

export interface TitleSectionData extends CommonStyleData {
  propsData: {
    title: string
  }
}

export interface ExperienceTimeData extends CommonStyleData {
  propsData: {
    title: string
    dateRange: string
  }
}

export interface TextContentData extends CommonStyleData {
  propsData: {
    content: string
  }
}

export interface ImageSectionData extends CommonStyleData {
  propsData: {
    url: string
    imageSize: number
    borderRadius: number
  }
}
