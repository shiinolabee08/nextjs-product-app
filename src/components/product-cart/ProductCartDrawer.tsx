interface CartDrawerProps {
  isOpen: boolean
  cart: any[]
  onClose: () => void
  onClearCart: () => void
}

export default function CartDrawer({ isOpen, cart, onClose, onClearCart }: CartDrawerProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-140px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex flex-col gap-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onClearCart}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )
}
