window.addEventListener("scroll", function () {
                let scrollPosition = window.pageYOffset;
                let backgroundPosition = `center ${50 - scrollPosition / 10}%`;
                document.getElementById("abc").style.backgroundPosition = backgroundPosition;
            });
            function isInViewport(element) {
                var rect = element.getBoundingClientRect();
                return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
            }

            function scrollToTop() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            function openPopup() {
        document.getElementById('popup').style.display = 'block';
    }

    // JavaScript code to close the popup when clicking outside of it or on the close button
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    // JavaScript code to associate the "Upload" button in the popup with the "Upload" option in page one
    function uploadFile() {
        // Get the selected file from the popup upload input
        var fileInput = document.getElementById('popupUploadInput');
        var selectedFile = fileInput.files[0];

        // Simulate uploading logic here, for example:
        alert('Uploading file: ' + selectedFile.name);

        // Close the popup
        closePopup();
    }
    // Example structure for a recipe
const recipe = {
    name: "Ayush Ratan",
    recipeName: "Delicious Dish",
    recipe: "Recipe",
    imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/450px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
};

// Example array to store uploaded recipes
const uploadedRecipes = [recipe];
// Function to display uploaded recipes
function displayUploadedRecipes() {
    const uploadsContainer = document.getElementById('yourUploadsContainer');

    // Clear existing content
    uploadsContainer.innerHTML = '';

    // Iterate through uploaded recipes and create HTML for each
    uploadedRecipes.forEach((recipe, index) => {
        const recipeHTML = `
        <div class="image-gallery2">
                <img src="${recipe.imageLink}" alt="Recipe Image ${index + 1}">
                <div class="recipe-info">
                    <p style="font-size: large; font-weight: 900;">${recipe.recipeName}</p>
                    <p style="color: rgb(61, 61, 60); font-size: small;">by ${recipe.name}</p>
                    <button onclick="displayRecipeDetails()">Recipe</button>
                    <button onclick="editRecipe(${index})">Edit</button>
                    <button onclick="deleteRecipe(${index})">Delete</button>
                </div>
            </div>
          `;

        // Append the HTML to the container
        uploadsContainer.innerHTML += recipeHTML;
    });
}
function deleteRecipe(index) {
      // Remove the recipe at the specified index
      uploadedRecipes.splice(index, 1);

      // Display the updated recipes
      displayUploadedRecipes();
  }
// Example: Call the function after uploading a new recipe
function uploadFile() {
    // Get input values
    const nameInput = document.querySelector('#popup input[placeholder="Your Name"]');
    const recipeNameInput = document.querySelector('#popup input[placeholder="Recipe Name"]');
    const recipeTextarea = document.querySelector('#popup textarea');
    const fileInput = document.getElementById('popupUploadInput');

    // Check if a file is selected
    if (!fileInput.files.length) {
        alert('Please select an image file.');
        return;
    }

    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = function (e) {
        // Create a new recipe object
        const newRecipe = {
            name: nameInput.value,
            recipeName: recipeNameInput.value,
            recipe: recipeTextarea.value,
            imageLink: e.target.result // Use the data URL as the image link
        };

        // Add the new recipe to the array
        uploadedRecipes.push(newRecipe);

        // Display the updated recipes
        displayUploadedRecipes();

        // Close the popup
        closePopup();
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(fileInput.files[0]);
}

function displayRecipeDetails() {
        const nameInput = document.querySelector('#popup input[placeholder="Your Name"]');
        const recipeNameInput = document.querySelector('#popup input[placeholder="Recipe Name"]');
        const recipeTextarea = document.querySelector('#popup textarea');

        const recipeDetailsBox = document.getElementById('recipeDetailsBox');
        const recipeDetailsName = document.getElementById('recipeDetailsName');
        const recipeDetails = document.getElementById('recipeDetails');

        // Display the recipe details in the box
        recipeDetailsName.textContent = `Recipe by: ${nameInput.value}`;
        recipeDetails.textContent = `Recipe Name: ${recipeTextarea.value}`;
        recipeDetailsBox.style.display = 'block';
    }

        function closeRecipeDetails() {
            const recipeDetailsBox = document.getElementById('recipeDetailsBox');
            recipeDetailsBox.style.display = 'none';
        }
        // Function to edit a recipe
        function editRecipe(index) {
        const recipe = uploadedRecipes[index];

        // Set values in the edit popup based on the selected recipe
        document.getElementById('editNameInput').value = recipe.name;
        document.getElementById('editRecipeNameInput').value = recipe.recipeName;
        document.getElementById('editRecipeTextarea').value = recipe.recipe;

        // Open the edit popup
        openEditPopup();

        // Set the index as a property of the confirm button
        document.getElementById('confirmEditButton').setAttribute('data-recipe-index', index);
    }

    // Function to open the edit popup
    function openEditPopup() {
        document.getElementById('editPopup').style.display = 'block';
    }

    // Function to close the edit popup
    function closeEditPopup() {
        document.getElementById('editPopup').style.display = 'none';
    }

    // Function to confirm the edit and update the tile
    function confirmEdit() {
    const index = document.getElementById('confirmEditButton').getAttribute('data-recipe-index');

    // Get input values from the edit popup
    const nameInput = document.getElementById('editNameInput');
    const recipeNameInput = document.getElementById('editRecipeNameInput');
    const recipeTextarea = document.getElementById('editRecipeTextarea');

    // Update the recipe details
    uploadedRecipes[index].name = nameInput.value;
    uploadedRecipes[index].recipeName = recipeNameInput.value;
    uploadedRecipes[index].recipe = recipeTextarea.value;

    // Display the updated recipe
    updateRecipeTile(index);

    // Close the edit popup
    closeEditPopup();
}

    // Function to update the displayed recipe tile
    function updateRecipeTile(index) {
    const uploadsContainer = document.getElementById('yourUploadsContainer');
    const recipe = uploadedRecipes[index];

    // Find the corresponding tile
    const tile = uploadsContainer.children[index];

    // Update specific elements within the tile
    const image = tile.querySelector('.image-gallery2 img');
    const recipeName = tile.querySelector('.recipe-info p:nth-child(1)');
    const author = tile.querySelector('.recipe-info p:nth-child(2)');

    // Update values
    image.src = recipe.imageLink;
    recipeName.textContent = recipe.recipeName;
    author.textContent = `by ${recipe.name}`;
}