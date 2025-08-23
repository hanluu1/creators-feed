import { LinkIcon } from "@heroicons/react/24/outline";
interface CardProps {
  name: string;
  description: string;
  imgURL?: string;
  url?: string;
}

export default function Card({ name, url, description, imgURL}: CardProps){
  // Debug: Log what we're receiving
  console.log('Card props:', { name, imgURL });

  return (
    <div 
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {imgURL && (
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={imgURL}
            alt={name}
            onError={(e) => {
              console.error('Image failed to load:', {
                url: imgURL,
                name: name,
                errorEvent: e
              });
              // Show a placeholder instead of hiding
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTJweCIgZmlsbD0iIzk5OTk5OSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>
      )}
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl text-gray-800 flex-1 mr-2">
            {name}
          </h3>
          {url && (
            <LinkIcon className="h-5 w-5 text-blue-500 flex-shrink-0"
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')} />
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {description}
        </p>
      </div>
    </div>
  );
}