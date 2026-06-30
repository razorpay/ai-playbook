import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/generated/sidebar.mjs';

export default defineConfig({
  site: process.env.ASTRO_SITE || 'https://razorpay.github.io',
  base: process.env.ASTRO_BASE || '/ai-playbook',
  integrations: [
    starlight({
      title: 'Razorpay AI Playbook',
      description: 'Markdown-first playbook hub for AI-native builder enablement.',
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      sidebar,
      social: [],
      head: [
        // Editorial display (Fraunces) + warm readable body (Hanken Grotesk) + mono.
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
          }
        },
        // Belt/home detection — runs in <head> before paint so CSS keyed on
        // [data-belt] / [data-home] themes the page with no flash. Multi-page
        // nav reloads the document, so this re-runs on every page.
        {
          tag: 'script',
          content:
            '(function(){try{var p=location.pathname;' +
            'var m=p.match(/\\/belts\\/(white|yellow|green|black)(?:\\/|$)/);' +
            'var b=m?m[1]:(/\\/council(?:\\/|$)/.test(p)?"council":"");' +
            'var r=document.documentElement;' +
            'if(b)r.setAttribute("data-belt",b);' +
            'if(/^\\/ai-playbook\\/?$/.test(p))r.setAttribute("data-home","");' +
            '}catch(e){}})();'
        }
      ]
    })
  ]
});
