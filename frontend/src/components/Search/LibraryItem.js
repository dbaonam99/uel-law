import { faCalendarAlt, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import '../../Styles/Home.css'
import { ChangeToSlug, convertDataToHtml } from '../../Func.js'

function LibraryItem(props) {  

    const library = props.library
    const [dayText, setDayText] = useState("") 
    const [firstLine, setFirstLine] = useState([]) 

    useEffect(()=>{
        if (library) {
            const monthNames = [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ];
            const date = new Date(library.libraryDate)
            const day = date.getDate()
            const monthNumber = date.getMonth()
            const month = monthNames[monthNumber] 
            const year = date.getFullYear() 
            setDayText(`${day} ${month}, ${year}`)

            const blocks = []
            for (let i in library.libraryContent[0].blocks) { 
                if (library.libraryContent[0].blocks[i].type === "paragraph") {
                    blocks.push(library.libraryContent[0].blocks[i])
                }
            } 
            const firstLine = [
                {
                    time: library.libraryContent[0].time,
                    blocks: [blocks[0]],
                    version: library.libraryContent[0].version
                }
            ] 
            setFirstLine(firstLine) 
        }
    }, [library]) 

    const redirect = (url, id, group, cate) => {    
        props.history.push(`/thu-vien/${group}/${cate}/${url}-${id}`) 
    }


    return (
        <div className="LibraryItem search-lib"> 
            { library &&
                <div className="lib-info flex">
                    <div className="lib-info-item flex">
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon"/>
                        <p>{dayText}</p>
                    </div>
                    <div className="lib-info-item flex">
                        <FontAwesomeIcon icon={faListUl} className="icon"/>
                        <p>{library.libraryCate}</p>
                    </div>
                </div>
            }
            { library &&
                <div className="lib-body">
                    <div 
                        className="lib-title"
                        onClick={()=>{
                            redirect(library.libraryUrl, library._id, ChangeToSlug(library.libraryGroup), ChangeToSlug(library.libraryCate))
                        }}
                    >{library.libraryTitle}</div>
                    { firstLine.length > 0 &&
                        <div 
                            className="lib-text"
                            dangerouslySetInnerHTML={{__html: convertDataToHtml(firstLine) }}
                        ></div>
                    }
                </div>
            }
            <div className="lib-transform flex-center">
                <div 
                    className="lib-readmore flex-center"
                    onClick={()=>{ 
                        redirect(library.libraryUrl, library._id, ChangeToSlug(library.libraryGroup), ChangeToSlug(library.libraryCate))
                    }}
                >
                    <p>Đọc thêm</p>
                </div>
            </div>
        </div> 
    )
}
export default withRouter(LibraryItem)