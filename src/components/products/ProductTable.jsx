import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilImage, cilPlus } from '@coreui/icons'
import { productProvider } from '../../providers/ProductProvider'
import { API_BASE_URL } from '../../api/axiosInstance'
import ProductModal from './ProductModal' // importando o modal

const ProductTable = () => {
  const [products, setProducts] = useState({ content: [] })
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState(null)
  const pageSize = 5
  const [modalVisible, setModalVisible] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

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
        loadProducts(0, value) // sempre volta para a página 0 ao pesquisar
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <CFormInput
          placeholder="Pesquisar produto..."
          value={search}
          onChange={handleSearchChange}
          style={{ maxWidth: '300px' }}
        />
        <CButton color="primary" onClick={() => openModal()}>
          <CIcon icon={cilPlus} className="me-2" />
          Adicionar Produto
        </CButton>
      </div>

      {/* Tabela */}
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              <CIcon icon={cilImage} />
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Nome</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Categoria</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">SubCategoria</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Valor de Oferta</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Editar</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">Excluir</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products.content.map((product) => (
            <CTableRow key={product.id}>
              <CTableDataCell className="text-center">
                {product.imagesPaths?.length ? (
                  <img
                    src={`${API_BASE_URL}/${product.imagesPaths[0].path}`}
                    alt={product.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#e0e0e0',
                      display: 'inline-block'
                    }}
                  />
                )}
              </CTableDataCell>
              <CTableDataCell>{product.name}</CTableDataCell>
              <CTableDataCell className="text-center">{product.category.name}</CTableDataCell>
              <CTableDataCell>{product.subCategory.name}</CTableDataCell>
              <CTableDataCell className="text-center">R$ {product.offerPrice}</CTableDataCell>
              <CTableDataCell>
                <CButton color="info" size="sm" onClick={() => openModal(product)}>
                  <CIcon icon={cilPencil} />
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" size="sm">
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Paginação */}
      <CPagination className="mt-3" aria-label="Page navigation example">
        <CPaginationItem
          disabled={page === 0}
          onClick={() => loadProducts(page - 1, search)}
        >
          Anterior
        </CPaginationItem>

        {(() => {
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
        })()}

        <CPaginationItem
          disabled={page + 1 === totalPages}
          onClick={() => loadProducts(page + 1, search)}
        >
          Próximo
        </CPaginationItem>
      </CPagination>

      {/* Modal Criar/Editar Produto */}
      <ProductModal
        visible={modalVisible}
        onClose={closeModal}
        product={editingProduct}
        onSave={() => loadProducts(page, search)}
      />
    </>
  )
}

export default ProductTable
