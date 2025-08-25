import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilInbox,
    cilExternalLink,
    cilNotes,
    cilList,
    cilPuzzle,
    cilSpeedometer,
    cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
      {
        component: CNavItem,
        name: 'Loja Online',
        to: '/store',
        icon: < CIcon icon = { cilSpeedometer }
        customClassName = "nav-icon" / > ,
        badge: {
            color: 'danger',
            text: 'NEW',
        },
    },
    {
        component: CNavTitle,
        name: 'Categorias',
    },
    {
        component: CNavItem,
        name: 'Mecânica',
        to: '/store/categories/1',
        icon: < CIcon icon = { cilInbox }
        customClassName = "nav-icon" / > ,
    },
    {
        component: CNavItem,
        name: 'Funilaria',
        to: '/store/categories/3',
        icon: < CIcon icon = { cilList }
        customClassName = "nav-icon" / > ,
    },


]

export default _nav
