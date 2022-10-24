const eventForm = document.getElementById("eventForm");
const removeEventForm = document.getElementById("removeEventForm")
const initialEvets = {
  "Shukrana": "June 10, 2023 19:00:00",
  "Nikha" : "June 11, 2023 01:30:00",
  "Valima" : "June 12, 2023 02:00:00" 
}


const displayEvents = (eventName,endDate) => {
  const EvtNode = document.createElement("div");
    EvtNode.classList.add("event")
    document.querySelector(".timerCountDownEvents").appendChild(EvtNode)
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
              const pNode = document.createElement("p");
              pNode.innerHTML = `Congratulations ! ! ! ! This is your day to rock :) <br>
              ${eventName} date ${new Date(endDate)} is today`;
              this.ele.appendChild(pNode);
            return;
          }
          this.ele.innerHTML = `<h2 class="eventName">${eventName.toUpperCase()}</h2>
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
    eventsCollection.display();
  
}

addEventListener("DOMContentLoaded", () => {
  for (const event in initialEvets) {
    displayEvents(event,initialEvets[event]);

  }
  for ( let keyCount = 0; keyCount < localStorage.length; keyCount++ ) {
    const eventName = localStorage.key(keyCount)
    const endDate = localStorage.getItem(eventName)
    displayEvents(eventName,endDate);
  }
})

eventForm.addEventListener("submit" , (e) => {
  e.preventDefault();
  const endDate = document.getElementById("dateTimeInput").value.trim();
  const eventName = document.getElementById("eventName").value.trim().toLowerCase();
  localStorage.setItem(eventName,endDate)
  console.log(eventName);

  location.reload()
})

removeEventForm.addEventListener("submit", () => {
  const eventName = document.getElementById("eventNameRemove").value.trim().toLowerCase();
  console.log(eventName);
  localStorage.removeItem(eventName)
})

// document.querySelector(".hideFormm").addEventListener("click", ()=> {
//   eventForm.classList.toggle("hidden")
// })