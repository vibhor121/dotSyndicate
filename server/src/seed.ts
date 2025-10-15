import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import User from './models/User';
import Property from './models/Property';

dotenv.config();

const seedData = async () => {
  try {
    await connectDatabase();
    
    console.log('🌱 Seeding database...');

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});

    // Create admin user
    const admin = await User.create({
      email: 'admin@staywise.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });
    console.log('✅ Admin user created: admin@staywise.com / admin123');

    // Create regular user
    const user = await User.create({
      email: 'user@test.com',
      password: 'user123',
      name: 'Test User',
      role: 'user'
    });
    console.log('✅ Test user created: user@test.com / user123');

    // Create sample properties
    const properties = [
      {
        title: 'Luxury Beach Villa',
        description: 'Beautiful beachfront villa with stunning ocean views, private pool, and modern amenities. Perfect for a relaxing getaway.',
        location: 'Goa, India',
        price: 15000,
        images: [
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
        ],
        amenities: ['WiFi', 'Pool', 'Beach Access', 'Parking', 'Kitchen', 'Air Conditioning'],
        bedrooms: 4,
        bathrooms: 3,
        maxGuests: 8,
        propertyType: 'villa',
        available: true
      },
      {
        title: 'Mountain View Cottage',
        description: 'Cozy cottage nestled in the mountains with breathtaking views. Ideal for nature lovers and peaceful retreats.',
        location: 'Manali, India',
        price: 8000,
        images: [
          'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800',
          'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800'
        ],
        amenities: ['WiFi', 'Fireplace', 'Garden', 'Parking', 'Kitchen'],
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        propertyType: 'cottage',
        available: true
      },
      {
        title: 'Modern City Apartment',
        description: 'Stylish apartment in the heart of the city. Walking distance to restaurants, shops, and entertainment.',
        location: 'Mumbai, India',
        price: 5000,
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
        ],
        amenities: ['WiFi', 'Gym', 'Parking', 'Kitchen', 'Air Conditioning', 'Elevator'],
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        propertyType: 'apartment',
        available: true
      },
      {
        title: 'Heritage Hotel Suite',
        description: 'Experience royal luxury in this heritage hotel with traditional architecture and modern comforts.',
        location: 'Jaipur, India',
        price: 12000,
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
        ],
        amenities: ['WiFi', 'Restaurant', 'Spa', 'Pool', 'Parking', 'Air Conditioning', 'Room Service'],
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        propertyType: 'hotel',
        available: true
      },
      {
        title: 'Lakeside Villa',
        description: 'Peaceful lakeside retreat with private dock, garden, and serene surroundings. Perfect for families.',
        location: 'Udaipur, India',
        price: 10000,
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        amenities: ['WiFi', 'Lake Access', 'Garden', 'Parking', 'Kitchen', 'Boat'],
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        propertyType: 'villa',
        available: true
      },
      {
        title: 'Boutique Hotel Room',
        description: 'Elegant boutique hotel room with personalized service and attention to detail.',
        location: 'Bangalore, India',
        price: 4000,
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'
        ],
        amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking', 'Air Conditioning', 'Room Service'],
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        propertyType: 'hotel',
        available: true
      }
    ];

    await Property.insertMany(properties);
    console.log(`✅ Created ${properties.length} properties`);

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();

