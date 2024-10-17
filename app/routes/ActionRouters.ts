import express from "express";
import actionController from "../controllers/ActionController";

const router = express.Router();

router.get("/:id", actionController.index);
router.post("/add", actionController.createAction);
router.delete('/delete/:id', actionController.deleteAction);
router.put('/edit/:id', actionController.editAction);

export default router;
