//Started: 6PM, Ended: 6:45PM
var loadCalender = function (domElement) {

    const MAX_YEAR = 2030, MIN_YEAR = 1900;
    var currMonth, currYear;
    var actionArea, datesTable, headerInfo;
    function addTemplate() {
        domElement.innerHTML = document.getElementById("calenderTemplate").innerHTML;

        actionArea = domElement.querySelector(".actionArea"),
            datesTable = domElement.querySelector(".datesTable"),
            headerInfo = domElement.querySelector(".headerInfo");
    }

    function getDaysInCurrentMonth() {
        return 32 - new Date(currYear, currMonth, 32).getDate();
    }

    function updateHeaderInfo(){
        headerInfo.querySelector(".month").innerText = getMonthName(currMonth);
        headerInfo.querySelector(".year").innerText = currYear;
    }

    function drawDatesTable() {
        updateHeaderInfo();
        datesTable.innerHTML = "";
        var table = document.createElement("table");

        var firstDay = new Date(currYear, currMonth, 1).getDay();
        var currentMonthLength = getDaysInCurrentMonth();
        var printDate = 1;
        var doneWithMonth = false;
        console.log("First day: ", firstDay, " - For ", currYear, currMonth, 1);

        for (var i = 0; i < 7 && !doneWithMonth; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                var td = document.createElement("td");
                if (i == 0 && j < firstDay) {
                    td.innerHTML = " ";
                } else if (printDate > currentMonthLength) {
                    td.innerHTML = " ";
                    doneWithMonth = true;
                } else {
                    td.innerHTML = printDate;
                    printDate++;
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        datesTable.appendChild(table);
    }

    function addDropdownActions() {
        var selectMonth = document.createElement("select");
        var selectYear = document.createElement("select");
        actionArea.appendChild(selectMonth);
        actionArea.appendChild(selectYear);
        for (var i = 0; i < 12; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.innerText = getMonthName(i);
            if (i == currMonth) {
                option.selected = 'selected';
            }
            selectMonth.appendChild(option);
        }

        for (var j = MIN_YEAR; j < MAX_YEAR; j++) {

            var option = document.createElement("option");
            option.value = j;
            option.innerText = j;
            if (j == currYear) {
                option.selected = 'selected';
            }
            selectYear.appendChild(option);
        }
        selectMonth.addEventListener('change', () => {
            currMonth = selectMonth.value;
            console.log("Month Value changed to ", currMonth);
            drawDatesTable();
        });
        selectYear.addEventListener('change', () => {
            currYear = selectYear.value;
            console.log("Year Value changed to ", currYear);
            drawDatesTable();
        });
    }

    function addDefaultData() {
        currMonth = new Date().getMonth();
        currYear = new Date().getFullYear();
    }

    function getMonthName(i) {
        var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return months[i];
    }


    this.domElement = domElement;

    addDefaultData();
    addTemplate();
    drawDatesTable();
    addDropdownActions();
}

var firstCalender = new loadCalender(document.getElementById("firstcalender"));
