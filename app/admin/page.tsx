'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Header,
  FilterBar,
  ProductCard,
  ProductTable,
  ProductModal,
  DeleteConfirmModal,
  EmptyState,
} from '@/components/admin';
import { Product, SortOption } from '@/types/product';
import { applyProductFilters } from '@/lib/productFilters';
import { getStoredProducts, saveStoredProducts, INITIAL_PRODUCTS } from '@/lib/productStorage';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(getStoredProducts());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveStoredProducts(products);
  }, [products, isLoaded]);

  const filtered = useMemo(
    () => applyProductFilters(products, { search, category, sortBy }),
    [products, search, category, sortBy]
  );

  const totalStock = useMemo(
    () => products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0),
    [products]
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface text-primary-dark">
      <Header
        totalCount={products.length}
        totalStock={totalStock}
        onOpenAddModal={() => setIsAddOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        <FilterBar
          searchQuery={search}
          onSearchChange={setSearch}
          selectedCategory={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalFilteredCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <EmptyState
            isFiltered={Boolean(search || category !== 'all')}
            onReset={() => {
              setSearch('');
              setCategory('all');
            }}
            onAdd={() => setIsAddOpen(true)}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onDelete={setToDelete} />
            ))}
          </div>
        ) : (
          <ProductTable products={filtered} onDelete={setToDelete} />
        )}
      </main>

      <ProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddProduct={(newProd) => setProducts([newProd, ...products])}
      />

      <DeleteConfirmModal
        product={toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) setProducts(products.filter((p) => p.id !== toDelete.id));
          setToDelete(null);
        }}
      />
    </div>
  );
}
