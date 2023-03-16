let date = new Date();
initDates();

// Init dates
function initDates() {
    document.getElementById('trip-start-date').min = date.toLocaleDateString('fr-ca');
    document.getElementById('trip-start-date').valueAsDate = date;

    date.setDate(date.getDate() + 1);
    document.getElementById('trip-end-date').min = date.toLocaleDateString('fr-ca');
    date.setDate(date.getDate() + 4);
    document.getElementById('trip-end-date').valueAsDate = date;
}

// https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
$().ready(function () {
    $("form[name='trip-creation-form']").validate({
        rules: {
            tripid: "required",
            destination: "required",
            trip_price: "required"
        },
        submitHandler: function () {
            submitEntry();
            document.getElementById("trip-creation-form").reset();
            initDates();
        }
    });
});

// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_table_insertrow
// https://adnan-tech.com/prevent-form-submit-event-from-reloading-the-page

function submitEntry() {
    // Get a reference to the table
    let tableRef = document.getElementById("trip-table");

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    // Insert a cell in the row at index 0
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);

    // Append a text node to the cell
    cell1.innerHTML = document.getElementById("input-trip-id").value;
    cell2.innerHTML = document.getElementById("select-number-of-travelers").value;
    cell3.innerHTML = document.getElementById("input-trip-destination").value;

    // Get both dates to change their format
    var startDate = document.getElementById("trip-start-date").value;
    var endDate = document.getElementById("trip-end-date").value;
    var startDateFormatted = new Date(startDate);
    var endDateFormatted = new Date(endDate);
    var difference = endDateFormatted.getTime() - startDateFormatted.getTime();
    cell4.innerHTML = formatDate(startDateFormatted);
    cell5.innerHTML = formatDate(endDateFormatted);

    cell6.innerHTML = daysBetween(difference);
    cell7.innerHTML = document.getElementById("trip-price").value + ",00€";
    event.preventDefault();
}

// https://dev.to/dailydevtips1/vanilla-javascript-days-between-two-dates-3d1i
function daysBetween(difference) {
    return Math.ceil(difference / (1000 * 3600 * 24));
}

// https://isotropic.co/how-to-format-a-date-as-dd-mm-yyyy-in-javascript/
function formatDate(inputDate) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${date}.${month}.${year}`;
}

// TODO: Umstellen auf jQuery
// TODO: preventDefault, gibt es eine Alternative?