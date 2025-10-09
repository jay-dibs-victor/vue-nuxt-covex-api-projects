import { mutation } from "./_generated/server";

export default mutation({
  args: {},
  handler: async (ctx) => {
    // Check if properties already exist
    const existing = await ctx.db.query("properties").first();
    if (existing) return;

    // Create a dummy host
    const hostId = await ctx.db.insert("users", {
      name: "John Host",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?u=john",
    });

    const properties = [
      {
        title: "Modern Beachfront Villa",
        description: "A stunning villa right on the sand with private pool and ocean views.",
        location: "Malibu, California",
        price: 450,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000"],
        category: "Beachfront",
        hostId,
        rating: 4.9,
        reviewsCount: 128,
        amenities: ["Wifi", "Kitchen", "Pool", "Beach Access"],
      },
      {
        title: "Cozy Mountain Cabin",
        description: "Escape to the mountains in this beautiful A-frame cabin.",
        location: "Aspen, Colorado",
        price: 280,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=1000"],
        category: "Cabins",
        hostId,
        rating: 4.8,
        reviewsCount: 85,
        amenities: ["Fireplace", "Hot Tub", "Mountain View"],
      },
      {
        title: "Skyline Penthouse",
        description: "Luxury living in the heart of the city with panoramic views.",
        location: "New York City, NY",
        price: 600,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"],
        category: "Amazing pools",
        hostId,
        rating: 4.95,
        reviewsCount: 42,
        amenities: ["Gym", "Concierge", "High-speed Wifi"],
      },
      {
        title: "Tropical Treehouse",
        description: "Live among the trees in this eco-friendly luxury treehouse.",
        location: "Ubud, Bali",
        price: 195,
        images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000"],
        category: "Treehouses",
        hostId,
        rating: 4.92,
        reviewsCount: 210,
        amenities: ["Breakfast", "Outdoor Shower", "Hammock"],
      },
      {
        title: "Desert Mirage Oasis",
        description: "Minimalist luxury in the heart of the high desert.",
        location: "Joshua Tree, California",
        price: 320,
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000"],
        category: "Desert",
        hostId,
        rating: 4.88,
        reviewsCount: 56,
        amenities: ["Stargazing Deck", "AC", "Fire Pit"],
      },
      {
        title: "Historic Italian Villa",
        description: "Authentic 18th-century villa overlooking Lake Como.",
        location: "Lake Como, Italy",
        price: 850,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"],
        category: "Mansion",
        hostId,
        rating: 4.99,
        reviewsCount: 34,
        amenities: ["Wine Cellar", "Private Boat", "Chef Service"],
      }
    ];

    for (const prop of properties) {
      await ctx.db.insert("properties", prop);
    }
  },
});
