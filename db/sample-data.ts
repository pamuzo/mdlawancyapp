const sampleData = {
  products: [
    {
      name: "Premium Sublimation Coffee Mug – 11oz Ceramic Heat Transfer Mug",
      slug: "premium-sublimation-coffee-mug-11oz",
      brand: "PrintCraft Studio",
      category: "Sublimation Blank Mug",
      price: 8.99,
      currency: "USD",
      rating: 4.8,
      numReviews: 1245,
      isFeatured: true,
      stock: 320,
      description:
        "Create vibrant, long-lasting custom designs with this premium sublimation ceramic mug. Designed for heat transfer printing, this glossy white mug delivers excellent color reproduction and durability.",

      images: {
        create: [
          { url: "/images/sample-products/mug1.png" },
          { url: "/images/sample-products/mug2.png" },
        ],
      },
      features: {
        create: [
          { feature: "AAA-grade ceramic" },
          { feature: "Glossy sublimation coating" },
          { feature: "Microwave safe" },
          { feature: "Dishwasher safe" },
        ],
      },

      tags: {
        create: [
          { tag: "sublimation mug" },
          { tag: "custom mug" },
          { tag: "ceramic mug" },
        ],
      },

      material: "Ceramic",
      capacity: "11 oz",
      color: "Glossy White",
    },
    {
      name: "Roland 45° Cutting Blade for Vinyl Cutter",
      slug: "roland-45-degree-cutting-blade",
      brand: "Roland",
      category: "Cutting Blade",
      price: 14.99,
      currency: "USD",
      rating: 4.7,
      numReviews: 684,
      isFeatured: true,
      stock: 150,
      description:
        "High-precision Roland 45° cutting blade designed for clean and accurate vinyl cutting.",

      images: {
        create: [
          {
            url: "/images/sample-products/blade1.png",
          },
          {
            url: "/images/sample-products/blade2.jpg",
          },
        ],
      },

      features: {
        create: [
          { feature: "Sharp tungsten carbide tip" },
          { feature: "Precision vinyl cutting" },
          { feature: "Compatible with Roland plotters" },
          { feature: "Long-lasting durability" },
        ],
      },

      tags: {
        create: [
          { tag: "roland blade" },
          { tag: "vinyl cutter blade" },
          { tag: "plotter blade" },
          { tag: "cutting accessories" },
        ],
      },

      material: "Tungsten Carbide",
      compatibility: "Roland Vinyl Cutters",
    },

    {
      name: "Customizable Stainless Steel Water Bottle – 750ml",
      slug: "customizable-stainless-steel-water-bottle-750ml",
      brand: "HydroPrint",
      category: "Custom Water Bottle",
      price: 19.99,
      currency: "USD",
      rating: 4.9,
      numReviews: 952,
      isFeatured: true,
      stock: 210,
      description:
        "Premium stainless steel water bottle suitable for sublimation and custom printing.",

      images: {
        create: [
          {
            url: "/images/sample-products/bottle1.png",
          },
          {
            url: "/images/sample-products/bottle2.png",
          },
        ],
      },

      features: {
        create: [
          { feature: "Double-wall insulation" },
          { feature: "Customizable printable surface" },
          { feature: "Leak-proof lid" },
          { feature: "Keeps drinks hot and cold" },
        ],
      },

      tags: {
        create: [
          { tag: "custom water bottle" },
          { tag: "sublimation bottle" },
          { tag: "steel bottle" },
          { tag: "personalized bottle" },
        ],
      },

      material: "Stainless Steel",
      capacity: "750ml",
      color: "White",
    },

    {
      name: "Polo Sporting Stretch Shirt",
      slug: "polo-sporting-stretch-shirt",
      category: "Men's Dress Shirts",
      description: "Classic Polo style with modern comfort",

      images: {
        create: [
          { url: "/images/sample-products/p1-1.jpg" },
          { url: "/images/sample-products/p1-2.jpg" },
        ],
      },

      price: 59.99,
      brand: "Polo",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
    },

    {
      name: "Brooks Brothers Long Sleeved Shirt",
      slug: "brooks-brothers-long-sleeved-shirt",
      category: "Men's Dress Shirts",
      description: "Timeless style and premium comfort",

      images: {
        create: [
          { url: "/images/sample-products/p2-1.jpg" },
          { url: "/images/sample-products/p2-2.jpg" },
        ],
      },

      price: 85.9,
      brand: "Brooks Brothers",
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: "banner-2.jpg",
    },

    {
      name: "Tommy Hilfiger Classic Fit Dress Shirt",
      slug: "tommy-hilfiger-classic-fit-dress-shirt",
      category: "Men's Dress Shirts",
      description: "A perfect blend of sophistication and comfort",

      images: {
        create: [
          { url: "/images/sample-products/p3-1.jpg" },
          { url: "/images/sample-products/p3-2.jpg" },
        ],
      },

      price: 99.95,
      brand: "Tommy Hilfiger",
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null,
    },

    {
      name: "Calvin Klein Slim Fit Stretch Shirt",
      slug: "calvin-klein-slim-fit-stretch-shirt",
      category: "Men's Dress Shirts",
      description: "Streamlined design with flexible stretch fabric",

      images: {
        create: [
          { url: "/images/sample-products/p4-1.jpg" },
          { url: "/images/sample-products/p4-2.jpg" },
        ],
      },

      price: 39.95,
      brand: "Calvin Klein",
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
    },

    {
      name: "Polo Classic Pink Hoodie",
      slug: "polo-classic-pink-hoodie",
      category: "Men's Sweatshirts",
      description: "Soft, stylish, and perfect for laid-back days",

      images: {
        create: [
          { url: "/images/sample-products/p6-1.jpg" },
          { url: "/images/sample-products/p6-2.jpg" },
        ],
      },

      price: 99.99,
      brand: "Polo",
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
    },
  ],
};

export default sampleData;
