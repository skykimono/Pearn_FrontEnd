export const parseToLocalDate = (date_ISO) => {

    var date = new Date(date_ISO)

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + "-" + mm + "-" + dd
}
export const parseToISOSDate = (date_local) => {

    var date = new Date(date_local);
    // var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    //     date.getUTCDate(), date.getUTCHours(),
    //     date.getUTCMinutes(), date.getUTCSeconds());

    return date.toISOString()
}
export const today = () => {

    var date = new Date()

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + "-" + mm + "-" + dd
}

