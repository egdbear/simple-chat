import mongoose from 'mongoose';

const userProfileSchema = mongoose.Schema({
  email: String,
  name: String,
});

export default mongoose.model('UserProfile', userProfileSchema);
