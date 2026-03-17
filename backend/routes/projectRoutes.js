const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");

router.get("/", projectController.getProjects);
router.post("/", auth, projectController.createProject);
router.put("/:id", auth, projectController.updateProject); // Для Update
router.delete("/:id", auth, projectController.deleteProject); // Для Delete

module.exports = router;