import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['BerkeleyMono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'linear-gradient(131deg, rgba(255, 255, 255, 0.28) 0%, rgba(228, 228, 228, 0.00) 100%)',
      },
      backdropFilter: {
        'blur': 'blur(12px)',
      },
      colors: {
        primary: "#2977BF",
      },
      }
    },
    preflight: {
      // import local fonts
      '@font-face': [
        {
          fontFamily: 'BerkeleyMono',
          src: 'url(/fonts/BerkeleyMono-Regular.woff2) format("woff2")',
        },
      ],
    }

} as Options;
