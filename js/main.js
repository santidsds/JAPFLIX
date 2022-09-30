let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

let API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';


let moviesArray = [];
let moviePoster = [];
let movieSelectedInfo = [];
let posters = []
let inputBuscar = document.getElementById("inputBuscar");
let buscarBtn = document.getElementById("btnBuscar");
let moviesSection = document.getElementById("moviesSection")


document.addEventListener("DOMContentLoaded", () => {
    

    getJSONData(API_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            moviesArray = resultObj.data;

            movieSelectedInfo = moviesArray.filter(x=>x.id == localStorage.getItem("movieSelectedID"))
            
            
           
            
            
        }
    });

    
    

    buscarBtn.addEventListener("click", () => {

        moviesSection.innerHTML = ""
        

        if(inputBuscar){

            filterByValue(moviesArray, inputBuscar.value)

            

            for(let i=0; i<results.length; i++){
                movie = results[i]
                moviePoster.push(movie.title)

                console.log(Math.round(movie.vote_average/2))

                    moviesSection.innerHTML += `
                    
                    <div id=${movie.id}>
                        <div id="movie-cont${i}" class="container">
                        <h3>${movie.title}</h3>
                        <div class="top-cont">
                            ${rating(Math.round(movie.vote_average/2))}
                            <p class="rating">Rating (${movie.vote_average})</p>
                            
        
                        </div>
                        
                        <p>${movie.tagline}</p>
                        </div>
                    </div>
                    
                    `

                
                
            }

            movieInfo();
            
            
            
        }

        
        

        
        
    })

    

    
});



function filterByValue(array, string) {    

    
    results = array.filter(obj => {
        return obj.title.toUpperCase().includes(string.toUpperCase()) || obj.tagline.toUpperCase().includes(string.toUpperCase()) || obj.overview.toUpperCase().includes(string.toUpperCase())
        
    })

    console.log(results)
}

function rating (stars) {
    let ratingToAppend = ""
    if(stars === 1) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `
  
        return ratingToAppend
  
    }
    else if(stars === 2) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `
        return ratingToAppend
  
    }
    else if(stars === 3) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `
        return ratingToAppend
  
    }
    else if(stars === 4) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        `
        return ratingToAppend
  
    }
    else if(stars === 5) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        `
        return ratingToAppend
  
    }
  }

  function movieInfo() {
    for(let i=0; i < 101; i++){
        
        let moviesCont =  document.getElementById("movie-cont" + i);

        moviesCont.addEventListener("click", () => {
            document.getElementById("movie-info-back").classList.toggle("hide")
            
            localStorage.setItem("movieSelectedID", moviesCont.parentNode.id)
            console.log(localStorage.getItem("movieSelectedID"))

            let movieSelectedJSON = moviesArray.filter(x =>  x.id == localStorage.getItem("movieSelectedID"));
            console.log(movieSelectedJSON)

            let POSTERS_API_URL = "http://www.omdbapi.com/?t="+ movieSelectedJSON[0].title +"&apikey=cb2977f" 
            
            getJSONData(POSTERS_API_URL).then(function(resultObj){
                moviePoster = resultObj.data.Poster
                console.log(moviePoster)
                    
            });

            

            document.getElementById("movie-info").innerHTML = 
            `
            
            <h1>${movieSelectedJSON[0].title}</h1>
            <img src="${moviePoster}" alt="">
            <p>${movieSelectedJSON[0].tagline}</p>
            `

            document.getElementById("movie-info").classList.toggle("hide")
            document.getElementById("filter").classList.toggle("addBlur")
            })

        document.getElementById("movie-info-back").addEventListener("click", () => {
            document.getElementById("movie-info").classList.toggle("hide")
            document.getElementById("filter").classList.toggle("addBlur")
            document.getElementById("movie-info-back").classList.toggle("hide")
        })

            

    }

  }

  async function getAPI(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    
}

  function showMovieInfo() {
    
    let movieInfo = JSON.parse(localStorage.getItem("movieSelectedJSON"))
    console.log(movieInfo)
    document.getElementById("movie-info").innerHTML = 
    `
    <h1>${movieInfo[0].title}</h1>
    
    `
  }

function showPosters(movieTitle) {
    
    
    
    let POSTERS_API_URL = " http://www.omdbapi.com/?t=" + movieTitle + "&apikey=cb2977f"

        getJSONData(POSTERS_API_URL).then(function(resultObj){
            moviePoster = resultObj.data.Poster
            console.log(moviePoster)
                    
            });
    

}

    










