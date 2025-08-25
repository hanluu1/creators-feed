import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { FormEvent, ChangeEvent } from 'react';
import { supabase } from '../../lib/client';


export default function EditCreators() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState({
        name: '',
        description: '',
        url: '',
        imgURL: '',
    });

    useEffect(() => {
        const fetchCreator = async () => {
            if (!id) {
                navigate('/your-creator-list');
                return;
            }
            
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', id)
                    .single();
                    
                if (error) {
                    console.error('Error fetching creator:', error);
                    alert('Creator not found');
                    navigate('/your-creator-list');
                    return;
                }

                setCreator({
                    name: data.name || '',
                    description: data.description || '',
                    url: data.url || '',
                    imgURL: data.imgURL || '',
                });
            } catch (error) {
                console.error('Unexpected error:', error);
                navigate('/your-creator-list');
            } finally {
                setLoading(false);
            }
        };

        fetchCreator();
    }, [id, navigate]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateCreator = async (event: FormEvent) => {
        event.preventDefault();
        
        try {
            const { error } = await supabase
                .from('creators')
                .update({
                    name: creator.name,
                    description: creator.description,
                    url: creator.url,
                    imgURL: creator.imgURL,
                })
                .eq('id', id);
                
            if (error) {
                console.error('Update error:', error);
                alert("❌ Update failed: " + error.message);
                return;
            }
            
            alert("✅ Creator updated successfully!");
            navigate(`/creators-info/${id}`);
        } catch (error) {
            console.error('Unexpected error:', error);
            alert("❌ Update failed");
        }
    };

    const deleteCreator = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${creator.name}"? This action cannot be undone.`
        );
        
        if (!confirmDelete) return;
        
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);
                
            if (error) {
                console.error('Delete error:', error);
                alert("❌ Delete failed: " + error.message);
                return;
            }
            
            alert("✅ Creator deleted successfully!");
            navigate('/your-creator-list');
        } catch (error) {
            console.error('Unexpected error:', error);
            alert("❌ Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Edit Creator
                </h2>
                
                <form onSubmit={updateCreator} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Creator Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={creator.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                            Website/Social URL
                        </label>
                        <input 
                            type="url" 
                            id="url" 
                            name="url" 
                            value={creator.url}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="imgURL" className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input 
                            type="url" 
                            id="imgURL" 
                            name="imgURL" 
                            value={creator.imgURL}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/photo-xxx or https://picsum.photos/400/300"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea 
                            rows={5} 
                            id="description" 
                            name="description"
                            value={creator.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button 
                            type="submit" 
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                        >
                            Update Creator
                        </button>
                        
                        <button 
                            type="button"
                            onClick={deleteCreator}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                        >
                            Delete Creator
                        </button>
                    </div>
                </form>
                
                <div className="mt-6 text-center">
                    <button 
                        onClick={() => navigate(`/creators-info/${id}`)}
                        className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}