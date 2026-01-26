import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody
} from '@coreui/react'
import { colors } from '../../theme/Colors'

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const location = useLocation()
  const navigate = useNavigate()

  const { company, items } = location.state || {}

  // se vier os itens no state (quando clicou em "comprar agora"), usa eles
  // senão, filtra direto do carrinho pelo nome da empresa
  const itemsToCheckout = items?.length
    ? items
    : cartItems.filter((i) => i.product?.companyName === company)

  if (!company || !itemsToCheckout?.length) {
    return (
      <div>
        <p>Nenhum produto selecionado para checkout.</p>
        <CButton color="primary" onClick={() => navigate('/cart')}>
          Voltar ao Carrinho
        </CButton>
      </div>
    )
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)

  const total = itemsToCheckout.reduce(
    (acc, item) => acc + (item.product?.offerPrice || 0) * item.quantity,
    0
  )

  const handleGoToShipping = () => {
    navigate('/shipping', { state: { company, items: itemsToCheckout, total } })
  }

  return (
    <div>
      <h3>Checkout - {company}</h3>

      <CTable hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Produto</CTableHeaderCell>
            <CTableHeaderCell>Preço</CTableHeaderCell>
            <CTableHeaderCell>Qtd</CTableHeaderCell>
            <CTableHeaderCell>Subtotal</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {itemsToCheckout.map((item) => (
            <CTableRow key={item.id}>
              <CTableDataCell>{item.product?.name}</CTableDataCell>
              <CTableDataCell>{formatCurrency(item.product?.offerPrice)}</CTableDataCell>
              <CTableDataCell>{item.quantity}</CTableDataCell>
              <CTableDataCell>
                {formatCurrency((item.product?.offerPrice || 0) * item.quantity)}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h5>Total: {formatCurrency(total)}</h5>
        <CButton  style={{backgroundColor : colors.halloween, color:colors.branco}} onClick={handleGoToShipping}>
          Finalizar Compra
        </CButton>
      </div>
    </div>
  )
}

export default CheckoutPage
