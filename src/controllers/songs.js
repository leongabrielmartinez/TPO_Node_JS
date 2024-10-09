import { json } from "express";
import Song from "../models/mongoDB/Song.js"; 

export const songController = {

    async getAll(req, res) {
        try {
            const songs = await Song.find();
            songs.length ? 
                res.status(200).json({ success: true, message: "Songs collection", data: songs }) :
                res.status(404).json({ success: false, message: "Songs database is empty" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    
    async updateOne(req, res) {
        try {
            const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedSong) {
                return res.status(404).json({ success: false, message: "Update failed, Song not found" });
            }
            res.status(200).json({ success: true, message: "Song updated", data: updatedSong });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    async createOne(req, res) {
        const { title, year, artists, album, genre, rating, coverImage, isSingle, duration, description } = req.body;
        try {
            const newSong = new Song({
                title,
                year,
                artists,
                album,
                genre,
                rating,
                coverImage,
                isSingle,
                duration,
                description
            });
            const savedSong = await newSong.save();
            res.status(200).json({ success: true, message: "New song created", data: savedSong });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    async deleteOne(req, res) {
        try {
            const song = await Song.findByIdAndDelete(req.params.id);
            if (!song) {
                return res.status(404).json({ success: false, message: "Delete failed, Song not found." });
            }
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ success: false, message: `Internal Server Error --> ${error}` });
        }
    },

    async getByTitle(req, res) {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ success: false, message: "Missing 'title' query param" });
    }
    try {
        const songs = await Song.find({ title: { $regex: title, $options: "i" } });
        if (!songs.length) {
            return res.status(404).json({ success: false, message: `No songs with '${title}' in the title` });
        }
        res.status(200).json({
            success: true,
            message: "Songs by query title",
            data: songs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server Error --> ${error}` });
    }
}

};
