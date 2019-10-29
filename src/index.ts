import { createRestApp } from "./rest-api";

const port = process.env.PORT || 3000;

export const setupApplication = async () => {
  const app = createRestApp();
  return app;
};

setupApplication().then(app =>
  // tslint:disable-next-line:no-console
  app.listen(port, async () => console.log(`Listening on port ${port}...`))
);
