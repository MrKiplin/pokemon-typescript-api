import { createRestApp } from "./rest-api";

export const setupApplication = async () => {
  const app = await createRestApp();
  return app;
};

const port = process.env.PORT || 4000;

setupApplication().then(app =>
  // tslint:disable-next-line:no-console
  app.listen(port, async () => console.log(`Listening on port ${port}...`))
);
