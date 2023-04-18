import PromiseFtp from "promise-ftp";
import config from "./../config.js";
import jwt from "jsonwebtoken";
import { scriptBase64 as pdfNoEncontrado } from "../utils/commons.js";
import { methods as decode } from "../utils/decodeNameFile.js";

//LOGIN SERVICE_REST_PDF_VALIDATE_PJ
const getLoginServiceApi = async (req, res, next) => {
  try {
    const { username, password, ip_public } = req.body;

    if (!username || !password || !ip_public) {
      res
        .status(400)
        .json({ message: "Los campos requeridos no están presentes." });
      return;
    }

    if (username === "admin" && password === "123456") {
      const accessToken = createAccessToken(ip_public);
      res.cookie("google_cookie_access", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "Se ha iniciado sesión correctamente." });
      return;
    }

    res.status(203).json({ message: "Credenciales incorrectas." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Ha ocurrido un error interno." });
  }
};

//CONTROLLER INGRESOS
const getValidarDocumentoPdf = async (req, res, next) => {
  try {
    const { namePdf } = req.params;

    if (!namePdf || namePdf.length !== 24) {
      res
        .status(400)
        .json({ message: "El parámetro namePdf no es válido.", status: 400 });
      return;
    }

    const nombreDocumentoPDF = decode.desencriptarCaracter(namePdf);
    const ftp = new PromiseFtp();
    await ftp
      .connect({
        host: config.host_ftp,
        user: config.user_ftp,
        password: config.password_ftp,
        autoReconnect: true,
      })
      .then(function () {
        return ftp.get(nombreDocumentoPDF);
      })
      .then(function (stream) {
        const bufs = [];
        stream.resume().on("data", (chunk) => {
          bufs.push(chunk);
        });

        stream.on("end", () => {
          const buffer = Buffer.concat(bufs);
          const pdf2base64 =
            "data:application/pdf;base64," + buffer.toString("base64");
          res.status(200).json({ data: pdf2base64 });
          ftp.end();
        });
      })
      .catch(() => {
        const pdf2base64Vacio = pdfNoEncontrado.base64PdfVacio();
        console.log(`No se encontro el pdf: ${namePdf} en el repositorio.`);
        res.status(200).json({ data: pdf2base64Vacio });
        ftp.end();
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Ha ocurrido un error interno." });
  }
};

//commons
const validarAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.google_cookie_access;
  await jwt.verify(accessToken, config.secretkey, (err, data) => {
    if (err) {
      return res.status(401).send("Access denied, token incorrect");
    } else {
      if (Date.now() > data.exp) {
        return res.status(401).send("Access denied, token expired!");
      } else {
        next();
      }
    }
  });
};

const createAccessToken = (ip_public) => {
  const secretKey = config.secretkey;
  const payload = { ip_public: ip_public };

  // Establecer la fecha de expiración en 1 hora desde ahora
  // se debe convertir hora o minuto a segundos (1 hora = 3600 segundos)
  const expirationTime = Date.now() + 3600 * 1000;

  // Crear el token JWT
  return jwt.sign({exp: expirationTime, data: payload},secretKey);
};

export const methods = {
  validarAccessToken,
  getLoginServiceApi,
  getValidarDocumentoPdf,
};
