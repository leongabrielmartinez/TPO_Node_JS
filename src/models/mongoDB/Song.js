import { mongoose } from 'mongoose';
const currYear = new Date().getFullYear();
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true,
        min: [1900, "Year must be at least 1900"],
        max: [currYear, "Year cannot exceed the current year"]
    },

    artists: {
        type: [String], 
        required: true,
        trim: true
    },

    album: {
        type: String,
        trim: true
    },

    genre: {
        type: [String],
        required: true
    },

    rating: {
        type: Number,
        default: 5,
        min: [0, "Minimum rating is 0"],
        max: [10, "Maximum rating is 10"]
    },

    coverImage: {
        type: String,
        trim: true
    },

    isSingle: {
        type: Boolean,
        default: false
    },

    duration: {
        type: Number, 
        required: true
    },

    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

SongSchema.index({ title: "text"})
const Song = mongoose.model("Song", SongSchema);
export default Song;
