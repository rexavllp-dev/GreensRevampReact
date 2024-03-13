export const convertDate = (date) => {
    if(!date) return;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
    const normalDateTime = new Date(date).toLocaleString('en-IN', options);
    return normalDateTime;
}