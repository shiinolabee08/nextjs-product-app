import Layout from '@/components/shared/Layout'
import ProductList from '@/features/product-list/ProductList'
import type { NextPage } from 'next'

const ProductsPage: NextPage & { pageTitle?: string } = () => {
  return (
    <Layout>
      <ProductList />
    </Layout>
  )
}

ProductsPage.pageTitle = 'Products'

export default ProductsPage
