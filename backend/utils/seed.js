const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

// Load environment variables from backend root .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleProductsData = [
  // --- SHOES ---
  {
    name: 'Air Pulse Retro High Sneakers',
    slug: 'air-pulse-retro-high-sneakers',
    brand: 'UrbanStep',
    category: 'Sneakers',
    mainCategory: 'Shoes',
    gender: 'Men',
    price: 139.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewsCount: 248,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Iconic high-top sneakers with retro color-blocking, padded ankle collars, and air-cushioned soles for maximum street style and comfort.',
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Black/Red', 'White/Blue', 'Triple Black'],
    variants: [
      { sku: 'air-pulse-retro-uk6-blk', size: 'UK 6', color: 'Black/Red', stock: 15 },
      { sku: 'air-pulse-retro-uk7-blk', size: 'UK 7', color: 'Black/Red', stock: 20 },
      { sku: 'air-pulse-retro-uk8-wht', size: 'UK 8', color: 'White/Blue', stock: 12 },
      { sku: 'air-pulse-retro-uk9-triple', size: 'UK 9', color: 'Triple Black', stock: 10 }
    ]
  },
  {
    name: 'Velocity Pro Carbon Running Shoes',
    slug: 'velocity-pro-carbon-running-shoes',
    brand: 'Puma',
    category: 'Running Shoes',
    mainCategory: 'Shoes',
    gender: 'Men',
    price: 159.50,
    originalPrice: 199.99,
    rating: 4.8,
    reviewsCount: 174,
    badge: 'Trending',
    isBestSeller: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for speed with carbon-infused midsole plate, breathable knit upper, and high-traction rubber outsole.',
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Electric Crimson', 'Neon Lime', 'Stealth Gray'],
    variants: [
      { sku: 'velocity-pro-uk7-crimson', size: 'UK 7', color: 'Electric Crimson', stock: 10 },
      { sku: 'velocity-pro-uk8-lime', size: 'UK 8', color: 'Neon Lime', stock: 8 },
      { sku: 'velocity-pro-uk9-gray', size: 'UK 9', color: 'Stealth Gray', stock: 14 }
    ]
  },
  {
    name: 'Minimalist Cloud Walk Slip-On Casuals',
    slug: 'minimalist-cloud-walk-slip-on-casuals',
    brand: 'Adidas',
    category: 'Casual Shoes',
    mainCategory: 'Shoes',
    gender: 'Women',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewsCount: 132,
    badge: 'Hot Sale',
    isBestSeller: false,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-lightweight slip-on casual shoes crafted with flexible stretch mesh and cushioned memory foam footbeds for all-day comfort.',
    availableSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    availableColors: ['Pastel Pink', 'Chalk White', 'Charcoal'],
    variants: [
      { sku: 'cloud-walk-uk5-pink', size: 'UK 5', color: 'Pastel Pink', stock: 15 },
      { sku: 'cloud-walk-uk6-wht', size: 'UK 6', color: 'Chalk White', stock: 22 }
    ]
  },
  {
    name: 'Monk Strap Italian Leather Oxford Formal Shoes',
    slug: 'monk-strap-italian-leather-oxford-formal-shoes',
    brand: 'UrbanStep',
    category: 'Formal Shoes',
    mainCategory: 'Shoes',
    gender: 'Men',
    price: 189.00,
    originalPrice: 239.00,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Featured',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted genuine calfskin leather monk strap shoes with burnished toe detail and durable stacked wooden heels.',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Chestnut Brown', 'Classic Black'],
    variants: [
      { sku: 'monk-strap-uk8-brn', size: 'UK 8', color: 'Chestnut Brown', stock: 8 },
      { sku: 'monk-strap-uk9-blk', size: 'UK 9', color: 'Classic Black', stock: 10 }
    ]
  },
  {
    name: 'Rugged Outpost Waterproof Leather Boots',
    slug: 'rugged-outpost-waterproof-leather-boots',
    brand: 'Timberland',
    category: 'Boots',
    mainCategory: 'Shoes',
    gender: 'Men',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewsCount: 162,
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy-duty waterproof nubuck leather boots featuring seam-sealed construction, rustproof hardware, and deep lug rubber treads.',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Wheat Tan', 'Dark Espresso'],
    variants: [
      { sku: 'rugged-boot-uk8-tan', size: 'UK 8', color: 'Wheat Tan', stock: 12 },
      { sku: 'rugged-boot-uk9-esp', size: 'UK 9', color: 'Dark Espresso', stock: 8 }
    ]
  },

  // --- CLOTHING ---
  {
    name: 'Essential Heavyweight Oversized Graphic Tee',
    slug: 'essential-heavyweight-oversized-graphic-tee',
    brand: 'UrbanStep',
    category: 'T-shirts',
    mainCategory: 'Clothing',
    gender: 'Men',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    description: '280 GSM premium organic cotton oversized boxy tee featuring high-density typography chest graphic and reinforced crew neck.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Washed Black', 'Vintage White', 'Sage Green'],
    variants: [
      { sku: 'oversized-tee-m-blk', size: 'M', color: 'Washed Black', stock: 25 },
      { sku: 'oversized-tee-l-wht', size: 'L', color: 'Vintage White', stock: 30 }
    ]
  },
  {
    name: 'Casual Oxford Button-Down Linen Shirt',
    slug: 'casual-oxford-button-down-linen-shirt',
    brand: 'Zara',
    category: 'Shirts',
    mainCategory: 'Clothing',
    gender: 'Men',
    price: 54.50,
    originalPrice: 69.99,
    rating: 4.7,
    reviewsCount: 115,
    badge: 'Trending',
    isBestSeller: false,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Breathable linen-cotton blend shirt tailored in a modern slim fit with button-down collar and chest pocket.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Sky Blue', 'Crisp White', 'Navy Stripe'],
    variants: [
      { sku: 'oxford-shirt-m-blu', size: 'M', color: 'Sky Blue', stock: 15 },
      { sku: 'oxford-shirt-l-wht', size: 'L', color: 'Crisp White', stock: 18 }
    ]
  },
  {
    name: 'Heritage Relaxed Fit Straight Leg Jeans',
    slug: 'heritage-relaxed-fit-straight-leg-jeans',
    brand: "Levi's",
    category: 'Jeans',
    mainCategory: 'Clothing',
    gender: 'Men',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewsCount: 280,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic 100% rigid cotton denim jeans cut in a timeless mid-rise relaxed straight leg with 5-pocket styling.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Medium Wash Indigo', 'Dark Blue', 'Washed Black'],
    variants: [
      { sku: 'levis-jeans-m-ind', size: 'M', color: 'Medium Wash Indigo', stock: 20 },
      { sku: 'levis-jeans-l-blk', size: 'L', color: 'Washed Black', stock: 15 }
    ]
  },
  {
    name: 'Streetwear Heavyweight Fleece Pullover Hoodie',
    slug: 'streetwear-heavyweight-fleece-pullover-hoodie',
    brand: 'UrbanStep',
    category: 'Hoodies',
    mainCategory: 'Clothing',
    gender: 'Unisex',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: 420,
    badge: 'Hot Sale',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Plush 450 GSM French terry cotton fleece hoodie with drop shoulders, double-lined hood, and deep pouch pocket.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Charcoal Gray', 'Electric Orange', 'Off-White'],
    variants: [
      { sku: 'fleece-hoodie-m-gry', size: 'M', color: 'Charcoal Gray', stock: 25 },
      { sku: 'fleece-hoodie-l-org', size: 'L', color: 'Electric Orange', stock: 20 }
    ]
  },
  {
    name: 'Urban Explorer Puffer Winter Jacket',
    slug: 'urban-explorer-puffer-winter-jacket',
    brand: 'The North Face',
    category: 'Jackets',
    mainCategory: 'Clothing',
    gender: 'Men',
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.9,
    reviewsCount: 195,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Windproof thermal down-alternative padded puffer jacket with water-resistant shell, packable hood, and fleece-lined pockets.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Matte Black', 'Olive Drab', 'Burnt Orange'],
    variants: [
      { sku: 'puffer-jacket-m-blk', size: 'M', color: 'Matte Black', stock: 10 },
      { sku: 'puffer-jacket-l-olv', size: 'L', color: 'Olive Drab', stock: 8 }
    ]
  },

  // --- WOMEN'S ---
  {
    name: "Women's Air Platform Street Sneakers",
    slug: 'womens-air-platform-street-sneakers',
    brand: 'Puma',
    category: 'Sneakers',
    mainCategory: 'Shoes',
    gender: 'Women',
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewsCount: 210,
    badge: 'Trending',
    isBestSeller: true,
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Chunky platform sole sneakers featuring smooth leather overlays, pastel color accents, and responsive heel cushioning.',
    availableSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    availableColors: ['White/Lilac', 'All White', 'White/Rose'],
    variants: [
      { sku: 'platform-snk-uk5-lic', size: 'UK 5', color: 'White/Lilac', stock: 12 },
      { sku: 'platform-snk-uk6-wht', size: 'UK 6', color: 'All White', stock: 15 }
    ]
  },
  {
    name: "Women's Cloud Foam Cushioned Runner",
    slug: 'womens-cloud-foam-cushioned-runner',
    brand: 'Adidas',
    category: 'Running Shoes',
    mainCategory: 'Shoes',
    gender: 'Women',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewsCount: 188,
    badge: 'Trending',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    description: "Designed specifically for women's foot structure with plush CloudFoam midsole cushioning and supportive knit upper.",
    availableSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    availableColors: ['Coral Pink', 'White/Gold', 'Obsidian'],
    variants: [
      { sku: 'cloud-runner-uk5-pnk', size: 'UK 5', color: 'Coral Pink', stock: 14 },
      { sku: 'cloud-runner-uk6-wht', size: 'UK 6', color: 'White/Gold', stock: 10 }
    ]
  },

  // --- ACCESSORIES ---
  {
    name: 'UrbanStep Curved Brim Snapback Cap',
    slug: 'urbanstep-curved-brim-snapback-cap',
    brand: 'UrbanStep',
    category: 'Caps',
    mainCategory: 'Accessories',
    gender: 'Unisex',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviewsCount: 190,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Structured 6-panel cotton twill cap with embroidered 3D logo, moisture-wicking sweatband, and adjustable snap closure.',
    availableSizes: ['One Size'],
    availableColors: ['Matte Black', 'Navy Blue', 'Raw Khaki'],
    variants: [
      { sku: 'snapback-os-blk', size: 'One Size', color: 'Matte Black', stock: 35 },
      { sku: 'snapback-os-nvy', size: 'One Size', color: 'Navy Blue', stock: 25 }
    ]
  },
  {
    name: 'Vanguard Leather Utility Backpack',
    slug: 'vanguard-leather-utility-backpack',
    brand: 'UrbanStep',
    category: 'Bags',
    mainCategory: 'Accessories',
    gender: 'Unisex',
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Featured',
    isBestSeller: true,
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted full-grain leather backpack with padded 16" laptop sleeve, waterproof interior lining, and ergonomic shoulder straps.',
    availableSizes: ['One Size'],
    availableColors: ['Cognac Tan', 'Midnight Black'],
    variants: [
      { sku: 'leather-pack-os-tan', size: 'One Size', color: 'Cognac Tan', stock: 10 },
      { sku: 'leather-pack-os-blk', size: 'One Size', color: 'Midnight Black', stock: 8 }
    ]
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerceDB';
    console.log(`[Seed] Connecting to MongoDB database at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Database connected successfully.');

    // 1. Seed Products
    console.log('[Seed] Seeding sample shoes, clothes, and accessories...');
    for (const item of sampleProductsData) {
      await Product.findOneAndUpdate(
        { slug: item.slug },
        { ...item, isActive: true },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`[Seed] ${sampleProductsData.length} Products seeded/updated successfully.`);

    // 2. Seed Default Admin User
    const adminEmail = 'admin@urbanstep.com';
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'System Admin',
        email: adminEmail,
        passwordHash: 'admin123',
        phone: '+1 (555) 999-0000',
        role: 'admin'
      });
      console.log(`[Seed] Default Admin User created: ${adminEmail} (Password: admin123)`);
    } else {
      console.log(`[Seed] Admin User already exists: ${adminEmail}`);
    }

    // 3. Seed Default Customer User
    const customerEmail = 'customer@urbanstep.com';
    let customerUser = await User.findOne({ email: customerEmail });
    if (!customerUser) {
      customerUser = await User.create({
        name: 'Alex Rivera',
        email: customerEmail,
        passwordHash: 'customer123',
        phone: '+1 (555) 123-4567',
        addresses: [
          {
            fullName: 'Alex Rivera',
            street: '742 Evergreen Terrace',
            city: 'Springfield',
            state: 'NY',
            postalCode: '10001',
            country: 'USA'
          }
        ],
        role: 'customer'
      });
      console.log(`[Seed] Default Customer User created: ${customerEmail} (Password: customer123)`);
    } else {
      console.log(`[Seed] Customer User already exists: ${customerEmail}`);
    }

    console.log('\n==========================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY');
    console.log('==========================================\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
