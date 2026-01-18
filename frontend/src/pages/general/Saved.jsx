import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import './Saved.css'
import { foodAPI } from '../../services/api'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        const fetchSavedFoods = async () => {
            try {
                const response = await foodAPI.getSavedFoods();
                const savedFoods = (response.data.savedFoods || []).map((item) => ({
                    _id: item.food?._id,
                    video: item.food?.video,
                    description: item.food?.description,
                    likeCount: item.food?.likeCount || 0,
                    savesCount: item.food?.savesCount || 0,
                    commentsCount: item.food?.commentsCount || 0,
                    foodPartner: item.food?.foodPartner,
                })).filter(item => item._id); // Filter out any invalid items
                
                setVideos(savedFoods);
            } catch (error) {
                if (window.toast) {
                    window.toast.error(error.response?.data?.message || "Failed to load saved foods");
                }
                setVideos([]);
            }
        };

        fetchSavedFoods();
    }, [])

    const removeSaved = async (item) => {
        try {
            const response = await foodAPI.saveFood(item._id);
            if (!response.data.save) {
                // Item was unsaved, remove it from the list
                setVideos((prev) => prev.filter((v) => v._id !== item._id));
                if (window.toast) {
                    window.toast.info("Removed from saved");
                }
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            if (window.toast) {
                window.toast.error("Failed to update saved item");
            }
        }
    }

    return (
        <div className="saved-container">
            <div className="saved-feed-wrapper">
                <ReelFeed
                    items={videos}
                    onSave={removeSaved}
                    emptyMessage="No saved videos yet."
                />
            </div>
        </div>
    )
}

export default Saved