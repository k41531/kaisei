// layout.tsx
import Header from "../components/organisms/header.tsx";
import { define } from "../utils/state.ts";

export default define.page(function App({ Component, state}) {
  return (
    <html>
      <head>
        <title>{`Kaisei's ${state.title}`}</title>
        <meta name="description" content={state.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="py-4 px-6 grid gap-2 max-w-xl w-full mx-auto bg-primary text-white sm:min-w-64">
        <Header />
        <main class="grid gap-4 w-full">
          <Component/>
        </main>
      </body>
    </html>
  );
});