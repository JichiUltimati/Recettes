import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"
import { stringify } from "querystring"
import style from "./styles/pageGallery.scss"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
  //   if (f1.dates && f2.dates) {
  //     // sort descending
  //     return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
  //   } else if (f1.dates && !f2.dates) {
  //     // prioritize files with dates
  //     return -1
  //   } else if (!f1.dates && f2.dates) {
  //     return 1
  //   }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

export const PageGallery: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <div class="flex-container">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const image = "/Recettes/static/".concat(page.frontmatter?.socialImage ?? "no-image.png")
        const tags = page.frontmatter?.tags ?? []

        return (
          <div class="gallery">
            <a href={resolveRelative(fileData.slug!, page.slug!)} class='internal'>
            {image && <img src={image} alt={title ?? "Page Image"} />}
            <div class="desc"><h3>{title}</h3></div>
            </a>
          </div>
        )
      })}
    </div>
  )
}

PageGallery.css = style
