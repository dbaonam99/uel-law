export const ChangeToSlug = (title) => {
  var slug
  slug = title.toLowerCase()
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
  slug = slug.replace(/đ/gi, 'd')
  slug = slug.replace(
    /`|~|!|@|#|\||\$|%|\^|&|\*|\(|\)|\+|=|,|\.|\/|\?|>|<|'|"|:|;|_/gi,
    ''
  )
  slug = slug.replace(/ /gi, '-')
  slug = slug.replace(/-----/gi, '-')
  slug = slug.replace(/----/gi, '-')
  slug = slug.replace(/---/gi, '-')
  slug = slug.replace(/--/gi, '-')
  slug = '@' + slug + '@'
  slug = slug.replace(/@-|-@|@/gi, '')
  return slug
}

export const convertDataToHtml = (blocks) => {
  const newBlock = blocks[0].blocks
  var convertedHtml = ''
  newBlock.map((block) => {
    switch (block.type) {
      case 'table':
        const content = block.data.content
        let table = '<div class="editorjs-table"><table><tr>'
        content[0]?.map((item) => {
          return (table += `<th>${item}</th>`)
        })
        table += '</tr>'
        for (let i = 1; i < content.length; i++) {
          table += '<tr>'
          for (let j = 0; j < content[i].length; j++) {
            table += `<td>${content[i][j]}</td>`
          }
          table += '</tr>'
        }
        table += '</table></div>'
        convertedHtml += table
        break
      case 'header':
        convertedHtml += `<h${block.data.level} class="introduce-title-text">${block.data.text}</h${block.data.level}>`
        break
      case 'embded':
        convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`
        break
      case 'paragraph':
        convertedHtml += `<p style="text-align: ${block.data.alignment}">${block.data.text}</p>`
        break
      case 'delimiter':
        convertedHtml += '<hr />'
        break
      case 'image':
        convertedHtml +=
          `<div class="introduce-img flex-col flex-center">` +
          `<img src="${block.data.file.url}" alt=""></img>` +
          `<i class="introduce-title-img">${block.data.caption}</i>` +
          `</div>`
        break
      case 'simpleImage':
        convertedHtml +=
          `<div class="introduce-img flex-col flex-center">` +
          `<img src="${block.data.url}" alt=""></img>` +
          `<i class="introduce-title-img">${block.data.caption}</i>` +
          `</div>`
        break
      case 'list':
        convertedHtml += '<ul>'
        block.data.items.forEach(function (li) {
          convertedHtml += `<li>${li}</li>`
        })
        convertedHtml += '</ul>'
        break
      default:
        console.log('Unknown block type', block.type)
        break
    }
    return true
  })
  return convertedHtml
}
