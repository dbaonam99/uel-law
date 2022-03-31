import '../../Styles/Newsfeed.css'
import Widget from './Widget'
import News from './News'
import { withRouter } from 'react-router-dom' 
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ChangeToSlug } from '../../Func'

function NewsfeedBody(props) {  
 
    const [news, setNews] = useState([])

    useEffect(()=>{
        if (props.news) {
            if (props.location.pathname.split("/")[2]) {
                const arr = []
                for (let i in props.news) {
                    if (ChangeToSlug(props.news[i].newsCate) === props.location.pathname.split("/")[2]) {
                        arr.push(props.news[i])
                    }
                }
                setNews(arr.reverse())
            } else {
                setNews(props.news.reverse())
            }
        }
    }, [props.news, props.location.pathname])

    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;

    const choosePage = (event) => {
        window.scrollTo(0,0)
        if (Number(event.target.id) === 0) {
            setCurrentPage(currentPage)
        } else if (Number(event.target.id) === -1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                setCurrentPage(1);
            }
        } else if (Number(event.target.id) === 999) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(Number(event.target.id))
        }
    }

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pages = [];

    if (currentPage === 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
    } else {
        if (currentPage === 1) {
            pages.push(currentPage, currentPage + 1, currentPage + 2 );
        } else if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
            pages.push(currentPage -1, currentPage, currentPage + 1);
        } else if (currentPage === pageNumbers.length - 1) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else {
            pages.push(currentPage - 2, currentPage - 1, currentPage);
        }
    }

    return (
        <div className="NewsfeedBody flex">  
            <div className="newsfeed-left">
                <div className="newsfeed-top flex">
                    { currentNews &&
                        currentNews.map((item, index) => {
                            return (
                                <News
                                    key={index}
                                    news={item}
                                /> 
                            )
                        })
                    }
                </div>
                { news.length > 6 &&
                    <div className="newsfeed-pag">
                        <div className="pagination-container flex-center">
                            <div className="pagnigation flex-center" onClick={choosePage}>
                                <div id="-1" className={classNames({
                                    pagnigation_disable: currentPage === 1
                                })}>←</div>
                                { pages.map(function(number, index) { 
                                    if (currentPage === number) {
                                        return (
                                            <div key={number} id={number} className="pagnigation-active">
                                                {number}
                                            </div>
                                        )
                                    } else {
                                        return (
                                        <div 
                                            key={number}
                                            id={number}
                                            >
                                                {number}
                                        </div>
                                        )
                                    } 
                                })}
                                <div id="999" className={classNames({
                                    pagnigation_disable: currentPage === pageNumbers.length
                                })}>→</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <Widget/>
        </div>
    )
}
export default withRouter(NewsfeedBody)