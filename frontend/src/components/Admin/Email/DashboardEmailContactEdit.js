import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'  

export default function DashboardEmailContactEdit(props) {

    const createForm = useRef();  
    const [id, setId] = useState("")
    const [contactEmail, setContactEmail] = useState("") 
    const [contactName, setContactName] = useState("") 
    const [contactContent, setContactContent] = useState("") 
    const [contactStatus, setContactStatus] = useState("") 
    const [boxLoading, setBoxLoading] = useState(false) 
    
    const contact = props.contact
    useEffect(()=> {
        if (contact) {   
            setId(contact._id)
            setContactEmail(contact.contactEmail) 
            setContactName(contact.contactName) 
            setContactContent(contact.contactContent) 
            setContactStatus(contact.contactStatus) 
        }
    },[contact])  

    const onSubmit = (event) => {
        event.preventDefault()    
        setBoxLoading(true) 
        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/contact`, {
            id: id,
            contactEmail: contactEmail,
            contactName: contactName,
            contactContent: contactContent,
            contactStatus: contactStatus
        }).then(()=>{
            props.setCloseEditFunc(false);
            props.setToastFunc(true);
            setBoxLoading(false) 
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
                        <div className="dashboard-left flex">Email</div>
                        <div className="dashboard-right">
                            <input 
                                type="email" name="email" 
                                className="input"
                                value={contactEmail || ""}
                                onChange={(event)=>{
                                    setContactEmail(event.target.value)
                                }} required
                                ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" name="email" 
                                className="input"
                                value={contactName || ""}
                                onChange={(event)=>{
                                    setContactName(event.target.value)
                                }} required
                                ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Nội dung</div>
                        <div className="dashboard-right">
                            <textarea 
                                type="text" name="email" 
                                className="textarea"
                                value={contactContent || ""}
                                onChange={(event)=>{
                                    setContactContent(event.target.value)
                                }} required
                                ></textarea>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tình trạng</div>
                        <div className="dashboard-right">
                            <select 
                                className="input"
                                value={contactStatus || ""}
                                onChange={(event)=>{ 
                                    setContactStatus(event.target.value)
                                }} required
                                >
                                <option value="true">đã trả lời</option>
                                <option value="false">chưa trả lời</option>
                            </select>
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