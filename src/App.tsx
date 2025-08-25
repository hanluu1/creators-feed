import { Routes, Route, Link } from 'react-router-dom'
import AddCreators from './app/add-your-creator/page'
import AllCreators from './app/your-creator-list/page'
import CreatorsInfo from './app/creators-info/page'
import EditCreators from './app/edit-creators/page'
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
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome to Creators Feed
              </h1>
              <p className="text-gray-600 mb-6">
                Discover amazing creators and add your own!
              </p>
              <div className='flex flex-row gap-4'>
                <Link 
                to="/your-creator-list" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 text-center"
                >
                  Your Creator List
                </Link>
                <Link 
                to="/add-your-creator" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 text-center"
                >
                Add Your Creator
                </Link>
            </div>
            </div>
          </div>
        } />
        <Route path="/add-your-creator" element={<AddCreators />} />
        <Route path="/your-creator-list" element={<AllCreators />} />
        <Route path="/creators-info/:id" element={<CreatorsInfo />} />
        <Route path="/edit-creators/:id" element={<EditCreators />} />
      </Routes>
    </>
  )
}

export default App
