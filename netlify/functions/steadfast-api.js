// Netlify serverless function to handle Steadfast API calls securely
exports.handler = async (event, context) => {
  // Add CORS headers for all responses
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    // Get API keys from Netlify environment variables (without VITE_ prefix)
    const API_KEY = process.env.STEADFAST_API_KEY
    const SECRET_KEY = process.env.STEADFAST_SECRET_KEY

    console.log('Environment check:', {
      hasApiKey: !!API_KEY,
      hasSecretKey: !!SECRET_KEY
    })

    if (!API_KEY || !SECRET_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'API credentials not configured in Netlify environment variables',
          details: 'Make sure STEADFAST_API_KEY and STEADFAST_SECRET_KEY are set'
        })
      }
    }

    // Parse request body
    let requestData
    try {
      requestData = JSON.parse(event.body || '{}')
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      }
    }

    const { action, data } = requestData
    
    if (!action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing action parameter' })
      }
    }

    let response
    const baseUrl = 'https://portal.packzy.com/api/v1' // Use the correct base URL from your original code
    
    console.log(`Making ${action} request to Steadfast API`)

    switch (action) {
      case 'create_order':
        if (!data) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Missing order data' })
          }
        }
        
        response = await fetch(`${baseUrl}/create_order`, {
          method: 'POST',
          headers: {
            'Api-Key': API_KEY,
            'Secret-Key': SECRET_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        break
        
      case 'check_balance':
        response = await fetch(`${baseUrl}/get_balance`, {
          method: 'GET',
          headers: {
            'Api-Key': API_KEY,
            'Secret-Key': SECRET_KEY
          }
        })
        break
        
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Invalid action: ${action}` })
        }
    }

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Steadfast API error:', response.status, errorText)
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `Steadfast API error: ${response.status}`,
          details: errorText
        })
      }
    }

    // Try to parse JSON response
    let result
    try {
      result = await response.json()
    } catch (jsonError) {
      const textResponse = await response.text()
      console.error('Failed to parse JSON response:', textResponse)
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid JSON response from Steadfast API',
          details: textResponse
        })
      }
    }
    
    console.log('Steadfast API response:', result)
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    }
    
  } catch (error) {
    console.error('Function error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      })
    }
  }
}