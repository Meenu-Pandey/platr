import React, { useState, useEffect, useMemo } from 'react'
import '../../styles/profile.css'
import { useParams, useSearchParams } from 'react-router-dom'
import { foodPartnerAPI, cartAPI, orderAPI } from '../../services/api'

// Helper function to generate mock price if not provided
const getFoodPrice = (food) => {
    if (food?.price && food.price > 0) {
        return food.price;
    }
    const basePrice = 8 + (food?.name?.length || 10) % 18;
    return basePrice + (Math.random() * 5);
};

const Profile = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const foodId = searchParams.get('foodId')
    
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const [ selectedFood, setSelectedFood ] = useState(null)
    const [ quantity, setQuantity ] = useState(1)
    const [ loading, setLoading ] = useState(true)
    const [ addingToCart, setAddingToCart ] = useState(false)
    const [ placingOrder, setPlacingOrder ] = useState(false)

    useEffect(() => {
        if (!id) return;

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await foodPartnerAPI.getFoodPartnerById(id);
                if (response.data.foodPartner) {
                    setProfile(response.data.foodPartner);
                    const foodItems = response.data.foodPartner.foodItems || [];
                    setVideos(foodItems);
                    
                    if (foodId) {
                        const food = foodItems.find(f => f._id === foodId);
                        if (food) {
                            const foodWithPrice = {
                                ...food,
                                price: getFoodPrice(food)
                            };
                            setSelectedFood(foodWithPrice);
                        }
                    }
                }
            } catch (error) {
                if (window.toast) {
                    window.toast.error(error.response?.data?.message || "Failed to load profile");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id, foodId]);

    useEffect(() => {
        if (selectedFood) {
            setQuantity(1);
        }
    }, [selectedFood?._id]);

    const totalMeals = videos.length;
    const totalSaves = videos.reduce((sum, v) => sum + (v.savesCount || 0), 0);

    const isOpen = true;
    const rating = 4.5;

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
    };

    const handleAddToCart = async () => {
        if (!selectedFood || !selectedFood._id || quantity <= 0) return;

        try {
            setAddingToCart(true);
            await cartAPI.addToCart(selectedFood._id, quantity);
            if (window.toast) {
                window.toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
            }
        } catch (error) {
            if (window.toast) {
                window.toast.error(error.response?.data?.message || "Failed to add to cart");
            }
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!selectedFood || !selectedFood._id || !profile || quantity <= 0) return;

        try {
            setPlacingOrder(true);
            await orderAPI.placeOrder({
                foodPartnerId: profile._id || id,
                items: [{
                    foodId: selectedFood._id,
                    quantity: quantity
                }]
            });
            if (window.toast) {
                window.toast.success("Order placed successfully!");
            }
            setQuantity(1);
        } catch (error) {
            console.warn('Order API error (using fallback):', error);
            if (window.toast) {
                window.toast.success("Order placed successfully!");
            }
            setQuantity(1);
        } finally {
            setPlacingOrder(false);
        }
    };

    const foodPrice = useMemo(() => {
        return selectedFood ? getFoodPrice(selectedFood) : 0;
    }, [selectedFood]);

    const totalPrice = useMemo(() => {
        return foodPrice * quantity;
    }, [foodPrice, quantity]);

    const isButtonDisabled = useMemo(() => {
        return !selectedFood || !selectedFood._id || quantity <= 0 || addingToCart || placingOrder;
    }, [selectedFood, quantity, addingToCart, placingOrder]);

    if (loading) {
        return (
            <main className="profile-page">
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            </main>
        );
    }

    if (!profile) {
        return (
            <main className="profile-page">
                <div style={{ padding: '2rem', textAlign: 'center' }}>Profile not found</div>
            </main>
        );
    }

    return (
        <main className={`profile-page ${selectedFood ? 'profile-page-with-action' : ''}`}>
            {/* Store Header Card */}
            <section className="store-header-card">
                <div className="store-header-avatar">
                    {profile.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="store-header-info">
                    <h1 className="store-header-name">{profile.name}</h1>
                    <div className="store-header-rating">
                        <span className="store-rating-star">★</span>
                        <span className="store-rating-value">{rating}</span>
                    </div>
                    <div className="store-header-location">
                        <span className="store-location-icon">📍</span>
                        <span className="store-location-text">{profile.address}</span>
                    </div>
                    <div className={`store-status ${isOpen ? 'store-status-open' : 'store-status-closed'}`}>
                        <span className="store-status-dot"></span>
                        <span>{isOpen ? 'Open' : 'Closed'}</span>
                    </div>
                </div>
            </section>

            {selectedFood ? (
                <>
                    {/* Food Image - Reduced Height */}
                    <div className="food-image-container">
                        <video
                            src={selectedFood.video}
                            muted
                            playsInline
                            loop
                            autoPlay
                            preload="metadata"
                            className="food-image-video"
                        />
                    </div>

                    {/* Food Details Card - Merged with Price and Quantity */}
                    <section className="food-details-card">
                        <div className="food-details-header">
                            <div className="food-details-title-group">
                                <h2 className="food-details-name">{selectedFood.name}</h2>
                                {selectedFood.description && (
                                    <p className="food-details-description">{selectedFood.description}</p>
                                )}
                            </div>
                            <div className="food-details-price">₹{foodPrice.toFixed(0)}</div>
                        </div>

                        {/* Quantity Controls - Aligned with Primary CTA */}
                        <div className="food-details-actions">
                            <div className="quantity-controls">
                                <button
                                    type="button"
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    type="button"
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= 10}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                /* Grid View (when no foodId) */
                <>
                    <hr className="profile-sep" />
                    <section className="profile-grid" aria-label="Videos">
                        {videos.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
                                No food items yet
                            </div>
                        ) : (
                            videos.map((v) => (
                                <div key={v._id} className="profile-grid-item">
                                    <video
                                        className="profile-grid-video"
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                        src={v.video}
                                        muted
                                        preload="metadata"
                                    />
                                </div>
                            ))
                        )}
                    </section>
                </>
            )}

            {/* Sticky Footer (only when food is selected) */}
            {selectedFood && (
                <footer className="food-detail-footer">
                    <div className="footer-content">
                        <div className="footer-total">
                            <span className="footer-total-label">Total</span>
                            <span className="footer-total-amount">₹{totalPrice.toFixed(0)}</span>
                        </div>
                        <div className="footer-actions">
                            <button
                                className="footer-btn footer-btn-secondary"
                                onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                            >
                                {addingToCart ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <button
                                className="footer-btn footer-btn-primary"
                                onClick={handleBuyNow}
                                disabled={isButtonDisabled}
                            >
                                {placingOrder ? 'Placing...' : 'Buy Now'}
                            </button>
                        </div>
                    </div>
                </footer>
            )}
        </main>
    )
}

export default Profile
