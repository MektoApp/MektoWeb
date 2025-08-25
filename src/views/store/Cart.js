import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import WidgetsProducts from '../widgets/WidgetsProducts'
import ProductGrid from '../../components/products/ProductGrid'
import { AppFooter } from '../../components/layout/index'
import AppHeaderStore from '../../components/layout/AppHeaderStore'
import AppSidebarStore from '../../components/layout/AppSidebarStore'
import { CContainer } from '@coreui/react'
import CartPage from '../../components/cart/CartPage'

const Cart = () => {
  const location = useLocation()
  const params = useParams() // se você tiver rotas com :categoryId ou :slug

  console.log('Path atual:', location.pathname)
  console.log('Params:', params)

  // Você pode derivar o filtro da URL
  const categoryFilter = location.pathname.split('/')[2] || null

  return (
    <div>
      <AppSidebarStore />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeaderStore />
        <div className="body flex-grow-1">
          <CContainer className="px-4" xl>
            <CartPage />
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Cart
