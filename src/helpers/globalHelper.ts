import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

// .env
export const PORT: number = parseInt(process.env.PORT) || 8080;
export const HOST: string = process.env.HOST || "0.0.0.0";
export const MONGO_URI: string = process.env.MONGO_URI;
export const SECRET: string = process.env.SECRET || "PAWTATO-API";
export const PROXY: string =
  process.env.PROXY || "https://pawtato-api.onrender.com";

// token
export const accessPath = "/";
export const expirationTime = new Date(Date.now() + 3600000); // 1 Hour

// common
export const upload_directory = "../../uploads";
export const user_roles = ["Super Admin", "Admin", "Member"];

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pawtato - API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
      },
      {
        url: PROXY,
      },
    ],
    components: {
      securitySchemes: {
        CookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "Token", // Name of the cookie
        },
      },
    },
    security: [
      {
        CookieAuth: [] as string[], // Apply the cookie authentication globally
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
