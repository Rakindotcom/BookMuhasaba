import React, { useState } from 'react'
import steadfastApi from '../services/steadfastApi'

const ApiKeyChecker = () => {
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState(null)

  const checkApiKeys = async () => {
    setIsChecking(true)
    setResult(null)
    
    try {
      const response = await steadfastApi.getCurrentBalance()
      setResult({
        success: true,
        message: `API keys are working! Current balance: ৳${response.current_balance}`,
        data: response
      })
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
        error: error
      })
    } finally {
      setIsChecking(false)
    }
  }

  const apiKeyExists = import.meta.env.VITE_STEADFAST_API_KEY && import.meta.env.VITE_STEADFAST_SECRET_KEY

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Steadfast API Configuration</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium">API Keys Status:</span>
          {apiKeyExists ? (
            <span className="text-green-600 font-medium">✓ Configured</span>
          ) : (
            <span className="text-red-600 font-medium">✗ Missing</span>
          )}
        </div>

        {!apiKeyExists && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Setup Required:</h4>
            <ol className="text-sm text-yellow-700 space-y-1">
              <li>1. Create <code>.env.local</code> file in project root</li>
              <li>2. Add your Steadfast API credentials:</li>
              <pre className="bg-yellow-100 p-2 rounded mt-2 text-xs">
{`VITE_STEADFAST_API_KEY=your_api_key_here
VITE_STEADFAST_SECRET_KEY=your_secret_key_here`}
              </pre>
              <li>3. Restart the development server</li>
            </ol>
          </div>
        )}

        {apiKeyExists && (
          <div>
            <button
              onClick={checkApiKeys}
              disabled={isChecking}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isChecking ? 'Testing...' : 'Test API Connection'}
            </button>

            {result && (
              <div className={`mt-4 p-4 rounded-md ${
                result.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-medium ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? '✓ Success' : '✗ Error'}
                </p>
                <p className={`text-sm mt-1 ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApiKeyChecker