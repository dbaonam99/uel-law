import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../../Styles/Newsfeed.css'
import LibWidget from './LibWidget'
import LibraryItem from './LibraryItem'
import { ChangeToSlug } from '../../Func.js'
import classNames from 'classnames'

function LibraryBody(props) {
  const [library, setLibrary] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const newsPerPage = 6

  const choosePage = (event) => {
    window.scrollTo(0, 0)
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

  const indexOfLastNews = currentPage * newsPerPage
  const indexOfFirstNews = indexOfLastNews - newsPerPage
  const currentNews = library.slice(indexOfFirstNews, indexOfLastNews)
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(library.length / newsPerPage); i++) {
    pageNumbers.push(i)
  }

  const pages = []

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

  useEffect(() => {
    if (props.library) {
      if (props.location.pathname.split('/')[3]) {
        const arr = []
        for (let i in props.library) {
          if (
            ChangeToSlug(props.library[i].libraryCate) ===
              props.location.pathname.split('/')[3] &&
            ChangeToSlug(props.library[i].libraryGroup) ===
              props.location.pathname.split('/')[2]
          ) {
            arr.push(props.library[i])
          }
        }
        setLibrary(arr)
      } else if (
        !props.location.pathname.split('/')[3] &&
        props.location.pathname.split('/')[2]
      ) {
        const arr = []
        for (let i in props.library) {
          if (
            ChangeToSlug(props.library[i].libraryGroup) ===
            props.location.pathname.split('/')[2]
          ) {
            arr.push(props.library[i])
          }
        }
        setLibrary(arr)
      }
    }
  }, [props.library, props.location.pathname])

  console.log(props.library)

  return (
    <div className="NewsfeedBody flex">
      <div className="newsfeed-left">
        <div className="newsfeed-top flex">
          {currentNews &&
            currentNews.map((item, index) => {
              return <LibraryItem key={index} library={item} />
            })}
        </div>
        {library.length > 6 && (
          <div className="newsfeed-pag">
            <div className="pagination-container flex-center">
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
        )}
      </div>
      <LibWidget />
    </div>
  )
}
export default withRouter(LibraryBody)
