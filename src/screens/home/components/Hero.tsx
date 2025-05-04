import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Quality Products for{" "}
              <span className="text-primary">Every Need</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our diverse collection of premium products at competitive
              prices. From electronics to jewelry, we've got everything you
              need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="transition-all ease-in-out duration-150 hover:bg-gray-100 hover:text-primary"
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] bg-gray-100 rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
              alt="Shopping experience"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
