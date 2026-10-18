export const searchProducts = (products = [], query = "") => {
  const q = query.trim().toLowerCase();
  return q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;
};

export const filterByCategory = (products = [], category = "all") =>
  !category || category === "all" ? products : products.filter((p) => p.category === category);

export const sortProducts = (products = [], sortBy = "newest") => {
  const list = [...products];
  if (sortBy === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") return list.sort((a, b) => b.price - a.price);
  if (sortBy === "name-asc") return list.sort((a, b) => a.name.localeCompare(b.name, "fa"));
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const applyProductFilters = (products = [], { search = "", category = "all", sortBy = "newest" } = {}) =>
  sortProducts(filterByCategory(searchProducts(products, search), category), sortBy);
