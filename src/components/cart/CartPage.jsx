import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice'
import { CButton, CTable, CTableBody, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CSpinner, CCardImage } from '@coreui/react'
import { productProvider } from '../../providers/ProductProvider'
import { colors } from '../../theme/Colors'
import { API_BASE_URL } from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const productData = {}
      await Promise.all(
        cartItems.map(async (item) => {
          const res = await productProvider.getById(item.id)
          productData[item.id] = res
        })
      )
      setProducts(productData)
      setLoading(false)
    }
    if (cartItems.length > 0) fetchProducts()
    else setLoading(false)
  }, [cartItems])

  if (loading) return <CSpinner color="primary" />
  if (cartItems.length === 0) return <p>Seu carrinho está vazio.</p>

  // Agrupa itens por empresa
  const itemsByCompany = {}
  cartItems.forEach((item) => {
    const product = products[item.id]
    if (!product) return
    const company = product.companyName || 'Sem fornecedor'
    if (!itemsByCompany[company]) itemsByCompany[company] = []
    itemsByCompany[company].push({ ...item, product })
  })

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  return (
    <div>
      <h3 className="mb-4">Carrinho de Compras</h3>

      {Object.entries(itemsByCompany).map(([company, items]) => {
        const total = items.reduce((acc, item) => acc + (item.product.offerPrice || 0) * item.quantity, 0)

        return (
          <div key={company} className="mb-5">
            <h5 className="mb-3">{company}</h5>
            <CTable  hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell>Imagem</CTableHeaderCell>
                  <CTableHeaderCell>Produto</CTableHeaderCell>
                  <CTableHeaderCell>Preço</CTableHeaderCell>
                  <CTableHeaderCell>Qtd</CTableHeaderCell>
                  <CTableHeaderCell>Subtotal</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {items.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={{ width: '120px' }}>
                      <CCardImage
                        orientation="top"
                        src={
                          item.product.imagesPaths?.length
                            ? `${API_BASE_URL}/${item.product.imagesPaths[0].path}`
                            : 'https://via.placeholder.com/300x200?text=Sem+Imagem'
                        }
                        style={{
                          height: '80px',
                          width: '100%',
                          objectFit: 'contain',
                          backgroundColor: '#ffffffff',
                          padding: '4px',
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{item.product.name}</CTableDataCell>
                    <CTableDataCell>{formatCurrency(item.product.offerPrice)}</CTableDataCell>
                    <CTableDataCell>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                        }
                        style={{ width: '60px' }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{formatCurrency(item.product.offerPrice * item.quantity)}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h6>Total da loja {company}: {formatCurrency(total)}</h6>
              <div>
                <CButton
                  color="secondary"
                  className="me-2"
                  onClick={() => items.forEach(i => dispatch(removeFromCart(i.id)))}
                >
                  Limpar
                </CButton>
                <CButton
                  style={{ backgroundColor: colors.halloween }}
                  onClick={() =>
                    navigate('/checkout', { state: { company, items } })
                  }
                >
                  Comprar Agora
                </CButton>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartPage
