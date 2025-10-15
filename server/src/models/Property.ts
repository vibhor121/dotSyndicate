import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: 'villa' | 'hotel' | 'apartment' | 'cottage';
  available: boolean;
  createdAt: Date;
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  images: {
    type: [String],
    default: []
  },
  amenities: {
    type: [String],
    default: []
  },
  bedrooms: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 bedroom']
  },
  bathrooms: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 bathroom']
  },
  maxGuests: {
    type: Number,
    required: true,
    min: [1, 'Must accommodate at least 1 guest']
  },
  propertyType: {
    type: String,
    enum: ['villa', 'hotel', 'apartment', 'cottage'],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IProperty>('Property', propertySchema);

