import naturellaSrc from '@/app/assets/images/projects/naturella.png';
import cultureSrc from '@/app/assets/images/projects/culture.png';
import whatToDoSrc from '@/app/assets/images/projects/whattodo.png';
import stoovSrc from '@/app/assets/images/projects/stoov.png';
import InsectHeroesSrc from '@/app/assets/images/projects/insect_heroes.png';
import popsaSrc from '@/app/assets/images/projects/popsa.png';
import tonysSrc from '@/app/assets/images/projects/tonys.jpg';

import gsapSrc from '@/app/assets/images/icons/gsap.jpeg';
import pugSrc from '@/app/assets/images/icons/pug.svg';
import liquidSrc from '@/app/assets/images/icons/liquid.png';
import reactSrc from '@/app/assets/images/icons/react.svg';

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
      geoRestricted: true,
      archiveLink:
        'http://web.archive.org/web/20241208181629/https://naturella.lenta.ru/',
    },
    {
      title: "Tony's Chocolonely",
      img: tonysSrc,
      stack: [
        {
          name: 'Javascript',
          icon: 'javascript-plain',
        },
        {
          name: 'React',
          icon: reactSrc,
        },
        {
          name: 'Tailwind',
          icon: 'tailwindcss-plain',
        },
        {
          name: 'Shopify',
          icon: 'Shopify',
        },
      ],
      link: 'https://nl.tonyschocolonely.com/',
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
      geoRestricted: true,
      archiveLink:
        'http://web.archive.org/web/20251214121815/https://cancelculture.afisha.ru/',
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
      geoRestricted: true,
      archiveLink:
        'http://web.archive.org/web/20251116174023/https://whattodo.lenta.ru/',
    },
    {
      title: 'Stoov',
      img: stoovSrc,
      stack: [
        {
          name: 'Javascript',
          icon: 'javascript-plain',
        },
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
          icon: 'Shopify',
        },
      ],
      link: 'https://nl.stoov.com/',
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
      geoRestricted: true,
      archiveLink:
        'http://web.archive.org/web/20251215111338/https://popsa.lenta.ru/',
    },
  ],
  // [
  //   {
  //     title: 'Insect Heroes',
  //     img: InsectHeroesSrc,
  //     stack: [
  //       {
  //         name: 'Javascript',
  //         icon: 'javascript-plain',
  //       },
  //       {
  //         name: 'Liquid',
  //         icon: liquidSrc,
  //       },
  //       {
  //         name: 'Sass',
  //         icon: 'sass-original',
  //       },
  //       {
  //         name: 'Shopify',
  //         icon: 'Shopify',
  //       },
  //     ],
  //     link: 'https://insectheroes.nl/',
  //   },
  //   {
  //     title: 'Marlies Dekkers',
  //     img: InsectHeroesSrc,
  //     stack: [
  //       {
  //         name: 'Javascript',
  //         icon: 'javascript-plain',
  //       },
  //       {
  //         name: 'Liquid',
  //         icon: liquidSrc,
  //       },
  //       {
  //         name: 'Sass',
  //         icon: 'sass-original',
  //       },
  //       {
  //         name: 'Shopify',
  //         icon: 'Shopify',
  //       },
  //     ],
  //     link: 'https://www.marliesdekkers.com/nl',
  //   },
  // ]
];
