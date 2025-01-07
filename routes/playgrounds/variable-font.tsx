import VariableFontPlayground from "../../islands/VariableFontPlayground.tsx";
import { define } from "../../utils/state.ts";
import { page } from "fresh";

export const handler = define.handlers({
  GET(ctx) {
    ctx.state.title = "Variable Font Playground";
    ctx.state.description = "A playground for variable fonts.";
    return page();
  },
});

export default define.page<typeof handler>(function Page() {
  return (
    <>
      <h1> Variable Font Playground </h1>
      <VariableFontPlayground />
    </>
  );
});
