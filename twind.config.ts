import { Options } from "$fresh/plugins/twind.ts";
import { apply } from "twind";

export default {
  selfURL: import.meta.url,
  preflight: {
    tbody: apply`border-1 border-solid`,
    tr: apply`border-1 border-solid`,
    thead: apply`font-bold`,
    th: apply`px-2 border-b-2 border-solid text-left`,
    td: apply`border-foreground px-2 border-1 border-red`,
    a: apply`text-link no-underline hover:underline`,
  },
  theme: {
    extend: {
      colors: {
        'background': "#E5E5CB",
        'foreground': "#1A120B",
        'link': "#3C2A21",
      }
    }
  }
} as Options;
