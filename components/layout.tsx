// layout.tsx
import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";

interface LayoutProps {
  children: ComponentChildren;
  title: string;
  description: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <body class="py-4 px-6 max-w-xl mx-auto bg-dark-bg text-white">
      <Head>
        <title>Kaisei</title>
        <meta name="description" content={description} />
        <link rel="stylesheet" href="/styles.css" /> 
      </Head>
      <header>
        <h1 class="text-xl mb-1">{title}</h1>
        <hr class="mb-4 border-light-gray"/>
      </header>
      <main class="grid gap-4">
        {children}
      </main>
    </body>
  );
}
