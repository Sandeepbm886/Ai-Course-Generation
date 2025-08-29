const { default: axios } = require("axios");

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos';

function isoDurationToSeconds(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = regex.exec(duration);
    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

const getVideos = async (query) => {
    const searchParams = {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,  
        order: 'relevance',  
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    };

    const searchResponse = await axios.get(YOUTUBE_BASE_URL, { params: searchParams });
    const items = searchResponse.data.items;

    if (items.length === 0) return [];

    const videoIds = items.map(item => item.id.videoId).join(',');

    const videosParams = {
        part: 'statistics,contentDetails',
        id: videoIds,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    };

    const videosResponse = await axios.get(YOUTUBE_VIDEOS_URL, { params: videosParams });
    const videoDetails = videosResponse.data.items;

    // Filter for long-form videos (exclude shorts: duration > 60 seconds)
    const longFormVideos = videoDetails.filter(video => {
        const durationSeconds = isoDurationToSeconds(video.contentDetails.duration);
        return durationSeconds > 60;
    });

    if (longFormVideos.length === 0) return [];

    // Sort by viewCount descending 
    longFormVideos.sort((a, b) => {
        const viewsA = parseInt(a.statistics.viewCount || 0);
        const viewsB = parseInt(b.statistics.viewCount || 0);
        return viewsB - viewsA;
    });

    // Get the top video's ID and find the corresponding snippet from search results
    const topVideo = longFormVideos[0];
    const topItem = items.find(item => item.id.videoId === topVideo.id);

    return [topItem];  
};

export default getVideos;