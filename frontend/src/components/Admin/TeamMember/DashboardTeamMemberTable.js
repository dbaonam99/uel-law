import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPencilAlt, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'

export default function DashboardTeamMemberTable(props) {

    const [team, setTeam] = useState([]) 
    const [constTeam, setConstTeam] = useState([])
    const [toast, setToast] = useState(false)
    const [id, setId] = useState("")
    const [deleteLoading, setDeleteLoading] = useState(false)
    
    useEffect(()=>{
        axios.get(`https://uel-law.herokuapp.com/team`)
            .then(res => {
                setTeam(res.data.reverse())
                setConstTeam(res.data)
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
    const current = team.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(team.length / itemsPerPage); i++) {
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
        axios.delete(`https://uel-law.herokuapp.com/team/${event.target.id}`)
        .then(()=>{
            setDeleteLoading(false)
            setTeam(team.filter((item)=>{
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
        for (let i in constTeam) {
            if ((constTeam[i].teamMemberName).toLowerCase().includes(searchInput)) {
                search.push(constTeam[i])
            }
        }
        setTeam(search)
    } 

    return (
        <div className="topfive flex-col" style={{width: '100%'}}>
            <div className={`headerbox flex-center pink`}>
                <FontAwesomeIcon icon={faUserFriends} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>Th??nh vi??n team</p>
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
                                    id="QuoteAvt"
                                >
                                    ???nh
                                </th>
                                <th 
                                    className="table-new-title" 
                                >
                                    T??n
                                </th>
                                <th 
                                    className="table-new-title"
                                >
                                    Ch???c v???
                                </th>
                                <th 
                                    className="table-new-title" 
                                    id="TeamContact"
                                >
                                    Li??n h???
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
                                    return (
                                        <tr key={index}>
                                            <td id="QuoteAvt">
                                                <img className="table-admin-avt" src={item.teamMemberAvt} alt=""></img>
                                            </td>
                                            <td>
                                                <p>{item.teamMemberName}</p>
                                            </td>
                                            <td>
                                                <p>{item.teamMemberTitle}</p>
                                            </td>
                                            <td className="TeamContact"> 
                                                <p>Facebook: {item.teamMemberFacebook}</p>
                                                <p>Instagram: {item.teamMemberInsta}</p>
                                                <p>Email: {item.teamMemberGmail}</p>
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