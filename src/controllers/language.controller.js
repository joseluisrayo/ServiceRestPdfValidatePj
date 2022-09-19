import PromiseFtp from "promise-ftp";
import config from "./../config.js";
import jwt from "jsonwebtoken";
import { scriptBase64 as pdfNoEncontrado } from "../utils/commons.js"

//CONTROLLER INGRESOS
const getValidarDocumentoPdf = async (req, res, next) => {
    try {
        const { namePdf } = req.params;
        if (namePdf.length != 0) {
            const ftp = new PromiseFtp();
            ftp.connect({
                host: config.host_ftp,
                user: config.user_ftp,
                password: config.password_ftp,
                autoReconnect: true
            })
                .then(function () {
                    return ftp.get(namePdf);
                })
                .then(function (stream) {
                    const bufs = [];
                    stream.resume().on("data", chunk => {
                        bufs.push(chunk)
                    });

                    stream.on("end", () => {
                        const buffer = Buffer.concat(bufs);
                        const pdf2base64 = 'data:application/pdf;base64,' + buffer.toString('base64');
                        res.status(200).json({
                            "data": pdf2base64
                        });
                        ftp.end();
                    });
                })
                .catch(() => {
                    const pdf2base64 = 'data:application/pdf;base64,' + pdfNoEncontrado.base64PdfVacio();
                    res.status(200).json({
                        "data": pdf2base64
                    });
                    ftp.end();
                    console.log(`No se encontro el pdf: ${namePdf} en el repositorio.`);
                });
        } else {
            res.status(400).send("No se aceptan parametros vacios.");
            console.log("No se aceptan parametros vacios.");
        }
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
};

//commons
const validarAccessToken = async (req, res, next) => {
    const accessToken = req.headers["authorization"];
    await jwt.verify(accessToken, config.secretkey, (err, data) => {
        if (err) {
            res.status(401).send("Access denied, token expired or incorrect");
        } else {
            next();
        }
    });
};

export const methods = {
    validarAccessToken,
    getValidarDocumentoPdf,
};