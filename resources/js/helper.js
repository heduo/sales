function formatDate(date) {
    return (
        formatDateComponent(date.getMonth() + 1) +
        "/" +
        formatDateComponent(date.getDate()) +
        "/" +
        date.getFullYear()
    );
}

function formatDateComponent(dateComponent) {
    return (dateComponent < 10 ? "0" : "") + dateComponent;
}

function getLastMonth() {
    var now = new Date();
    var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
    var prevMonthFirstDate = new Date(
        now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
        (now.getMonth() - 1 + 12) % 12,
        1
    );

    var startDate = formatDate(prevMonthFirstDate);
    var endDate = formatDate(prevMonthLastDate);

    return {
        startDate,
        endDate
    };
}

function formatDateForDB(dateStr) {
    const date = dateStr.split("/");
    const month = date[0];
    const day = date[1];
    const year = date[2];
  
    return year + "-" + month + "-" + day;
  }

