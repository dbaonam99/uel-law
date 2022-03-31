import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faPencilAlt,
  faBookOpen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { ChangeToSlug } from '../../../Func'

function DashboardLibraryTable(props) {
  const [library, setLibrary] = useState([])
  const [constLibrary, setConstLibrary] = useState([])
  const [toast, setToast] = useState(false)
  const [id, setId] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    axios.get(`https://uel-law.herokuapp.com/library`).then((res) => {
      setLibrary(res.data.reverse())
      setConstLibrary(res.data)
    })
  }, [props.isChange])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const choosePage = (event) => {
    if (Number(event.target.id) === 0) {
      setCurrentPage(currentPage)
    } else if (Number(event.target.id) === -1) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else {
        setCurrentPage(1)
      }
    } else if (Number(event.target.id) === 999) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(Number(event.target.id))
    }
  }

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const current = library.slice(indexOfFirst, indexOfLast)
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(library.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const pages = []

  if (pageNumbers.length > 3) {
    if (currentPage === 2) {
      pages.push(currentPage - 1, currentPage, currentPage + 1)
    } else {
      if (currentPage === 1) {
        pages.push(currentPage, currentPage + 1, currentPage + 2)
      } else if (currentPage === 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      } else if (currentPage === pageNumbers.length - 1) {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage)
      }
    }
  } else if (pageNumbers.length === 3) {
    if (currentPage === 2) {
      pages.push(currentPage - 1, currentPage, currentPage + 1)
    } else {
      if (currentPage === 1) {
        pages.push(currentPage, currentPage + 1, currentPage + 2)
      } else if (currentPage === 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      } else if (currentPage === pageNumbers.length - 1) {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage)
      }
    }
  } else if (pageNumbers.length === 2) {
    if (currentPage === 2) {
      pages.push(currentPage - 1, currentPage)
    } else {
      if (currentPage === 1) {
        pages.push(currentPage, currentPage + 1)
      } else if (currentPage === 2) {
        pages.push(currentPage - 1, currentPage)
      }
    }
  } else {
    if (currentPage === 1) {
      pages.push(currentPage)
    }
  }

  const deleteOnClick = (event) => {
    setDeleteLoading(true)
    axios
      .delete(`https://uel-law.herokuapp.com/library/${event.target.id}`)
      .then(() => {
        setDeleteLoading(false)
        setLibrary(
          library.filter((item) => {
            return item._id !== event.target.id
          })
        )
        setToast(true)
        setTimeout(() => {
          setToast(false)
        }, 2000)
      })
  }

  const searchOnSubmit = (event) => {
    event.preventDefault()
  }

  const searchOnChange = (event) => {
    const searchInput = event.target.value
    const search = []
    for (let i in constLibrary) {
      if (constLibrary[i].libraryTitle.toLowerCase().includes(searchInput)) {
        search.push(constLibrary[i])
      }
    }
    setLibrary(search)
  }

  return (
    <div className="topfive flex-col" style={{ width: '100%' }}>
      <div className={`headerbox flex-center orange`}>
        <FontAwesomeIcon icon={faBookOpen} className="icon" />
      </div>
      <div className="top-location-container">
        <div className="headerbox-header">
          <p>Thư viện</p>
        </div>
        <div className="topfive-content flex-col">
          <div
            className={toast ? 'toast toast-show' : 'toast'}
            style={{ top: '20px' }}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
            Xóa thành công
          </div>
          <div className="dashboard-addnew flex">
            <div
              className="dashboard-addnew-btn btn"
              onClick={props.setOpenCreateFunc}
            >
              <div className="admin-btn">
                <button className="admin-btn-box">Thêm mới</button>
              </div>
            </div>
            <div className="dashboard-addnew-search">
              <form onSubmit={searchOnSubmit}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  onChange={searchOnChange}
                  className="input"
                ></input>
              </form>
            </div>
          </div>
          <table className="dashboard-table" style={{ tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <th className="table-new-title" id="NewsTitle">
                  Tiêu đề
                </th>
                <th className="table-new-title" id="LibraryGroup">
                  Nhóm
                </th>
                <th className="table-new-title" id="NewsDate">
                  Ngày đăng
                </th>
                <th className="table-new-title">Danh mục</th>
                <th className="table-new-title" id="Action">
                  Công cụ
                </th>
              </tr>
              {current.map((item, index) => {
                const date = new Date(item.libraryDate)
                const day = date.getDate()
                const monthNumber = date.getMonth()
                const year = date.getFullYear()
                let dayText = `${day}/${monthNumber}/${year}`
                return (
                  <tr key={index}>
                    <td
                      onClick={() => {
                        props.history.push(
                          `/thu-vien/${ChangeToSlug(
                            item.libraryGroup
                          )}/${ChangeToSlug(item.libraryCate)}/${
                            item.libraryUrl
                          }-${item._id}`
                        )
                      }}
                      className="unrderline"
                    >
                      <p>{item.libraryTitle}</p>
                    </td>
                    <td id="LibraryGroup">
                      <p>{item.libraryGroup}</p>
                    </td>
                    <td id="NewsDate">
                      <p>{dayText}</p>
                    </td>
                    <td>
                      <p>{item.libraryCate}</p>
                    </td>
                    <td>
                      <div className="action-table flex">
                        <div
                          className="action-item flex-center action-green"
                          onClick={props.setOpenEditFunc}
                          id={item._id}
                        >
                          <FontAwesomeIcon
                            style={{ pointerEvents: 'none' }}
                            icon={faPencilAlt}
                          />
                        </div>
                        <div
                          className="action-item flex-center action-red"
                          onClick={(event) => {
                            deleteOnClick(event)
                            setId(event.target.id)
                          }}
                          id={item._id}
                        >
                          {id === item._id && deleteLoading && (
                            <div className="action-loading-icon"></div>
                          )}
                          {id !== item._id && !deleteLoading && (
                            <FontAwesomeIcon
                              style={{ pointerEvents: 'none' }}
                              icon={faTimes}
                            />
                          )}
                          {id !== item._id && deleteLoading && (
                            <FontAwesomeIcon
                              style={{ pointerEvents: 'none' }}
                              icon={faTimes}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div
            className="pagination-container flex"
            style={{ justifyContent: 'flex-end', margin: '20px 0' }}
          >
            <div className="pagnigation flex-center" onClick={choosePage}>
              <div
                id="-1"
                className={classNames({
                  pagnigation_disable: currentPage === 1,
                })}
              >
                ←
              </div>
              {pages.map(function (number, index) {
                if (currentPage === number) {
                  return (
                    <div
                      key={number}
                      id={number}
                      className="pagnigation-active"
                    >
                      {number}
                    </div>
                  )
                } else {
                  return (
                    <div key={number} id={number}>
                      {number}
                    </div>
                  )
                }
              })}
              <div
                id="999"
                className={classNames({
                  pagnigation_disable: currentPage === pageNumbers.length,
                })}
              >
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(DashboardLibraryTable)