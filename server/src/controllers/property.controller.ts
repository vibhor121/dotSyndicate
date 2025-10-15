import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Property from '../models/Property';

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const { location, propertyType, minPrice, maxPrice } = req.query;

    let query: any = { available: true };

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (propertyType) {
      query.propertyType = propertyType;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });

    res.json({
      message: 'Properties fetched successfully',
      count: properties.length,
      properties
    });
  } catch (error: any) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({
      message: 'Property fetched successfully',
      property
    });
  } catch (error: any) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const property = new Property(req.body);
    await property.save();

    res.status(201).json({
      message: 'Property created successfully',
      property
    });
  } catch (error: any) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

