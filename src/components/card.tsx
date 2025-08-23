interface CardProps {
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

export default function Card({ name, url, description, imageUrl}: CardProps){
  return (
    <div className="flex flex-col max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {imageUrl && (
        <img 
          className="w-full h-48 object-cover" 
          src={imageUrl} 
          alt={name} 
        />
      )}
      <div className="flex flex-col justify-center items-center px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">
          {name}
        </div>
        <div className="font-bold text-lg mb-2 text-gray-800">
          {url}
        </div>
        <div className="text-sm text-gray-600 leading-relaxed">
          {description}
        </div>
      </div>
      
    </div>
  );
}