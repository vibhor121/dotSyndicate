import Link from 'next/link';
import Image from 'next/image';

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    images: string[];
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    propertyType: string;
    amenities: string[];
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="relative h-64 w-full">
          <Image
            src={property.images[0] || '/placeholder.jpg'}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-primary-600">
              ₹{property.price.toLocaleString()}/night
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-800 truncate">
              {property.title}
            </h3>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full capitalize">
              {property.propertyType}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {property.location}
          </p>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {property.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex space-x-4">
              <span>🛏️ {property.bedrooms} Beds</span>
              <span>🚿 {property.bathrooms} Baths</span>
              <span>👥 {property.maxGuests} Guests</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs text-gray-500">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

