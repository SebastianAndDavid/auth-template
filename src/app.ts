/* eslint-disable no-console */
import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  console.log("No PORT detected!");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
