//Random Meal Recipe
const urlRandomMeals = `https://www.themealdb.com/api/json/v1/1/random.php`;
        
// Fetching random meal data
fetch(urlRandomMeals)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    if (data.meals) {
        let meal = data.meals[0];
        let mealImageContainer = document.getElementById('Random-Meals-Image');
        let mealNameContainer = document.getElementById('Random-Meals-Name');
        let mealCategoryContainer = document.getElementById('Random-Meals-Category');

        // Setting meal details in HTML
        mealImageContainer.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img meal-image">`;
        mealNameContainer.innerHTML = meal.strMeal;
        mealCategoryContainer.innerHTML = meal.strCategory;

        let RandomMealsIngredient = document.getElementById('Random-Meals-Ingredient');
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            if (ingredient && measure) {
                const listItem = document.createElement('div');
                listItem.setAttribute("id", `${i}`)
                listItem.setAttribute("class", "Random-Meals-Ingredient-Items");
                
                listItem.innerHTML = `<p class="name">${ingredient}: </p> <p class="measure">${measure}</p>`;
                RandomMealsIngredient.appendChild(listItem);
            }
        }

        let RandomMealsButton = document.getElementById('Random-Meals-Button');
        // Adding event listener to the button
        RandomMealsButton.addEventListener('click', () => {
            window.location.href = `items.html?category=${encodeURIComponent(meal.strMeal)}`;
        });
    } 
    else {
        throw new Error('Random meal data not found');
    }
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

// Add an Event Listener to the Form
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve Search Query
    let searchQuery = document.getElementById('searchitem').value.trim();

    // Construct the API URL
    const SearchMeal = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;

    // Perform Fetch Request
    fetch(SearchMeal)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.meals) {
                // Handle Response - You can do whatever you want with the search results
                window.location.href = `items.html?category=${encodeURIComponent(searchQuery)}`;
                console.log(data.meals); // For demonstration, just logging the meals data
            } else {
                // Handle the case where no meals are found
            let Section = document.getElementById("Section");
            Section.setAttribute("style","display:none;");
            let hiddentext = document.getElementById("hidden-text");
            hiddentext.setAttribute("style","display:block;");
            hiddentext.innerText = `Hai ya the item you search not available`;
            throw new Error('No meals found for the given category');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Retrieve query string parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Construct API endpoint using the retrieved category text
const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(category)}`;

// Fetch data from the API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Check if meals data is available
        if (data.meals) {
            // Extract meals from the response
            const meals = data.meals;

            // Display meals on the webpage
            meals.forEach(meal => {
                let Name = document.getElementById('Name');
                let Image = document.getElementById('Image');

                Image.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img meal-image">`;
                Name.innerText = meal.strMeal;

                let Ingredient = document.getElementById('Ingredient');
                for (let i = 1; i <= 20; i++) {
                    let ingredient = meal[`strIngredient${i}`];
                    let measure = meal[`strMeasure${i}`];
                    if (ingredient && measure) {
                        const listItem = document.createElement('div');
                        listItem.setAttribute("id", `${i}`)
                        listItem.setAttribute("class", "Random-Meals-Ingredient-Items");
                        
                        listItem.innerHTML = `<p class="name">${ingredient}: </p> <p class="measure">${measure}</p>`;
                        Ingredient.appendChild(listItem);
                    }
                }
                
                // let Instructons = document.getElementById('Instructons');
                // Instructons.innerHTML = `<p>${meal.strInstructions}</p>`;
                let Instructons = document.getElementById('Instructons');
                let instructionsText = meal.strInstructions;
                
                // Split the instructions by <li> tags
                let instructionsArray = instructionsText.split(/<li>|<\/li>/);
                
                // Remove empty elements and trim whitespace
                instructionsArray = instructionsArray.filter(instruction => instruction.trim() !== "");
                
                instructionsArray.forEach(instruction => {
                    const instructionParagraph = document.createElement('p');
                    instructionParagraph.textContent = instruction.trim(); // Trim to remove extra spaces
                    Instructons.appendChild(instructionParagraph);
                });

                // Add YouTube video
                let Video = document.getElementById('Video');
                if (meal.strYoutube) {
                    // Check if YouTube URL is available
                    const youtubeId = meal.strYoutube.split('=')[1];
                    Video.innerHTML = `<iframe class="video-item" src="https://www.youtube.com/embed/${youtubeId}?controls=0" frameborder="0" allowfullscreen></iframe>`;
                } else {
                    // If no YouTube URL is available, show a message
                    Video.innerText = "No video available for this meal.";
                }
            });
        } 
        else {
            // Handle the case where no meals are found
            let Section = document.getElementById("Section");
            Section.setAttribute("style","display:none;");
            let hiddentext = document.getElementById("hidden-text");
            hiddentext.setAttribute("style","display:block;");
            hiddentext.innerText = `Item not found`;
            throw new Error('No meals found for the given category');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });