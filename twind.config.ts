import type { Options } from "$fresh/plugins/twind.ts";
import { aspectRatio } from '@twind/aspect-ratio';


export default {
  selfURL: import.meta.url,
  plugins: {
    aspect: aspectRatio,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['BerkeleyMono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'linear-gradient(131deg, rgba(255, 255, 255, 0.10) 0%, rgba(228, 228, 228, 0.00) 100%)',
      },
      backdropFilter: {
        blur: 'blur(12px)',
      },
      colors: {
        primary: "#252525",
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
