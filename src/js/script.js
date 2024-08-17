// Burger Menu start
let screenWidth = window.screen.width;
const body = document.querySelector("body");
const headerMenu = document.getElementById("header__menu");
const headerBurger = document.getElementById("header__burger");
const headerMenuItem = document.querySelectorAll(".header__menu-item");
const headerDropdownName = document.getElementById("header__dropdown-name");
const headerDropdownIcon = document.getElementById("header__dropdown-icon");
const headerDropdownList = document.getElementById("header__dropdown-list");
const headerDropdownLink = document.querySelectorAll(".header__dropdown-link");

// Burger menu button functionality
headerBurger.addEventListener("click", () => {
  headerBurger.classList.toggle("header__burger_active"); // burger menu button transformation
  headerMenu.classList.toggle("header__menu_active"); // burger menu show/hide
  body.classList.toggle("no-scroll"); // disable scrolling under burger menu
  if (!headerBurger.classList.contains("header__burger_active")) {
    headerDropdownIcon.classList.toggle("header__dropdown-icon_active"); // dropdown icon rotation
    headerDropdownList.classList.remove("header__dropdown-list_active"); // dropdown folding
  }
});

// List items functionality
if (screenWidth < 1024) {
  headerMenuItem.forEach((item) => {
    item.addEventListener("click", () => {
      headerBurger.classList.remove("header__burger_active"); // burger menu button transformation
      headerMenu.classList.remove("header__menu_active"); // burger menu hide when list item pressed
      body.classList.toggle("no-scroll"); // enable page scrolling
      headerDropdownIcon.classList.remove("header__dropdown-icon_active"); // dropdown icon rotation
      headerDropdownList.classList.remove("header__dropdown-list_active"); // dropdown folding if it is open
    });
  });
}

// Dropdown show/hide
headerDropdownName.addEventListener("click", () => {
  headerDropdownIcon.classList.toggle("header__dropdown-icon_active");
  headerDropdownList.classList.toggle("header__dropdown-list_active");
});

// Dropdown hide when dropdown item clicked
headerDropdownLink.forEach((item) => {
  item.addEventListener("click", () => {
    headerDropdownIcon.classList.remove("header__dropdown-icon_active");
    headerDropdownList.classList.remove("header__dropdown-list_active");
    headerBurger.classList.remove("header__burger_active");
    headerMenu.classList.remove("header__menu_active");
    body.classList.remove("no-scroll");
  });
});

// Dropdown hide on clicking outside the dropdown
document.addEventListener("click", (event) => {
  if (!headerDropdownList.contains(event.target) && !headerDropdownName.contains(event.target)) {
    if (headerDropdownList.classList.contains("header__dropdown-list_active")) {
      headerDropdownList.classList.remove("header__dropdown-list_active");
      headerDropdownIcon.classList.toggle("header__dropdown-icon_active");
    }
  }
});

// Mentors loading
let currentItems = 0;
let itemsPerLoad = 4;
let isLoading = false;

function loadMentors() {
  fetch("src/data/IT100.json")
    .then((response) => response.json())
    .then((data) => {
      const mentorsWrapper = document.getElementById("mentors__wrapper");
      const end = currentItems + itemsPerLoad;
      const slicedData = data.slice(currentItems, end);

      slicedData.forEach((mentor) => {
        const card = document.createElement("div");
        card.className = "mentors__mentor";
        card.innerHTML = `<div class="mentors__mentor-img" style="background: url(${mentor.image}); background-size: cover;">
              <div class="mentors__mentor-caption-block">
                <p class="mentors__mentor-caption">${mentor.name}</p>
              </div>
            </div>
            <ul class="mentors__mentor-txt" type = "disc">
              <li class="mentors__mentor-item mentors__mentor-position">${mentor.position}</li>
              <li class="mentors__mentor-item mentors__mentor-experience">${mentor.experience}</li>
            </ul>`;
        mentorsWrapper.appendChild(card);
      });
      currentItems = end;
      isLoading = false;
    });
}

function loadItems() {
  if (isLoading) return; // Prevent duplicate loads
  isLoading = true;

  // Simulate a delay for loading items
  if (currentItems < 4) {
    loadMentors();
  } else {
    setTimeout(() => {
      loadMentors();
    }, 500);
  }
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  let footerHeight = 0;
  footerHeight = 112;
  if (scrollTop + clientHeight >= scrollHeight - footerHeight && !isLoading) {
    loadItems();
  }
}

// Run the function to handle scroll for infinite loading
if (!isLoading) {
  document.addEventListener("DOMContentLoaded", function () {
    loadItems();
    window.addEventListener("scroll", handleScroll);
  });
}
