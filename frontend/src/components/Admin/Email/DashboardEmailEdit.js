import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'  

export default function DashboardEmailEdit(props) {

    const createForm = useRef();  
    const [subscriberEmail, setSubscriberEmail] = useState("")  
    const [boxLoading, setBoxLoading] = useState(false) 
    
    const email = props.email
    useEffect(()=> {
        if (email) {  
            setSubscriberEmail(email.subscriberEmail) 
        }
    },[email]) 

    const onSubmit = (event) => {
        event.preventDefault()
        setBoxLoading(true) 
        axios.post(`https://uel-law.herokuapp.com/email/update/${email._id}`, {
            subscriberEmail: subscriberEmail
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
                                type="text" name="email" 
                                className="input"
                                value={subscriberEmail || ""}
                                onChange={(event)=>{
                                    setSubscriberEmail(event.target.value)
                                }} required
                                ></input>
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