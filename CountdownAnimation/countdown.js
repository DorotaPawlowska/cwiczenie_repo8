
const updateTimer = (deadline) => {
  const time = deadline - new Date();
  return {
    'days': Math.floor( time/(1000*60*60*24) ),
    'hours': Math.floor( (time/(1000*60*60)) % 24  ),
    'minutes': Math.floor( (time/(1000/60)) % 60 ),
    'seconds': Math.floor( (time/1000) % 60 ),
    'total': time
  };
}

const animateClock = (strong) => {
  strong.className = 'turn';
  // console.log(strong);
  setTimeout(() => {
    strong.className = "";
  }, 700);
}

const startTimer = (id, deadline) => {
  const timerInterval = setInterval(()=> {
    const clock = document.getElementById(id);
    const timer = updateTimer(deadline);

    clock.innerHTML = `
      <span><strong>${timer.days}</strong></span>
      <span><strong>${timer.hours}</strong></span>
      <span><strong>${timer.minutes}</strong></span>
      <span><strong>${timer.seconds}</strong></span>
      `;

    const strongs = clock.getElementsByTagName('strong');
    // console.log(span);
    animateClock(strongs[3]);
    if(timer.seconds === 59) animateClock(strongs[2]);
    if(timer.minutes === 59 && timer.seconds === 59) animateClock(strongs[1]);
    if(timer.hours === 23 && timer.minutes === 59 && timer.seconds === 59) animateClock(strongs[0]);

    if(timer.total < 1){
      clearInterval(timerInterval);
      clock.innerHTML = `<span>0</span><span>0</span><span>0</span><span>0</span>`;
    }

  },1000);
}

window.onload = () => {
  const deadline = new Date("December 31, 2018 23:59:00");
  startTimer("clock", deadline);
}