import express from "express";
import clientController from "../controllers/ClientController";
import actionController from "../controllers/ActionController";

const router = express.Router();

router.get("/", clientController.index);
router.get("/:id", clientController.show);
router.post("/add", clientController.create);
router.put("/edit/:id", clientController.edit);
router.delete("/delete/:id", clientController.delete);

router.post("/:id/actions", actionController.createAction);

export default router;