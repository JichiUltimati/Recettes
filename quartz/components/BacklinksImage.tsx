import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
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
  const BacklinksImage: QuartzComponent = ({
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
      <div class={classNames(displayClass, "backlinksImage")}>
        <h1>{i18n(cfg.locale).components.backlinksImage.title}</h1>
        <div class="flex-container">
          {backlinkFiles.length > 0 ? (
            backlinkFiles.map((page) => {
              const title = page.frontmatter?.title
              const image = "/static/".concat(page.frontmatter?.socialImage ?? "no-image.png")
              const tags = page.frontmatter?.tags ?? []

              return (
              <div class="gallery">
              <a href={resolveRelative(fileData.slug!, page.slug!)} class='internal'>
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

  BacklinksImage.css = style + `
  .desc h3 {
    margin: 12px 0px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  
  a.internal{
    display: block;
    margin: 0;
    padding: 0;
  }
  
  div.gallery {
    border: 0px solid #ccc;
    float: left;
    width: 200px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  
  div.gallery:hover {
    border: 1px solid #777;
    box-sizing: border-box;
    border-radius: 5px;
  }
  
  div.gallery img {
    object-fit:cover;
    width:100%;
    height:200;
    display: block;
    margin: 0;
  
  }
  
  div.desc {
    text-align: left;
    margin: 5px;
  }
  
  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 20px;
  }
  `

  return BacklinksImage
}) satisfies QuartzComponentConstructor
