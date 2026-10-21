import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Flame, Footprints, User, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { shoeCategories, clothingCategories, accessoryCategories } from '../data/products';

export default function Navbar() {
  const { totalItems, wishlistCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPath = location.pathname;
  const currentGender = searchParams.get('gender');
  const currentCategory = searchParams.get('category');
  const isSale = searchParams.get('sale') === 'true';

  const isShoesCategory =
    currentCategory === 'Shoes' ||
    (currentCategory && shoeCategories.some((c) => c.toLowerCase() === currentCategory.toLowerCase()));

  const isClothingCategory =
    currentCategory === 'Clothing' ||
    (currentCategory && clothingCategories.some((c) => c.toLowerCase() === currentCategory.toLowerCase()));

  const isAccessoriesCategory =
    currentCategory === 'Accessories' ||
    (currentCategory && accessoryCategories.some((c) => c.toLowerCase() === currentCategory.toLowerCase()));

  const isHomeActive = currentPath === '/';
  const isSaleActive = currentPath === '/shop' && isSale;
  const isShoesActive = currentPath === '/shop' && !isSale && isShoesCategory;
  const isClothingActive = currentPath === '/shop' && !isSale && isClothingCategory;
  const isAccessoriesActive = currentPath === '/shop' && !isSale && isAccessoriesCategory;
  const isMenActive =
    currentPath === '/shop' &&
    !isSale &&
    !isShoesCategory &&
    !isClothingCategory &&
    !isAccessoriesCategory &&
    currentGender?.toLowerCase() === 'men';
  const isWomenActive =
    currentPath === '/shop' &&
    !isSale &&
    !isShoesCategory &&
    !isClothingCategory &&
    !isAccessoriesCategory &&
    currentGender?.toLowerCase() === 'women';

  const handleSearchClick = () => {
    navigate('/shop');
  };

  return (
    <>
      {/* Top Promotional Announcement Bar */}
      <div className="announcement-bar">
        <Flame size={14} color="var(--accent-orange)" />
        <span>FLAT 20% OFF</span> ON NEW SNEAKERS & STREETWEAR | USE CODE: <span>URBAN20</span> | FREE SHIPPING OVER $100
      </div>

      <header className="sticky-navbar">
        <div className="container navbar-container">
          {/* UrbanStep Logo */}
          <Link to="/" className="nav-brand">
            <Footprints size={28} style={{ color: 'var(--accent-orange)' }} />
            Urban<span>Step</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/" className={`nav-link ${isHomeActive ? 'active' : ''}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Men" className={`nav-link ${isMenActive ? 'active' : ''}`}>
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Women" className={`nav-link ${isWomenActive ? 'active' : ''}`}>
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Shoes" className={`nav-link ${isShoesActive ? 'active' : ''}`}>
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Clothing" className={`nav-link ${isClothingActive ? 'active' : ''}`}>
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className={`nav-link ${isAccessoriesActive ? 'active' : ''}`}>
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?sale=true"
                  className={`nav-link ${isSaleActive ? 'active' : ''}`}
                  style={{ color: 'var(--accent-orange)' }}
                >
                  Sale 🔥
                </Link>
              </li>
            </ul>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button className="icon-btn" onClick={handleSearchClick} title="Search Catalog">
              <Search size={20} />
            </button>

            {/* Wishlist Link & Badge */}
            <Link to="/wishlist" className="icon-btn" title="View Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="wishlist-badge">{wishlistCount}</span>}
            </Link>

            {/* Shopping Cart Link & Badge */}
            <Link to="/cart" className="icon-btn" title="View Cart">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>

            {/* User Account / Authentication */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  className="icon-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  title={`Logged in as ${user.name}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-orange)' }}
                >
                  <User size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '120%',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      minWidth: '180px',
                      padding: '0.5rem 0',
                      zIndex: 1000
                    }}
                  >
                    <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Signed in as <strong>{user.name}</strong> ({user.role})
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 1rem',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      <Package size={16} /> My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 1rem',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#ef4444',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}>
                Login
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button className="icon-btn mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <Link to="/" className={`mobile-nav-link ${isHomeActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop?gender=Men" className={`mobile-nav-link ${isMenActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Men's Collection
            </Link>
            <Link to="/shop?gender=Women" className={`mobile-nav-link ${isWomenActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Women's Collection
            </Link>
            <Link to="/shop?category=Shoes" className={`mobile-nav-link ${isShoesActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Shoes & Sneakers
            </Link>
            <Link to="/shop?category=Clothing" className={`mobile-nav-link ${isClothingActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Clothing & Apparel
            </Link>
            <Link to="/shop?category=Accessories" className={`mobile-nav-link ${isAccessoriesActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Accessories
            </Link>
            <Link to="/shop?sale=true" className={`mobile-nav-link ${isSaleActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--accent-orange)' }}>
              Sale 🔥
            </Link>
            <Link to="/wishlist" className={`mobile-nav-link ${currentPath === '/wishlist' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              My Wishlist ({wishlistCount})
            </Link>
            <Link to="/cart" className={`mobile-nav-link ${currentPath === '/cart' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Shopping Cart ({totalItems})
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className={`mobile-nav-link ${currentPath === '/orders' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="mobile-nav-link"
                  style={{ color: '#ef4444', textAlign: 'left', background: 'none', border: 'none' }}
                >
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <Link to="/login" className={`mobile-nav-link ${currentPath === '/login' || currentPath === '/register' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--accent-orange)' }}>
                Sign In / Register
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}

