export const data = {
    filter: JSON.parse(localStorage.getItem("Filter Values")) || {},
    savedObjects: JSON.parse(localStorage.getItem("Filtered Objects")) || []
};
