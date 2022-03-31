import Embed from '@editorjs/embed'
import Table from 'editorjs-table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import EditorJs from 'react-editor-js'
import Alignment from 'editorjs-paragraph-with-alignment'

export const TOOLS = {
  embed: Embed,
  table: Table,
  paragraph: {
    class: Alignment,
    Inline: true,
  },
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: 'https://uel-law.herokuapp.com/image', // Your backend file uploader endpoint
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
export default function DashboardEditor(props) {
  const data = props.data[0]
  const handleOnchangeData = (api, data) => {
    props.setContent(data)
  }

  return (
    <EditorJs
      tools={TOOLS}
      data={data}
      onChange={handleOnchangeData}
    ></EditorJs>
  )
}
