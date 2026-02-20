
import { model, Schema } from 'mongoose';


const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: false,
    trim: true,
  },
  tag: {
    type: String,
    required: false,
    enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
    default: 'Todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
    versionKey: false,
  },
);


export const Note = model('Note', noteSchema);
