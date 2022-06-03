
//API DATA EVENTS
async function getDataEvents() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(resp => resp.json())
  .then(json => eventos = json)
  
  checkboxes()
  var checksboxes = document.querySelectorAll("input[type=checkbox]"); //Creo una variable que llame a los input tipo checkbox, esto me genera un node list que puedo recorrer con un forEach como si fuera un array
checksboxes.forEach((check) =>
  check.addEventListener("click", (event) => {
    var checked = event.target.checked;
    if (checked) {
      checkSelected.push(event.target.value);
      filterSearch();
    } else {
      checkSelected = checkSelected.filter(
        (uncheck) => uncheck !== event.target.value
      );
      filterSearch();
    }
    
  })
);
filterSearch()
}
getDataEvents()

//FILTER AND DISPLAY CATEGORIES
function checkboxes() {
  var allCategories = eventos.events.map((event) => event.category); //Recorremos todas las categorias
  let arrayCategories = new Set(allCategories); //Filtramos las categorias que estan repetidas con Set
  var filterCategories = [...arrayCategories]; //En un nueva variable metemos todas las categorias ya filtradas
  let checksBox = "";
  filterCategories.map((nameCategory) => {
    checksBox += `
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${nameCategory}" id="${nameCategory}">
                    <label for="${nameCategory}" class="form-check-label" for="flexCheckDefault1">${nameCategory}</label>
                  </div> `;
  });
  document.querySelector(".checks").innerHTML = checksBox;
}



//EVENT CLICK ON CATEGORIES
var checkSelected = [];
var checksboxes = document.querySelectorAll("input[type=checkbox]"); //Creo una variable que llame a los input tipo checkbox, esto me genera un node list que puedo recorrer con un forEach como si fuera un array
checksboxes.forEach((check) =>
  check.addEventListener("click", (event) => {
    var checked = event.target.checked;
    if (checked) {
      checkSelected.push(event.target.value);
      filterSearch();
    } else {
      checkSelected = checkSelected.filter(
        (uncheck) => uncheck !== event.target.value
      );
      filterSearch();
    }
    
  })
);

//EVENT SEARCH
var textSearching = "";
var search = document.querySelector("#searchbar"); //Creo una variable que llame al input tipo search y le creo un escuchador de eventos "keyup"
search.addEventListener("keyup", (event) => {
  textSearching = event.target.value;
  
  filterSearch();
  
});

//FUNCTION FILTER AND CONDITIONS
function filterSearch() {
  let data = [];
      //Primera condición que los checksbox tengan valor y la barra de busqueda tambien
  if (checkSelected.length > 0  ) {
    checkSelected.map((category) => {
      data.push(...eventos.events.filter((evento) => evento.name.toLowerCase().includes(textSearching.trim().toLowerCase()) &&
                  evento.category == category));
                  });
                  
  } 
  
  //Segunda condición que los checksbox tengan valor y la barra de busqueda no
  else if (checkSelected.length > 0 && textSearching === "") {
    checkSelected.map((category) =>
      data.push(eventos.events.filter((evento) => evento.category == category))
    );
  }
  //Tercera condición que los checksbox no tengan valor y la barra de busqueda si
  else if (checkSelected.length == 0 && textSearching !== "") {
    data.push(...eventos.events.filter((evento) =>
        evento.name.toLowerCase().includes(textSearching.trim().toLowerCase())
      )
    );
  }
  //Cuarta condición que ninguno tenga valor
  else {
    data.push(...eventos.events);
  }
  
  
  cards(data);
}



//FUNCTION DISPLAY CARDS
function cards(data) {
  var templateCard = "";
  var fecha = eventos.currentDate
  if (data.length !== 0)  {
  for (i = 0; i < data.length; i++) {
    if (fecha > data[i].date)
    templateCard += `<div class="card mt-5 mx-3 shadow mb-5 bg-body rounded" style="width: 20rem;">
          <img id="img-events" src="${data[i].image}" class="card-img-top mt-3 pe-2 ps-2" alt="event 1">
          <div class="card-body font">
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text">${data[i].date}</p>
            <p class="card-text">${data[i].description}</p>
            <p class="card-text">${data[i].category}</p>
            <div class="d-flex justify-content-between align-items-center">
              <p class="fw-bold">$ ${data[i].price}</p><a href="/details.html?id=${data[i]._id}"
                class="btn btn-primary justify-content-between" id= ${data[i]._id}>See
                more</a>
            </div>
          </div>
        </div>
    `;
  }
  
}else { templateCard =  `<div style="heigth: 50rem; margin-top: 10rem; margin-bottom: 10rem "><p class="fs-3 not-found">Search not found, try another word</p></div>
`

}
document.querySelector(".main-card").innerHTML = templateCard;
}