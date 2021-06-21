// Read environment variables
import { config } from "dotenv"
config();

const configurations = {
  PORT: process.env.PORT || 3000,
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || "notion-aplication",
  MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
    process.env.MONGODB_DATABASE_NAME|| "notion-aplication"
  }`,
};

export default configurations