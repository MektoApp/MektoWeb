import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productProvider } from '../../providers/ProductProvider'
import { API_BASE_URL } from '../../api/axiosInstance'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CButton,
} from '@coreui/react'
import { colors } from '../../theme/colors'
import ImageGalleryModal from './ImageGalleryModal'


const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  useEffect(() => {
    productProvider.getById(id).then((res) => {
      setProduct(res)
      setSelectedImage(res.imagesPaths?.[0]?.path || null)
      setLoading(false)
    })
  }, [id])

  if (loading) return <CSpinner color="primary" />

  if (!product) return <p>Produto não encontrado</p>

  return (
    <CContainer className="py-4">
      <CRow className="mb-4">
        {/* Imagens */}
        <CCol md={6}>
          <CCard>
            <CCardImage
              orientation="top"
              src={
                selectedImage
                  ? `${API_BASE_URL}/${selectedImage}`
                  : 'https://via.placeholder.com/500x400?text=Sem+Imagem'
              }
              style={{ cursor: 'pointer' }}
              onClick={() => {
                // só abrir modal quando clicar na imagem principal
                const index = product.imagesPaths.findIndex((img) => img.path === selectedImage)
                setGalleryIndex(index)
                setGalleryVisible(true)
              }}
            />
          </CCard>

          {product.imagesPaths?.length > 1 && (
            <CRow className="mt-2 g-2">
              {product.imagesPaths.map((img, idx) => (
                <CCol xs={3} key={img.path}>
                  <img
                    src={`${API_BASE_URL}/${img.path}`}
                    alt={product.name}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      border: img.path === selectedImage ? '2px solid #0d6efd' : '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                    onClick={() => setSelectedImage(img.path)} // apenas troca imagem
                  />
                </CCol>
              ))}
            </CRow>
          )}

          <ImageGalleryModal
            visible={galleryVisible}
            onClose={() => setGalleryVisible(false)}
            images={product.imagesPaths?.map((img) => `${API_BASE_URL}/${img.path}`)}
            currentIndex={galleryIndex}
            setCurrentIndex={setGalleryIndex}
          />


          {/* Descrição abaixo das imagens */}
          {product.description && (
            <CCard className="mt-3 p-3">
              <CCardText>
                <strong>Descrição:</strong> {product.description}
              </CCardText>
            </CCard>
          )}
        </CCol>

        {/* Detalhes */}
        <CCol md={6}>
          <CCardBody>
            <CCardTitle>{product.name}</CCardTitle>

            <CCardText className="text-muted small mb-2">
              {product.category?.name} • {product.subCategory?.name}
            </CCardText>

            {product.brand?.name && (
              <CCardText>
                <strong>Marca:</strong> {product.brand.name}
              </CCardText>
            )}

            <CCardText>
              <strong>Preço de Oferta:</strong>{' '}
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                product.offerPrice
              )}
            </CCardText>

            {product.price !== product.offerPrice && (
              <CCardText className="text-decoration-line-through text-muted">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  product.price
                )}
              </CCardText>
            )}

            <CListGroup flush className="mb-3">
              {product.quantity && (
                <CListGroupItem>Quantidade disponível: {product.quantity}</CListGroupItem>
              )}
              {product.variantType && product.variants?.length && (
                <CListGroupItem>
                  {product.variantType.name}: {product.variants.map((v) => v.name).join(', ')}
                </CListGroupItem>
              )}
              {product.companyName && (
                <CListGroupItem>Fornecedor: {product.companyName}</CListGroupItem>
              )}
            </CListGroup>

            {/* Botões de ação */}
            <div className="d-flex gap-3">
              <CButton style={{ backgroundColor: colors.halloween }} size="lg">
                Comprar Agora
              </CButton>
              <CButton color='primary' size="lg" variant="outline">
                Adicionar ao Carrinho
              </CButton>
            </div>
          </CCardBody>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ProductPage
