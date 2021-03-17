export default function nrDateFormat(date: any) {
    const separator = 'd/m/Y'[1];
    date = new Date(date.replace(/-/g, "/"));
    const year = date.getFullYear();
    const formatArr = 'd/m/Y'.split('d/m/Y'[1]);
    let day = date.getDate().toString();
    let month = (1 + date.getMonth()).toString();

    day = day.length > 1 ? day : '0' + day;
    month = month.length > 1 ? month : '0' + month;

    const dateObject: any = {
        d: day,
        m: month,
        Y: year
    };

    return dateObject[formatArr[0]] + separator + dateObject[formatArr[1]] + separator + dateObject[formatArr[2]];
}
