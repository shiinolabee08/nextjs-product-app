import Layout from '@/components/shared/Layout'
import ProductList from '@/components/product-list/ProductList'

export default function ProductsPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <ProductList />
    </Layout>
  )
}
