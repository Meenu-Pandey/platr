import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { foodAPI } from '../../services/api';
import { VideoSkeleton } from '../../components/LoadingSpinner';
import '../../styles/reels.css'
import './Home.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        fetchFoodItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchFoodItems = async () => {
        try {
            setLoading(true);
            const response = await foodAPI.getFoodItems();
            setVideos(response.data.foodItems || []);
        } catch (error) {
            // Error already handled via toast and navigation
            if (error.response?.status === 401) {
                navigate("/user/login");
            } else {
                if (window.toast) {
                    window.toast.error("Failed to load videos. Please try again.");
                }
                setVideos([]);
            }
        } finally {
            setLoading(false);
        }
    }

    const likeVideo = async (item) => {
        try {
            const response = await foodAPI.likeFood(item._id);
            if (response.data.like) {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
                ));
            } else {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, likeCount: Math.max(0, (v.likeCount || 0) - 1) } : v
                ));
            }
        } catch {
            if (window.toast) {
                window.toast.error("Failed to like video. Please try again.");
            }
        }
    }

    const saveVideo = async (item) => {
        try {
            const response = await foodAPI.saveFood(item._id);
            if (response.data.save) {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v
                ));
                if (window.toast) {
                    window.toast.success("Video saved!");
                }
            } else {
                setVideos((prev) => prev.map((v) => 
                    v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount || 0) - 1) } : v
                ));
                if (window.toast) {
                    window.toast.info("Video removed from saved");
                }
            }
        } catch {
            if (window.toast) {
                window.toast.error("Failed to save video. Please try again.");
            }
        }
    }

    if (loading) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <VideoSkeleton />
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="home-feed-wrapper">
                <ReelFeed
                    items={videos}
                    onLike={likeVideo}
                    onSave={saveVideo}
                    emptyMessage="No videos available."
                />
            </div>
        </div>
    )
}

export default Home