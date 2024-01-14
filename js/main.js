
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');
const recipeContainer = document.querySelector('.recipe-container');
const rowData = document.getElementById('rowData');
const modalContent = document.querySelector('.modal-body');



searchButton.addEventListener('click', function(e){
  e.preventDefault();
  const mealaName  = searchInput.value
  fetchMeals(mealaName);
 

})


fetchMeals('apple')
let data = []
async function fetchMeals(query){
  const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
  const recipes = await response.json();
  console.log(recipes.recipes);
  data = recipes.recipes;
  displayData();
  clearInput()

}

function clearInput(){
  searchInput.value =''
}

function displayData(){
  var cols = '';
  for(let i = 0 ; i<data.length ; i++){
  cols += `<div class="card p-0 border-0" style="width: 18rem;">
  <img src="${data[i].image_url}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${data[i].publisher}</h5>
    <h5 class="card-title">${data[i].recipe_id}</h5>
    <p class="card-text">${data[i].title}</p>
    <a href="#" class="btn bg-danger card-btn" id="view-recipe" data-bs-toggle="modal" data-bs-target="#exampleModal">view recipe</a>
  </div>
</div>`

   } 
    rowData.innerHTML = cols; 
    const cardBtn = document.querySelectorAll('.card-btn');
    for(let i = 0 ; i<cardBtn.length;i++){
      cardBtn[i].addEventListener('click',function(e){
       
        let x = e.target
        console.log(x);
        var myId = cardBtn[i].parentElement.children[1].innerHTML;
        console.log(myId)
        fetchRecipes(myId)
        
      })
     

    }
  
}

let myIngredients = []
function showIngredients(){
  const showIng = document.querySelector('#demo');
  var uls = ''
  for(let i = 0 ;i<myIngredients.length ; i++){
    console.log(myIngredients[i])
    uls += ` <li>${myIngredients[i]}</li>
    `
  }
  showIng.innerHTML = uls
  
}

async function fetchRecipes(rId){
  const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${rId}`);
   finalResponse = await response.json();
  console.log(finalResponse);
  console.log(finalResponse.recipe.recipe_id); 
  myIngredients = finalResponse.recipe.ingredients
  console.log(myIngredients);
   
 displayRecipes()
 showIngredients()

}


let finalResponse = []
function displayRecipes(){
  modalContent.innerHTML = `<img src="${finalResponse.recipe.image_url}" alt="" >
  <h4>${finalResponse.recipe.title}</h4>
  <h4>${finalResponse.recipe.publisher}</h4>
  <ul id="demo"></ul>
 
  `
  
}






