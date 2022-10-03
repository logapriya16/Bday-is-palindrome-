function reverseStr(str) {
    var listOfChar = str.split('');
    var reverseChar = listOfChar.reverse();
    var reversedStr = reverseChar.join('');

    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yyddmm = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var check = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            check = true;
            break;
        }
    }
    return check;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function nextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date);
    while (1) {
        count++;
        var checkPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (checkPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
}

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

var inputDate = document.querySelector('#BDate');
var checkBtn = document.querySelector('#check-btn');
var outputTxt = document.querySelector('#output-msg');

function clickHandler(e) {
    
    var bdyStr = inputDate.value;
    if(bdyStr){
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
    }}
    else{
        outputTxt.innerText='Please enter a valid date :('
    }
}

checkBtn.addEventListener('click', clickHandler);