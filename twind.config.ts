import { Options } from "$fresh/plugins/twind.ts";
import { apply } from "twind";

export default {
  selfURL: import.meta.url,
  preflight: {
    tbody: apply`border-2 border-solid`,
    tr: apply`border-2 border-solid`,
    thead: apply`font-bold bg-gray-100 border-2`,
    th: apply`px-2 border-b-2 border-solid border-black text-left`,
    td: apply`px-2`,
    a: apply`text-blue-700 no-underline hover:underline`
  },
} as Options;
