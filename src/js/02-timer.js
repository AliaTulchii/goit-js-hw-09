import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    btnStart: document.querySelector('button[data-start]'),
    dateTimePick:document.getElementById('datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    spans: document.querySelector('.value'),
}


refs.btnStart.disabled = true;
let selectedDate = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if ( selectedDate <= Date.now()) {
            Notiflix.Notify.warning('Please choose a date in the future');
            refs.btnStart.disabled = true;
        } else {
            Notiflix.Notify.success('You chosed the corect date!');
            refs.btnStart.disabled = false;
        }
    },
};

flatpickr(refs.dateTimePick, options);

    
const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        }

        const startTime = Date.now();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedDate - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            if (deltaTime < 1000) {
                clearInterval(this.intervalId);
                this.isActive = false;
                refs.btnStart.disabled = false;
                Notiflix.Notify.info('Time is over!');
                return;
            }
            updateTimer({ days, hours, minutes, seconds });
        }, 1000);
    }
}


    refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
    // refs.spans.forEach(item => item.classList.toggle('end'));
    timer.start();
    refs.btnStart.disabled = true;
    refs.dateTimePick.disabled = true;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad( Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }


  function pad(value) {
    return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}




  





