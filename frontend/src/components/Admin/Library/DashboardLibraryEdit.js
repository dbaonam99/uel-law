import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import DashboardEditor from './DashboardEditor'
import { ChangeToSlug } from '../../../Func.js'

export default function DashboardLibraryEdit(props) {
  const createForm = useRef()
  const [border, setBorder] = useState(false)
  const [libraryTitle, setLibraryTitle] = useState('')
  const [libraryGroup, setLibraryGroup] = useState('')
  const [libraryCate, setLibraryCate] = useState('')
  const [libraryContent, setLibraryContent] = useState('')
  const [newCateLibrary, setNewCateLibrary] = useState('')
  const [newGroupLibrary, setNewGroupLibrary] = useState('')
  const [libraryCateList, setLibraryCateList] = useState([])
  const [libraryGroupList, setLibraryGroupList] = useState([])
  const [id, setId] = useState('')
  const [boxLoading, setBoxLoading] = useState(false)

  const library = props.library

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/library`).then((res) => {
      const libCateArr = []
      for (let i in res.data) {
        libCateArr.push(res.data[i].libraryCate)
      }
      var unique = libCateArr.filter(function (elem, index, self) {
        return index === self.indexOf(elem)
      })
      setLibraryCateList(unique)
      const libGroupArr = []
      for (let i in res.data) {
        libGroupArr.push(res.data[i].libraryGroup)
      }
      var unique2 = libGroupArr.filter(function (elem, index, self) {
        return index === self.indexOf(elem)
      })
      setLibraryGroupList(unique2)
    })
  }, [])

  useEffect(() => {
    if (library) {
      setId(library._id)
      setLibraryTitle(library.libraryTitle)
      setLibraryGroup(library.libraryGroup)
      setLibraryCate(library.libraryCate)
      setLibraryContent(library.libraryContent)
    }
  }, [library])

  const onSubmit = (event) => {
    event.preventDefault()
    setBoxLoading(true)
    axios
      .put(`${process.env.REACT_APP_API_ENDPOINT}/library`, {
        id: id,
        libraryTitle: libraryTitle,
        libraryUrl: ChangeToSlug(libraryTitle),
        libraryGroup: libraryGroup,
        libraryCate: libraryCate,
        libraryContent: libraryContent,
      })
      .then(() => {
        props.setCloseEditFunc(false)
        props.setToastFunc(true)
        setBoxLoading(false)
      })
  }

  return (
    <div className="DashboardProductInfo">
      <div className="create-box">
        <div className="create-box-title flex">
          <div className="create-box-title-text">Chỉnh sửa</div>
          <div
            className="create-box-title-close flex-center"
            onClick={() => {
              props.setCloseEditFunc(false)
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          ref={createForm}
        >
          <div className="create-box-row flex">
            <div className="dashboard-left flex">Tiêu đề</div>
            <div className="dashboard-right">
              <input
                type="text"
                className="input"
                onChange={(event) => {
                  setLibraryTitle(event.target.value)
                }}
                value={libraryTitle}
                required
              ></input>
            </div>
          </div>
          <div className="create-box-row flex">
            <div className="dashboard-left flex">Nhóm</div>
            <div className="dashboard-right flex-center">
              <select
                style={{ width: '350px' }}
                onChange={(event) => {
                  setLibraryGroup(event.target.value)
                }}
                value={libraryGroup}
                className="input"
              >
                {libraryGroupList.length > 0 &&
                  libraryGroupList.map((item, index) => {
                    return <option key={index}>{item}</option>
                  })}
              </select>
              <input
                type="text"
                className="input"
                placeholder="Nhóm mới"
                style={{ margin: '0 10px' }}
                onChange={(event) => {
                  setNewGroupLibrary(event.target.value)
                }}
                value={newGroupLibrary}
              ></input>
              <div
                className="admin-btn modal-btn"
                style={{ width: 'max-content' }}
                onClick={() => {
                  setLibraryGroupList((libraryGroupList) => [
                    ...libraryGroupList,
                    newGroupLibrary,
                  ])
                  setNewGroupLibrary('')
                  setLibraryGroup(newGroupLibrary)
                }}
              >
                <div className="admin-btn-box" style={{ fontSize: '11px' }}>
                  Thêm
                </div>
              </div>
            </div>
          </div>
          <div className="create-box-row flex">
            <div className="dashboard-left flex">Category</div>
            <div className="dashboard-right flex-center">
              <select
                style={{ width: '350px' }}
                onChange={(event) => {
                  setLibraryCate(event.target.value)
                }}
                value={libraryCate}
                className="input"
              >
                {libraryCateList.length > 0 &&
                  libraryCateList.map((item, index) => {
                    return <option key={index}>{item}</option>
                  })}
              </select>
              <input
                type="text"
                className="input"
                placeholder="Category mới"
                style={{ margin: '0 10px' }}
                onChange={(event) => {
                  setNewCateLibrary(event.target.value)
                }}
                value={newCateLibrary}
              ></input>
              <div
                className="admin-btn modal-btn"
                style={{ width: 'max-content' }}
                onClick={() => {
                  setLibraryCateList((libraryCateList) => [
                    ...libraryCateList,
                    newCateLibrary,
                  ])
                  setNewCateLibrary('')
                  setLibraryCate(newCateLibrary)
                }}
              >
                <div className="admin-btn-box" style={{ fontSize: '11px' }}>
                  Thêm
                </div>
              </div>
            </div>
          </div>
          <div
            className={border ? 'border_editor editor-box' : 'editor-box'}
            onClick={() => {
              setBorder(true)
            }}
          >
            {libraryContent && (
              <DashboardEditor
                data={libraryContent}
                setContent={setLibraryContent}
              />
            )}
          </div>
          <div className="admin-btn modal-btn">
            <button className="admin-btn-box">
              {!boxLoading && <p>Chỉnh sửa</p>}
              {boxLoading && <div className="action-loading-icon"></div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
