import { createRestApp } from "./rest-api";

const port = process.env.PORT || 3000;

createRestApp().then(app =>
  // tslint:disable-next-line:no-console
  app.listen(port, async () => console.log(`Listening on port ${port}...`))
);
