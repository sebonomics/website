import type { ComponentType } from "react"
import { BookOpen, FileText, PenLine, TrendingUp, User } from "lucide-react"

export type PageIconType = ComponentType<{ className?: string; strokeWidth?: number }>

/** one icon per page, shared by the sidebar and the topbar breadcrumb */
export const pageIcons = {
  about: User as PageIconType,
  investments: TrendingUp as PageIconType,
  writing: PenLine as PageIconType,
  reading: BookOpen as PageIconType,
  post: FileText as PageIconType,
}
