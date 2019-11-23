export const currentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
};

export const readableDate = (date) => {
    if (date == null)
        return '';
    let dd = date.substring(8, 10);
    let mm = date.substring(5, 7);
    const yyyy = date.substring(0, 4);

    return yyyy + '-' + mm + '-' + dd;
};
