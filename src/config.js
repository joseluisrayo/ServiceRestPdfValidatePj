import { config } from "dotenv";

config();

export default {
  host_ftp: process.env.HOST_FTP || "",
  user_ftp: process.env.USER_FTP || "",
  password_ftp: process.env.PASSWORD_FTP || "",
  secretkey: process.env.SECRET || "",
  redis_host: process.env.REDIS_HOST || "",
  redis_port: process.env.REDIS_PORT || ""
};