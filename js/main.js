// Navbar
closeNav()
function closeNav(time = 0) {
    $("#closeNav").css("display", "none")
    $("#openNav").css("display", "block")
    let widht = $(".nav1").innerWidth()
    $(".nav-bar").animate({ left: `-${widht}px` }, time)
    $(".nav-bar ul li").animate({ top: "300px" }, 500)
}
// To open 
$("#openNav").click(function () {
    $("#closeNav").css("display", "block")
    $("#openNav").css("display", "none")
    $(".nav-bar").animate({ left: "0px" }, 500)
    for (let i = 0; i < 5; i++) {
        $(".nav-bar ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
})
// To close
$("#closeNav").click(function () {
    closeNav(500)
})
// navlinks
$(".navLink").click((e) => {
    let link = e.target.getAttribute("getid")
    closeNav(500)
    $(`#${link}`).siblings().css("display", "none")
    $(`#${link}`).css("display", "block")
    $("#loading").fadeIn(0);
    $("#loading").fadeOut(1000);
    byName.value = ""
    byFirstLetter.value = ""
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// home
let randomMeals = []
async function getData() {

    let myReq = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await myReq.json()
    randomMeals = data.meals
    $(document).ready(function () {
        $("#loading").fadeOut(2000);
    });
    display(randomMeals, "myRow")
}
getData()
function display(how, row) {
    let temp = ""
    how.forEach((e) => {
        temp += ` <div class="col-md-3">
       <div id="${e.idMeal}"  category="${e.strCategory}" area="${e.strArea}" class="pointer toId meal overflow-hidden position-relative">
         <img id="${e.idMeal}" class="w-100 rounded-3 toId" src="${e.strMealThumb}" alt="meal">
         <div id="${e.idMeal}" class="meal-layer d-flex align-items-center toId p-2 rounded-3">
           <h3 id="${e.idMeal}">${e.strMeal}</h3>
         </div>
       </div>
     </div>`
    })
    document.getElementById(`${row}`).innerHTML = temp
    showDetails()
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Details
let mealDetails = []
let tags = []
let r = []

// to get data
async function getDetails(id = 53060) {


    let myReq = await fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await myReq.json()
    mealDetails = data.meals
    $(document).ready(function () {
        $("#loading").fadeOut(2000);
    });
    displayDetails()

}
// to get id
function showDetails() {
    $(".toId").click((e) => {
        $("#loading").fadeIn(0);
        let mealId = e.target.getAttribute("id")
        $(".toHide").css("display", "none")
        $("#details").css("display", "block")
        getDetails(mealId)
    })
}
//dispaly
function displayDetails() {

    let temp = ""
    mealDetails.forEach((e) => {
        // to get tags
        tags = e.strTags
        // to get recipy
        for (let i = 1; i < 21; i++) {
            let measure = e[`strMeasure${i}`]
            let ingredient = e[`strIngredient${i}`]
            if (measure != " " && measure != "") {
                let recipy = measure + " " + ingredient
                r.push(recipy)
            }
        }
        // to show
        temp += `<div class="text-white col-md-4 mb-4">
        <div>
          <img class="w-100 rounded-3 mb-2" src="${e.strMealThumb}" alt="meal">
          <h2>${e.strMeal}</h2>
        </div>
      </div>
      <div class="text-white col-md-8 ">
        <div>
          <h2>Instructions</h2>
          <p>${e.strInstructions}.</p>
          <h3> Area : <span>${e.strArea}</span> </h3>
          <h3> Category : <span>${e.strCategory}</span> </h3>
          <h3> Recipes : </h3>
          <ul id="forRecipy" class="list-unstyled d-flex flex-wrap mb-3">
            
          </ul>
          <h3 id="check" > Tags : </h3>
          <ul id="forTags" class="list-unstyled  d-flex flex-wrap mb-3">
          <li class="meal-tag rounded-2 mx-2 mb-2 p-2">${e.strTags}</li>
          </ul>
          <a href="${e.strSource}"  target="_blank"> <button type="button" class="btn btn-success">Source</button></a>
          <a href="${e.strYoutube}"  target="_blank">  <button type="button" class="btn btn-danger">Youtube</button></a>
        </div>
      </div>`
    })
    document.getElementById("forDetails").innerHTML = temp

    // to call displayRecipy
    displayRecipy()

    // to call displayTags
    if (tags == null) {
        document.getElementById("forTags").innerHTML = ""
    }
    if (tags.includes(",")) {
        displayTags()
    }
    $(`#details`).siblings().css("display", "none")
}
// to show tags
function displayTags() {
    let x = tags.split(",")
    let temp = ""
    x.forEach((e) => {
        temp += `<li class="meal-tag rounded-2 m-2 p-2">${e}</li>`
    })
    document.getElementById("forTags").innerHTML = temp
}
// to show Recipy
function displayRecipy() {
    let temp = ""
    r.forEach((e) => {
        temp += `<li class="meal-ing rounded-2 m-2 p-1 ">${e}</li>`
    })
    document.getElementById("forRecipy").innerHTML = temp
    r = []
}
// to close details
$("#close").click(function () {
    $("#loading").fadeIn(0);
    $("#loading").fadeOut(1000);
    $("#show").css("display", "block")
    $("#details").css("display", "none")
})


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//search
let searchByName = []
let searchByLetter = []
let byName = document.getElementById("searchByName")
let byFirstLetter = document.getElementById("searchByFirstLetter")


// 1-- search by name
async function searchMealName(name) {


    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await myReq.json()
    searchByName = data.meals
    display(searchByName, "secRow")
    $("#loading").fadeOut(500);


}
byName.addEventListener("keyup", function () {
    $("#loading").fadeIn(0);
    searchMealName(byName.value)
})

// 2-- search by first letter
async function searchMealLetter(letter) {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data = await myReq.json()
    searchByLetter = data.meals
    display(searchByLetter, "secRow")

    $("#loading").fadeOut(500);

}
searchMealLetter()
byFirstLetter.addEventListener("keyup", function () {
    $("#loading").fadeIn(0);
    searchMealLetter(byFirstLetter.value)
})


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Category
let mealsCategory = []
let mealsByCategory = []

//get categories
async function searchByCategory() {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await myReq.json()
    mealsCategory = data.categories
    displayCategory()
}
searchByCategory()

// show categories
function displayCategory() {
    let temp = ""
    mealsCategory.forEach((e) => {
        temp += ` <div class="col-xl-3 col-lg-4 col-md-6">
        <div name="${e.strCategory}" id="${e.idCategory}"  class="pointer mealCat meal-categ overflow-hidden rounded-3 position-relative">
          <img name="${e.strCategory}" src="${e.strCategoryThumb}" class="w-100 mealCat" alt="beef">
          <div class="categories-layer text-black d-flex flex-column justify-content-center align-items-center p-2 rounded-3">
            <h3 name="${e.strCategory}" class="mealCat text-white">${e.strCategory}</h3>
            <p name="${e.strCategory}" class="mealCat text-white">${e.strCategoryDescription.substring(0, 125)}</p>
          </div>
        </div>
      </div>`
    })
    document.getElementById(`CategoryRow`).innerHTML = temp
    showCategories()
}
// get meals by category
async function getCategory(c) {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
    let data = await myReq.json()
    mealsByCategory = data.meals
    display(mealsByCategory, "Row4")
    $("#loading").fadeOut(500);

}
// show meals by category
function showCategories() {
    $(".mealCat").click((e) => {
        let mealId = e.target.getAttribute("name")
        $("#Categories").css("display", "none")
        $("#categoriesDetails").css("display", "block")
        $("#loading").fadeIn(0);
        getCategory(mealId)
    })
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Area
let Area = []
let mealsByArea = []

//get Area
async function searchByArea() {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await myReq.json()
    Area = data.meals
    displayArea()
}
searchByArea()

// show area
function displayArea() {
    let temp = ""
    Area.forEach((e) => {
        temp += ` <div class="col-md-3  ">
        <div class="rounded-2 text-center pointer area p-5 shadow  " name="${e.strArea}">
          <i  class="fa-solid   fa-house-flag fa-4x "></i>
          <h3  class=" ">${e.strArea}</h3>
        </div>
      </div>`
    })
    document.getElementById(`rowArea`).innerHTML = temp
    showArea()
}
// get meals by area
async function getArea(a) {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`)
    let data = await myReq.json()
    mealsByArea = data.meals
    display(mealsByArea, "areaa")
    $("#loading").fadeOut(500);


}
// show meals by area
function showArea() {
    $(".area").click((e) => {
        let mealArea = e.target.getAttribute("name")
        $("#Area").css("display", "none")
        $("#AreaDetails").css("display", "block")
        $("#loading").fadeIn(0);

        getArea(mealArea)
    })
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Ingredients
let ingredients = []
let mealsByingredients = []

//get Ingredients
async function searchByIngredients() {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await myReq.json()
    ingredients = data.meals
    displayIngredients()
}
searchByIngredients()
// show Ingredients
function displayIngredients() {
    let temp = ""
    let o = ingredients.slice(0, 16)
    o.forEach((e) => {
        temp += ` <div class="col-lg-3 col-md-4 col-sm-6 text-white">
        <div name="${e.strIngredient}" class="pointer rounded-2 text-center cursor-pointer ingredients shadow p-4 height">
          <i  class="fa-solid  fa-utensils fa-4x py-3"></i>
          <h3  class="">${e.strIngredient}</h3>
          <p  class=""> ${e.strDescription != null ? e.strDescription.slice(0, 90) : ""}</p>
        </div>
      </div>`
    })
    document.getElementById(`rowIngredients`).innerHTML = temp
    showIngredients()
}
// get meals by Ingredients
async function getingredients(a) {
    let myReq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${a}`)
    let data = await myReq.json()
    mealsByingredients = data.meals
    display(mealsByingredients, "i")
    $("#loading").fadeOut(500);


}
// show meals by Ingredients
function showIngredients() {
    $(".ingredients").click((e) => {
        let mealIngredients = e.target.getAttribute("name")
        $("#Ingredients").css("display", "none")
        $("#ingredientsDetails").css("display", "block")
        $("#loading").fadeIn(0);
        getingredients(mealIngredients)
    })
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Contact

// VALID NAME
let userName = document.getElementById("nameInput")
let nameAlert = document.getElementById("nameAlert")
let regexName = /^[a-zA-Z ]+$/
userName.addEventListener("keyup", function () {
    valid(regexName, userName, nameAlert)
    button()
})

//  VALID EMAIL
let emailInput = document.getElementById("emailInput")
let emailAlert = document.getElementById("emailAlert")
let regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
emailInput.addEventListener("keyup", function () {
    valid(regexEmail, emailInput, emailAlert)
    button()
})

//  VALID PHONE
let phoneInput = document.getElementById("phoneInput")
let phoneAlert = document.getElementById("phoneAlert")
let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
phoneInput.addEventListener("keyup", function () {
    valid(regexPhone, phoneInput, phoneAlert)
    button()
})

//  VALID AGE
let ageInput = document.getElementById("ageInput")
let ageAlert = document.getElementById("ageAlert")
let regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
ageInput.addEventListener("keyup", function () {
    valid(regexAge, ageInput, ageAlert)
    button()
})

//  VALID PASSWORD
let passwordInput = document.getElementById("passwordInput")
let passwordAlert = document.getElementById("passwordAlert")
let regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
passwordInput.addEventListener("keyup", function () {
    valid(regexPass, passwordInput, passwordAlert)
    button()
})

//  VALID REPASSWORD
let repasswordInput = document.getElementById("repasswordInput")
let repasswordAlert = document.getElementById("repasswordAlert")
function repassword() {
    if (repasswordInput.value == passwordInput.value) {
        repasswordAlert.style.display = "none"
        return true
    }
    else {
        repasswordAlert.style.display = "block"
        return false
    }
}

repasswordInput.addEventListener("keyup", function () {
    repassword()
    button()

})

// REGEX FUNCTION
let test;
//To test
function nono(regex, userInfo) {
    test = regex.test(userInfo.value)
    if (test == false) {
        return false
    }
    else {
        return true
    }
}
// to add alert or not
function valid(regex, userInfo, alert) {
    nono(regex, userInfo)
    if (test == false) {
        alert.style.display = "block"
        return false
    }
    else {
        alert.style.display = "none"
        return true
    }
}

//Disable button
function button() {
    if (nono(regexName, userName) == true && nono(regexEmail, emailInput) == true && nono(regexPhone, phoneInput) == true && nono(regexAge, ageInput) == true && nono(regexPass, passwordInput) == true && repassword() == true) {
        $("#submitBtn").removeClass("disabled")
    }
    else {
        $("#submitBtn").addClass("disabled")
    }
}
let padding = $('.nav2').innerWidth() + 5
$('section').not('.nav2').css('padding-left', padding+'px')










