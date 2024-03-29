import bcrypt from 'bcryptjs';

//seed with localhost:3000/api/seed

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner1.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Slim Shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      price: 90,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Golf Pants',
      slug: 'golf-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      price: 90,
      brand: 'Oliver',
      rating: 2.9,
      numReviews: 13,
      countInStock: 20,
      description: 'Smart looking pants',
    },
    {
      name: 'Fit Pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      price: 95,
      brand: 'Zara',
      rating: 3.5,
      numReviews: 7,
      countInStock: 20,
      description: 'A popular pants',
    },
    {
      name: 'Classic Pants',
      slug: 'classic-pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      price: 75,
      brand: 'Casely',
      rating: 2.4,
      numReviews: 14,
      countInStock: 20,
      description: 'A popular pants',
    },
  ],
  paddles: [
    {
      name: 'Perseus',
      image: '/images/joolaperseus14.jpg',
      slug: 'perseus-14mm',
      brand: 'Joola',
      price: 249.95,
      //maxWeight: ,
      //minWeight: ,
      weight: 7.8,
      swingWeight: 120,
      twistWeight: 5.77,
      core: 'Polypropylene',
      surface: 'Carbon Flex5',
      length: 16.5,
      width: 7.5,
      thickness: 14,
      handleLength: 5.5, //sort by elongated handle
      gripThickness: 4.125,
      // releaseDate: '2000-01-01', //sort by newest
      //rpm: , //sort by rpm
      rpmCategory: 'High', // ['Low', 'Med', 'High'],
      shape: 'Elongated', // ['Elongated', 'Standard', 'Blade', 'Teardrop', 'Widebody']
      playType: 'Power',
      edgeFoam: true,
      airVent: false,
      elongatedHandle: false,
      purchaseLink:
        'https://joolausa.com/ben-johns-perseus-cfs-14-pickleball-paddle/',
    },
    {
      name: 'GX6 Power Series ',
      slug: 'gx6-power-series',
      image: '/images/gearbox6power.jpg',
      brand: 'Gearbox',
      price: 150,
      weight: 8.5,
      core: 'Carbon Fiber Solid Span Technology',
      surface: 'Carbon Fiber Edgeless Frame',
      length: 16.625,
      width: 7.375,
      handleLength: 5.625,
      gripSize: 3.625,
      rpmCategory: 'Average',
      description:
        'The GX6 features a longer shaped head to give you precise control with a larger sweet spot. It also includes patent pending Solid Span Technology, giving this paddle Optimal Power, a Softer Feel, a Softer Sound, a Durable Edgeless Rim and a Massive Sweet Spot. The paddle handle feels natural in the hand with a very comfortable grip shape.',
    },
    {
      name: 'CRBN 2X Power Series',
      slug: 'crbn-2x-power-series',
      image: '/images/crbn2-power-14mm.jpg',
      brand: 'CRBN',
      price: 229.99,
      weight: 8,
      core: 'Polypropylene',
      surface: 'T700 Carbon Fiber',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'High',
      description:
        'This performance pickleball paddle is crafted with the same durable, gritty carbon fiber face that you can expect from CRBN, with additional and unmatched power and pop. No expense was spared making this the best power-focused carbon fiber paddle on the market. The perfect balance of durability, touch, and power allow you to be even more aggressive on the courts. ',
    },
    {
      name: 'Adipower Dummy1',
      slug: 'adipower-dummy1',
      image: '/images/adidas-adipower-attk.jpg',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
      youtubeLink: [
        'https://www.youtube.com/watch?v=H_mRBGQ1pQ4',
        'https://www.youtube.com/watch?v=gTZuA3uW7Rw',
      ],
    },
    {
      name: 'Adipower Dummy2',
      slug: 'adipower-dummy2',
      image: '/images/legacy.png',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
      youtubeLink: [
        'https://www.youtube.com/watch?v=Jj8Z4QqaqnQ',
        'https://www.youtube.com/watch?v=i7Y5ETyvbE0',
      ],
    },
    {
      name: 'Adipower Dummy3',
      slug: 'adipower-dummy3',
      image: '/images/head_gravitysh.jpg',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
    },
    {
      name: 'Adipower Dummy4',
      slug: 'adipower-dummy4',
      image: '/images/slk-halo.jpg',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
    },
    {
      name: 'Double Black Diamond Control',
      slug: 'double-black-diamond-control',
      image: '/images/dbd-control.jpg',
      brand: 'Six Zero',
      price: 180,
      weight: 7.6,
      core: 'Polypropylene',
      surface: 'Carbon Fiber',
      length: 16.3,
      width: 7.6,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'High',
    },
  ],
};

export default data;
