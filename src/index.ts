import { Hono } from "hono";
import profilesRoute from "./routes/profiles/profiles"
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => c.text("Welome to volunteer management system!"));

// CORS middleware22
app.use(
  "/*",
  cors({
    origin: "*", // TODO: Allow all origins for now. Use specific domains in production.
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH"],
    allowHeaders: ["Content-Type"], // TODO: Ensure the required headers are allowed.
  })
);

// Existing routes
app.route("/profile", profilesRoute);


export default app;
