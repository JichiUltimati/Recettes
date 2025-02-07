import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/reverseSearch.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface BacklinksOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: BacklinksOptions = {
  hideWhenEmpty: true,
}

export default ((opts?: Partial<BacklinksOptions>) => {
  const options: BacklinksOptions = { ...defaultOptions, ...opts }
  const ReverseSearch: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))
    if (options.hideWhenEmpty && backlinkFiles.length == 0) {
      return null
    }
    // check if comments should be displayed according to frontmatter
    const disableReverseSearch: boolean =
    typeof fileData.frontmatter?.reverseSearch !== "undefined" &&
      (!fileData.frontmatter?.reverseSearch || fileData.frontmatter?.reverseSearch === "false")
    if (disableReverseSearch) {
      return <></>
    }
    return (
      <div class={classNames(displayClass, "backlinks")}>
        <h1>{i18n(cfg.locale).components.reverseSearch.title}</h1>
        <div class="flex-container">
          {backlinkFiles.length > 0 ? (
            backlinkFiles.map((page) => {
              const title = page.frontmatter?.title
              const image = "Recettes/static/".concat(page.frontmatter?.socialImage ?? "no-image.png")
              const tags = page.frontmatter?.tags ?? []

              return (
              <div class="gallery">
              <a href={resolveRelative(fileData.slug!, page.slug!)} class='card'>
              {image && <img src={image} alt={title ?? "Page Image"} />}
              <div class="desc"><h3>{title}</h3></div>
              </a>
              </div>
            )
          })
          ) : (
            <div>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</div>
          )}
        </div>
      </div>
    )
  }

  ReverseSearch.css = style

  return ReverseSearch
}) satisfies QuartzComponentConstructor
