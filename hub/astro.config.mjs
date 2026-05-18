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
      social: []
    })
  ]
});
