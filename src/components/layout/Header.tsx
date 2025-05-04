import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, LogIn, LogOut, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useAuthStore from "@/screens/auth/store/authStore";
import SearchDialog from "../SearchDialog";
import { Badge } from "../ui/badge";
import useCartStore from "@/store/useCartStore";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getItemsCount } = useCartStore();
  const cartItemsCount = getItemsCount();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-xl md:text-2xl text-primary transition-colors hover:text-primary/90"
          >
            Paysky
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              Products
            </Link>
          </nav>

          {/* Search, Cart, User Actions */}
          <div className="flex items-center space-x-2 md:space-x-5">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-white dark:text-gray-200 hover:text-primary p-2 hover:border-black"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Search Dialog */}
            <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white dark:text-gray-200 hover:text-primary p-2 hover:border-black"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge
                    className="absolute -top-2 -right-3 bg-primary"
                    variant="default"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-fit focus:border-0 focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none focus-visible:outline-none bg-transparent transition-all ease-in-out duration-150 hover:bg-primary hover:text-white hover:border-primary px-1 md:px-3"
                  >
                    <Avatar className="w-full flex gap-1 items-center justify-center bg-transparent p-2 text-inherit">
                      <User className="size-5 text-inherit" />
                      <AvatarFallback className="text-inherit max-w-fit bg-inherit focus:border-0 focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent capitalize">
                        {user?.name.firstname}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 mt-1 p-2">
                  <div className="flex flex-col space-y-1 pb-2">
                    <p className="text-sm font-medium capitalize">
                      {user?.name.firstname} {user?.name.lastname}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start mt-2"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hidden sm:flex items-center transition-all duration-150 ease-in-out text-black hover:border-black hover:bg-black hover:text-white"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden p-1.5 text-white transition-all ease-in-out duration-150 hover:bg-secondary hover:text-primary hover:border-primary"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    className="text-lg font-medium py-2 text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="text-lg font-medium py-2 text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/cart"
                    className="text-lg font-medium py-2 text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      className="text-lg font-medium py-2 text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
