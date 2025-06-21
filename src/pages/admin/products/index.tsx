import DefaultLayout from '@/components/admin/DefaultLayout'
import Modal from '@/components/shared/Modal'
import ProductTable from '@/features/admin/products/ProductTable'
import ProductForm from '@/features/admin/products/ProductForm'
import { useState } from 'react'
import type { NextPage } from 'next'
import { Product } from '@/types/product'
import { ShoppingBasket } from 'lucide-react'

const AdminProducts: NextPage & { pageTitle?: string } = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product|undefined>(undefined)

  const handleOnEditProduct = (product: Product) => {
    setModalOpen(true)
    setSelectedProduct(product)
  }

  const handleOnCloseModal = () => {
    setModalOpen(false)
    setSelectedProduct(undefined)
  }

  return (
    <DefaultLayout>
      <div className="p-8 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
          >
            <ShoppingBasket className="inline-block mr-1" /> Add Product
          </button>
        </div>

        <ProductTable onEditProduct={handleOnEditProduct}/>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleOnCloseModal}>
          <ProductForm product={selectedProduct} onSubmitSuccess={handleOnCloseModal} />
        </Modal>
      </div>
    </DefaultLayout>
  )
}

AdminProducts.pageTitle = 'Products'

export default AdminProducts
