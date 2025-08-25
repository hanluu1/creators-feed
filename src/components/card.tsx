import { LinkIcon } from "@heroicons/react/24/outline";
interface CardProps {
  name: string;
  description: string;
  imgURL?: string;
  url?: string;
}

export default function Card({ name, url, description, imgURL}: CardProps){
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div 
      className="w-80 h-96 rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
    >
      {imgURL && (
        <div className="w-full h-48 bg-gray-200 overflow-hidden flex-shrink-0">
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
            }}
          />
        </div>
      )}
      
      <div className="px-6 py-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-xl text-gray-800 flex-1 mr-2">
            {name}
          </h3>
          {url && (
            <LinkIcon className="h-5 w-5 text-blue-500 flex-shrink-0"
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')} />
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {truncateDescription(description)}
        </p>
      </div>
    </div>
  );
}