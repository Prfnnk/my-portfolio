import naturellaSrc from '@/app/assets/images/projects/naturella.png';
import cultureSrc from '@/app/assets/images/projects/culture.png';
import whatToDoSrc from '@/app/assets/images/projects/whattodo.png';
import stoovSrc from '@/app/assets/images/projects/stoov.png';
import InsectHeroesSrc from '@/app/assets/images/projects/insect_heroes.png';
import popsaSrc from '@/app/assets/images/projects/popsa.png';

import gsapSrc from '@/app/assets/images/icons/gsap.jpeg';
import pugSrc from '@/app/assets/images/icons/pug.svg';
import shopifySrc from '@/app/assets/images/icons/shopify_glyph_black.svg';
import liquidSrc from '@/app/assets/images/icons/liquid.png';

// icon values are from devicon library: https://devicon.dev/
export const projects = [
  [
    {
      title: 'Naturella',
      img: naturellaSrc,
      stack: [
        {
          name: 'Javascript',
          icon: 'javascript-plain',
        },
        {
          name: 'Gsap',
          icon: gsapSrc,
        },
        {
          name: 'Sass',
          icon: 'sass-original',
        },
        {
          name: 'Pug',
          icon: pugSrc,
        },
      ],
      link: 'https://naturella.lenta.ru/',
    },
    {
      title: 'Stoov',
      img: stoovSrc,
      stack: [
        {
          name: 'Liquid',
          icon: liquidSrc,
        },
        {
          name: 'Tailwind',
          icon: 'tailwindcss-plain',
        },
        {
          name: 'Shopify',
          icon: shopifySrc,
        },
      ],
      link: 'https://nl.stoov.com/',
    },
    {
      title: 'Cancel Culture',
      img: cultureSrc,
      stack: [
        {
          name: 'Vue.js',
          icon: 'vuejs-plain',
        },
        {
          name: 'Gsap',
          icon: gsapSrc,
        },
        {
          name: 'Nuxt',
          icon: 'nuxtjs-plain',
        },
        {
          name: 'Swiper',
          icon: 'swiper-original',
        },
      ],
      link: 'https://cancelculture.afisha.ru/',
    },
  ],
  [
    {
      title: 'What to do?',
      img: whatToDoSrc,
      stack: [
        {
          name: 'Vue.js',
          icon: 'vuejs-plain',
        },
        {
          name: 'Gsap',
          icon: gsapSrc,
        },
        {
          name: 'Nuxt',
          icon: 'nuxtjs-plain',
        },
        {
          name: 'Swiper',
          icon: 'swiper-original',
        },
      ],
      link: 'https://whattodo.lenta.ru/',
    },
    {
      title: 'Insect Heroes',
      img: InsectHeroesSrc,
      stack: [
        {
          name: 'Liquid',
          icon: liquidSrc,
        },
        {
          name: 'Sass',
          icon: 'sass-original',
        },
        {
          name: 'Shopify',
          icon: shopifySrc,
        },
      ],
      link: 'https://cancelculture.afisha.ru/',
    },
    {
      title: 'Pop Music History',
      img: popsaSrc,
      stack: [
        {
          name: 'Vue.js',
          icon: 'vuejs-plain',
        },
        {
          name: 'Gsap',
          icon: gsapSrc,
        },
        {
          name: 'Nuxt',
          icon: 'nuxtjs-plain',
        },
        {
          name: 'Swiper',
          icon: 'swiper-original',
        },
      ],
      link: 'https://popsa.lenta.ru/',
    },
  ],
];
