import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import ChooseLogin from '../pages/auth/ChooseLogin';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import Splash from '../pages/general/Splash';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import './AppRoutes.css';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<ChooseRegister />} />
            <Route path="/login" element={<ChooseLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            {/* Splash screen as home page */}
            <Route path="/" element={<Splash />} />
            {/* Main app home */}
            <Route path="/home" element={
                <div className="route-wrapper">
                    <Home />
                    <BottomNav />
                </div>
            } />
                <Route path="/saved" element={
                    <div className="route-wrapper">
                        <Saved />
                        <BottomNav />
                    </div>
                } />
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="/food-partner/:id" element={<Profile />} />
        </Routes>
    )
}

export default AppRoutes