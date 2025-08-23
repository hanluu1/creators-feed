import { Routes, Route, Link } from 'react-router-dom'
import AddCreators from './app/add-your-creator/page'
import AllCreators from './app/your-creator-list/page'

function App() {
  return (
    <>
      <nav className="bg-white shadow-sm border-b">
        <div className="flex justify-start mx-auto px-4 py-4">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              Creators Feed
            </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="flex flex-col justify-center mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
                Welcome to Creators Feed
              </h1>
              <p className="text-center text-gray-600 mb-4">
                Discover amazing creators and add your own!
              </p>
              <div className="flex justify-center">
                <div className='flex flex-row justify-center'>
                  <Link 
                  to="/your-creator-list" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mr-4"
                  >
                    Your Creator List
                  </Link>
                  <Link 
                  to="/add-your-creator" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                  Add Your Creator
                  </Link>
              </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/add-your-creator" element={<AddCreators />} />
        <Route path="/your-creator-list" element={<AllCreators />} />
      </Routes>
    </>
  )
}

export default App
