import { Builder } from "fresh/dev";
import { app } from "./main.ts";

// Pass development only configuration here
const builder = new Builder();

// Create optimized assets for the browser when
// running `deno run -A dev.ts build`
if (Deno.args.includes("build")) {
  await builder.build(app);
} else {
  // ...otherwise start the development server
  await builder.listen(app);
}