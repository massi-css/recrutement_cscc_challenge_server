import http from "http";
import connectDB from "./connectDB.js";
import dotenv from "dotenv";
import Registration from "./models/RegistrationModel.js";

const hostname = "0.0.0.0";
const port = process.env.PORT || 5000;
dotenv.config();

// connect to the database (MongoDB)
connectDB();

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.writeHead(204); // No Content
    res.end();
    return;
  }
  if (req.url === "/") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    res.statusCode = 200;
    res.end("Hello World");
  } else {
    if (req.url === "/register" && req.method === "POST") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const parsedBody = JSON.parse(body);
          console.log(parsedBody);
          const newRegistration = new Registration(parsedBody);
          await newRegistration.save();
          res.statusCode = 201;
          res.end(JSON.stringify({ message: "Registration successful" }));
        } catch (err) {
          res.statusCode = 500;
          console.error(err);
          res.end(JSON.stringify({ message: "Error in registration" }));
        }
      });
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
