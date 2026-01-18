import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/splash.css';
import bowlImage from '../../assets/bowl.png';

const Splash = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();

    const handleClick = () => {
        if (loading) return;
        
        if (isAuthenticated) {
            navigate('/home');
        } else {
            navigate('/user/login');
        }
    };

    const categories = [
        { id: 1, name: 'Healthy', icon: '🥗' },
        { id: 2, name: 'Street Food', icon: '🌮' },
        { id: 3, name: 'Desserts', icon: '🍰' },
        { id: 4, name: 'Protein', icon: '🍖' },
        { id: 5, name: 'Vegan', icon: '🌱' }
    ];

    return (
        <div className="platr-splash-container">
            {/* Organic green brush stroke animation */}
            <div className="brush-stroke"></div>
            
            {/* Header with PLATR branding */}
            <header className="platr-header">
                <div className="platr-logo-container">
                    <div className="platr-plate-icon">
                        <svg 
                            version="1.1" 
                            id="restaurant" 
                            xmlns="http://www.w3.org/2000/svg" 
                            x="0" 
                            y="0" 
                            viewBox="0 0 128 128" 
                            style={{enableBackground: 'new 0 0 128 128'}} 
                            xmlSpace="preserve"
                        >
                            <g id="row2">
                                <path 
                                    id="plate-knife-fork" 
                                    d="M67 109c-24.3 0-44.1-19.5-44.1-43.5S42.7 22 67 22s44.1 19.5 44.1 43.5S91.4 109 67 109zm0-82.1c-21.6 0-39.2 17.3-39.2 38.6s17.6 38.6 39.2 38.6 39.2-17.3 39.2-38.6S88.6 26.9 67 26.9zm0 68.4c-16.7 0-30.2-13.4-30.2-29.8S50.4 35.8 67 35.8s30.2 13.4 30.2 29.8S83.7 95.3 67 95.3zM67 39c-14.8 0-26.9 11.9-26.9 26.5C40.1 80.2 52.2 92 67 92c14.8 0 26.9-11.9 26.9-26.5S81.8 39 67 39zM47.6 65.5c0-10.6 8.7-19.2 19.4-19.2.5 0 .8-.4.8-.8 0-.5-.4-.8-.8-.8-11.6 0-21.1 9.3-21.1 20.8 0 .5.4.8.8.8.5 0 .9-.3.9-.8zm75.4 7.7v32.2c0 .9.7 1.6 1.7 1.6h1.6c.9 0 1.7-.7 1.7-1.6V21.5c0-.9-.7-1.6-1.7-1.6h-.9c-3.2 0-7.2 11.9-7.2 26.6 0 13.1.7 24 3.4 26.2l1.4.5zM16.9 19c-.9 0-1.7.7-1.7 1.6v14.2h-2V21c0-.9-.7-1.6-1.7-1.6-.9 0-1.7.7-1.7 1.6v13.8H8.3V21c0-.9-.7-1.6-1.7-1.6-.9 0-1.6.7-1.6 1.6v13.8H3.3V20.6c0-.9-.7-1.6-1.7-1.6S0 19.7 0 20.6v28.8h6.4v55.9c0 .9.7 1.6 1.7 1.6H10c.9 0 1.7-.7 1.7-1.6V49.4h6.9V20.6c-.1-.9-.8-1.6-1.7-1.6z" 
                                    fill="#2F6B4F"
                                />
                            </g>
                        </svg>
                    </div>
                    <span className="platr-brand-text">PLATR</span>
                </div>
            </header>

            {/* Main Content */}
            <div className="platr-content" onClick={handleClick}>
                {/* Centered Floating Food Bowl - Poke Bowl Image with Circular Motion */}
                <div className="main-bowl-container" onClick={handleClick}>
                    <div className="main-bowl clickable-bowl">
                        {/* Poke Bowl Image - Circular */}
                        <img 
                            src={bowlImage}
                            alt="Fresh poke bowl with salmon, mango, tuna, rice, and vegetables"
                            className="bowl-image"
                        />
                    </div>
                </div>

                {/* Typography Section */}
                <div className="typography-section">
                    <h1 className="main-heading">WHAT DO YOU WANT TO EAT?</h1>
                    <p className="subheading">Discover dishes through short videos</p>
                </div>
            </div>

            {/* Category Bowls */}
            <div className="category-bowls-container">
                {categories.map((category, index) => (
                    <div 
                        key={category.id} 
                        className="category-bowl"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="category-bowl-icon">{category.icon}</div>
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Splash;