import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller.js";

const router = Router();

//ROUTER BASE64-PDF
router.get(
    "/api/getValidarDocumentoPdf/:namePdf",
    languageController.validarAccessToken,
    languageController.getValidarDocumentoPdf
);

export default router;