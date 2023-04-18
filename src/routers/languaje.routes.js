import { Router } from "express";
import { methods as languageController } from "../controllers/language.controller.js";

const router = Router();

//ROUTER LOGIN SERVICE API
router.post(
    "/api/getLoginServiceApi",
    languageController.getLoginServiceApi
);

//ROUTER BASE64-PDF
router.get(
    "/api/getValidarDocumentoPdf/:namePdf",
    languageController.validarAccessToken,
    languageController.getValidarDocumentoPdf
);

export default router;