import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faNewspaper, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'
import { withRouter } from 'react-router-dom' 
import { ChangeToSlug } from '../../../Func'

function DashboardNewsTable(props) {

    const [news, setNews] = useState([]) 
    const [constNews, setConstNews] = useState([])
    const [toast, setToast] = useState(false)
    const [id, setId] = useState("")
    const [deleteLoading, setDeleteLoading] = useState(false)
    
    useEffect(()=>{
        axios.get(`https://uel-law.herokuapp.com/news`)
            .then(res => {
                setNews(res.data.reverse())
                setConstNews(res.data)
            }
        )
    },[props.isChange])  

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const choosePage = (event) => {
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

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const current = news.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pages = [];

    if (pageNumbers.length > 3) {
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
    } else if (pageNumbers.length === 3) {
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
    } else if (pageNumbers.length === 2){
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1);
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage);
            }
        }
    } else {
        if (currentPage === 1) {
            pages.push(currentPage);
        }
    }

    const deleteOnClick = (event) => { 
        setDeleteLoading(true)
        axios.delete(`https://uel-law.herokuapp.com/news/${event.target.id}`)
        .then(()=>{
            setDeleteLoading(false)
            setNews(news.filter((item)=>{
                return item._id !== event.target.id
            }))
            setToast(true)
            setTimeout(()=>{
                setToast(false)
            }, 2000)
        })
    }

    const searchOnSubmit = (event) =>{
        event.preventDefault()
    }

    const searchOnChange = (event) => { 
        const searchInput = event.target.value
        const search = []
        for (let i in constNews) {
            if ((constNews[i].newsTitle).toLowerCase().includes(searchInput)) {
                search.push(constNews[i])
            }
        } 
        setNews(search)
    }  

    return (
        <div className="topfive flex-col" style={{width: '100%'}}>
            <div className={`headerbox flex-center pink`}>
                <FontAwesomeIcon icon={faNewspaper} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Tin t???c</p>
                </div>
                <div className="topfive-content flex-col">
                    <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                        X??a th??nh c??ng
                    </div>
                    <div className="dashboard-addnew flex">
                        <div 
                            className="dashboard-addnew-btn btn"
                            onClick={props.setOpenCreateFunc}
                        >
                            <div className="admin-btn">
                                <button className="admin-btn-box">Th??m m???i</button>
                            </div>
                        </div> 
                        <div className="dashboard-addnew-search">
                            <form 
                                onSubmit={searchOnSubmit}
                            >
                                <input 
                                    type="text" placeholder="T??m ki???m..."
                                    onChange={searchOnChange}
                                    className="input"
                                ></input>
                            </form>
                        </div>
                    </div>
                    <table className="dashboard-table" style={{tableLayout: 'fixed'}}>
                        <tbody>
                            <tr> 
                                <th 
                                    className="table-new-title" 
                                    id="NewsBanner"
                                >
                                    ???nh b??a
                                </th>
                                <th 
                                    className="table-new-title"  
                                    id="NewsTitle"
                                >
                                    Ti??u ?????
                                </th> 
                                <th 
                                    className="table-new-title"  
                                    id="NewsDate"
                                >
                                    Ng??y ????ng
                                </th>  
                                <th 
                                    className="table-new-title"  
                                >
                                    Category
                                </th>  
                                <th 
                                    className="table-new-title"
                                    id="Action"
                                >
                                    C??ng c???
                                </th>
                            </tr>
                            {
                                current.map((item, index) => {  
                                    const date = new Date(item.newsDate)
                                    const day = date.getDate()
                                    const monthNumber = date.getMonth() + 1
                                    const year = date.getFullYear() 
                                    let dayText = `${day}/${monthNumber}/${year}`
                                    return (
                                        <tr 
                                            key={index}
                                        >
                                            <td className="table-news-banner">
                                                <img src={item.newsBanner} alt=""></img>
                                            </td>
                                            <td
                                                onClick={()=>{
                                                    props.history.push(`/ban-tin/${ChangeToSlug(item.newsCate)}/${item.newsUrl}-${item._id}`)
                                                }}
                                                className="unrderline"
                                            > 
                                                <p>{item.newsTitle}</p>
                                            </td>
                                            <td id="NewsDate">
                                                <p>{dayText}</p>
                                            </td>  
                                            <td>
                                                <p>{item.newsCate}</p>
                                            </td>  
                                            <td>
                                                <div className="action-table flex">
                                                    <div 
                                                        className="action-item flex-center action-green"
                                                        onClick={props.setOpenEditFunc}
                                                        id={item._id}
                                                        >
                                                        <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faPencilAlt}/>
                                                    </div>
                                                    <div 
                                                        className="action-item flex-center action-red"
                                                        onClick={(event)=>{ 
                                                            deleteOnClick(event)
                                                            setId(event.target.id)
                                                        }}
                                                        id={item._id}
                                                    >
                                                        { id === item._id && deleteLoading && 
                                                            <div className="action-loading-icon"></div> 
                                                        }
                                                        { id !== item._id && !deleteLoading && 
                                                            <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                                                        }
                                                        { id !== item._id && deleteLoading && 
                                                            <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    
                    <div className="pagination-container flex" style={{ justifyContent: 'flex-end', margin: '20px 0'}}>
                        <div className="pagnigation flex-center" onClick={choosePage}>
                            <div id="-1" className={classNames({
                                pagnigation_disable: currentPage === 1
                            })}>???</div>
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
                            })}>???</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(DashboardNewsTable)