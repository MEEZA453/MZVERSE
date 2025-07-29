export interface Post {
  name: string;
  images: string[];
}

export interface Asset {
  name: string;
  details: string[];
  highlight: string[];
  images: string[];
}

export interface User {
  id : string;
  name: string;
  profile: string;
  email: string;
  handle: string;
  password: string;
  bio: string;
  post: Post[];
  assets: Asset[];
}

export const users: User[] = [
  {
    id: 'rohan_23',
    name: 'Rohan',
    profile: '/logo.png',
    email: 'rohan@gmail.com',
    handle: 'rohan',
    password: 'rohan@123',
    bio: "I'm a dumm! I love to blend cretivity with passion",
    post: [
      { name: 'Starlight', images: ['/starlight.webp'] },
      { name: 'Abundance', images: ['/abundance.webp'] },
      { name: 'freedom', images: ['freedom.webp'] },
      { name: 'Monster', images: ['monster.webp'] }

    ],
    assets: [
      {
        name: 'Timeless',
        details: [
          'High-res seamless textures',
          'Perfect for digital art backgrounds',
          'Available in JPG & PNG',
          'Free for personal & commercial use',
          'Neutral and color variants included'
        ],
        highlight: [
          '4K resolution quality',
          'Royalty-free license',
          'Curated for creators',
          'Compatible with Photoshop & Figma'
        ],
        images: ['/timeless.webp', '/wanted.webp']
      },
            {
        name: 'Wanted',
        details: [
          'High-res seamless textures',
          'Perfect for digital art backgrounds',
          'Available in JPG & PNG',
          'Free for personal & commercial use',
          'Neutral and color variants included'
        ],
        highlight: [
          '4K resolution quality',
          'Royalty-free license',
          'Curated for creators',
          'Compatible with Photoshop & Figma'
        ],
        images: [ '/wanted.webp']
      }  ,    {
        name: 'Nostalogia',
        details: [
          'High-res seamless textures',
          'Perfect for digital art backgrounds',
          'Available in JPG & PNG',
          'Free for personal & commercial use',
          'Neutral and color variants included'
        ],
        highlight: [
          '4K resolution quality',
          'Royalty-free license',
          'Curated for creators',
          'Compatible with Photoshop & Figma'
        ],
        images: ['abundance.webp']
      }
    ]
  },
  {
    id: 'ayesha_92',
    name: 'Ayesha',
    profile: '/ayesha.jpg',
    email: 'ayesha@gmail.com',
    handle: '@ayeshaxd',
    password: 'ayesha@321',
    bio: 'Creative soul with a pixel-perfect mind.',
    post: [
      { name: 'Dreamflow', images: ['/ayesha1.jpg'] },
      { name: 'Colorcloud', images: ['/ayesha2.jpg'] },
      { name: 'Midnight Muse', images: ['/ayesha3.jpg'] }
    ],
    assets: [
      {
        name: 'Gradient Pack',
        details: [
          '20 beautiful gradient backgrounds',
          'Handcrafted color transitions',
          'Perfect for modern UI design',
          'Easy to import into Figma/Sketch',
          'Ideal for landing pages and apps'
        ],
        highlight: [
          'Smooth blending',
          'Mobile-friendly assets',
          'Ready-to-use CSS code included',
          'Tested in dark/light themes'
        ],
        images: ['/gradient1.jpg', '/gradient2.jpg']
      }
    ]
  },
  {
    id: 'ishaan_88',
    name: 'Ishaan',
    profile: '/ishaan.jpg',
    email: 'ishaan@gmail.com',
    handle: '@ishxd',
    password: 'ish@pass123',
    bio: 'Web dev who loves space and sci-fi interfaces.',
    post: [
      { name: 'Nova Pulse', images: ['/nova.jpg'] },
      { name: 'Alien Grid', images: ['/alien.jpg'] },
      { name: 'Zero Gravity', images: ['/zero.jpg'] }
    ],
    assets: [
      {
        name: 'Sci-fi UI Kit',
        details: [
          'Custom vector elements',
          'Editable in Illustrator',
          'Dark mode ready',
          'Inspired by Star Wars & Tron',
          'Smart layering for easy editing'
        ],
        highlight: [
          'Vector and SVG formats',
          'Modular and extendable',
          'UI/UX ready',
          'Used by indie game devs'
        ],
        images: ['/sci1.jpg', '/sci2.jpg']
      }
    ]
  },
  {
    id: 'meera_45',
    name: 'Meera',
    profile: '/meera.jpg',
    email: 'meera@gmail.com',
    handle: '@meerart',
    password: 'meerapass!',
    bio: 'Illustrator & nature lover who turns ideas into visuals.',
    post: [
      { name: 'Botanic Wave', images: ['/botanic.jpg'] },
      { name: 'Wild Harmony', images: ['/wild.jpg'] },
      { name: 'Petal Poem', images: ['/petal.jpg'] }
    ],
    assets: [
      {
        name: 'Nature Illustration Pack',
        details: [
          'Includes 50 hand-drawn elements',
          'Watercolor texture options',
          'Made for posters and packaging',
          'Color & black-and-white versions',
          'Perfect for organic brands'
        ],
        highlight: [
          'Ready for print',
          'Natural feel & texture',
          'Well-organized layers',
          'Hand-drawn uniqueness'
        ],
        images: ['/nature1.jpg', '/nature2.jpg']
      }
    ]
  },
  {
    id: 'kabir_77',
    name: 'Kabir',
    profile: '/kabir.jpg',
    email: 'kabir@gmail.com',
    handle: '@kabircodes',
    password: 'kabir@code',
    bio: 'Code + Canvas = My Playground.',
    post: [
      { name: 'Glitch Core', images: ['/glitch1.jpg'] },
      { name: 'Echo Dust', images: ['/echo.jpg'] },
      { name: 'Cyber Dream', images: ['/cyber.jpg'] }
    ],
    assets: [
      {
        name: 'Preset Pack',
        details: [
          '20 custom LUTs for photo filters',
          'Tailored for futuristic style',
          'Works with Lightroom, VSCO',
          'Moody tones & sharp contrasts',
          'Ideal for urban street shots'
        ],
        highlight: [
          'One-click presets',
          'Custom color grading',
          'Great for reels & portfolios',
          'Tested by top creators'
        ],
        images: ['/preset1.jpg', '/preset2.jpg']
      }
    ]
  }
]
