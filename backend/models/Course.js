import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String }, // Text or description
  videoUrl: { type: String }, // Optional video URL
  duration: { type: Number }, // in minutes
  order: { type: Number, required: true }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Language', 'Programming'
  price: { type: Number, required: true, default: 0 }, // 0 means free
  thumbnail: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [lessonSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
