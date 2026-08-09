import type { ComponentType } from "react"
import { Briefcase, FileText, PenLine, TrendingUp, User, Users } from "lucide-react"

export type PageIconType = ComponentType<{ className?: string; strokeWidth?: number }>

/** one icon per page, shared by the sidebar and the topbar breadcrumb */
export const pageIcons = {
  about: User as PageIconType,
  experience: Briefcase as PageIconType,
  investments: TrendingUp as PageIconType,
  people: Users as PageIconType,
  writing: PenLine as PageIconType,
  post: FileText as PageIconType,
}
