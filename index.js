//declare the variable of the drop down menu
const selectGenre = document.getElementById("genre-select");
const generatePlaylist = document.getElementById("generate-playlist");
const displayMovieList = document.getElementById("myList");
const attendeesInput = document.getElementById("attendees");

// Define  movie suggestion list by genre and store in an object
const movieSuggestions = {
  action: [
    "Top Gun Maverick",
    "The Lost City ",
    "Mission Impossible",
    "Bullet Train"
  ],
  comedy: [
    "The Man From Toronto",
    "Asteroid City",
    "Date Night",
    "Vacation Friends 2"
  ],
  fantasy: [
    "Free Guy",
    "Spider-Man: No Way Home",
    "Guardians of the Galaxy 3",
    "The Little Mermaid "
  ],
  horror: ["The Pope's Exorcist", "Evil Dead Rise", "Scream VI", "The Strays"]
};

//Set variables that is needed globally
let movieList = "";
let movieCostTotal = "";
let discount = 0;
let attendees = attendeesInput.value;
let mealDealCheckout = "";
let generateDiscount = "";
let movieCheckout = "";
let checkout = "";
let mealDealTotal = 0;
let movie = "";
let updateMovieCost = "";

//create event listener for creating movie playlist
generatePlaylist.addEventListener("click", function () {
  const genreChoice = selectGenre.value;
  // To ensure that appropriate input field is done
  if (!attendees || !genreChoice) {
    alert("please enter no of attendees and select a genre to continue");
  } else {
    //clear previous movie list
    displayMovieList.textContent = "";

    //create and display movie list
    movieList = movieSuggestions[genreChoice];
    if (movieList) {
      movieList.forEach(myMovieList);
      // create  myMovieList function
      function myMovieList(movie) {
        const createMovieList = document.createElement("button");
        createMovieList.textContent = `${movie}`;
        displayMovieList.appendChild(createMovieList);

        // display the choice of movie in the checkout section
        createMovieList.addEventListener("click", function () {
          movieCheckout = document.getElementById("selected-movie");
          movieCostTotal = 10 * attendees;
          console.log(Number(movieCostTotal));
          movieCheckout.textContent = `You have selected ${movie} (£10) x ${attendees} = £${movieCostTotal}`;

          // update total by calling the updateTotalCost Function
          updateTotalCost();
        });
      }
    }
  }
});

//create a function that calculate the sum of the customer's order
function updateTotalCost() {
  const totalCost = ((movieCostTotal + mealDealTotal) * (100 - discount)) / 100;
  console.log(totalCost);
  const displayTotalCost = document.getElementById("total");
  displayTotalCost.textContent = `£ ${totalCost}`;
}

// create variables for meal Deal
const mealDeal = document.getElementById("meal-deal");
mealDealCheckout = document.getElementById("meal-deal-checkout");
mealDealTotal = 0;
let isMealDealClicked = false; // update order if meal deal is ticked or unticked
function updateMealDealCost() {
  if (isMealDealClicked && attendees && movieList) {
    // Calculate and display the total meal deal cost
    mealDealTotal = Number(5 * attendees);
    console.log(mealDealTotal);
    mealDealCheckout.textContent = `(Meal Deal £5) x ${attendeesInput.value} =  £${mealDealTotal}`;
  } else {
    // if meal deal is unticked
    mealDealTotal = 0;
    mealDealCheckout.textContent = 0;
  }
}
mealDeal.addEventListener("click", function () {
  isMealDealClicked = !isMealDealClicked;
  updateMealDealCost();
  updateTotalCost();
});

// to update meal dealcost and totalcost when no of attendees is updated
attendeesInput.addEventListener("input", function () {
  attendees = attendeesInput.value;
  movieCostTotal = 10 * Number(attendees);

  // Update the movie checkout cost
  movieCheckout.textContent = `${movie} - (£10) x ${attendees} = £${movieCostTotal}`;

  // Call the updateMealDealCost function and total cost function
  updateMealDealCost();
  updateTotalCost();
});

//  generate random discount between 0-9%.
let isDiscountGenerated = false; //check if disount is already generated
discountBtn = document.getElementById("get-discount");
discountBtn.addEventListener("click", function () {
  // use Math.random function to create the discount
  if (!isDiscountGenerated) {
    // check if the discount has not been generated yet
    generateDiscount = document.getElementById("discount");
    discount = Math.floor(Math.random() * 10);
    if (discount === 0) {
      generateDiscount.textContent = `No discount available at this time`;
    } else {
      generateDiscount.textContent = ` ${discount}% off `;
    }
    updateTotalCost();
    // set the boolen to true after generating discount to prevent genreating another discount.
    isDiscountGenerated = true;

    //start the checkout process
    checkout = document.getElementById("checkout-btn");
    const orderSection = document.getElementById("main");
    let isCheckoutDone = false; // need this boolean to know when checkout is done

    //create event listener that once checkout button is clicked, it will show order details and purchase confirmation
    checkout.addEventListener("click", function () {
      orderSection.style.display = "none";

      const orderDetails = document.getElementById("order-details");
      orderDetails.textContent = "Woop! Here are your order details 🍿♥️";
      // remove checkout button
      checkout.style.display = "none";
      // remove tabs not needed on checkout page
      const allElements = document.getElementsByClassName("section");
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.display = "none";
      }
      alert("Thanks for your order 👏🏽");

      // create refresh button to clear and refresh page
      if (!isCheckoutDone) {
        const refreshPage = document.getElementById("refresh");
        // Check the "Refresh page" button doesn't exist before creating it
        if (!document.getElementById("refresh-btn")) {
          const refreshBtn = document.createElement("button");
          refreshBtn.id = "refresh-btn";
          let refreshBtnText = document.createTextNode("Refresh page");
          refreshBtn.appendChild(refreshBtnText);
          refreshPage.appendChild(refreshBtn);

          // event listener to reload the page when refresh button is clicked.
          refreshBtn.addEventListener("click", function () {
            window.history.go(0);
          });
        }
      }
    });
  }
});

//styling from JS
document.body.style.textAlign = "center";
document.body.style.fontFamily = "Arial";
document.getElementById("header").fontSize = "large";
document.getElementById("checkout-btn").style.backgroundColor = "black";
