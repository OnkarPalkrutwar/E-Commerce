export const products = [
  // --- SHOES (SNEAKERS, RUNNING, CASUAL, FORMAL, BOOTS, SANDALS) ---
  {
    id: 'prod-101',
    name: 'Air Pulse Retro High Sneakers',
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
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Iconic high-top sneakers with retro color-blocking, padded ankle collars, and air-cushioned soles for maximum street style and comfort.',
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Black/Red', 'White/Blue', 'Triple Black']
  },
  {
    id: 'prod-102',
    name: 'Velocity Pro Carbon Running Shoes',
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
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for speed with carbon-infused midsole plate, breathable knit upper, and high-traction rubber outsole.',
    availableSizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Electric Crimson', 'Neon Lime', 'Stealth Gray']
  },
  {
    id: 'prod-103',
    name: 'Minimalist Cloud Walk Slip-On Casuals',
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
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-lightweight slip-on casual shoes crafted with flexible stretch mesh and cushioned memory foam footbeds for all-day comfort.',
    availableSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    availableColors: ['Pastel Pink', 'Chalk White', 'Charcoal']
  },
  {
    id: 'prod-104',
    name: 'Monk Strap Italian Leather Oxford Formal Shoes',
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
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted genuine calfskin leather monk strap shoes with burnished toe detail and durable stacked wooden heels.',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Chestnut Brown', 'Classic Black']
  },
  {
    id: 'prod-105',
    name: 'Rugged Outpost Waterproof Leather Boots',
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
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy-duty waterproof nubuck leather boots featuring seam-sealed construction, rustproof hardware, and deep lug rubber treads.',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Wheat Tan', 'Dark Espresso']
  },
  {
    id: 'prod-106',
    name: 'Strap Comfort Trail Sandals',
    brand: 'Nike',
    category: 'Sandals',
    mainCategory: 'Shoes',
    gender: 'Unisex',
    price: 59.99,
    originalPrice: 74.99,
    rating: 4.6,
    reviewsCount: 95,
    badge: 'Hot Sale',
    isBestSeller: false,
    isNewArrival: false,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Adjustable triple-strap sporty sandals with contoured EVA footbeds and wet-grip outsoles built for summer adventures.',
    availableSizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    availableColors: ['Matte Black', 'Olive Green', 'Sand']
  },

  // --- CLOTHING (T-SHIRTS, SHIRTS, JEANS, TROUSERS, HOODIES, JACKETS) ---
  {
    id: 'prod-201',
    name: 'Essential Heavyweight Oversized Graphic Tee',
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
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    description: '280 GSM premium organic cotton oversized boxy tee featuring high-density typography chest graphic and reinforced crew neck.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Washed Black', 'Vintage White', 'Sage Green']
  },
  {
    id: 'prod-202',
    name: 'Casual Oxford Button-Down Linen Shirt',
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
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Breathable linen-cotton blend shirt tailored in a modern slim fit with button-down collar and chest pocket.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Sky Blue', 'Crisp White', 'Navy Stripe']
  },
  {
    id: 'prod-203',
    name: 'Heritage Relaxed Fit Straight Leg Jeans',
    brand: 'Levi\'s',
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
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic 100% rigid cotton denim jeans cut in a timeless mid-rise relaxed straight leg with 5-pocket styling.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Medium Wash Indigo', 'Dark Blue', 'Washed Black']
  },
  {
    id: 'prod-204',
    name: 'Flex Stretch Tailored Chino Trousers',
    brand: 'UrbanStep',
    category: 'Trousers',
    mainCategory: 'Clothing',
    gender: 'Men',
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewsCount: 140,
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Versatile stretch-twill chinos featuring flex waistband, slant front pockets, and welt back pockets suitable for work and leisure.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Khaki', 'Slate Gray', 'Midnight Navy']
  },
  {
    id: 'prod-205',
    name: 'Streetwear Heavyweight Fleece Pullover Hoodie',
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
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Plush 450 GSM French terry cotton fleece hoodie with drop shoulders, double-lined hood, and deep pouch pocket.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Charcoal Gray', 'Electric Orange', 'Off-White']
  },
  {
    id: 'prod-206',
    name: 'Urban Explorer Puffer Winter Jacket',
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
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Windproof thermal down-alternative padded puffer jacket with water-resistant shell, packable hood, and fleece-lined pockets.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Matte Black', 'Olive Drab', 'Burnt Orange']
  },

  // --- WOMEN'S CLOTHING & SHOES ---
  {
    id: 'prod-301',
    name: 'Women\'s Air Platform Street Sneakers',
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
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Chunky platform sole sneakers featuring smooth leather overlays, pastel color accents, and responsive heel cushioning.',
    availableSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    availableColors: ['White/Lilac', 'All White', 'White/Rose']
  },
  {
    id: 'prod-302',
    name: 'Women\'s Seamless Ribbed Cropped Tank',
    brand: 'UrbanStep',
    category: 'T-shirts',
    mainCategory: 'Clothing',
    gender: 'Women',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviewsCount: 165,
    badge: 'Hot Sale',
    isBestSeller: false,
    isNewArrival: false,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Form-fitting seamless 4-way stretch ribbed crop top designed for maximum flexibility from gym workouts to casual streetwear.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Mocha Brown', 'Cream', 'Black']
  },
  {
    id: 'prod-303',
    name: 'High-Rise Sculpting Skinny Stretch Denim',
    brand: 'Zara',
    category: 'Jeans',
    mainCategory: 'Clothing',
    gender: 'Women',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: 230,
    badge: 'Best Seller',
    isBestSeller: true,
    isNewArrival: false,
    stock: 32,
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-waisted stretch denim engineered to lift, smooth, and contour with shape-retention fabric tech.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Light Wash', 'Classic Indigo', 'Jet Black']
  },
  {
    id: 'prod-304',
    name: 'Women\'s Cropped Utility Cargo Jacket',
    brand: 'UrbanStep',
    category: 'Jackets',
    mainCategory: 'Clothing',
    gender: 'Women',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewsCount: 145,
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Trendsetting military-inspired cropped cotton canvas jacket with flap cargo chest pockets and adjustable cinch hem.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Desert Beige', 'Olive Green']
  },
  {
    id: 'prod-305',
    name: 'Women\'s Cloud Foam Cushioned Runner',
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
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed specifically for women\'s foot structure with plush CloudFoam midsole cushioning and supportive knit upper.',
    availableSizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    availableColors: ['Coral Pink', 'White/Gold', 'Obsidian']
  },

  // --- ACCESSORIES (CAPS, BAGS, SOCKS) ---
  {
    id: 'prod-401',
    name: 'UrbanStep Curved Brim Snapback Cap',
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
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Structured 6-panel cotton twill cap with embroidered 3D logo, moisture-wicking sweatband, and adjustable snap closure.',
    availableSizes: ['One Size'],
    availableColors: ['Matte Black', 'Navy Blue', 'Raw Khaki']
  },
  {
    id: 'prod-402',
    name: 'Vanguard Leather Utility Backpack',
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
    stock: 16,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted full-grain leather backpack with padded 16" laptop sleeve, waterproof interior lining, and ergonomic shoulder straps.',
    availableSizes: ['One Size'],
    availableColors: ['Cognac Tan', 'Midnight Black']
  },
  {
    id: 'prod-403',
    name: 'Performance Cushion Crew Socks (3-Pack)',
    brand: 'Nike',
    category: 'Socks',
    mainCategory: 'Accessories',
    gender: 'Unisex',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviewsCount: 340,
    badge: 'Hot Sale',
    isBestSeller: true,
    isNewArrival: false,
    stock: 80,
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dri-FIT moisture-wicking cushioned crew socks featuring targeted arch support and reinforced heel/toe areas for high durability.',
    availableSizes: ['One Size'],
    availableColors: ['White/Black Logo', 'All Black']
  },
  {
    id: 'prod-404',
    name: 'Streetwear Canvas Crossbody Sling Bag',
    brand: 'UrbanStep',
    category: 'Bags',
    mainCategory: 'Accessories',
    gender: 'Unisex',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.6,
    reviewsCount: 110,
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Compact weather-resistant canvas sling bag with quick-release tactical buckle, key clip, and zippered main compartment.',
    availableSizes: ['One Size'],
    availableColors: ['Tactical Black', 'Olive Drab']
  },

  // --- ADDITIONAL SHOES & CLOTHING TO REACH 24 PRODUCTS ---
  {
    id: 'prod-501',
    name: 'Pro-Glide Basketball High Tops',
    brand: 'Nike',
    category: 'Sneakers',
    mainCategory: 'Shoes',
    gender: 'Men',
    price: 169.99,
    originalPrice: 209.99,
    rating: 4.9,
    reviewsCount: 156,
    badge: 'Hot Sale',
    isBestSeller: true,
    isNewArrival: true,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Maximum lockdown high-top basketball shoes engineered with Zoom responsiveness and multi-directional court traction pattern.',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Royal Blue/White', 'Bred Black/Red']
  },
  {
    id: 'prod-502',
    name: 'Chelsea Suede Ankle Dress Boots',
    brand: 'UrbanStep',
    category: 'Boots',
    mainCategory: 'Shoes',
    gender: 'Men',
    price: 159.00,
    originalPrice: 199.00,
    rating: 4.8,
    reviewsCount: 94,
    badge: 'Featured',
    isBestSeller: false,
    isNewArrival: false,
    stock: 19,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sleek Italian suede Chelsea boots with elastic side gores, pull tabs, and durable non-slip rubber soles.',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    availableColors: ['Sand Suede', 'Taupe Suede', 'Black Suede']
  },
  {
    id: 'prod-503',
    name: 'Women\'s Cropped Zip-Up Hoodie',
    brand: 'UrbanStep',
    category: 'Hoodies',
    mainCategory: 'Clothing',
    gender: 'Women',
    price: 59.99,
    originalPrice: 74.99,
    rating: 4.7,
    reviewsCount: 128,
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Soft brushed-back fleece cropped hoodie featuring full-length front zipper, drawstring hood, and ribbed waist cuff.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Vanilla Ice', 'Dusty Rose', 'Slate']
  },
  {
    id: 'prod-504',
    name: 'Graphic Print Resort Collar Camp Shirt',
    brand: 'Zara',
    category: 'Shirts',
    mainCategory: 'Clothing',
    gender: 'Men',
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.6,
    reviewsCount: 82,
    badge: 'Trending',
    isBestSeller: false,
    isNewArrival: true,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Relaxed fit short-sleeve camp collar shirt crafted in lightweight viscose with custom abstract art print.',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['Monochrome Art', 'Terracotta Print']
  }
];

export const mainCategories = [
  { name: 'All', icon: 'Sparkles', count: products.length },
  { name: 'Shoes', icon: 'Footprints', count: products.filter(p => p.mainCategory === 'Shoes').length, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80' },
  { name: 'Clothing', icon: 'Shirt', count: products.filter(p => p.mainCategory === 'Clothing').length, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80' },
  { name: 'Accessories', icon: 'Watch', count: products.filter(p => p.mainCategory === 'Accessories').length, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80' }
];

export const shoeCategories = ['Sneakers', 'Running Shoes', 'Casual Shoes', 'Formal Shoes', 'Boots', 'Sandals'];
export const clothingCategories = ['T-shirts', 'Shirts', 'Jeans', 'Trousers', 'Hoodies', 'Jackets'];
export const accessoryCategories = ['Caps', 'Bags', 'Socks'];

export const brandsList = ['UrbanStep', 'Nike', 'Adidas', 'Puma', 'Zara', 'Levi\'s', 'Timberland', 'The North Face'];
