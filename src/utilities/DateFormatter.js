

export const FormatDayOnly = (isoDate) => {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });// Note that month indexes start at 0
    const day = date.getDate();
    const formattedDateString = `${day} ${month} ${year}`;
    return formattedDateString;
}


export default function FormatDay(isoDate){
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });// Note that month indexes start at 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    //const seconds = date.getSeconds();

    const formattedDateString = `${day} ${month} ${year} ${hours}:${minutes}`;
    return formattedDateString;
}
export const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDateString = `${hours}:${minutes}`;
    return formattedDateString;
}