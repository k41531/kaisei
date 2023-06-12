import { Options } from "$fresh/plugins/twind.ts";
import { apply } from "twind";

export default {
  selfURL: import.meta.url,
  preflight: {
    tbody: apply`border-1 border-solid`,
    tr: apply`border-1 border-solid`,
    thead: apply`font-bold`,
    th: apply`px-2 border-b-2 border-solid text-left`,
    td: apply`px-2`,
    a: apply`text-blue-100 no-underline hover:underline`
  },
  theme: {
    extend: {
      colors: {
        'dark-gray': "#465469",
        'light-gray': "#e2e8f0",
        tertiary: "#0000ff"

      } 
    }
  } 
} as Options;
