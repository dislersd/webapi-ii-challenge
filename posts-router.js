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
    if (req.body.title && req.body.contents) {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } else {
      res.status(400).json({ message: "please enter title and content" });
    }
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const updated = await db.update(id, change);
    if (updated) {
      res.status(200).json({ mesage: "post updated", updated: updated });
    } else {
      res.status(404).json({
        message: "post not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error updating"
    });
  }
});

module.exports = router;
