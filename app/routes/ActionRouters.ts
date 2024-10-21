import express from "express";
import actionController from "../controllers/ActionController";

const router = express.Router();

router.get("/list/:clientId", actionController.index);
router.get("/:id", actionController.read);
router.post("/add", actionController.createAction);
router.delete('/delete/:id', actionController.deleteAction);
router.put('/edit', actionController.editAction);

export default router;
