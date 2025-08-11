import Card from '../components/card'
export default function AllCreators() {
  return (
    <div>
      <h1>All Creators</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              description="Learn the basics of React and build your first component-based application."
              name="Jane Doe"
              url=""
              imageUrl="https://via.placeholder.com/400x200/3B82F6/ffffff?text=React"
            />
            
            <Card
              description="Discover advanced techniques and utilities to make your styling more efficient."
              name="John Smith"
              url=""
              imageUrl="https://via.placeholder.com/400x200/06B6D4/ffffff?text=Tailwind"
            />
            
            <Card
              description="Explore the latest trends and technologies in web development for 2025."
              name="Sarah Johnson"
              url=""
              imageUrl="https://via.placeholder.com/400x200/10B981/ffffff?text=Web+Dev"
            />
          </div>
    </div>
  );
}
