import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Styles/Home.css' 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

export default function Quote(props) { 
    
    const quote = props.quote

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000, 
        dots: false,
        draggable: false
    }

    return (
        <div className="Quote"> 
            <div className="overlay"></div>
            <div className="quote-list">  
                <Slider {...settings}> 
                    {
                        quote.length > 0 &&
                        quote.map((item, index) => {
                            return (
                                <div 
                                    className="quote-box flex-col"
                                    key={index}
                                >
                                    <div className="quote-icon flex-center">
                                        <FontAwesomeIcon icon={faQuoteRight}/>
                                    </div>
                                    <div className="quote-avt flex-center">
                                        <img src={item.quoteAvt} alt=""></img>
                                    </div>
                                    <div className="quote-text flex-center">
                                        <p>{item.quoteContent}</p>
                                    </div>
                                    <div className="quote-name">{item.quoteName}</div>
                                    <div className="quote-title">{item.quoteTitle}</div>
                                </div>
                            )
                        })
                    } 
                </Slider> 
            </div>
        </div>
    )
}