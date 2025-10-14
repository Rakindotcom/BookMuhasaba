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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Steadfast API Configuration</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium">API Status:</span>
          <span className="text-blue-600 font-medium">Using Secure Server-Side API</span>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="font-medium text-blue-800 mb-2">Secure Configuration:</h4>
          <p className="text-sm text-blue-700">
            API keys are now handled securely via Netlify Functions. 
            No sensitive credentials are exposed in the client-side code.
          </p>
        </div>

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
      </div>
    </div>
  )
}

export default ApiKeyChecker