import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useState } from 'react'
import '../../Styles/Contact.css'

export default function ContactBody(props) {  
    
    const home = props.home
    const [contactEmail, setContactEmail] = useState("") 
    const [contactName, setContactName] = useState("") 
    const [contactContent, setContactContent] = useState("") 

    const onSubmit = (event) => {
        event.preventDefault()  

        axios.post('https://uel-law.herokuapp.com/contact', {
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
        <div className="ContactBody">    
            <div className="about-header flex-center flex-col">
                <div className="about-title">Liên hệ</div>
                <div className="about-title-text">Điền thông tin ở bên dưới để liên hệ với chúng tôi</div>
                <div className="h-gap"></div>
            </div>
            <div className="contact-body flex">
                <div className="contact-address">
                    <p>Ngoài ra bạn có thể liên hệ bằng những thông tin bên dưới</p>
                    <div className="contact-address-item flex">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/>
                        <p>{home.homeContactAddress}</p>
                    </div> 
                    <div className="contact-address-item flex">
                        <FontAwesomeIcon icon={faPhone} className="icon"/>
                        <p>{home.homeContactPhone}</p>
                    </div>
                    <div className="contact-address-item flex">
                        <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                        <p>{home.homeContactEmail}</p>
                    </div>  
                </div>
                <form className="contact-form" onSubmit={onSubmit}> 
                    <input 
                        placeholder="Họ và tên..."
                        value={contactName}
                        onChange={(event)=>{
                            setContactName(event.target.value)
                        }}
                    ></input> 
                    <input placeholder="Địa chỉ Email..."
                        type="email"
                        value={contactEmail}
                        onChange={(event)=>{
                            setContactEmail(event.target.value)
                        }}
                    ></input> 
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