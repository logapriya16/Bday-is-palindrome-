function reverseStr(str)
{
    var listOfChars=str.split('');
    var reverseListOfChars=listOfChars.reverse();
    var reversedStr=reverseListOfChars.join('');
    return reversedStr;
}
console.log(reverseStr("hello"));
function IsPalindrome(str)
{
    var reversedString=reverseStr(str);
    return str===reversedString;
}
var date ={ day:31,month:12,year:2020 };
function convertDateToString(date)
{
 var datestr={ day:'',month:'',year:''};   
if(date.day<10)
{
    datestr.day='0'+date.day;
}
else
{
    datestr.day=date.day.toString();
}
if(date.month<10)
{
    datestr.month='0'+date.month;
}
else
{
    datestr.month=date.month.toString();
}
datestr.year=date.year.toString();
return datestr;
}
console.log(convertDateToString(date));
function getAllDateFormats(date)
{
    var datestr=convertDateToString(date);
    var ddmmyyyy=datestr.day+datestr.month+datestr.year;
    var mmddyyyy=datestr.month+datestr.day+datestr.year;
    var yyyymmdd=datestr.year+datestr.month+datestr.day;
    var ddmmyy=datestr.day+datestr.month+datestr.year.slice(-2);
    var mmddyy=datestr.month+datestr.day+datestr.year.slice(-2);
    var yymmdd=datestr.year.slice(-2)+datestr.month+datestr.day;
    return[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}
console.log(getAllDateFormats(date));
function checkPalindromeForAllDateFormats(date)
{
    var listOfDateFormats=getAllDateFormats(date);

    var check=false;

    for(var i=0;i<listOfDateFormats.legth;i++)
    {
        if(IsPalindrome(listOfDateFormats[i]))
        {
            check=true;
            break;
        }
    }
    return check;    
}
function IsleapYear(year)
{
    if(year%400===0)
    {
        return true;
    }
    if(year%100===0)
    {
        return true;
    }
    return false;
}
function GetNextDate(date)
{
    var day=date.day+1;//increment of day
    var month=date.month;
    var year=date.year;
    var daysInmonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month===2)//check for february
    {
        //check for leap year
        if(IsleapYear(year))
        {
            if(day>29)
            {
                day=1;
                month++;
            }
        }
        else
        {
            if(day>28)
            {
                day=1;month++;
            }
        }
    }
    else
    {
        //check if days exceds the maximum days in month
        if(day > daysInmonth[month-1])
        {
            day=1;
            month++;
        }
    }
    if(month>12)
    {
        month=1;
        year++;
    }
    return{
        day:day, month:month,year:year
    };
}
function getNextPalindrome(date)
{
    var ctr=0;
    var nextDate=GetNextDate(date);
    while(1)
    {
        ctr++;
        var IsPalindrome=checkPalindromeForAllDateFormats(nextDate);
        if(IsPalindrome)
        {
            break;
        }
        nextDate=GetNextDate(nextDate);

    }
    return[ctr,nextDate];
}
console.log(getNextPalindrome(date));
function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (day < 1) {
            day = daysInMonth[month - 2];
            month--;
        }
    }
    if (month < 1) {
        day = 31;
        month = 12;
        year--;
    }
    return {
        day: day,
        month: month,
        year: year
    }

}

function previousPalindromeDate(date) {
    var count = 0;
    var previousDate = getPreviousDate(date);
    while (1) {
        count++;
        var checkPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (checkPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [count, previousDate];
}

function nearestPalindrome(date) {
    var [nextctr, nextDate] = nextPalindromeDate(date);
    var [previousctr, previousDate] = previousPalindromeDate(date);
    if (nextctr < previousctr) {
        return [nextctr, nextDate];
    } else {
        return [previousctr, previousDate];
    }
}

var inputDate = document.querySelector('#input-date');
var checkBtn = document.querySelector('#submit-btn');
var outputTxt = document.querySelector('#output-txt');

function clickHandler(e) {
    var bdyStr = inputDate.value;
    if (bdyStr !== '') {
        var listOfDate = bdyStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {
            outputTxt.innerText = "YaY! Your birthday is a Palindrome.."
        } else {
            var [ctr, nearDate] = nearestPalindrome(date);
            outputTxt.innerText = 'The nearest Palindrome is ' + nearDate.day + '-' + nearDate.month + '-' + nearDate.year + " and you missed it by " + ctr + " days";
        }
    }
}

checkBtn.addEventListener('click', clickHandler);


