import { useState } from 'react'
import {useRoutes} from 'react-router-dom'
import './App.css'
import AllCreators from './pages/AllCreators'
function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Creators Feed</h1>
          <div>
            <AllCreators />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
