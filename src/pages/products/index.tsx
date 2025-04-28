import DefaultLayout from '@/components/shared/DefaultLayout'
import ProductList from '@/features/product-list/ProductList'
import type { NextPage } from 'next'

const ProductsPage: NextPage & { pageTitle?: string } = () => {
  return (
    <DefaultLayout>
      <ProductList />
    </DefaultLayout>
  )
}

ProductsPage.pageTitle = 'Products'

export default ProductsPage
