const titleDay = document.getElementById('title-day')
const titleMonth = document.getElementById('title-month')
const titleYear = document.getElementById('title-year')

const dayInput = document.getElementById('day')
const monthInput = document.getElementById('month')
const yearInput = document.getElementById('year')

const dayError= document.querySelector('.day-error')
const monthError = document.querySelector('.month-error')
const yearError = document.querySelector('.year-error')

const submitButton = document.querySelector('.btn')

const dayAns = document.querySelector('.day-ans')
const monthAns = document.querySelector('.month-ans')
const yearAns = document.querySelector('.year-ans')



// change color of input field when focus on it 
const inputs = document.getElementsByTagName('input');

const helpArrError = [dayError, monthError, yearError]
for (let i = 0; i < inputs.length; i++) {
    const item = inputs[i];

    item.addEventListener('focus', (el) => {
        for (let j = 0; j < inputs.length; j++) {
            inputs[j].style.borderColor = 'var(--light-grey)';
            colorValid(inputs[j], helpArrError[j])
        }
        el.target.style.borderColor = 'var(--purple)';
    });
}





submitButton.addEventListener('click', () => { 
    const days = checkDayValid()
    const months = checkMonthValid()
    const years = checkYearValid()

    if (!days || !months || !years) { 
        return 
    }
    const nowDate = new Date()
    const birthday = new Date(`${monthInput.value}/${dayInput.value}/${yearInput.value}`)



    const diffInMilliseconds = nowDate - birthday;

    const ageInYear = Math.round(diffInMilliseconds / 1000 / 60 / 60 / 24 / 30 / 12) 
    const ageInMonth = Math.round(diffInMilliseconds / 1000 / 60 / 60 / 24 / 30) 
    const ageInDay = Math.round(diffInMilliseconds / 1000 / 60 / 60 / 24)
    

    // set years in final result 
    let startYear = 0
    const intervalId = setInterval(() => { 
        yearAns.innerHTML = startYear
        startYear += 1
        if (startYear >= ageInYear) { 
            clearInterval(intervalId)
        }
    }, 50)
    

    let startMonth = 0
    const intervalId2 = setInterval(() => { 
        monthAns.innerHTML = startMonth
        startMonth += 1
        if (startMonth >= ageInMonth) { 
            clearInterval(intervalId2)
        }
    }, 30)


    let startDay = 0
    const intervalId3 = setInterval(() => { 
        dayAns.innerHTML = startDay
        startDay += 1
        if (startDay >= ageInDay) { 
            clearInterval(intervalId3)
        }
    }, 4)
})



function checkDayValid() { 
    const value = dayInput.value
    if (value === '' || value.includes('.')) { 
        colorError(dayInput, dayError, 'This field is required')
        return false
    }
    else if (value < 1 || value > 31) { 
        colorError(dayInput, dayError, 'Must be a valid day')
        return false
    }
    else { 
        colorValid(dayInput, dayError)
        return true
    }
}

function checkMonthValid() { 
    const value = monthInput.value

    if (value === '' || value.includes('.')) { 
        colorError(monthInput, monthError, 'This field is required')
        return false
    }
    else if (value < 1 || value > 12) { 
        colorError(monthInput, monthError, 'Must be a valid month')
        return false
    }
    else { 
        colorValid(monthInput, monthError)
        return true
    }
}

function checkYearValid() { 
    const value = yearInput.value
    const currentYears = new Date().getFullYear()

    if (value === '' || value.includes('.')) { 
        colorError(yearInput, yearError, 'This field is required')
        return false
    }
    else if (value < 1 || value > currentYears) { 
        colorError(yearInput, yearError, 'Must be a valid year')

        return false
    }
    else { 
        colorValid(yearInput, yearError)
        return true
    }
}

function colorError(modify, showError, message) { 
    modify.style.borderColor = 'var(--light-red)'
    modify.previousElementSibling.style.color = 'var(--light-red)'
    showError.innerHTML = message
}

function colorValid(modify, showError) { 
    modify.style.borderColor = 'var(--light-grey)'
    showError.innerHTML = ''
    modify.previousElementSibling.style.color = 'var(--smokey-grey)'
}



