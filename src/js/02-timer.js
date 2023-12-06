import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("button")

let targetDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0].getTime();
       if (selectedDate < Date.now()) {
        Notiflix.Report.warning("Please choose a date in the future");
        button.disabled = true;
       } else {
        targetDate = selectedDate;
        button.disabled = false;
    }
  },
};

flatpickr(input, options);


 button.addEventListener("click", function () {
    timerId = setInterval(updateTimer, 1000);
    button.disabled = true;
  });
 
function updateTimer() {
  const currentDate = Date.now();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(timerId);
    Notiflix.Notify.success("Countdown completed!");
    button.disabled = true;
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
  }
}
  

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}