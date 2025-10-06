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
        category: "Beach",
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
        category: "Amazing Pools",
        hostId,
        rating: 4.95,
        reviewsCount: 42,
        amenities: ["Gym", "Concierge", "High-speed Wifi"],
      }
    ];

    for (const prop of properties) {
      await ctx.db.insert("properties", prop);
    }
  },
});
