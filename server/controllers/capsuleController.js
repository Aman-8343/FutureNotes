import Capsule from '../models/Capsule.js';


export const createCapsule = async (req, res) => {
    const { title, message, unlockDate } = req.body;
    try {
        const newCapsule = new Capsule({
            user: req.user.id,
            title,
            message,
            unlockDate,
            filePath: req.file ? req.file.path : null,
        });

        const capsule = await newCapsule.save();
        res.json(capsule);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


export const getUserCapsules = async (req, res) => {
    try {
        const capsules = await Capsule.find({ user: req.user.id }).sort({ unlockDate: 1 });
        const now = new Date();

        const processedCapsules = capsules.map(capsule => {
            if (capsule.unlockDate > now) {
                return {
                    _id: capsule._id,
                    title: capsule.title,
                    unlockDate: capsule.unlockDate,
                    isLocked: true,
                };
            }
            return { ...capsule.toObject(), isLocked: false };
        });

        res.json(processedCapsules);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};