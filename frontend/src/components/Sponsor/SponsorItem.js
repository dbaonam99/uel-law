import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'
import '../../Styles/Home.css'

function SponsorItem(props) {  

    const sponsor = props.sponsor

    const monthNames = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];   
    const date = new Date(sponsor.sponsorDate)
    const day = date.getDate()
    const monthNumber = date.getMonth()
    const month = monthNames[monthNumber] 
    const year = date.getFullYear() 
    
    return (
        <div className="LibraryItem SponsorItem"> 
            <div className="lib-info flex">
                <div className="lib-info-item flex">
                    <FontAwesomeIcon icon={faCalendarAlt} className="icon"/>
                    <p>{`${day} ${month}, ${year}`}</p>
                </div> 
            </div>
            <div className="lib-body">
                <div className="sponsor-logo flex-center">
                    <img src={sponsor.sponsorImg} alt=""></img>
                </div>
                <div className="lib-title">{sponsor.sponsorName}</div>
                <div className="lib-text">{sponsor.sponsorDes}</div>
            </div> 
        </div> 
    )
}
export default withRouter(SponsorItem)