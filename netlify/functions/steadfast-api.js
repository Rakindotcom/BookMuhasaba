// Netlify serverless function to handle Steadfast API calls securely
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // Get API keys from Netlify environment variables (without VITE_ prefix)
  const API_KEY = process.env.STEADFAST_API_KEY
  const SECRET_KEY = process.env.STEADFAST_SECRET_KEY

  if (!API_KEY || !SECRET_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API credentials not configured' })
    }
  }

  try {
    const { action, data } = JSON.parse(event.body)
    
    let response
    const baseUrl = 'https://portal.steadfast.com.bd/api/v1'
    
    switch (action) {
      case 'create_order':
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
          body: JSON.stringify({ error: 'Invalid action' })
        }
    }

    const result = await response.json()
    
    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}