import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { supabase } from '../../lib/client';

export default function AddCreators() {
    const [creators, setCreators] = useState({
        name: '',
        description: '',
        url: '',
        imgURL: '',
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setCreators((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const addCreators = async (event: FormEvent) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('creators')
            .insert({
                name: creators.name,
                description: creators.description,
                url: creators.url,
                imgURL: creators.imgURL,
            });
            
        console.log("Supabase insert result:", { data, error });
    
        if (error) {
            alert("❌ Insert failed: " + error.message);
        } else {
            alert("✅ Creator added!");
            window.location.href = '/'; 
        }
    };
            
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Creator</h2>
                <form onSubmit={addCreators} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Creator Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={creators.name}
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
                            value={creators.url}
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
                            value={creators.imgURL}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor ="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea 
                            rows={5} 
                            id="description" 
                            name="description"
                            value={creators.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    >
                        Add Creator
                    </button>
                </form>
            </div>
        </div>
    )
}

