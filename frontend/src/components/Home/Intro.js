import { faBook, faComment, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Styles/Home.css'

export default function Intro() {
  return (
    <div className="Intro flex">
      <div className="intro-item-outline">
        <div className="intro-item flex">
          <div className="intro-left flex-center">
            <FontAwesomeIcon icon={faBook} className="icon" />
          </div>
          <div className="intro-right">
            <div className="intro-title">Tin tức Khoa Luật - UEL</div>
            <div className="intro-text">
              Cập nhật những tin tức, sự kiện của đoàn - hội, câu lạc bộ, các
              buổi tòa đàm của khoa Luật - UEL.
            </div>
          </div>
        </div>
      </div>
      <div className="intro-item-outline">
        <div className="intro-item flex">
          <div className="intro-left flex-center">
            <FontAwesomeIcon icon={faUsers} className="icon" />
          </div>
          <div className="intro-right">
            <div className="intro-title">Nghiên cứu và trao đổi</div>
            <div className="intro-text">
              Những vấn đề pháp lý xoay quanh cuộc sống được nghiên cứu và trao
              đổi để đem đến những góc nhìn mới.
            </div>
          </div>
        </div>
      </div>
      <div className="intro-item-outline">
        <div className="intro-item flex">
          <div className="intro-left flex-center">
            <FontAwesomeIcon icon={faComment} className="icon" />
          </div>
          <div className="intro-right">
            <div className="intro-title"> Sự kiện và bình luận </div>
            <div className="intro-text">
              Những bài viết về các sự kiện diễn ra thực tế và bình luận dưới
              góc độ pháp lý của Luật sư, giảng viên, sinh viên toàn quốc.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
