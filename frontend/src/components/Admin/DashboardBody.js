import React, { useEffect, useState } from 'react'
import '../../App.css'
import '../../Styles/Dashboard.css'
import DashboardHeader from './DashboardHeader'
import DashboardMain from './Main/DashboardMain'
import classNames from 'classnames'
import Axios from 'axios'
import DashboardHome from './Layout/DashboardHome'
import DashboardBanner from './Layout/DashboardBanner'

import DashboardQuote from './Quote/DashboardQuote'
import DashboardQuoteCreate from './Quote/DashboardQuoteCreate'
import DashboardQuoteEdit from './Quote/DashboardQuoteEdit'
import DashboardIntroduce from './Introduce/DashboardIntroduce'
import DashboardIntroduceCreate from './Introduce/DashboardIntroduceCreate'
import DashboardIntroduceEdit from './Introduce/DashboardIntroduceEdit'
import DashboardArchive from './Archive/DashboardArchive'
import DashboardArchiveCreate from './Archive/DashboardArchiveCreate'
import DashboardArchiveEdit from './Archive/DashboardArchiveEdit'
import DashboardSponsor from './Sponsor/DashboardSponsor'
import DashboardSponsorCreate from './Sponsor/DashboardSponsorCreate'
import DashboardSponsorEdit from './Sponsor/DashboardSponsorEdit'
import DashboardTeamMember from './TeamMember/DashboardTeamMember'
import DashboardTeamMemberCreate from './TeamMember/DashboardTeamMemberCreate'
import DashboardTeamMemberEdit from './TeamMember/DashboardTeamMemberEdit'
import DashboardEmail from './Email/DashboardEmail'
import DashboardEmailCreate from './Email/DashboardEmailCreate'
import DashboardEmailEdit from './Email/DashboardEmailEdit'
import DashboardEmailContact from './Email/DashboardEmailContact'
import DashboardEmailContactCreate from './Email/DashboardEmailContactCreate'
import DashboardEmailContactEdit from './Email/DashboardEmailContactEdit'
import DashboardNews from './News/DashboardNews'
import DashboardNewsCreate from './News/DashboardNewsCreate'
import DashboardNewsEdit from './News/DashboardNewsEdit'
import DashboardLibraryCreate from './Library/DashboardLibraryCreate'
import DashboardLibraryEdit from './Library/DashboardLibraryEdit'
import DashboardLibrary from './Library/DashboardLibrary'

