import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react'
import axios from 'axios'
import { API_BASE_URL } from '../../api/axiosInstance'
import { colors } from '../../theme/Colors'

const ShippingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { company, items, total } = location.state || {}

  const [form, setForm] = useState({
    phone: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    cep: '',
    country: 'Brasil',
  })
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [loading, setLoading] = useState(false)

  if (!items?.length) {
    return <p>Nenhum item para checkout.</p>
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const order = {
        orderStatus: 'pendente',
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.product?.offerPrice,
        })),
        shippingAddress: form,
        paymentMethod,
        couponId: '',
        subtotal: total,
        discount: 0,
        totalPrice: total,
      }

      const res = await axios.post(`${API_BASE_URL}/orders`, order)

      if (res.status === 200 || res.status === 201) {
        alert('Pedido criado com sucesso!')
        navigate('/confirmation', { state: { order: res.data } })
      } else {
        alert('Erro ao criar pedido')
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3>Dados de Entrega - {company}</h3>
      <CRow className="mt-4">
        {/* Coluna da esquerda - Formulário */}
        <CCol md={8}>
          <CCard>
            <CCardHeader>Endereço de Entrega</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol md={6} className="mb-3">
                    <CFormInput
                      label="Telefone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={6} className="mb-3">
                    <CFormInput
                      label="CEP"
                      name="cep"
                      value={form.cep}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={8} className="mb-3">
                    <CFormInput
                      label="Rua"
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={4} className="mb-3">
                    <CFormInput
                      label="Número"
                      name="number"
                      value={form.number}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={6} className="mb-3">
                    <CFormInput
                      label="Complemento"
                      name="complement"
                      value={form.complement}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md={6} className="mb-3">
                    <CFormInput
                      label="Bairro"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={6} className="mb-3">
                    <CFormInput
                      label="Cidade"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={3} className="mb-3">
                    <CFormInput
                      label="Estado"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={3} className="mb-3">
                    <CFormInput
                      label="País"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>

                <CFormSelect
                  className="mb-4"
                  label="Método de Pagamento"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="pix">PIX</option>
                  <option value="cartao">Cartão de Crédito</option>
                  <option value="boleto">Boleto</option>
                </CFormSelect>

                <CButton type="submit" style={{backgroundColor : colors.halloween, color:colors.branco}} disabled={loading}>
                  {loading ? 'Enviando...' : 'Finalizar Pedido'}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Coluna da direita - Resumo */}
        <CCol md={4}>
          <CCard>
            <CCardHeader>Resumo da Compra</CCardHeader>
            <CCardBody>
              <CTable small>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Produto</CTableHeaderCell>
                    <CTableHeaderCell>Qtd</CTableHeaderCell>
                    <CTableHeaderCell>Subtotal</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {items.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.product?.name}</CTableDataCell>
                      <CTableDataCell>{item.quantity}</CTableDataCell>
                      <CTableDataCell>
                        {formatCurrency(
                          (item.product?.offerPrice || 0) * item.quantity
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <h6 className="mt-3">Total: {formatCurrency(total)}</h6>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ShippingPage
