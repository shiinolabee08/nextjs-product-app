import DefaultLayout from '@/components/admin/DefaultLayout'
import Modal from '@/components/shared/Modal'
import ProductForm from '@/features/admin/products/ProductForm'
import { lazy, Suspense, useState } from 'react'
import type { NextPage } from 'next'
import { Product } from '@/types/product'

const ProductTable = lazy(() => import('@/features/admin/products/ProductTable'))

const AdminDashboard: NextPage & { pageTitle?: string } = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product|undefined>(undefined)

  const handleOnEditProduct = (product: Product) => {
    setModalOpen(true)
    setSelectedProduct(product)
  }

  const handleOnSubmitSuccess = () => {
    setModalOpen(false)
    setSelectedProduct(undefined)
  }

  return (
    <DefaultLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>

        <Suspense fallback={<p>Loading products...</p>}>
          <ProductTable onEditProduct={handleOnEditProduct}/>
        </Suspense>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ProductForm product={selectedProduct} onSubmitSuccess={handleOnSubmitSuccess} />
        </Modal>
      </div>
    </DefaultLayout>
  )
}

AdminDashboard.pageTitle = 'Admin Dashboard'

export default AdminDashboard
