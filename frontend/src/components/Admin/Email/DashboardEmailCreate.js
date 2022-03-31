import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 

export default function DashboardEmailCreate(props) {

    const createForm = useRef();  
    const [subscriberEmail, setSubscriberEmail] = useState("") 
    const [boxLoading, setBoxLoading] = useState(false) 

    const onSubmit = (event) => {
        event.preventDefault()  

        setBoxLoading(true)
        axios.post('https://uel-law.herokuapp.com/email', {
            subscriber: subscriberEmail
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
                                value={subscriberEmail || ""}
                                onChange={(event)=>{
                                    setSubscriberEmail(event.target.value)
                                }} required
                                ></input>
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