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

const _nav = [{
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: < CIcon icon = { cilSpeedometer }
        customClassName = "nav-icon" / > ,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavTitle,
        name: 'Vendas',
    },
    {
        component: CNavItem,
        name: 'Produtos',
        to: '/',
        icon: < CIcon icon = { cilInbox }
        customClassName = "nav-icon" / > ,
    },
    {
        component: CNavItem,
        name: 'Pedidos',
        to: '/orders',
        icon: < CIcon icon = { cilList }
        customClassName = "nav-icon" / > ,
    },
    {
        component: CNavTitle,
        name: 'Cadastros',
    },
    {
        component: CNavGroup,
        name: 'Identificação',
        to: '',
        icon: < CIcon icon = { cilNotes }
        customClassName = "nav-icon" / > ,
        items: [{
                component: CNavItem,
                name: 'Categorias',
                to: '/categories',
            },
            {
                component: CNavItem,
                name: 'SubCategorias',
                to: '/subCategories',
            },
            {
                component: CNavItem,
                name: 'Marcas',
                to: '/brands',
            },
            {
                component: CNavItem,
                name: 'Tipos de Variações',
                to: '/variantTypes',
            },
              {
                component: CNavItem,
                name: 'Variações',
                to: '/variants',
            },

        ],
    },

]

export default _nav
