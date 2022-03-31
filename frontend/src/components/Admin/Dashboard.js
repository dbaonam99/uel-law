import React, { useEffect, useState } from 'react'
import '../../App.css'
import '../../Styles/Dashboard.css'
import DashboardBody from './DashboardBody'
import DashboardMenu from './DashboardMenu'
import {
  faEnvelope,
  faFileInvoice,
  faHandshake,
  faHome,
  faThList,
  faUser,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'

import { withRouter } from 'react-router-dom'
import axios from 'axios'

function Dashboard(props) {
  const menuItems = [
    {
      id: '1',
      name: 'Bảng điều khiển',
      icon: faHome,
    },
    {
      id: '2',
      name: 'Giao diện',
      child: [
        {
          id: '2.1',
          name: 'Ảnh bìa',
        },
        {
          id: '2.2',
          name: 'Trang chủ',
        },
      ],
      icon: faThList,
    },
    {
      id: '3',
      name: 'Bài viết',
      child: [
        {
          id: '3.1',
          name: 'Bản tin',
        },
        {
          id: '3.2',
          name: 'Thư viện',
        },
        {
          id: '3.3',
          name: 'Giới thiệu',
        },
      ],
      icon: faFileInvoice,
    },
    {
      id: '4',
      name: 'Thành viên',
      child: [
        {
          id: '4.1',
          name: 'Thành viên team',
        },
        {
          id: '4.2',
          name: 'Quote',
        },
      ],
      icon: faUserFriends,
    },
    {
      id: '5',
      name: 'Email',
      child: [
        {
          id: '5.1',
          name: 'Email đăng ký',
        },
        {
          id: '5.2',
          name: 'Email liên hệ',
        },
      ],
      icon: faEnvelope,
    },
    {
      id: '7',
      name: 'Lưu trữ',
      icon: faUser,
    },
    {
      id: '8',
      name: 'Nhà tài trợ',
      icon: faHandshake,
    },
  ]
  const [tabId, setTabId] = useState('1')
  const [openMenu, setOpenMenu] = useState(true)
  const [openMenuMobile, setOpenMenuMobile] = useState(true)
  const [productId, setProductId] = useState('')
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios
        .get(
          `https://uel-law.herokuapp.com/users/${localStorage.getItem(
            'user-id'
          )}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          setUserInfo(res.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      props.history.push('/admin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setTabIdOnClick = (id) => {
    setTabId(id)
  }

  const setOpenMenuOnClick = () => {
    if (window.innerWidth <= 1110) {
      setOpenMenu(true)
      if (openMenuMobile) setOpenMenuMobile(false)
      else setOpenMenuMobile(true)
    } else {
      if (openMenu) setOpenMenu(false)
      else setOpenMenu(true)
    }
  }

  const [openCreate, setOpenCreate] = useState(false)

  const setOpenCreateFunc = () => {
    document.body.style.overflow = 'hidden'
    setOpenCreate(true)
  }

  const setCloseCreateFunc = (bool) => {
    document.body.style.overflow = 'unset'
    setOpenCreate(bool)
  }

  const [openEdit, setOpenEdit] = useState(false)

  const setOpenEditFunc = (event) => {
    document.body.style.overflow = 'hidden'
    setOpenEdit(true)
    setProductId(event.target.id)
  }

  const setCloseEditFunc = (bool) => {
    document.body.style.overflow = 'unset'
    setOpenEdit(bool)
    setProductId('')
  }

  const [loadingEdit, setLoadingEdit] = useState(true)

  const setLoadingEditFunc = (bool) => {
    setLoadingEdit(bool)
  }

  return (
    <div className="Dashboard flex">
      <DashboardMenu
        setTabIdOnClick={setTabIdOnClick}
        setOpenMenuOnClick={setOpenMenuOnClick}
        tabId={tabId}
        menuItems={menuItems}
        openMenu={openMenu}
        openMenuMobile={openMenuMobile}
        setCloseCreateFunc={setCloseCreateFunc}
        setCloseEditFunc={setCloseEditFunc}
        userInfo={userInfo}
      />
      <DashboardBody
        tabId={tabId}
        menuItems={menuItems}
        openMenu={openMenu}
        openMenuMobile={openMenuMobile}
        openCreate={openCreate}
        openEdit={openEdit}
        setOpenMenuOnClick={setOpenMenuOnClick}
        setOpenCreateFunc={setOpenCreateFunc}
        setCloseCreateFunc={setCloseCreateFunc}
        setOpenEditFunc={setOpenEditFunc}
        setCloseEditFunc={setCloseEditFunc}
        productId={productId}
        setLoadingEditFunc={setLoadingEditFunc}
        loadingEdit={loadingEdit}
      />
    </div>
  )
}
export default withRouter(Dashboard)
