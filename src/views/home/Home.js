import React from 'react'
import WidgetsProducts from '../widgets/WidgetsProducts'
import ProductTable from '../../components/products/ProductTable' // Novo componente

const Home = () => {
  return (
    <>
      <WidgetsProducts className="mb-4" />
      <ProductTable />
    </>
  )
}

export default Home
