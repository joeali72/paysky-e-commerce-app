import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Electronics",
              image:
                "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
              category: "electronics",
            },
            {
              name: "Jewelry",
              image:
                "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg",
              category: "jewelery",
            },
            {
              name: "Men's Clothing",
              image:
                "https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg",
              category: "men's clothing",
            },
            {
              name: "Women's Clothing",
              image:
                "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
              category: "women's clothing",
            },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.category}`}
              className="group relative rounded-lg overflow-hidden"
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
