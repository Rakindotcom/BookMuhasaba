// Steadfast Courier API Integration via Netlify Functions
class SteadfastAPI {
  constructor() {
    // Use Netlify function endpoint instead of direct API calls
    this.functionUrl = '/.netlify/functions/steadfast-api'
  }

  async createOrder(orderData) {
    try {
      const response = await fetch(this.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create_order',
          data: orderData
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || `API Error: ${response.status}`)
      }
      
      return result
    } catch (error) {
      console.error('Error creating Steadfast order:', error)
      throw error
    }
  }

  async checkDeliveryStatus(identifier, type = 'invoice') {
    try {
      if (!API_CONFIG.apiKey || !API_CONFIG.secretKey) {
        throw new Error('Steadfast API keys not configured.')
      }

      let endpoint
      switch (type) {
        case 'consignment':
          endpoint = `/status_by_cid/${identifier}`
          break
        case 'tracking':
          endpoint = `/status_by_trackingcode/${identifier}`
          break
        default:
          endpoint = `/status_by_invoice/${identifier}`
      }

      const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.headers
      })
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`API Error: ${text}`)
      }
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || `API Error: ${response.status}`)
      }
      
      return result
    } catch (error) {
      console.error('Error checking delivery status:', error)
      throw error
    }
  }

  async getCurrentBalance() {
    try {
      const response = await fetch(this.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'check_balance'
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || `API Error: ${response.status}`)
      }
      
      return result
    } catch (error) {
      console.error('Error getting balance:', error)
      throw error
    }
  }

  // Convert order data to Steadfast format
  formatOrderForSteadfast(order) {
    return {
      invoice: order.id,
      recipient_name: order.name,
      recipient_phone: order.mobile,
      recipient_address: order.address,
      cod_amount: order.total,
      note: `Package: ${order.packageDetails?.name || 'N/A'}`,
      item_description: order.packageDetails?.name || 'Muhasaba Journal',
      delivery_type: 0 // Home delivery
    }
  }
}

export default new SteadfastAPI()