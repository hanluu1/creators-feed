import { useEffect, useState } from "react";
import { supabase } from "../../lib/client";
import Card from "../../components/card";
interface Creator {
  id: number;
  name: string;
  description: string;
  url?: string;
  imgUrl?: string;
}

export default function AllCreators() {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [loading, setLoading] = useState(true);

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
            <div className="min-h-screen bg-gray-100 py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Creator List</h1>
                    <p className="text-gray-600">Loading your creators list...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {creators.map((creator) => (
                            <Card
                                key={creator.id}
                                imageUrl={creator.imgUrl}
                                name={creator.name}
                                url={creator.url}
                                description={creator.description}
                                
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
