import '../../Styles/Home.css' 
import '../../Styles/Introduce.css'
import { withRouter } from 'react-router-dom' 
import { convertDataToHtml } from '../../Func'

function IntroduceBody(props) {   

    const introduceList = props.introduceList 

    return (
        <div className="IntroduceBody flex"> 
            { 
                introduceList.map((item, index)=>{
                    if (props.location.pathname === `/gioi-thieu/${item.introduceUrl}`) {
                        return ( 
                            <div key={index} className="about-left editorjs">
                                <div className="about-header">
                                    <div className="about-title">Giới thiệu</div>
                                    <div className="about-title-text">{item.introduceTitle}</div>
                                    <div className="h-gap"></div>
                                </div>
                                <div className="about-body">
                                    <div 
                                        className="about-body-text"
                                        dangerouslySetInnerHTML={{__html: convertDataToHtml(item.introduceContent) }}
                                    >  
                                    </div> 
                                    <div className="body-endline"></div>
                                </div>
                            </div>   
                        )
                    }
                    return true
                })    
            }  
            {/* 
            { 
                props.location.pathname === "/gioi-thieu/chuyen-san" &&
                <div className="about-left">
                    <div className="about-header">
                        <div className="about-title">Giới thiệu</div>
                        <div className="about-title-text">Chuyên san khoa Luật - UEL</div>
                        <div className="h-gap"></div>
                    </div>
                    <div className="about-body">
                        <div className="about-body-text">
                            <div className="introduce-title-text">Mục đích hoạt động:</div>
                            <p> 
                                Là một diễn đàn học thuật hướng đến đối tượng chính là sinh viên, 
                                bao gồm những bài viết là các sản phẩm nghiên cứu khoa học pháp lý của sinh viên trong Trường Đại học Kinh tế – Luật, 
                                cũng như những trường đại học khác trong nước. Bên cạnh đó, 
                                Chuyên san Luật Gia Trẻ cũng mong muốn đóng góp một phần nhỏ cho ​phát triển và mở rộng các lĩnh vực luật học còn hạn hẹp, 
                                giúp rèn luyện kĩ năng trình bày, tranh luận một vấn đề khoa học; 
                                giúp tăng cường tư duy phản biện cho những sinh viên có mong muốn viết bài. 
                                Ngoài ra, m​ục tiêu của việc xuất bản ấn phẩm nhằm thúc đẩy môi trường trao đổi học thuật, 
                                đồng thời, hỗ trợ cho công tác giảng dạy, học tập và nghiên cứu của giảng viên, sinh viên về những vấn đề pháp lý.
                            </p>
                            <div className="introduce-title-text">Tình hình hoạt động hiện tại:</div>
                            <p>         
                                Chuyên san Luật Gia Trẻ là chuyên san trực thuộc của Khoa Luật, Trường Đại học Kinh tế - Luật, 
                                Đại học Quốc gia Thành phố Hồ Chí Minh. Tính đến thời điểm hiện tại, 
                                Chuyên san đã xuất bản được 02 số đến với độc giả vào tháng 10/2019 và tháng 5/2020, 
                                sắp tới Chuyên san dự kiến ra mắt đến quý độc giả số 03 nhân dịp kỷ niệm 20 năm thành lập Trường Đại học Kinh tế Luật vào tháng 12/2020.
                                Với sự nỗ lực của Ban biên tập và đóng góp của các tác giả, đến này Chuyên san đã đưa ra mắt 14 bài viết qua 02 số vừa rồi và dự kiến trong số 03 tiếp đến sẽ cho ra mắt thêm 10 bài viết. Bên cạnh đó, các số ra mắt nhận được rất nhiều sự quan tâm của các độc giả khác nhau, không chỉ đến từ sinh viên của Trường Đại học Kinh tế - Luật mà còn từ sinh viên các trường bạn: Đại học Luật Tp. HCM, Đại học Luật Hà Nội,... cũng như sự ủng hộ của các giảng viên và các anh chị cựu sinh viên của trường.
                                Ngoài ra, Chuyên san Luật Gia Trẻ chúng tôi cũng sở hữu một fanpage với trên 900 lượt thích và gần 950 luật theo dõi có tên “Young Lawyers Journal”. Tại fanpage này, chúng tôi chia sẻ những thông tin liên quan đến các số ra mắt và các thông tin để quý độc giả kịp thời theo dõi và tiếp cận được những bài viết mới nhất.
                            </p>
                        </div> 
                        <div className="body-endline"></div>
                    </div>
                </div> 
            }
            { 
                props.location.pathname === "/gioi-thieu/co-cau-to-chuc" &&
                <div className="about-left">
                    <div className="about-header">
                        <div className="about-title">Giới thiệu</div>
                        <div className="about-title-text">Cơ cấu tổ chức chuyên san</div>
                        <div className="h-gap"></div>
                    </div>
                    <div className="about-body">
                        <div className="about-body-text">
                            conc acjwc 
                        </div> 
                        <div className="body-endline"></div>
                    </div>
                </div> 
            } */}
        </div>
    )
}

export default withRouter(IntroduceBody)