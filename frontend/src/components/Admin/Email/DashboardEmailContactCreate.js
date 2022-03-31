import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 

export default function DashboardEmailContactCreate(props) {

    const createForm = useRef();  
    const [contactEmail, setContactEmail] = useState("") 
    const [contactName, setContactName] = useState("") 
    const [contactContent, setContactContent] = useState("") 
    const [boxLoading, setBoxLoading] = useState(false) 

    const onSubmit = (event) => {
        event.preventDefault()  
        setBoxLoading(true)

        axios.post('https://uel-law.herokuapp.com/contact', {
            contactEmail: contactEmail,
            contactName: contactName,
            contactContent: contactContent
        })
        .then(()=>{
            setBoxLoading(false)
            props.setCloseCreateFunc(false);
            props.setToastFunc(true);
        })
    }  

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Thêm mới
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseCreateFunc(false);
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
                    <div className="admin-btn modal-btn">
                        <button className="admin-btn-box">
                            { !boxLoading && <p>Thêm mới</p> }
                            { boxLoading && <div className="action-loading-icon"></div> }
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    )
}