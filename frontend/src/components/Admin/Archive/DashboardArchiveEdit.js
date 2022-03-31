import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'  

export default function DashboardArchiveEdit(props) {

    const createForm = useRef(); 
    const [archiveName, setArchiveName] = useState("")
    const [archiveLink, setArchiveLink] = useState("")  
    const [id, setId] = useState("")
    const [boxLoading, setBoxLoading] = useState(false)
    
    const archive = props.archive 
    useEffect(()=> {
        if (archive) {  
            setId(archive._id)
            setArchiveName(archive.archiveName)
            setArchiveLink(archive.archiveLink) 
        }
    },[archive]) 

    const onSubmit = (event) => {
        event.preventDefault()   
        setBoxLoading(true)
        axios.put('https://uel-law.herokuapp.com/archive', {
            id: id,
            archiveName: archiveName,
            archiveLink: archiveLink, 
        }).then(()=>{
            setBoxLoading(false)
            props.setCloseEditFunc(false);
            props.setToastFunc(true);
        })
    }  

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Chỉnh sửa
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}> 
                <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setArchiveName(event.target.value)
                                }} 
                                value={archiveName}
                            required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Link tải</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setArchiveLink(event.target.value)
                                }} 
                                value={archiveLink}
                            required></input>
                        </div>
                    </div> 
                    <div className="admin-btn modal-btn">
                        <button className="admin-btn-box">
                            { !boxLoading && <p>Chỉnh sửa</p> }
                            { boxLoading && <div className="action-loading-icon"></div> }
                        </button>
                    </div> 
                </form>
            
            </div>
        </div>
    )
}