import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useDebounce } from "@/lib/utils";
import { useGetProducts } from "@/modules/product/resources/useGetProducts";
import { Product } from "@/types/product.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SearchDialog({ open, setOpen }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const { refetch: refetchProducts, isRefetching: isRefetchingProducts } =
    useGetProducts();

  useEffect(() => {
    if (debouncedSearchQuery) {
      refetchProducts().then(({ data }) => {
        if (data?.length) {
          setSearchedProducts(
            data
              .filter((product) =>
                product.title
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase())
              )
              .slice(0, 5)
          );
        } else {
          setSearchedProducts([]);
        }
      });
    } else {
      setSearchedProducts([]);
    }
  }, [debouncedSearchQuery, refetchProducts]);

  const handleSelectProduct = (product: Product) => {
    setOpen(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a product..."
        />
        <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
          {isRefetchingProducts ? (
            <div className="flex justify-center items-center py-6">
              <Loader className="h-5 w-5 animate-spin" />
            </div>
          ) : searchedProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No results found.
            </p>
          ) : (
            searchedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="flex items-center p-2 cursor-pointer rounded hover:bg-muted transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-8 w-8 object-contain mr-3"
                />
                <span className="truncate">{product.title}</span>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