export default function DashboardBody(props) {
  const tabId = props.tabId
  const [toast, setToast] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [quote, setQuote] = useState({})
  const [introduce, setIntroduce] = useState({})
  const [archive, setArchive] = useState({})
  const [sponsor, setSponsor] = useState({})
  const [team, setTeam] = useState({})
  const [contact, setContact] = useState({})
  const [news, setNews] = useState({})
  const [library, setLibrary] = useState([])
  const [email, setEmail] = useState([])
  const [itemName, setItemName] = useState('')

  const parentId = Number(tabId.split('.')[0]) - 1
  const childId = Number(tabId.split('.')[1]) - 1

  console.log(news)
  useEffect(() => {
    if (props.menuItems[parentId]) {
      if (props.menuItems[parentId].child) {
        setItemName(props.menuItems[parentId].child[childId].name)
      } else {
        setItemName(props.menuItems[parentId].name)
      }
    }
  }, [tabId, props.menuItems, parentId, childId])

  const setToastFunc = (bool) => {
    setIsChange(true)
    setTimeout(() => {
      setIsChange(false)
    }, 100)
    setToast(true)
    setTimeout(() => {
      setToast(false)
    }, 3000)
  }

  useEffect(() => {
    props.setLoadingEditFunc(true)
    Axios.get(`https://uel-law.herokuapp.com/quote/${props.productId}`).then(
      (res) => {
        setQuote(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    Axios.get(
      `https://uel-law.herokuapp.com/introduce/${props.productId}`
    ).then((res) => {
      setIntroduce(res.data)
      // props.setLoadingEditFunc(false)
    })
    Axios.get(`https://uel-law.herokuapp.com/archive/${props.productId}`).then(
      (res) => {
        setArchive(res.data)
        props.setLoadingEditFunc(false)
      }
    )
    Axios.get(`https://uel-law.herokuapp.com/sponsor/${props.productId}`).then(
      (res) => {
        setSponsor(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    Axios.get(`https://uel-law.herokuapp.com/team/${props.productId}`).then(
      (res) => {
        setTeam(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    Axios.get(`https://uel-law.herokuapp.com/email/${props.productId}`).then(
      (res) => {
        setEmail(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    Axios.get(`https://uel-law.herokuapp.com/contact/${props.productId}`).then(
      (res) => {
        setContact(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    Axios.get(`https://uel-law.herokuapp.com/news/${props.productId}`).then(
      (res) => {
        setNews(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    Axios.get(`https://uel-law.herokuapp.com/library/${props.productId}`).then(
      (res) => {
        setLibrary(res.data)
        // props.setLoadingEditFunc(false)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productId, props.openEdit])

  const openMenuMobile = props.openMenuMobile

  return (
    <div
      className={classNames('DashboardBody', {
        DashboardBody_small: !props.openMenu,
      })}
    >
      {!openMenuMobile && (
        <div
          className="DashboardBody-closemenu"
          onClick={props.setOpenMenuOnClick}
        ></div>
      )}
      <DashboardHeader
        itemName={itemName}
        setOpenMenuOnClick={props.setOpenMenuOnClick}
        openMenu={props.openMenu}
        orderNotice={props.orderNotice}
      />
      {tabId === '1' && <DashboardMain />}
      {tabId === '2.1' && (
        <DashboardBanner menuItems={props.menuItems[parentId].child[childId]} />
      )}
      {tabId === '2.2' && (
        <DashboardHome menuItems={props.menuItems[parentId].child[childId]} />
      )}
      {tabId === '3.1' && (
        <DashboardNews
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '3.2' && (
        <DashboardLibrary
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '3.3' && (
        <DashboardIntroduce
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '4.1' && (
        <DashboardTeamMember
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '4.2' && (
        <DashboardQuote
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '5.1' && (
        <DashboardEmail
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '5.2' && (
        <DashboardEmailContact
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '7' && (
        <DashboardArchive
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {tabId === '8' && (
        <DashboardSponsor
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}

      {props.openCreate && tabId === '3.1' && (
        <DashboardNewsCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '3.1' && (
        <DashboardNewsEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setNews({})
          }}
          setToastFunc={setToastFunc}
          news={news}
        />
      )}
      {props.openCreate && tabId === '3.2' && (
        <DashboardLibraryCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '3.2' && (
        <DashboardLibraryEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setLibrary({})
          }}
          setToastFunc={setToastFunc}
          library={library}
        />
      )}
      {props.openCreate && tabId === '3.3' && (
        <DashboardIntroduceCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '3.3' && (
        <DashboardIntroduceEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setIntroduce({})
          }}
          setToastFunc={setToastFunc}
          introduce={introduce}
        />
      )}
      {props.openCreate && tabId === '4.1' && (
        <DashboardTeamMemberCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '4.1' && (
        <DashboardTeamMemberEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setTeam({})
          }}
          setToastFunc={setToastFunc}
          team={team}
        />
      )}
      {props.openCreate && tabId === '4.2' && (
        <DashboardQuoteCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '4.2' && (
        <DashboardQuoteEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setQuote({})
          }}
          setToastFunc={setToastFunc}
          quote={quote}
        />
      )}
      {props.openCreate && tabId === '5.1' && (
        <DashboardEmailCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '5.1' && (
        <DashboardEmailEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setEmail({})
          }}
          setToastFunc={setToastFunc}
          email={email}
        />
      )}
      {props.openCreate && tabId === '5.2' && (
        <DashboardEmailContactCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '5.2' && (
        <DashboardEmailContactEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          contact={contact}
        />
      )}
      {props.openCreate && tabId === '7' && (
        <DashboardArchiveCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '7' && (
        <DashboardArchiveEdit
          loadingEdit={props.loadingEdit}
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setArchive({})
          }}
          setToastFunc={setToastFunc}
          archive={archive}
        />
      )}
      {props.openCreate && tabId === '8' && (
        <DashboardSponsorCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === '8' && (
        <DashboardSponsorEdit
          setCloseEditFunc={() => {
            props.setCloseEditFunc()
            setSponsor({})
          }}
          setToastFunc={setToastFunc}
          sponsor={sponsor}
        />
      )}
    </div>
  )
}
