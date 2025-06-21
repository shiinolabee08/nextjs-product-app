import DefaultLayout from '@/components/admin/DefaultLayout'
import Modal from '@/components/shared/Modal'
import ProductCategoryTable from '@/features/admin/product-categories/ProductCategoryTable'
import ProductCategoryForm from '@/features/admin/product-categories/ProductCategoryForm'
import { useState } from 'react'
import type { NextPage } from 'next'
import { ProductCategory } from '@/types/product-category'
import { ChartBarStacked } from 'lucide-react'

const AdminProductCategories: NextPage & { pageTitle?: string } = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory|undefined>(undefined)

  const handleOnEditProductCategory = (productCategory: ProductCategory) => {
    setModalOpen(true)
    setSelectedProductCategory(productCategory)
  }

  const handleOnCloseModal = () => {
    setModalOpen(false)
    setSelectedProductCategory(undefined)
  }

  return (
    <DefaultLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
          >
            <ChartBarStacked className="inline-block mr-1"/> Add Product Category
          </button>
        </div>

        <ProductCategoryTable onEditProductCategory={handleOnEditProductCategory}/>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleOnCloseModal}>
          <ProductCategoryForm productCategory={selectedProductCategory} onSubmitSuccess={handleOnCloseModal} />
        </Modal>
      </div>
    </DefaultLayout>
  )
}

AdminProductCategories.pageTitle = 'Product Categories'

export default AdminProductCategories
