// Simple test function to check environment variables
exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Environment test',
      hasApiKey: !!process.env.STEADFAST_API_KEY,
      hasSecretKey: !!process.env.STEADFAST_SECRET_KEY,
      apiKeyLength: process.env.STEADFAST_API_KEY ? process.env.STEADFAST_API_KEY.length : 0,
      secretKeyLength: process.env.STEADFAST_SECRET_KEY ? process.env.STEADFAST_SECRET_KEY.length : 0
    })
  }
}