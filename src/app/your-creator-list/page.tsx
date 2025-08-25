import { useEffect, useState } from "react";
import { supabase } from "../../lib/client";
import Card from "../../components/card";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
interface Creator {
  id: number;
  name: string;
  description: string;
  url?: string;
  imgURL?: string;
}

export default function AllCreators() {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .order('created_at', { ascending: true }); 
                if (error) {
                    console.error('Error fetching creators:', error);
                    return;
                }

                console.log('Fetched creators:', data);
                setCreators(data || []);
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreators();
    }, []); 

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Creator List</h1>
                    <p className="text-gray-600">Loading your creators list...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
                    Your Creator List
                </h1>
                
                {creators.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 text-lg mb-4">No creators found.</p>
                        <a 
                            href="/add-your-creator" 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add Your First Creator
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        <Link 
                            to="/add-your-creator" 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                            Add More Creators
                        </Link>
                        <div className="flex flex-row flex-wrap gap-6 justify-center">
                            {creators.map((creator) => (
                                <div 
                                    key={creator.id} 
                                    onClick={() => navigate(`/creators-info/${creator.id}`)}
                                    className="cursor-pointer"
                                >
                                    <Card
                                        imgURL={creator.imgURL}
                                        name={creator.name}
                                        url={creator.url}
                                        description={creator.description}
                                    />
                                </div>
                            ))}
                        </div>
                        
                  </div>
                )}
            </div>
        </div>
    );
}
