export interface Post {
  name: string;
  images: string[];
}

export interface Asset {
  name: string;
  headline : string;
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
    id: 'touhid_34',
    name: 'Tohid',
    profile: '/redmzco.png',
    email: 'rohan@gmail.com',
    handle: 'rohan',
    password: 'rohan@123',
    bio: "I'm a dumm! I love to blend cretivity with passion",
    post: [
      { name: 'Starlight', images: ['/nostalogia.webp'] },
      // { name: 'freedom', images: ['/freedom.webp'] },
      // { name: 'Monster', images: ['/monster.webp'] }

    ],
    assets: [
      {
        name: 'Timeless',
        headline : 'A high quality 4k paper texture drag & drop in your project',
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
        headline : 'A high quality 4k paper texture drag & drop in your project',
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
        headline : 'A high quality 4k paper texture drag & drop in your project.',
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
    id: 'rohan_23',
    name: 'Rohan',
    profile: '/image.png',
    email: 'rohan@gmail.com',
    handle: 'rohan',
    password: 'rohan@123',
    bio: "I'm a dumm! I love to blend cretivity with passion",
    post: [
      { name: 'Starlight', images: ['/blackw.png'] },
      { name: 'Abundance', images: ['/freedom.webp'] },
      { name: 'Abundance', images: ['/architecture.webp'] },

    


    ],
    assets: [
      {
        name: 'Timeless',
        headline : 'A high quality 4k paper texture drag & drop in your project',
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
        headline : 'A high quality 4k paper texture drag & drop in your project',
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
        headline : 'A high quality 4k paper texture drag & drop in your project.',
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
        images: ['/abundance.webp']
      }
    ]
  },
]