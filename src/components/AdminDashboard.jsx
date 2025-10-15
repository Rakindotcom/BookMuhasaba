import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import Toast from './Toast'
import ConfirmationModal from './ConfirmationModal'
import { useToast } from '../hooks/useToast'
import DeliveryManager from './DeliveryManager'
import ApiKeyChecker from './ApiKeyChecker'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = []
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setOrders(ordersData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      showToast('Logged out successfully', 'success')
    } catch (error) {
      console.error('Logout error:', error)
      showToast('Error logging out', 'error')
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus
      })
      showToast(`Order ${newStatus} successfully`, 'success')
    } catch (error) {
      console.error('Error updating order:', error)
      showToast('Error updating order status', 'error')
    }
  }

  const handleDeleteClick = (orderId, customerName) => {
    setOrderToDelete({ id: orderId, name: customerName })
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!orderToDelete) return
    
    try {
      await updateDoc(doc(db, 'orders', orderToDelete.id), {
        status: 'deleted',
        deletedAt: new Date()
      })
      showToast(`Order from ${orderToDelete.name} deleted successfully`, 'success')
      setShowDeleteModal(false)
      setOrderToDelete(null)
    } catch (error) {
      console.error('Error deleting order:', error)
      showToast('Error deleting order. Please try again.', 'error')
      setShowDeleteModal(false)
      setOrderToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setOrderToDelete(null)
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return timestamp.toDate().toLocaleString()
  }

  const formatCurrency = (amount) => {
    return `৳${amount.toLocaleString()}`
  }

  // Filter orders by status
  const visibleOrders = orders.filter(order => order.status !== 'deleted')
  const pendingOrders = visibleOrders.filter(order => order.status === 'pending')
  const confirmedOrders = visibleOrders.filter(order => order.status === 'confirmed')
  const shippedOrders = visibleOrders.filter(order => ['shipped', 'delivered'].includes(order.status))
  const deletedOrders = orders.filter(order => order.status === 'deleted')

  const OrderCard = ({ order }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{order.name}</h3>
          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">{formatCurrency(order.total)}</p>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <p><span className="font-medium">Mobile:</span> {order.mobile}</p>
        <p><span className="font-medium">Package:</span> {order.packageDetails?.name}</p>
        <p><span className="font-medium">Payment:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
        <p><span className="font-medium">Address:</span> {order.address}</p>
      </div>

      <div className="flex space-x-2">
        {order.status === 'pending' && (
          <>
            <button
              onClick={() => updateOrderStatus(order.id, 'confirmed')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Confirm Order
            </button>
            <button
              onClick={() => handleDeleteClick(order.id, order.name)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Cancel Order
            </button>
          </>
        )}
        {order.status === 'confirmed' && (
          <>
            <button
              onClick={() => updateOrderStatus(order.id, 'pending')}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Move to Pending
            </button>
            <button
              onClick={() => handleDeleteClick(order.id, order.name)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Delete Order
            </button>
          </>
        )}
      </div>

      {/* Delivery Management for confirmed orders */}
      {order.status === 'confirmed' && (
        <DeliveryManager 
          order={order} 
          onUpdate={() => window.location.reload()} 
        />
      )}
    </div>
  )
  
if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-['Poppins']">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* API Configuration Checker */}
        <ApiKeyChecker />
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{visibleOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Confirmed Orders</h3>
            <p className="text-3xl font-bold text-green-600">{confirmedOrders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipped Orders</h3>
            <p className="text-3xl font-bold text-purple-600">{shippedOrders.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Orders ({pendingOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'confirmed'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Confirmed Orders ({confirmedOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('shipped')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'shipped'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Shipped Orders ({shippedOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('deleted')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'deleted'
                    ? 'border-gray-500 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Deleted Orders ({deletedOrders.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'pending' && (
              <div>
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No pending orders</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {pendingOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'confirmed' && (
              <div>
                {confirmedOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No confirmed orders</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {confirmedOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shipped' && (
              <div>
                {shippedOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No shipped orders</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {shippedOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'deleted' && (
              <div>
                {deletedOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No deleted orders</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {deletedOrders.map(order => (
                      <div key={order.id} className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 opacity-75">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-600">{order.name}</h3>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            <p className="text-sm text-red-600 font-medium">Deleted Order</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-600">{formatCurrency(order.total)}</p>
                            <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p><span className="font-medium">Mobile:</span> {order.mobile}</p>
                          <p><span className="font-medium">Package:</span> {order.packageDetails?.name}</p>
                          <p><span className="font-medium">Address:</span> {order.address}</p>
                        </div>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'pending')}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          Restore Order
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />

      <ConfirmationModal
        isVisible={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Order"
        message="This will delete this order from the admin panel. The order data will remain in the database for record-keeping but won't be visible in the main views."
        customerName={orderToDelete?.name}
        orderId={orderToDelete?.id}
        confirmText="Delete Order"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

export default AdminDashboard