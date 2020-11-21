const apikey = "NPIhWo3ADWsyjbibfobo8cILB5N5qVs1";
const urlTrend = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=8&rating=g`;
const containerGifs = document.getElementById('container-gifs');
function trending(){
    fetch(urlTrend)
        .then(resp =>resp.json())
        .then(json => {
            console.log(json.data[0]);
         for (let index = 0; index < json.data.length; index++) {
             console.log(json.data[index].url);
             addToDOM(json.data[index].images.original,containerGifs,'fotos');
            
        }})
        .catch(e => console.error("Falló el fetch", e))


}

function addToDOM(info,container,clase){
    
    let img = document.createElement('img');
    img.setAttribute('src', info.url);
    container.appendChild(img);
    img.classList.add(clase);
}
trending();

const containerSearch = document.getElementById('container-search');
const input = document.getElementById('input');

//busqueda conectada al click en Hover-Active-Img.js y con enter
function Busqueda(gifos){
        let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${gifos}&limit=12&offset=20&rating=g&lang=es`;
        fetch(urlSearch)
        .then(resp => resp.json())
        .then(json => {
    console.log(json.data[0]);
    for (let index = 0; index < json.data.length; index++) {
        console.log(json.data[index].url);
        addToDOM(json.data[index].images.original,containerSearch, 'gifs-search');
      
   }
})
.catch(err => console.error("Error",err))
    
}
const bloque1 = document.getElementById('bloque1');
const trendingText = document.getElementById('trending');


iconSearch.addEventListener('click',()=>{
    Busqueda(input.value);
    let nombreBusqueda = document.createElement('h4');
    let button = document.createElement('button');
    button.innerText = 'VER MAS';
    button.classList.add('button-gifs');
    nombreBusqueda.innerText = input.value;
    nombreBusqueda.classList.add('nombre-busqueda');
    bloque1.insertBefore(nombreBusqueda,containerSearch);
    bloque1.replaceChild(button, trendingText);
    button.addEventListener('click',()=>{
            Busqueda(input.value);
        });
})

//autocompletar el search point

function autocomplete(nombreAuto){
    let urlAutocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${nombreAuto}&limit=5&offset=0`;
    fetch(urlAutocomplete)
        .then(resp =>resp.json())
        .then(json => {
            console.log(json.data)
            for (let index = 0; index < json.data.length; index++) {
                console.log(json.data[index]);
                refill(json.data[index].name);
                input.removeEventListener('input',relleno);
                
        }
    })
        .catch(e => console.error("Falló el fetch", e))
    }
//evento del input
input.addEventListener('input', relleno);

function relleno(){
    console.log(input.value);
    autocomplete(input.value);
    
}

let form = document.getElementById('form');
//function que imprime el nombre y agranda el form
function refill(refillNombre){
    let p = document.createElement('p');
    p.textContent = refillNombre;
    //estilado p
    p.style.textAlign = 'left';
    p.style.position = 'relative';
    p.style.left = '10%';
    form.classList.add('form-active')
    form.appendChild(p);
    if (input.value == "") {
        p.remove();
    }
}