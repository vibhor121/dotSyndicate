import Image from 'next/image';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: {
    _id: string;
    property: {
      _id: string;
      title: string;
      location: string;
      images: string[];
      price: number;
      propertyType: string;
    };
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: string;
    createdAt: string;
  };
}

export default function BookingCard({ booking }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image
            src={booking.property.images[0] || '/placeholder.jpg'}
            alt={booking.property.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {booking.property.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center">
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
                </svg>
                {booking.property.location}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Check-in</p>
              <p className="text-sm font-semibold">
                {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Check-out</p>
              <p className="text-sm font-semibold">
                {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span>👥 {booking.guests} Guests</span>
            <span className="capitalize">
              📍 {booking.property.propertyType}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Price</span>
              <span className="text-2xl font-bold text-primary-600">
                ₹{booking.totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Booked on {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

