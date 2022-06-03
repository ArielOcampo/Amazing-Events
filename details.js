var eventos;

//API DATA EVENTS
async function getDataEvents() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(resp => resp.json())
  .then(json => eventos = json)
  
  details()
}
getDataEvents()

function details() {
  // var idEvent = 1;
  // eventos.events.map(event => event._id = idEvent++)
  var id = location.search.split("?id=")
    var selectedId = id[1]
    var event = eventos.events.find(e =>{
    return e._id == selectedId
    
  })
  
  templateCard = `<div class="card mt-5 mx-3 shadow mb-5 bg-body rounded" style="width: 20rem;">
          <img id="img-events" src="${event.image}" class="card-img-top mt-3 pe-2 ps-2" alt="event 1">
          <div class="card-body font">
            <h5 class="card-title text-center">${event.name}</h5>
            <p class="card-text text-center">${event.date}</p>
            <p class="card-text text-center">${event.description}</p>
            <p class="card-text text-center">${event.category}</p>
            <p class="card-text text-center"> ${event.place}</p>
            <div class="d-flex justify-content-center align-items-center">
              <p class="fw-bold text-center">$ ${event.price}</p>
            </div>
          </div>
        </div>
    `;
  document.querySelector(".main-card").innerHTML = templateCard;
  }
  


