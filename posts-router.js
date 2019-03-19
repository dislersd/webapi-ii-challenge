const express = require("express");

const db = require("./data/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "error retrieving posts"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    res.status(202).json(post);
  } catch (error) {
    res.status(500).json({
      message: "error retrieving post"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await db.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the hub"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "post deleted" });
    } else {
      res.status(404).json({ message: "cannot find post" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error deleting"
    });
  }
});

module.exports = router;
