import { faCalendarAlt, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { convertDataToHtml } from '../../Func'
import '../../Styles/Home.css'
import '../../Styles/Introduce.css'

function LibraryContent(props) {  

    const library = props.library
    const [dayText, setDayText] = useState("")

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
        }
    }, [library]) 

    return (
        <div className="LibraryItem" style={{marginBottom: '0'}}> 
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
                    <div className="lib-title">{library.libraryTitle}</div> 
                    <div 
                        className="about-body-text"
                        dangerouslySetInnerHTML={{__html: convertDataToHtml(library.libraryContent) }}
                    >  
                    </div>
                </div>
            } 
        </div> 
    )
}
export default withRouter(LibraryContent)