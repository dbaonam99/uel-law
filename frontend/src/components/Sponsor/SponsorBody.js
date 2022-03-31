import '../../Styles/Home.css' 
import '../../Styles/Introduce.css'
import { withRouter } from 'react-router-dom' 
import SponsorItem from './SponsorItem' 

function SponsorBody(props) {    

    const sponsor = props.sponsor
    
    return (
        <div className="IntroduceBody flex">  
            <div className="about-left"> 
                { sponsor &&
                    sponsor.map((item, index) => {
                        return (
                            <div 
                                key={index}
                            >
                                <SponsorItem
                                    key={index}
                                    sponsor={item}
                                /> 
                            </div>
                        )
                    })
                }
            </div>    
        </div>
    )
}

export default withRouter(SponsorBody)