import { faChevronRight, faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Styles/Home.css' 
import logo from '../../assets/logo.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function Footer(props) {  

    const [home, setHome] = useState({}) 

    useEffect(()=>{ 
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/home`)
        .then((res)=>{
            setHome(res.data[0]) 
        }) 
    },[])

    const linkTo = (link) => {
        if (props.location.pathname === `/${link}`) {
            window.scrollTo(0,0)
        } else {
            props.history.push(`/${link}`)
        }
    } 

    return (
        <div className="Footer flex-col">  
            <div className="footer-top flex">
                <div className="footer-info flex">
                    <div className="footer-logo">
                        <img src={logo} alt=""></img>
                    </div>
                    <div className="footer-text">Website chính thức của câu lạc bộ Young Lawyers Journal - Chuyên San Khoa Luật</div>
                    <div className="footer-contact-info">
                        <div className="footer-contact-item flex">
                            <FontAwesomeIcon icon={faPhone}/>
                            <p>{home.homeContactPhone}</p>
                        </div>
                        <div className="footer-contact-item flex">
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <p>{home.homeContactEmail}</p>
                        </div>
                        <div className="footer-contact-item flex">
                            <FontAwesomeIcon icon={faHome}/>
                            <p>{home.homeContactAddress}</p>
                        </div>
                    </div>
                </div>
                <div className="footer-link">
                    <div className="footer-link-title">LIÊN KẾT</div>
                    <div className="footer-links">
                        <div 
                            className="footer-link-item flex"
                            onClick={()=>{
                                linkTo("home")
                            }}
                        > 
                            <FontAwesomeIcon icon={faChevronRight}/> 
                            <p>Trang chủ</p>
                        </div>
                        <div 
                            className="footer-link-item flex"
                            onClick={()=>{
                                linkTo("gioi-thieu/khoa-luat")
                            }}
                        > 
                            <FontAwesomeIcon icon={faChevronRight}/> 
                            <p>Giới thiệu</p>
                        </div>
                        <div 
                            className="footer-link-item flex"
                            onClick={()=>{
                                linkTo("ban-tin")
                            }}
                        > 
                            <FontAwesomeIcon icon={faChevronRight}/> 
                            <p>Bản tin</p>
                        </div>
                        <div 
                            className="footer-link-item flex"
                            onClick={()=>{
                                linkTo("thu-vien/dong-chay-phap-ly")
                            }}
                        > 
                            <FontAwesomeIcon icon={faChevronRight}/> 
                            <p>Thư viện</p>
                        </div> 
                        <div 
                            className="footer-link-item flex"
                            onClick={()=>{
                                linkTo("nha-tai-tro")
                            }}
                        > 
                            <FontAwesomeIcon icon={faChevronRight}/> 
                            <p>Nhà tài trợ</p>
                        </div>
                        <div 
                            className="footer-link-item flex"
                            onClick={()=>{
                                linkTo("lien-he")
                            }}
                        > 
                            <FontAwesomeIcon icon={faChevronRight}/> 
                            <p>Liên hệ</p>
                        </div>
                    </div>
                </div>
                <div className="footer-map"> 
                <iframe 
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7619.316837089168!2d106.77387279971798!3d10.870932090829154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175277dbf11a271%3A0x4567e34b99494e3f!2sUniversity%20of%20Economics%20and%20Law%20-%20VNU-HCM!5e1!3m2!1sen!2s!4v1608656545302!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    aria-hidden="false" 
                    tabIndex="0"
                ></iframe>
            </div>
            </div> 
        </div>
    )
}
export default withRouter(Footer)