// models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: '',
    },
    entries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WritingEntry',
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

export default mongoose.model('Book', bookSchema);
