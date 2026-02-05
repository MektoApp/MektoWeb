import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CPagination,
  CPaginationItem,
  CFormInput,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import { productProvider } from '../../providers/ProductProvider'
import { API_BASE_URL } from '../../api/axiosInstance'
import ProductModal from './ProductModal'
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux'
import { colors } from '../../theme/Colors'
import requestService from '../../services/requestService'


const ProductGrid = () => {
  console.log("storedTheme");
  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const loaderRef = useRef(null)

  const [products, setProducts] = useState([])
  const [nextPage, setNextPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const pageSize = 24 // cards por página
  const navigate = useNavigate();
  const [placa, setPlaca] = useState('')
  const [vehicle, setVehicle] = useState(null)
  const [error, setError] = useState(null)

  const loadProducts = (cursor = null, query = '') => {
    setLoading(true)

    productProvider.getAll(pageSize, cursor, query).then((res) => {
      setProducts(prev =>
        cursor ? [...prev, ...res.items] : res.items
      )
      setNextPage(res.nextPage)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && nextPage && !loading) {
          loadProducts(nextPage, search)
        }
      },
      {
        root: null,
        rootMargin: '200px', // carrega antes de chegar no fim
        threshold: 0,
      }
    )

    observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [nextPage, loading])

  useEffect(() => {
    loadProducts(null, '')
  }, [])

  const consultarPlaca = async () => {
    if (!placa) return

    setLoading(true)
    setError(null)

    try {
      const res = await requestService.get(`/vehicle/plate/${placa}`)
      console.log(res);
      // Axios já retorna o JSON em res.data
      setVehicle(res)

      const vehicleName = `${res.marca} ${res.submodelo}`;
      setSearch(vehicleName);
      setProducts([])
      setNextPage(null)
      loadProducts(null, vehicleName) // começa do zero com o nome do veículo

    } catch (err) {
      setError('Placa não encontrada')
      setVehicle(null)
    } finally {
      setLoading(false)
    }
  }
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)

    if (timer) clearTimeout(timer)

    setTimer(
      setTimeout(() => {
        setProducts([])
        setNextPage(null)
        loadProducts(null, value) // começa do zero
      }, 500)
    )
  }


  const openModal = (product = null) => {
    setEditingProduct(product)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setEditingProduct(null)
  }

  return (
    <>
      {/* Barra de ações */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <CFormInput
          placeholder="Pesquisar produto..."
          value={search}
          onChange={handleSearchChange}
          style={{ maxWidth: '300px' }}
        />

      </div>
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>Consultar veículo pela placa</CCardTitle>

          <div className="d-flex gap-2">
            <CFormInput
              placeholder="Digite a placa (ex: AAA0A00)"
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            />

            <CButton color="primary" onClick={consultarPlaca} disabled={loading}>
              {loading ? 'Consultando...' : 'Consultar'}
            </CButton>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}

          {vehicle && (
            <div className="mt-3">
              <strong>
                {vehicle.marca} – {vehicle.modelo}
              </strong>
              <div>
                {vehicle.submodelo} • {vehicle.versao}
              </div>
              <div>
                {vehicle.ano} / {vehicle.anoModelo}
              </div>
            </div>
          )}
        </CCardBody>
      </CCard>


      {/* Grid de cards */}
      <CRow className="g-3">
        {products.map((product) => (
          <CCol xs={12} sm={4} md={3} lg={2} key={product.id}>
            <CCard
              className="h-100 shadow-sm position-relative"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Badge de % OFF no canto superior direito */}
              {product.price && product.offerPrice && product.price > product.offerPrice && (
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: colors.halloween,
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    zIndex: 10,
                  }}
                >
                  {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                </span>
              )}

              <CCardImage
                orientation="top"
                src={
                  `${import.meta.env.VITE_API_BASE_URL}/api/products/${product.id}/image`

                }
                loading="lazy"
                style={{
                  height: '200px',
                  width: '100%',
                  objectFit: 'contain',
                  backgroundColor: colorMode == 'dark' ? '#b3b9c2e0' : '#edededff',
                  padding: '8px',
                }}
              />

              <CCardBody style={{ padding: '8px' }}>
                <CCardTitle
                  className="card-title-small text-truncate-multiline"
                  title={product.name}
                >
                  {product.name}
                </CCardTitle>

                <CCardText className="card-text-small text-muted">
                  {product.category?.name} • {product.subCategory?.name}
                </CCardText>

                <CCardText className="card-price-small">
                  {product.price && (
                    <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '4px' }}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </span>
                  )}
                  <strong style={{ color: colors.halloween }}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.offerPrice)}
                  </strong>
                </CCardText>
              </CCardBody>
            </CCard>


          </CCol>
        ))}
      </CRow >

      <div ref={loaderRef} style={{ height: '1px' }} />

      {loading && (
        <div className="text-center my-4">
          <span>Carregando...</span>
        </div>
      )}

      {/* Modal Criar/Editar */}
      < ProductModal
        visible={modalVisible}
        onClose={closeModal}
        product={editingProduct}
        onSave={() => loadProducts(page, search)}
      />
    </>
  )
}

export default ProductGrid
