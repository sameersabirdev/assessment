import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product, ViewTab } from "./types";

type AppContextType = {
  activeTab: ViewTab;
  setActiveTab: Dispatch<SetStateAction<ViewTab>>;
  products: Product[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  totalCount: number;
};

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ViewTab>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo<Product[]>(() => {
    return products
      .filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.title.localeCompare(b.title);
        if (sortBy === "name-desc") return b.title.localeCompare(a.title);
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [products, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page],
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products: paginated,
        loading,
        error,
        search,
        setSearch,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        totalCount: filtered.length,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
