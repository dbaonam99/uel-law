import '../../Styles/Home.css'  
export default function AboutUs(props) {  

    const home = props.home 
    
    return (
        <div className="AboutUs flex"> 
            <div className="about-left">
                <div className="about-header">
                    <div className="about-title">Về chúng tôi</div>
                    <div className="about-title-text">{home.homeAboutUsTitle}</div>
                    <div className="h-gap"></div>
                </div>
                <div className="about-body"> 
                    <div 
                        className="about-body-text"
                        dangerouslySetInnerHTML={{__html: home.homeAboutUsContent}}>
                    </div>
                    <div className="body-endline"></div>
                </div>
            </div>
            <div className="about-right flex">
                <img src={home.homeAboutUsImg} alt=""></img>
            </div>
        </div>
    )
}