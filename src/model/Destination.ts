import mongoose, { Schema, Document } from "mongoose";

export interface Destination extends Document {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
}

const DestinationSchema: Schema<Destination> = new Schema({
  city: {
    type: String,
    required: [true, "City name is required"],
    unique: true,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  clues: {
    type: [String],
    required: [true, "At least one clue is required"],
  },
  fun_fact: {
    type: [String],
    required: [true, "At least one fun fact is required"],
  },
  trivia: {
    type: [String],
    required: [true, "At least one trivia is required"],
  },
});

const DestinationModel = (mongoose.models.Destination as mongoose.Model<Destination>) || 
  mongoose.model<Destination>("Destination", DestinationSchema);

export default DestinationModel; 