import {
  faCalendarAlt,
  faNewspaper,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../Styles/Home.css'

export default function CLBStatus(props) {
  return (
    <div className="CLBStatus flex">
      <div className="status-box flex">
        <div className="status-item flex-center">
          <div className="status-icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="status-count">1/1/2019</div>
          <div className="status-title">Ngày thành lập</div>
        </div>
      </div>
      <div className="status-box flex">
        <div className="status-item flex-center">
          <div className="status-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="status-count">{props.team.length}+</div>
          <div className="status-title">Thành viên</div>
        </div>
      </div>
      <div className="status-box flex">
        <div className="status-item flex-center">
          <div className="status-icon">
            <FontAwesomeIcon icon={faNewspaper} />
          </div>
          <div className="status-count">
            {props.news.length + props.library.length}+
          </div>
          <div className="status-title">Bài viết</div>
        </div>
      </div>
    </div>
  )
}
