let today = new Date();
let sMonth= today.getMonth();
let sYear= today.getFullYear();

months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];




function daysInMonth(sMonth, sYear) {
    return 32 - new Date(sYear, sMonth, 32).getDate();
}

function next(){
    sYear = (sMonth === 11) ? sYear + 1 : sYear;
    sMonth = (sMonth + 1) % 12;
    showCalendar(sMonth, sYear);
}

function previous(){
    sYear = (sMonth === 0) ? sYear - 1 : sYear;
    sMonth = (sMonth === 0) ? 11 : sMonth - 1;
    showCalendar(sMonth, sYear);
}


function showCalendar(sMonth,sYear) {
    
    let oneJan =  new Date(sYear, 0, 1);   
    let firstDate = new Date(sYear, sMonth);
    let firstDay=firstDate.getDay();
    let numberOfDays =  Math.floor((firstDate - oneJan) / (24 * 60 * 60 * 1000));   
    let weekNumber = Math.ceil(( firstDay + 1 + numberOfDays) / 7);     
    let dates= document.querySelector(".dates");
    let currentMonthYear=document.querySelector(".monthYear");

    currentMonthYear.innerHTML = months[sMonth] + " " + sYear;
    dates.innerHTML="";
    index=1;
    daysInCurrentMonth=daysInMonth(sMonth,sYear);
    for(let row=0;index<=daysInCurrentMonth;row++)
    {
        let week= document.createElement('tr');
        let wkCell=document.createElement('th');
        wkCell.innerHTML=weekNumber;
        wkCell.className="week-cell"
        weekNumber++;
        week.appendChild(wkCell);
        
        for(let day=0;day<7 ;day++)
        {
            let cell=document.createElement('th');
            cell.className="date-cell"
            if(firstDay>day && index === 1)
            {
                cell.innerHTML="";
                cell.className="date-cell empty-cell"
            }
            else if(index<=daysInCurrentMonth)
            {
                cell.innerHTML=index;
                if(today.getFullYear()===sYear && today.getMonth()==sMonth && today.getDate()==index)
                    cell.className="date-cell today"
                index++;
            }
            else
            {
                cell.innerHTML=""
                cell.className="date-cell empty-cell"
            }
            week.appendChild(cell);

        }
        dates.appendChild(week);
    }
}

showCalendar(sMonth, sYear);

