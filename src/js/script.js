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
