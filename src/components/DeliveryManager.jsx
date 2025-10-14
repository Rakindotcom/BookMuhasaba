import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import steadfastApi from '../services/steadfastApi'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'

const DeliveryManager = ({ order, onUpdate }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState(null)
  const { toast, showToast, hideToast } = useToast()

  const createDelivery = async () => {
    setIsProcessing(true)
    try {
      const orderData = steadfastApi.formatOrderForSteadfast(order)
      const response = await steadfastApi.createOrder(orderData)
      
      // Update order with delivery info
      await updateDoc(doc(db, 'orders', order.id), {
        deliveryInfo: {
          consignmentId: response.consignment.consignment_id,
          trackingCode: response.consignment.tracking_code,
          status: response.consignment.status,
          createdAt: new Date()
        },
        status: 'shipped'
      })
      
      showToast('Delivery created successfully!', 'success')
      onUpdate()
    } catch (error) {
      console.error('Error creating delivery:', error)
      
      // Show specific error messages
      let errorMessage = 'Error creating delivery'
      if (error.message.includes('API keys not configured')) {
        errorMessage = 'Steadfast API keys not configured. Please check .env.local file.'
      } else if (error.message.includes('Unauthorized Access')) {
        errorMessage = 'Invalid API credentials. Please check your Steadfast API keys.'
      } else if (error.message.includes('API Error')) {
        errorMessage = error.message
      }
      
      showToast(errorMessage, 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const checkDeliveryStatus = async () => {
    if (!order.deliveryInfo?.trackingCode) return
    
    try {
      const response = await steadfastApi.checkDeliveryStatus(
        order.deliveryInfo.trackingCode, 
        'tracking'
      )
      
      if (response.status === 200) {
        setDeliveryStatus(response.delivery_status)
        
        // Update order status based on delivery status
        let newStatus = order.status
        if (response.delivery_status === 'delivered') {
          newStatus = 'delivered'
        } else if (response.delivery_status === 'cancelled') {
          newStatus = 'cancelled'
        }
        
        if (newStatus !== order.status) {
          await updateDoc(doc(db, 'orders', order.id), {
            status: newStatus,
            'deliveryInfo.status': response.delivery_status
          })
          onUpdate()
        }
      }
    } catch (error) {
      console.error('Error checking delivery status:', error)
      showToast('Error checking delivery status', 'error')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600'
      case 'cancelled': return 'text-red-600'
      case 'in_review': return 'text-blue-600'
      case 'hold': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'cancelled': return 'Cancelled'
      case 'in_review': return 'In Review'
      case 'hold': return 'On Hold'
      case 'pending': return 'Pending'
      default: return status || 'Unknown'
    }
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-3">Delivery Management</h4>
      
      {!order.deliveryInfo ? (
        <div>
          <p className="text-sm text-gray-600 mb-3">No delivery created yet</p>
          <button
            onClick={createDelivery}
            disabled={isProcessing}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Creating...' : 'Create Delivery'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tracking Code:</span>
            <span className="text-sm font-mono bg-white px-2 py-1 rounded">
              {order.deliveryInfo.trackingCode}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Consignment ID:</span>
            <span className="text-sm">{order.deliveryInfo.consignmentId}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Status:</span>
            <span className={`text-sm font-medium ${getStatusColor(deliveryStatus || order.deliveryInfo.status)}`}>
              {getStatusText(deliveryStatus || order.deliveryInfo.status)}
            </span>
          </div>
          
          <button
            onClick={checkDeliveryStatus}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors mt-2"
          >
            Check Status
          </button>
        </div>
      )}
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />
    </div>
  )
}

export default DeliveryManager