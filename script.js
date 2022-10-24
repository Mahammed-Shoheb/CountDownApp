const eventForm = document.getElementById("eventForm");

eventForm.addEventListener("submit" , (e) => {
  e.preventDefault();
  const EvtNode = document.createElement("div");
  EvtNode.classList.add("event")
  document.querySelector(".timerCountDownEvents").appendChild(EvtNode)
  const endDate = document.getElementById("dateTimeInput").value;
  const eventName = document.getElementById("eventName").value;
  const eventsCollection = {
    endDate: new Date(endDate),
    eventName:eventName,
    intervalID: 0,
    ele: document.querySelector(".event:last-child"),
    display() {
      this.intervalID = setInterval(() => {
        const currentTime = new Date().getTime();
        // const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30))
        const timeDiff = this.endDate - currentTime;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24 ));
        const hours = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor(timeDiff % (1000 * 60 * 60) / (1000 * 60))
        const seconds = Math.floor(timeDiff % (1000 * 60) / 1000)
        if(timeDiff <= 0) {
          clearInterval(this.intervalID);
          console.log(this.ele, timeDiff)
          this.ele.innerHTML = `<p>Congratulations ! ! ! ! This is your day to rock :)</p> 
          <p>${eventName} date is today</p>`;
          return;
        }
        this.ele.innerHTML = `<h2 class="eventName">${eventName}</h2>
        <div class="eventTimeContainer">
          <div class="eventTime">
            <p class="eventTimeContent">${days}</p>
            <p class="eventTimetext">Days</p>
          </div>
          <div class="eventTime">
            <p class="eventTimeContent">${hours}</p>
            <p class="eventTimetext">Hours</p>
          </div>
          <div class="eventTime">
            <p class="eventTimeContent">${minutes}</p>
            <p class="eventTimetext">Minutes</p>
          </div>
          <div class="eventTime">
            <p class="eventTimeContent">${seconds}</p>
            <p class="eventTimetext">Seconds</p>
          </div>
        </div>`;
      }, 1000);
    }
  }
  console.log(eventsCollection)
  eventsCollection.display();
})

document.querySelector(".hideFormm").addEventListener("click", ()=> {
  eventForm.classList.toggle("hidden")
})