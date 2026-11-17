
/* =================================
   CAR DATA
================================= */

const cars = [
    {
        id: 1,
        name: "Porsche 911",
        category: "Sports",
        price: 120000,
        image: "images/porsche 911.jpg",
        description: "Experience the legendary Porsche 911. A perfect combination of luxury, speed, advanced technology and exceptional performance."
    },
    {
        id: 2,
        name: "BMW M4",
        category: "Sports",
        price: 85000,
        image: "images/BMW M4.jpg",
        description: "The BMW M4 delivers thrilling performance, aggressive styling and precision engineering for an unforgettable driving experience."
    },
    {
        id: 3,
        name: "Mercedes S-Class",
        category: "Luxury",
        price: 110000,
        image: "images/mercedes s-class.jpg",
        description: "Discover ultimate comfort and elegance with the Mercedes-Benz S-Class, featuring premium materials and advanced technology."
    },
    {
        id: 4,
        name: "Audi R8",
        category: "Sports",
        price: 145000,
        image: "images/Audi R8.jpg",
        description: "The Audi R8 combines breathtaking design, powerful performance and exceptional handling in one extraordinary sports car."
    },
    {
        id: 5,
        name: "Range Rover Sport",
        category: "SUV",
        price: 95000,
        image: "images/Range Rover Sport.jpg",
        description: "Enjoy the perfect balance of luxury, versatility and off-road capability with the Range Rover Sport."
    },
    {
        id: 6,
        name: "Lamborghini Huracan",
        category: "Sports",
        price: 250000,
        image: "images/Lamborghini Huracan.jpg",
        description: "Experience extraordinary Italian engineering, dramatic design and incredible performance with the Lamborghini Huracan."
    },
    {
        id: 7,
        name: "BMW X5",
        category: "SUV",
        price: 78000,
        image: "images/BMW X5.jpg",
        description: "The BMW X5 offers spacious luxury, powerful performance and advanced technology for every journey."
    },
    {
        id: 8,
        name: "Mercedes AMG GT",
        category: "Sports",
        price: 135000,
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900",
        description: "A stunning sports car combining AMG performance, premium craftsmanship and an unforgettable driving experience."
    },
    {
        id: 9,
        name: "Porsche Cayenne",
        category: "SUV",
        price: 125000,
        image: "images/porsche cayenne.jpg",
        description: "The Porsche Cayenne brings sports car performance into a luxurious and practical SUV."
    }
];


/* =================================
   DOM ELEMENTS
================================= */

const carsGrid = document.getElementById("carsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const noResults = document.getElementById("noResults");

const carModal = document.getElementById("carModal");
const closeModal = document.getElementById("closeModal");


/* =================================
   DISPLAY CARS
================================= */

function displayCars(carsList) {

    carsGrid.innerHTML = "";

    noResults.style.display =
        carsList.length === 0 ? "block" : "none";

    carsList.forEach(car => {

        const carCard = document.createElement("div");

        carCard.className = "car-card";

        carCard.innerHTML = `
            <div class="car-image">

                <img
                    src="${car.image}"
                    alt="${car.name}"
                    loading="lazy"
                >

                <span class="car-category">
                    ${car.category}
                </span>

            </div>

            <div class="car-info">

                <h3>${car.name}</h3>

                <p>Premium ${car.category} Vehicle</p>

                <div class="car-bottom">

                    <span class="car-price">
                        $${car.price.toLocaleString("en-US")}
                    </span>

                    <button
                        class="view-details"
                        data-id="${car.id}"
                    >
                        View Details →
                    </button>

                </div>

            </div>
        `;

        carsGrid.appendChild(carCard);

    });

}


/* =================================
   SEARCH AND FILTER
================================= */

function filterCars() {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    const filteredCars = cars.filter(car => {

        const matchesSearch =
            car.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            car.category === selectedCategory;

        const matchesPrice =
            selectedPrice === "all" ||
            car.price < Number(selectedPrice);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        );

    });

    displayCars(filteredCars);

}

searchInput.addEventListener("input", filterCars);

categoryFilter.addEventListener("change", filterCars);

priceFilter.addEventListener("change", filterCars);


/* =================================
   CAR DETAILS MODAL
================================= */

function openCarModal(carId) {

    const selectedCar = cars.find(
        car => car.id === Number(carId)
    );

    if (!selectedCar) return;

    document.getElementById("modalName").textContent =
        selectedCar.name;

    document.getElementById("modalPrice").textContent =
        "$" + selectedCar.price.toLocaleString("en-US");

    document.getElementById("modalDescription").textContent =
        selectedCar.description;

    const modalImage = document.getElementById("modalImage");

    modalImage.src = selectedCar.image;
    modalImage.alt = selectedCar.name;

    carModal.classList.add("active");

    document.body.style.overflow = "hidden";

}

carsGrid.addEventListener("click", (event) => {

    const detailsButton = event.target.closest(".view-details");

    if (!detailsButton) return;

    openCarModal(detailsButton.dataset.id);

});


function closeCarModal() {

    carModal.classList.remove("active");

    document.body.style.overflow = "";

}

closeModal.addEventListener("click", closeCarModal);

carModal.addEventListener("click", (event) => {

    if (event.target === carModal) {
        closeCarModal();
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeCarModal();
    }

});


/* =================================
   MOBILE NAVIGATION
================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.innerHTML = isOpen ? "✕" : "☰";

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.innerHTML = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

    });

});


/* =================================
   HEADER SCROLL EFFECT
================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =================================
   REVEAL ANIMATION
================================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});


function observeElements() {

    const elements = document.querySelectorAll(
        ".section-heading, .feature-card, .about-content, .contact-section"
    );

    elements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =================================
   INITIALIZATION
================================= */

displayCars(cars);

observeElements();

console.log("Luxe Motors Website Initialized Successfully!");
