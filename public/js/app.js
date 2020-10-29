console.log('Client side javascript file is loaded');

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
*/
/*
fetch('/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        }

        console.log(data.location);
        console.log(data.forecast);
    })
})
*/

const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchField.value;


    try {
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                }
    
                messageOne.textContent = data.location; 
                messageTwo.textContent = data.forecast;
            })
        })
        
    } catch (error) {
        messageOne.textContent = 'error';
    }
})