import { useState } from 'react'
import './App.css'
import Card from './components/card'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Creators Feed</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              description="Learn the basics of React and build your first component-based application."
              name="Jane Doe"
              imageUrl="https://via.placeholder.com/400x200/3B82F6/ffffff?text=React"
            />
            
            <Card
              description="Discover advanced techniques and utilities to make your styling more efficient."
              name="John Smith"
              imageUrl="https://via.placeholder.com/400x200/06B6D4/ffffff?text=Tailwind"
            />
            
            <Card
              description="Explore the latest trends and technologies in web development for 2025."
              name="Sarah Johnson"
              imageUrl="https://via.placeholder.com/400x200/10B981/ffffff?text=Web+Dev"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
