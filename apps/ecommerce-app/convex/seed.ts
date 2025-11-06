// @ts-nocheck
import { mutation } from "./_generated/server";

export default mutation({
  handler: async (ctx) => {
    // Check for existing products
    const existing = await ctx.db.query("ec_products").collect();
    if (existing.length > 0) {
      return { seeded: 0, message: "Database already seeded." };
    }

    const products = [
      {
        name: "Apex Tech Joggers",
        slug: "apex-tech-joggers",
        description: "Engineered with moisture-wicking 4-way stretch fabric. Deep side pockets, tapered fit, reflective logo detail.",
        price: 88.00,
        category: "bottoms",
        gender: "men",
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"],
        colors: ["#111111", "#555555"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.7,
        reviewCount: 128,
        featured: true,
        isNew: false
      },
      {
        name: "Velocity Performance Tee",
        slug: "velocity-performance-tee",
        description: "Ultra-lightweight performance fabric with anti-odor technology. Seamless construction eliminates chafing.",
        price: 45.00,
        category: "tops",
        gender: "unisex",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"],
        colors: ["#ffffff", "#111111"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.5,
        reviewCount: 96,
        featured: true,
        isNew: false
      },
      {
        name: "Aero Windbreaker",
        slug: "aero-windbreaker",
        description: "Packable windbreaker with water-resistant finish. Lightweight enough to store in your pocket.",
        price: 120.00,
        category: "outerwear",
        gender: "men",
        images: ["https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800"],
        colors: ["#e5e7eb", "#111111"],
        sizes: ["M", "L", "XL"],
        rating: 4.8,
        reviewCount: 64,
        featured: true,
        isNew: true
      },
      {
        name: "Core Compression Tights",
        slug: "core-compression-tights",
        description: "High-waisted compression tights with flattering paneling. Squat-proof fabric you can rely on.",
        price: 75.00,
        category: "bottoms",
        gender: "women",
        images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800"],
        colors: ["#111111", "#1f2937"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.8,
        reviewCount: 176,
        featured: true,
        isNew: false
      }
    ];

    for (const product of products) {
      await ctx.db.insert("ec_products", product);
    }

    return { seeded: products.length };
  },
});
