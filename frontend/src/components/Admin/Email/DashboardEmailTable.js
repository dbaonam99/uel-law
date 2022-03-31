import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEnvelope, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'

export default function DashboardEmailTable(props) {

    const [email, setEmail] = useState([]) 
    const [constEmail, setConstEmail] = useState([])
    const [toast, setToast] = useState(false)
    const [id, setId] = useState("")
    const [deleteLoading, setDeleteLoading] = useState(false)
    
    useEffect(()=>{
        axios.get(`https://uel-law.herokuapp.com/email`)
            .then(res => {
                setEmail(res.data.reverse())
                setConstEmail(res.data)
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
    const current = email.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(email.length / itemsPerPage); i++) {
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
        axios.delete(`https://uel-law.herokuapp.com/email/${event.target.id}`)
        .then(()=>{
            setDeleteLoading(false)
            setEmail(email.filter((item)=>{
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
        for (let i in constEmail) {
            if ((constEmail[i].subscriberEmail).toLowerCase().includes(searchInput)) {
                search.push(constEmail[i])
            } 
        } 
        setEmail(search)
    }  

    return (
        <div className="topfive flex-col" style={{width: '100%'}}>
            <div className={`headerbox flex-center green`}>
                <FontAwesomeIcon icon={faEnvelope} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Email đăng ký</p>
                </div>
                <div className="topfive-content flex-col">
                    <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
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
                            <form 
                                onSubmit={searchOnSubmit}
                            >
                                <input 
                                    type="text" placeholder="Tìm kiếm..."
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
                                    id="IntroduceName"
                                >
                                    Email
                                </th>
                                <th 
                                    className="table-new-title" 
                                    id="SubscriberSent" 
                                >
                                    Đã gửi
                                </th>
                                <th 
                                    className="table-new-title"  
                                    id="SubscriberSent" 
                                >
                                    Đã đọc
                                </th> 
                                <th 
                                    className="table-new-title"
                                    id="Action"
                                >
                                    Công cụ
                                </th>
                            </tr>
                            {
                                current.reverse().map((item, index) => { 
                                    let count = 0;
                                    for (let i in item.sendEmail) {
                                        if (item.sendEmail[i].isSeen === true) {
                                            count++
                                        }
                                    }
                                    return (
                                        <tr key={index}>
                                            <td className="table-mobile-subscribername">
                                                <p>{item.subscriberEmail}</p>
                                            </td>
                                            <td className="table-mobile-subscribersent">
                                                <p>{item.sendEmail.length}</p>
                                            </td>
                                            <td className="table-mobile-subscriberread">
                                                <p>{count}</p>
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
            </div>
        </div>
    )
}