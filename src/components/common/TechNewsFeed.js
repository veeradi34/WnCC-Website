import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Newspaper, ArrowRight } from "lucide-react";
import Card from "../common/Card";

const TechNewsFeed = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndCacheNews = async () => {
            try {
                // Check if we have cached news and if it's still valid (less than 24 hours old)
                const cachedData = localStorage.getItem('techNewsCache');
                const cachedTimestamp = localStorage.getItem('techNewsCacheTimestamp');
                const now = new Date().getTime();

                if (cachedData && cachedTimestamp) {
                    const timeDiff = now - parseInt(cachedTimestamp);
                    const hoursElapsed = timeDiff / (1000 * 60 * 60);

                    // If cache is less than 24 hours old, use it
                    if (hoursElapsed < 24) {
                        setNews(JSON.parse(cachedData));
                        setLoading(false);
                        return;
                    }
                }

                // If no cache or cache is old, fetch new data
                const response = await axios.get(
                    'https://gnews.io/api/v4/search', {
                    params: {
                        q: 'technology',
                        lang: 'en',
                        country: 'us',
                        max: 10,
                        apikey: 'd506df354490ba89a3d579e4d84dd826'
                    }
                }
                );

                const formattedNews = response.data.articles.map(article => ({
                    title: article.title,
                    date: new Date(article.publishedAt).toLocaleDateString(),
                    category: 'Tech',
                    description: article.description,
                    url: article.url
                }));

                // Cache the new data
                localStorage.setItem('techNewsCache', JSON.stringify(formattedNews));
                localStorage.setItem('techNewsCacheTimestamp', now.toString());

                setNews(formattedNews);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to fetch news');
                setLoading(false);

                // Try to use cached data even if it's old when API fails
                const cachedData = localStorage.getItem('techNewsCache');
                if (cachedData) {
                    setNews(JSON.parse(cachedData));
                } else {
                    // Fallback to sample news if no cache and API fails
                    setNews([
                        {
                            title: "Error fetching live news",
                            date: "Now",
                            category: "System",
                            description: "Please check your API key and connection. Displaying sample news as fallback.",
                            url: "#"
                        }
                    ]);
                }
            }
        };

        fetchAndCacheNews();

        // Set up periodic check for cache age
        const checkCacheInterval = setInterval(() => {
            const cachedTimestamp = localStorage.getItem('techNewsCacheTimestamp');
            const now = new Date().getTime();

            if (cachedTimestamp) {
                const timeDiff = now - parseInt(cachedTimestamp);
                const hoursElapsed = timeDiff / (1000 * 60 * 60);

                // If cache is more than 24 hours old, fetch new data
                if (hoursElapsed >= 24) {
                    fetchAndCacheNews();
                }
            }
        }, 1000 * 60 * 60); // Check every hour

        // Also check when tab becomes visible
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                const cachedTimestamp = localStorage.getItem('techNewsCacheTimestamp');
                const now = new Date().getTime();

                if (cachedTimestamp) {
                    const timeDiff = now - parseInt(cachedTimestamp);
                    const hoursElapsed = timeDiff / (1000 * 60 * 60);

                    if (hoursElapsed >= 24) {
                        fetchAndCacheNews();
                    }
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            clearInterval(checkCacheInterval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (news.length === 0) return;

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % news.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [news.length]);

    const handleReadMore = (url) => {
        window.open(url, '_blank');
    };

    if (loading) {
        return (
            <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
                <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-gray-900/50 backdrop-blur border-cyan-500/20">
            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                Tech News Feed
            </h3>
            <div className="relative overflow-hidden h-48">
                {news.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transform transition-all duration-500 ${index === activeIndex
                            ? 'translate-x-0 opacity-100'
                            : 'translate-x-full opacity-0'
                            }`}
                    >
                        <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-sm">
                            {item.category}
                        </span>
                        <h4 className="text-lg font-semibold text-white mt-2 mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                        <p className="text-gray-300 line-clamp-2">{item.description}</p>
                        <button
                            onClick={() => handleReadMore(item.url)}
                            className="mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Read More <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                {news.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                            ? 'bg-cyan-400 w-4'
                            : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                    />
                ))}
            </div>
        </Card>
    );
};

export default TechNewsFeed;
