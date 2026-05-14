import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/generated/sidebar.mjs';

export default defineConfig({
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
