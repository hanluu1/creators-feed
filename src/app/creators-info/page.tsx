import { useEffect, useState } from "react";
import { supabase } from "../../lib/client";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

interface Creator {
  id: number;
  name: string;
  description: string;
  url?: string;
  imgURL?: string;
}

export default function CreatorsInfo() {
    const [creator, setCreator] = useState<Creator | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchCreator = async () => {
            if (!id) {
                setLoading(false);
                return;
            }
            
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', id)
                    .single(); // Get single record instead of array
                    
                if (error) {
                    console.error('Error fetching creator:', error);
                    setCreator(null);
                    return;
                }

                setCreator(data);
            } catch (error) {
                console.error('Unexpected error:', error);
                setCreator(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCreator();
    }, [id]); // Add id to dependency array 

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Creators Information</h1>
                    <p className="text-gray-600">Loading creators information...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-4x l mx-auto">
                <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-4">
                    Creator Information
                </h1>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Get to know this amazing creator
                </p>
                
                {!creator ? (
                    <div className="text-center bg-white rounded-lg shadow-md p-8">
                        <p className="text-gray-600 text-lg mb-4">Creator not found.</p>
                        <a 
                            href="/your-creator-list" 
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                        >
                            Back to Creator List
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex flex-row mx-4 mt-6">
                            <div className="flex">
                                {creator.imgURL ? (
                                    <img
                                        className="w-full md:h-full object-cover"
                                        src={creator.imgURL}
                                        alt={creator.name}
                                        onError={(e) => {
                                            console.error('Image failed to load:', creator.imgURL);
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgZmlsbD0iIzk5OTk5OSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-96 md:h-full bg-gray-200 flex items-center justify-center">
                                        <p className="text-gray-500 text-lg">No Image Available</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col mx-4">
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                    {creator.name}
                                </div>
                                
                                {creator.url && (
                                    <div className="flex flex-row">
                                        <div className="flex items-center mb-2">
                                            <LinkIcon className="h-6 w-6 text-blue-500 mr-3" />
                                        </div>
                                        <a 
                                            href={creator.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-lg underline break-all"
                                        >
                                            {creator.url}
                                        </a>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">About</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {creator.description}
                                    </p>
                                </div>


                            </div>
                        </div>
                        <div className="mx-4 my-6">
                            <a 
                                href="/your-creator-list"
                                className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                            >
                            Back to Creator List
                            </a>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
}