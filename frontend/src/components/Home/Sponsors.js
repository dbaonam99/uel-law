import '../../Styles/Home.css' 

export default function Sponsors(props) { 

    const sponsor = props.sponsor

    return (
        <div className="Sponsors flex">  
            <div className="about-header flex-center">
                <div className="about-title">Nhà tài trợ</div>
                { props.home && <div className="about-title-text">{props.home.homeSponsor}</div>}
                <div className="h-gap"></div>
            </div>
            <div className="sponsor-list flex">
                { sponsor &&
                    sponsor.map((item, index) => { 
                        return (
                            <div key={index} className="sponsor-item flex-center">
                                <img src={item.sponsorImg} alt=""></img>
                            </div>
                        )
                    })
                } 
            </div>
        </div>
    )
}