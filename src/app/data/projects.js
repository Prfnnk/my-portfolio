import naturellaSrc from '@/app/assets/naturella.png';
import cultureSrc from '@/app/assets/culture.png';
import whatToDoSrc from '@/app/assets/whattodo.png';
import stoovSrc from '@/app/assets/stoov.png';
import InsectHeroesSrc from '@/app/assets/insect_heroes.png';
import popsaSrc from '@/app/assets/popsa.png';

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
          icon: '',
        },
        {
          name: 'Sass',
          icon: 'sass-original',
        },
        {
          name: 'Pug',
          icon: '',
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
          icon: '',
        },
        {
          name: 'REST',
          icon: '',
        },
        {
          name: 'Tailwind',
          icon: 'tailwindcss-plain',
        },
        {
          name: 'Shopify',
          icon: '',
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
          icon: '',
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
          icon: '',
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
          icon: '',
        },
        {
          name: 'Sass',
          icon: 'sass-original',
        },
        {
          name: 'Shopify',
          icon: '',
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
          icon: '',
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
