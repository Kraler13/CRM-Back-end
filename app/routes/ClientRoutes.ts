import express from "express";
import clientController from "../controllers/ClientController";

const router = express.Router();

router.get("/", clientController.index);
router.get("/:id", clientController.show);
router.post("/add", clientController.create);
router.put("/edit/:id", clientController.edit);
router.delete("/delete/:id", clientController.delete);

export default router;