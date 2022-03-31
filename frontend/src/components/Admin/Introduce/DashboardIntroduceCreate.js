import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' 
import DashboardEditor from './DashboardEditor'

export default function DashboardArchiveCreate(props) {

    const createForm = useRef();  
    const [border, setBorder] = useState(false) 
    const [introduceName, setIntroduceName] = useState("")
    const [introduceUrl, setIntroduceUrl] = useState("")
    const [introduceTitle, setIntroduceTitle] = useState("") 
    const [introduceContent, setIntroduceContent] = useState({
        "type" : "paragraph",
        "data" : {
            "text" : "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
        }
    })
    const [boxLoading, setBoxLoading] = useState(false)
    
    const onSubmit = (event) => {
        event.preventDefault()   
        setBoxLoading(true)
        axios.post('https://uel-law.herokuapp.com/introduce', {
            introduceName: introduceName,
            introduceUrl: introduceUrl,
            introduceTitle: introduceTitle,
            introduceContent: introduceContent
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
                            { !boxLoading && <p>Thêm mới</p> }
                            { boxLoading && <div className="action-loading-icon"></div> }
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    )
}