'use client'

import { FaExclamation } from 'react-icons/fa'
import { FiRefreshCcw, FiX } from 'react-icons/fi'

interface ErrorScreenProps {
  error: string
  onRetry: () => void
}

export const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <FaExclamation className="h-6 w-6 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-red-600 ">Erreur</h2>
      <p className="text-gray-600 ">{error} Veuiller verifier votre connexion internet et appuyer sur rafraichir la page.</p> 
      <p className='my-3'>ou</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 flex items-center mx-auto gap-2 bg-blue-600/30 text-blue-800 rounded-full  transition-colors"
      >
        Rafraîchir la page
        <FiRefreshCcw/>
      </button>
    </div>
  </div>
)