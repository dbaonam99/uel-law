import axios from 'axios'
import { useState } from 'react'
import '../../Styles/Home.css' 

export default function NewsLetter() {  

    const [subscriberEmail, setSubscriberEmail] = useState("") 

    const onSubmit = (event) => {
        event.preventDefault()  

        axios.post('https://uel-law.herokuapp.com/email', {
            subscriber: subscriberEmail
        })
        .then((res)=>{
            alert(res.data)
        })
        .catch(err => {
            alert(err.response.data)
        })
        setSubscriberEmail("")
    }  

    return (
        <div className="NewsLetter flex">  
            <div className="newsletter-container">
                <div className="newsletter-box">
                    <div className="newsletter-title">Đăng ký để nhận những tin tức mới nhất</div>
                    <form className="newsletter-form flex" onSubmit={onSubmit}>
                        <input 
                            type="email"
                            placeholder="Đại chỉ email..."
                            onChange={(event)=>{
                                setSubscriberEmail(event.target.value)
                            }}
                            value={subscriberEmail}
                        ></input>
                        <button>Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    )
}