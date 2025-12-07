import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  location: string;
  price: string;
  type: 'Residential' | 'Commercial' | 'Land' | 'Industrial';
  beds: number;
  baths: number;
  area: string;
  image: string;
  status: 'Available' | 'Sold' | 'Pending';
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: String, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['Residential', 'Commercial', 'Land', 'Industrial']
    },
    beds: { type: Number, required: true, default: 0 },
    baths: { type: Number, required: true, default: 0 },
    area: { type: String, required: true },
    image: { type: String, required: true },
    status: { 
      type: String, 
      required: true,
      enum: ['Available', 'Sold', 'Pending'],
      default: 'Available'
    },
    city: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IProperty>('Property', PropertySchema);
