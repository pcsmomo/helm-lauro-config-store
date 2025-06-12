const express = require("express");
const { KV } = require("./models");

const apiRouter = express.Router();

apiRouter.get("/kv", async (req, res) => {
  try {
    const kvs = await KV.findAll();
    return res.json({ data: kvs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

apiRouter.get("/kv/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const kv = await KV.findOne({ where: { key } });

    if (kv === null || kv === undefined) {
      return res.status(404).json({ error: "Key not found" });
    }

    return res.json({ data: kv });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

apiRouter.post("/kv", async (req, res) => {
  const { key, value } = req.body;

  if (!key || !value) {
    return res
      .status(400)
      .json({ error: "both key and value fields are required." });
  }

  try {
    const existingKV = await KV.findOne({ where: { key } });

    if (existingKV) {
      return res.status(400).json({ error: "Key already exists." });
    }

    const newKv = await KV.create({ key, value });
    return res.status(201).json({ data: newKv });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

apiRouter.put("/kv/:key", async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  if (!value) {
    return res
      .status(400)
      .json({ error: "value field is required to update a key." });
  }

  try {
    const [updatedCount] = await KV.update({ value }, { where: { key } });

    if (updatedCount > 0) {
      const updatedKV = await KV.findOne({ where: { key } });

      if (updatedKV) {
        return res.status(200).json({ data: updatedKV });
      }

      return res.status(404).json({ error: "Key not found" });
    } else {
      return res.status(404).json({ error: "Key not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

apiRouter.delete("/kv/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const deletedCount = await KV.destroy({ where: { key } });

    if (deletedCount > 0) {
      return res.sendStatus(204);
    }

    return res.status(404).json({ error: "Key not found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = apiRouter;
