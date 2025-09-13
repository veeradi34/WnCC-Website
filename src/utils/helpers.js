// Calendar URL generator function
export const generateCalendarUrl = (event) => {
    const encodedText = encodeURIComponent(event.title);
    const encodedDetails = encodeURIComponent(event.description);
    const encodedLocation = encodeURIComponent(event.location);
    const startDate = new Date(event.date)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(event.endDate)
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, "");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedText}&details=${encodedDetails}&location=${encodedLocation}&dates=${startDate}/${endDate}`;
};
