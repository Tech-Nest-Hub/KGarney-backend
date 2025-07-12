// models/WritingEntry.js
import mongoose from 'mongoose';

const writingEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ['happy', 'meh', 'sad', 'stressed', 'excited', 'angry'],
      default: 'meh',
    },
    tags: [String],
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

export default mongoose.model('WritingEntry', writingEntrySchema);
