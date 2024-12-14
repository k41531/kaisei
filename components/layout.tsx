// layout.tsx
import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import Header from "./organisms/header.tsx";

interface LayoutProps {
  children: ComponentChildren;
  title: string;
  description: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <body class="py-4 px-6 grid gap-2 max-w-xl w-full mx-auto bg-primary text-white sm:min-w-64">
      <Head>
        <title>{`Kaisei's ${title}`}</title>
        <meta name="description" content={description} />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <Header />
      <main class="grid gap-4 w-full">{children}</main>
    </body>
  );
}
