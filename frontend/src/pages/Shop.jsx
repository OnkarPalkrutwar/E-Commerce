import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, PackageSearch, RefreshCw } from 'lucide-react';
import { products as fallbackProducts, mainCategories } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import api from '../services/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(searchParams.get('sale') ? 'newest' : 'featured');
  const isSaleOnly = searchParams.get('sale') === 'true';

  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Fetch products from MongoDB Backend API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const queryParams = {};
    if (selectedGender !== 'All') queryParams.gender = selectedGender;
    if (selectedCategory !== 'All') queryParams.category = selectedCategory;
    if (selectedBrand !== 'All') queryParams.brand = selectedBrand;
    if (searchQuery.trim()) queryParams.search = searchQuery.trim();
    if (isSaleOnly) queryParams.sale = 'true';
    if (sortBy) queryParams.sortBy = sortBy;

    api.getProducts(queryParams)
      .then((data) => {
        if (isMounted) {
          const fetchedList = data.products || data;
          setApiProducts(Array.isArray(fetchedList) && fetchedList.length > 0 ? fetchedList : []);
          setApiError(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Backend API unavailable, using fallback dataset:', err.message);
        if (isMounted) {
          setApiError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedGender, selectedCategory, selectedBrand, searchQuery, sortBy, isSaleOnly]);

  // Keep state in sync with URL searchParams
  useEffect(() => {
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');

    if (gender) setSelectedGender(gender);
    if (category) setSelectedCategory(category);
    if (brand) setSelectedBrand(brand);
  }, [searchParams]);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    if (gender === 'All') searchParams.delete('gender');
    else searchParams.set('gender', gender);
    setSearchParams(searchParams);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') searchParams.delete('category');
    else searchParams.set('category', category);
    setSearchParams(searchParams);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    if (brand === 'All') searchParams.delete('brand');
    else searchParams.set('brand', brand);
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGender('All');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSortBy('featured');
    setSearchParams({});
  };

  // Active product source (MongoDB API if available, fallback static array if offline)
  const sourceProducts = apiError || (!loading && apiProducts.length === 0 && !searchQuery && selectedCategory === 'All' && selectedGender === 'All')
    ? fallbackProducts
    : apiProducts;

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return sourceProducts
      .filter((product) => {
        // Normalize MongoDB product fields
        const productGender = product.gender || 'Unisex';
        const productMainCat = product.mainCategory || 'Shoes';
        const productCat = product.category || '';
        const productBrand = product.brand || '';
        const productName = product.name || '';
        const productDesc = product.description || '';

        // Gender filter
        const matchesGender =
          selectedGender === 'All' ||
          productGender.toLowerCase() === selectedGender.toLowerCase() ||
          productGender === 'Unisex';

        // Category filter (Matches mainCategory OR sub-category)
        const matchesCategory =
          selectedCategory === 'All' ||
          productMainCat.toLowerCase() === selectedCategory.toLowerCase() ||
          productCat.toLowerCase() === selectedCategory.toLowerCase();

        // Brand filter
        const matchesBrand =
          selectedBrand === 'All' || productBrand.toLowerCase() === selectedBrand.toLowerCase();

        // Sale filter
        const matchesSale = !isSaleOnly || !!product.originalPrice;

        // Search query
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          productName.toLowerCase().includes(query) ||
          productBrand.toLowerCase().includes(query) ||
          productCat.toLowerCase().includes(query) ||
          productDesc.toLowerCase().includes(query);

        return matchesGender && matchesCategory && matchesBrand && matchesSale && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0;
      });
  }, [sourceProducts, selectedGender, selectedCategory, selectedBrand, isSaleOnly, searchQuery, sortBy]);

  // Sub-category list options
  const subCategoryTabs = [
    'All',
    'Shoes',
    'Clothing',
    'Accessories',
    'Sneakers',
    'Running Shoes',
    'Hoodies',
    'Jackets',
    'T-shirts',
    'Jeans'
  ];

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem 1.5rem' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-orange" style={{ marginBottom: '0.8rem' }}>
          <Sparkles size={14} /> Streetwear & Footwear Catalog
        </span>
        <h1 style={{ fontSize: '2.6rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          {isSaleOnly ? 'Seasonal Sale Collection' : 'Shop UrbanStep Catalog'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
          Filter by gender, sneakers, hoodies, denim, or your favorite brands with fast delivery and easy returns.
        </p>
      </div>

      {/* Gender Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['All', 'Men', 'Women', 'Unisex'].map((g) => {
          const isActive = selectedGender.toLowerCase() === g.toLowerCase();
          return (
            <button
              key={g}
              onClick={() => handleGenderSelect(g)}
              className={`btn ${isActive ? 'btn-dark' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)' }}
            >
              {g === 'All' ? 'All Genders' : g}
            </button>
          );
        })}
      </div>

      {/* Category Pills bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          paddingBottom: '0.8rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none'
        }}
      >
        {subCategoryTabs.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 1.1rem',
                fontSize: '0.88rem',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Search & Toolbar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGender={selectedGender}
        setSelectedGender={handleGenderSelect}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
        selectedBrand={selectedBrand}
        setSelectedBrand={handleBrandSelect}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resetFilters={resetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty Fallback State */
        <div
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border-color)'
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <PackageSearch size={36} />
          </div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>No Products Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
            We couldn't find any items matching your selected gender, brand, or search filters.
          </p>
          <button className="btn btn-primary" onClick={resetFilters}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
