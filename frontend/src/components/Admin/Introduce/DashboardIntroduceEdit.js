import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 
import DashboardEditor from './DashboardEditor'

export default function DashboardIntroduceEdit(props) {

    const createForm = useRef(); 
    const [border, setBorder] = useState(false) 
    const [introduceName, setIntroduceName] = useState("")
    const [introduceUrl, setIntroduceUrl] = useState("")
    const [introduceTitle, setIntroduceTitle] = useState("") 
    const [introduceContent, setIntroduceContent] = useState("")
    const [id, setId] = useState("")
    const [boxLoading, setBoxLoading] = useState(false) 
    
    const introduce = props.introduce
    useEffect(()=> {
        if (introduce) {  
            setId(introduce._id)
            setIntroduceName(introduce.introduceName)
            setIntroduceUrl(introduce.introduceUrl)
            setIntroduceTitle(introduce.introduceTitle)  
            setIntroduceContent(introduce.introduceContent) 
        }
    },[introduce]) 

    const onSubmit = (event) => {
        event.preventDefault()   
        setBoxLoading(true)
        axios.put('https://uel-law.herokuapp.com/introduce', {
            id: id,
            introduceName: introduceName,
            introduceUrl: introduceUrl,
            introduceTitle: introduceTitle,
            introduceContent: introduceContent
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
                        <div className="dashboard-left flex">Tên</div>
                        <div className="dashboard-right">
                            <input 
                                onClick={()=>{
                                    setBorder(false)
                                }}
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setIntroduceName(event.target.value)
                                }} 
                                value={introduceName}
                            required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Liên kết</div>
                        <div className="dashboard-right"> 
                            <input 
                                onClick={()=>{
                                    setBorder(false)
                                }}
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setIntroduceUrl(event.target.value)
                                }} 
                                value={introduceUrl}
                            required></input>
                        </div>
                    </div> 
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tiêu đề</div>
                        <div className="dashboard-right"> 
                            <input 
                                onClick={()=>{
                                    setBorder(false)
                                }}
                                type="text" className="input" 
                                onChange={(event)=>{
                                    setIntroduceTitle(event.target.value)
                                }} 
                                value={introduceTitle}
                            required></input>
                        </div>
                    </div> 
                    
                    <div 
                        className={border ? "border_editor editor-box" : "editor-box"} 
                        onClick={()=>{
                            setBorder(true)
                        }}
                    > 
                        { introduceContent &&
                            <DashboardEditor
                                data = {introduceContent}
                                setContent={setIntroduceContent}
                            />
                        }
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