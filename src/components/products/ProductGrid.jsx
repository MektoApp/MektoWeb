import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus } from '@coreui/icons'
import { productProvider } from '../../providers/ProductProvider'
import { API_BASE_URL } from '../../api/axiosInstance'
import ProductModal from './ProductModal'
import { useNavigate } from "react-router";


const ProductGrid = () => {
  const [products, setProducts] = useState({ content: [] })
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const pageSize = 24 // cards por página
  const navigate = useNavigate();
  const loadProducts = (pageNumber = 0, query = '') => {
    const fetch = query.trim() === '' ? productProvider.getAll : productProvider.getQuery
    fetch(pageNumber, pageSize, query).then((res) => {
      setProducts(res)
      setPage(res.number)
      setTotalPages(res.totalPages)
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)

    if (timer) clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        loadProducts(0, value)
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

      {/* Grid de cards */}
      <CRow className="g-4">
        {products.content.map((product) => (
          <CCol xs={12} sm={4} md={3} lg={2} key={product.id}>
            <CCard
            className="h-100 shadow-sm"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
              <CCardImage
                orientation="top"
                src={
                  product.imagesPaths?.length
                    ? `${API_BASE_URL}/${product.imagesPaths[0].path}`
                    : 'https://via.placeholder.com/300x200?text=Sem+Imagem'
                }
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <CCardBody>
                <CCardTitle
                  className="small text-truncate-multiline"
                  title={product.name}
                >
                  {product.name}
                </CCardTitle>


                <CCardText className="text-muted small">
                  {product.category?.name} • {product.subCategory?.name}
                </CCardText>

                <CCardText>
                  <strong>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.offerPrice)}
                  </strong>
                </CCardText>
              </CCardBody>
            </CCard>

          </CCol>
        ))}
      </CRow >

      {/* Paginação */}
      <CPagination CPagination className="mt-4 justify-content-start" >
        <CPaginationItem
          disabled={page === 0}
          onClick={() => loadProducts(page - 1, search)}
        >
          Anterior
        </CPaginationItem>

        {
          (() => {
            const maxPagesToShow = 5
            let start = Math.max(0, page - Math.floor(maxPagesToShow / 2))
            let end = start + maxPagesToShow - 1
            if (end >= totalPages) {
              end = totalPages - 1
              start = Math.max(0, end - maxPagesToShow + 1)
            }
            const pages = []
            for (let i = start; i <= end; i++) {
              pages.push(
                <CPaginationItem
                  key={i}
                  active={i === page}
                  onClick={() => loadProducts(i, search)}
                >
                  {i + 1}
                </CPaginationItem>
              )
            }
            return pages
          })()
        }

        <CPaginationItem
          disabled={page + 1 === totalPages}
          onClick={() => loadProducts(page + 1, search)}
        >
          Próximo
        </CPaginationItem>
      </CPagination >

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
