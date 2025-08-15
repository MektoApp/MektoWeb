import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
  CFormLabel,
} from '@coreui/react'
import { productProvider } from '../../providers/ProductProvider'
import { API_BASE_URL } from '../../api/axiosInstance'

const ProductModal = ({ visible, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1,
    price: '',
    offerPrice: '',
    categoryId: '',
    subCategoryId: '',
    brandId: '',
    variantId: '',
    variantType: '', // novo campo
    companyName: '',
    images: [], // imagens já salvas
    newImages: [], // novas imagens a serem carregadas
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        quantity: product.quantity || 1,
        price: product.price || '',
        offerPrice: product.offerPrice || '',
        categoryId: product.category?.id || '',
        subCategoryId: product.subCategory?.id || '',
        brandId: product.brand?.id || '',
        variantId: product.variants?.[0]?.id || '',
        variantType: product.variants?.[0]?.type || '', // preencher tipo
        companyName: product.companyName || '',
        images: product.imagesPaths || [],
        newImages: [],
      })
    } else {
      setFormData({
        name: '',
        description: '',
        quantity: 1,
        price: '',
        offerPrice: '',
        categoryId: '',
        subCategoryId: '',
        brandId: '',
        variantId: '',
        variantType: '',
        companyName: '',
        images: [],
        newImages: [],
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({ ...prev, newImages: [...prev.newImages, ...files] }))
  }

  const handleSubmit = async () => {
    try {
      // Preparar dados para envio
      const data = new FormData()
      Object.keys(formData).forEach((key) => {
        if (key !== 'images' && key !== 'newImages') {
          data.append(key, formData[key])
        }
      })
      formData.newImages.forEach((file) => data.append('images', file))

      if (product) {
        await productProvider.update(product.id, data)
      } else {
        await productProvider.create(data)
      }
      onSave()
      onClose()
    } catch (err) {
      console.error('Erro ao salvar produto:', err)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="xl">
      <CModalHeader>
        <CModalTitle>{product ? 'Editar Produto' : 'Novo Produto'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Nome</CFormLabel>
            <CFormInput name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <CFormLabel>Descrição</CFormLabel>
            <CFormTextarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          {/* Quantidade, Preço, Oferta */}
          <div className="d-flex gap-3 mb-3">
            <div style={{ flex: 1 }}>
              <CFormLabel>Quantidade</CFormLabel>
              <CFormInput name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <CFormLabel>Preço</CFormLabel>
              <CFormInput name="price" type="number" value={formData.price} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
              <CFormLabel>Preço de Oferta</CFormLabel>
              <CFormInput name="offerPrice" type="number" value={formData.offerPrice} onChange={handleChange} />
            </div>
          </div>

          {/* Categoria, Subcategoria */}
          <div className="d-flex gap-3 mb-3">
            <div style={{ flex: 1 }}>
              <CFormLabel>Categoria</CFormLabel>
              <CFormSelect name="categoryId" value={formData.categoryId} onChange={handleChange} options={[{ label: 'Selecione...', value: '' }]} />
            </div>
            <div style={{ flex: 1 }}>
              <CFormLabel>Subcategoria</CFormLabel>
              <CFormSelect name="subCategoryId" value={formData.subCategoryId} onChange={handleChange} options={[{ label: 'Selecione...', value: '' }]} />
            </div>
          </div>

          {/* Marca, Variação e Tipo */}
          <div className="d-flex gap-3 mb-3">
            <div style={{ flex: 1 }}>
              <CFormLabel>Marca</CFormLabel>
              <CFormSelect name="brandId" value={formData.brandId} onChange={handleChange} options={[{ label: 'Selecione...', value: '' }]} />
            </div>
            <div style={{ flex: 1 }}>
              <CFormLabel>Variação</CFormLabel>
              <CFormSelect name="variantId" value={formData.variantId} onChange={handleChange} options={[{ label: 'Selecione...', value: '' }]} />
            </div>
            <div style={{ flex: 1 }}>
              <CFormLabel>Tipo de Variação</CFormLabel>
              <CFormInput name="variantType" value={formData.variantType} onChange={handleChange} placeholder="Ex: Cor, Tamanho" />
            </div>
          </div>

          <div className="mb-3">
            <CFormLabel>Empresa</CFormLabel>
            <CFormInput name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>

          {/* Imagens existentes */}
          {formData.images.length > 0 && (
            <div className="mb-3">
              <CFormLabel>Imagens Existentes</CFormLabel>
              <div className="d-flex flex-wrap gap-2">
                {formData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${API_BASE_URL}/${img.path}`}
                    alt={`Imagem ${idx + 1}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upload de novas imagens */}
          <div className="mb-3">
            <CFormLabel>Adicionar Imagens</CFormLabel>
            <CFormInput type="file" multiple onChange={handleImageChange} />
            {formData.newImages.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-2">
                {formData.newImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx + 1}`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ))}
              </div>
            )}
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cancelar</CButton>
        <CButton color="primary" onClick={handleSubmit}>Salvar</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ProductModal
