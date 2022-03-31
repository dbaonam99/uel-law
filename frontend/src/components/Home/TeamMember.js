import {  faFacebookF, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react';
import '../../Styles/Home.css'  

export default function TeamMember(props) {  

    const team = props.team  
    const [slideIndex, setSlideIndex] = useState(0)

    const list = useRef(0)
    const [widthItem, setWidthItem] = useState(0)

    useEffect(()=>{ 
        if (window.innerWidth <= 850) { 
            setWidthItem(list.current.clientWidth / 3)
        } 
        if (window.innerWidth <= 650) {
            setWidthItem(list.current.clientWidth / 2)
        } 
        if (window.innerWidth > 850) {
            setWidthItem(list.current.clientWidth / 4)
        }
        if (window.innerWidth <= 450) {
            setWidthItem(list.current.clientWidth / 1)
        }
        const slide = setInterval(()=>{
            if (team.length > 4) {
                setSlideIndex(slideIndex => slideIndex+1)
            }
        }, 3000) 
        function handleResize() {
            if (window.innerWidth <= 850) {
                setWidthItem(list.current.clientWidth / 3)
            } 
            if (window.innerWidth <= 650) {
                setWidthItem(list.current.clientWidth / 2)
            }
            if (window.innerWidth <= 450) {
                setWidthItem(list.current.clientWidth / 1)
            }
            if (window.innerWidth > 850) {
                setWidthItem(list.current.clientWidth / 4)
            }
        }
        window.addEventListener("resize", handleResize);
        return (()=>{
            clearInterval(slide)
            window.removeEventListener("resize", handleResize);
        })
    },[slideIndex, team.length]) 

    if (slideIndex === team.length - 3 && team.length > 4) {
        setSlideIndex(0)
    }   

    return (
        <div className="TeamMember flex-col">   
            <div className="about-header flex">
                <div className="about-header-left">
                    <div className="about-title">Thành viên team</div>
                    <div className="about-title-text">{props.home.homeTeamMemberTitle}</div>
                    <div className="h-gap"></div>
                </div>
                <div className="about-header-right">
                    <p>{props.home.homeTeamMemberText}</p>
                </div>
            </div>
            <div className="white-bottom"></div>
            <div 
                className="teammember-prev flex-center" 
                onClick={()=>{ 
                    if (slideIndex !== 0) {
                        setSlideIndex(slideIndex=>slideIndex-1)
                    }
                }}
            ></div>
            <div 
                className="teammember-next flex-center" 
                onClick={()=>{  
                    if (slideIndex === team.length - 4) { 
                        return
                    } else {
                        setSlideIndex(slideIndex=>slideIndex+1)
                    } 
                }}
            ></div>
            <div 
                ref={list}
                style={{ 
                    width: '100%',  
                    overflow: 'hidden',
                    marginTop: '50px',
                }}
            > 
                <div 
                    className="teammember-list"
                    style={{ 
                        width: 'max-content',
                        display: 'flex',
                        transition: '.5s', 
                        transform: `translateX(-${widthItem * slideIndex}px)`
                    }}
                > 
                    { team &&
                        team.map((item, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="teammember-item"
                                    style={{width: widthItem}}
                                >
                                    <div className="teammember-avt"> 
                                        <img src={item.teamMemberAvt} alt=""/>
                                    </div>
                                    <div className="teammember-info flex-col">
                                        <div className="teammember-name">{item.teamMemberName}</div>
                                        <div className="teammember-title">{item.teamMemberTitle}</div>
                                        <div className="teammember-info flex-col teammember-contactinfo">
                                            <p>Thông tin liên hệ: </p>
                                            <div className="teammember-contact-icon flex">
                                                <FontAwesomeIcon icon={faFacebookF} className="icon"/>
                                                <FontAwesomeIcon icon={faInstagram} className="icon"/>
                                                <FontAwesomeIcon icon={faGoogle} className="icon"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div> 
        </div>
    )
}