import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}

let inputDate = null;
let intervalId = null;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onSelectingValidDate(selectedDates[0]);
    },
};

flatpickr(refs.input, options);

function onSelectingValidDate(selectedDates) {
    inputDate = selectedDates.getTime();
    if (inputDate < Date.now()) {
        refs.startBtn.disabled = true;
        Report.failure('Please choose a date in the future');
        return;
    }
    refs.startBtn.disabled = false;
};

function onStart() {
    intervalId = setInterval(startTimer, 1000);
    refs.startBtn.disabled = true;
};

function startTimer() {
    const deltaTime = inputDate - Date.now();
    const timeComponents = convertMs(deltaTime);
    updateClockface(timeComponents);
    if (refs.seconds.textContent === '00' && refs.minutes.textContent === '00' && refs.hours.textContent === '00' && refs.days.textContent === '00') {
        Report.success('Time is over!');
        clearInterval(intervalId);
        btnStart.disabled = false;
    }
};

function updateClockface({ days, hours, minutes, seconds }) {
    refs.seconds.textContent = addLeadingZero(seconds);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.hours.textContent = addLeadingZero(hours);
    if (days > 99) {
        refs.days.textContent = days;
    }
    refs.days.textContent = addLeadingZero(days);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};