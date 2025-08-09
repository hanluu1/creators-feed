interface CardProps {
  name: string;
  description: string;
  imageUrl?: string;
  url?: string;
}

export default function Card({ name, url, description, imageUrl}: CardProps) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {imageUrl && (
        <img 
          className="w-full h-48 object-cover" 
          src={imageUrl} 
          alt={name} 
        />
      )}
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">
          {url}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          {description}
        </p>
      </div>
      
    </div>
  );
}