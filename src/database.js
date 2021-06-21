import mongoose from "mongoose"
import configurations from "./config"

const { PORT, MONGODB_DATABASE_NAME, MONGODB_URI, MONGODB_HOST} = configurations;

(async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Mongodb connected", MONGODB_DATABASE_NAME);
  } catch (error) {
    console.error(error);
  } 
})();