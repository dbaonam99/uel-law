
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateFromHTML } from 'draft-js-import-html'
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );
}
export default function DashboardEmailNewsEditor(props) {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    props.setAboutUsContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  useEffect(() => {
    if (props.content) {
      let contentState = stateFromHTML(props.content);
      let test = EditorState.createWithContent(contentState);
      setEditorState(EditorState.moveFocusToEnd(test));
    }
  }, [props.content]);

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarclassName="
        wrapperClassName="wrapperclassName="
        editorClassName="editorclassName="
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    </div>
  )
}