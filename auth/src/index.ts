import { app } from "./app";

// listening is done here, not in app, so that supertest can assign random ports if need be

const start = async () => {
  app.listen(3000, () => {
    console.log("Auth Server listening on port 3000");
  });
};

start();
