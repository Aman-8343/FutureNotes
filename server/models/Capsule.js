import mongoose from 'mongoose';

const CapsuleSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    unlockDate: { type: Date, required: true },
    filePath: { type: String }, 
    isUnlocked: { type: Boolean, default: false },
    notified: { type: Boolean, default: false } 
}, { timestamps: true });

const Capsule = mongoose.model('Capsule', CapsuleSchema);
export default Capsule;