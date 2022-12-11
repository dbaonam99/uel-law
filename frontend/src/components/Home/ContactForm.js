import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useState } from 'react'
import '../../Styles/Home.css' 

export default function ContactForm(props) {  

    const [contactEmail, setContactEmail] = useState("") 
    const [contactName, setContactName] = useState("") 
    const [contactContent, setContactContent] = useState("") 

    const onSubmit = (event) => {
        event.preventDefault()  

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/contact`, {
            contactEmail: contactEmail,
            contactName: contactName,
            contactContent: contactContent
        })
        .then(()=>{
            alert("Gửi email thành công!")
            setContactEmail("")
            setContactContent("")
            setContactName("")
        })
    } 

    return (
        <div className="ContactForm">   
            <div className="contact-box">
                <div className="about-header flex" style={{justifyContent: 'space-between'}}>
                    <div className="about-header-left white">
                        <div className="about-title">Liên hệ</div>
                        <div className="about-title-text">{props.home.homeContactTitle}</div>
                        <div className="h-gap"></div>
                    </div>
                    <div className="about-header-center flex">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/>
                        <p>{props.home.homeContactAddress}</p>
                    </div>
                    <div className="about-header-right flex-col">
                        <div className="flex">
                            <FontAwesomeIcon icon={faPhone} className="icon"/>
                            <p>{props.home.homeContactPhone}</p>
                        </div>
                        <div className="flex">
                            <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                            <p>{props.home.homeContactEmail}</p>
                        </div> 
                    </div>
                </div>
                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="contact-info">
                        <input 
                            placeholder="Họ và tên..."
                            value={contactName}
                            onChange={(event)=>{
                                setContactName(event.target.value)
                            }}
                        ></input> 
                        <input 
                            type="email"
                            placeholder="Địa chỉ Email..."
                            value={contactEmail}
                            onChange={(event)=>{
                                setContactEmail(event.target.value)
                            }}
                        ></input>
                    </div>
                    <textarea 
                        className="contact-content" 
                        placeholder="Nội dung tin nhắn..."
                        value={contactContent}
                        onChange={(event)=>{
                            setContactContent(event.target.value)
                        }}
                    ></textarea>
                    <button className="contact-btn">Gửi</button>
                </form>
            </div>
        </div>
    )
}