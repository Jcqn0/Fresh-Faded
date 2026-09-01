/* ============ Data ============ */
const SERVICES = [
    { name: "Haircut & Beard",        duration: "1h",    price: "$40" },
    { name: "Men's Regular Haircut",  duration: "30min", price: "$30 – $35" },
    { name: "Fade",                   duration: "45min", price: "$35" },
    { name: "Taper Fade / Blowout",   duration: "30min", price: "$30" },
    { name: "Kid's Regular Haircut",  duration: "30min", price: "$25 – $30" },
    { name: "Kid's Fade",             duration: "45min", price: "$30" },
    { name: "Baldy",                  duration: "15min", price: "$20" },
    { name: "Senior Haircut (62+)",   duration: "30min", price: "$25" },
    { name: "Eyebrows",               duration: "15min", price: "$10" },
    { name: "Tape/Line Up & Beard",   duration: "30min", price: "$25" },
    { name: "Beard Trimming",         duration: "30min", price: "$20" },
    { name: "Tape / Line Up",         duration: "15min", price: "$15" },
    { name: "House Calls",            duration: "3h",    price: "$150" },
    { name: "Ear & Nose Trim",        duration: "15min", price: "$5" },
    { name: "Hot Towel",              duration: "30min", price: "$20" },
    { name: "Bigen Beard Coloring",   duration: "30min", price: "$20" },
    { name: "Bigen Hair Coloring",    duration: "15min", price: "$20" },
    { name: "Design",                 duration: "30min", price: "$10" },
    { name: "Black Mask Facial",      duration: "15min", price: "$10" },
];

const BARBERS = [
    { name: "Max D.",    initials: "MD", color: "#8e2f22", rating: null },
    { name: "El Yabo",   initials: "EY", color: "#24466e", rating: null },
    { name: "Manny T.",  initials: "MT", color: "#a07c3f", rating: "5.0 ★ (1)" },
    { name: "Charlie",   initials: "CH", color: "#3d5a45", rating: null },
    { name: "Javier",    initials: "JA", color: "#6f2318", rating: null },
    { name: "Enderson",  initials: "EN", color: "#4a3b5c", rating: null },
];

const TIME_SLOTS = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

/* ============ Render: Barbers ============ */
function renderBarbers() {
    const grid = document.getElementById("barbers-grid");
    grid.innerHTML = "";

    BARBERS.forEach((barber, index) => {
        const card = document.createElement("div");
        card.className = "barber-card";

        const rating = barber.rating
            ? `<p class="barber-rating">${barber.rating}</p>`
            : "";

        card.innerHTML = `
            <div class="barber-avatar" style="background:${barber.color}">${barber.initials}</div>
            <h3 class="barber-name">${barber.name}</h3>
            ${rating}
            <p class="barber-availability">Available Tomorrow</p>
            <button class="barber-book-btn">Book ${barber.name}</button>
        `;

        card.querySelector(".barber-book-btn").addEventListener("click", () => {
            openBooking(index);
        });

        grid.appendChild(card);
    });
}

/* ============ Render: Services price list ============ */
function renderServices() {
    const grid = document.getElementById("services-grid");
    grid.innerHTML = "";

    SERVICES.forEach((svc) => {
        const tile = document.createElement("div");
        tile.className = "service-tile";
        tile.innerHTML = `
            <span class="svc-name">${svc.name}</span>
            <span class="svc-duration">${svc.duration}</span>
            <span class="svc-price">${svc.price}</span>
        `;
        grid.appendChild(tile);
    });
}

/* ============ Booking Modal ============ */
const booking = {
    barber: null,
    service: null,
    day: "Tomorrow",
    time: null,
};

const modal = () => document.getElementById("booking-modal");

function showStep(n) {
    document.querySelectorAll(".booking-step").forEach((step) => {
        step.classList.toggle("hidden", step.dataset.step !== String(n));
    });
}

function openBooking(barberIndex) {
    booking.barber = BARBERS[barberIndex];
    booking.service = null;
    booking.day = "Tomorrow";
    booking.time = null;

    document.getElementById("modal-barber-name").textContent = booking.barber.name;
    document.getElementById("modal-barber-name-2").textContent = booking.barber.name;

    renderModalServices();
    renderTimeSlots();
    showStep(1);

    modal().classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeBooking() {
    modal().classList.remove("open");
    document.body.style.overflow = "";
}

// ---------- Contact Us Modal ----------
function contactModal() {
    return document.getElementById("contact-modal");
}

function openContact() {
    contactModal().classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeContact() {
    contactModal().classList.remove("open");
    document.body.style.overflow = "";
}

// Attach Contact Us and Booking modal button handlers after DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Contact Us button
    const contactBtn = document.getElementById("contact-us-btn");
    if (contactBtn) {
        contactBtn.addEventListener("click", openContact);
    }
    // Close button inside contact modal
    const contactClose = contactModal().querySelector(".close-button");
    if (contactClose) {
        contactClose.addEventListener("click", closeContact);
    }
    // Close button inside booking modal
    const bookingClose = modal().querySelector(".close-button");
    if (bookingClose) {
        bookingClose.addEventListener("click", closeBooking);
    }
    // Click outside modal content to close contact modal
    contactModal().addEventListener("click", (e) => {
        if (e.target === contactModal()) closeContact();
    });
    // Click outside booking modal content to close booking modal
    modal().addEventListener("click", (e) => {
        if (e.target === modal()) closeBooking();
    });
});

function renderModalServices() {
    const list = document.getElementById("modal-services");
    list.innerHTML = "";

    SERVICES.forEach((svc, i) => {
        const btn = document.createElement("button");
        btn.className = "svc-option";
        btn.innerHTML = `
            <span>
                <span class="svc-name">${svc.name}</span><br>
                <span class="svc-meta">${svc.duration}</span>
            </span>
            <span class="svc-price">${svc.price}</span>
        `;
        btn.addEventListener("click", () => selectService(i));
        list.appendChild(btn);
    });
}

function selectService(index) {
    booking.service = SERVICES[index];

    document.getElementById("chosen-service").innerHTML = `
        <span class="svc-name">${booking.service.name} <span class="svc-meta">· ${booking.service.duration}</span></span>
        <span class="svc-price">${booking.service.price}</span>
    `;

    showStep(2);
}

function renderTimeSlots() {
    const wrap = document.getElementById("time-slots");
    wrap.innerHTML = "";

    TIME_SLOTS.forEach((slot) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "time-slot";
        btn.textContent = slot;
        btn.addEventListener("click", () => {
            booking.time = slot;
            wrap.querySelectorAll(".time-slot").forEach((el) => el.classList.remove("selected"));
            btn.classList.add("selected");
        });
        wrap.appendChild(btn);
    });
}

function confirmBooking() {
    const name = document.getElementById("client-name").value.trim();
    const phone = document.getElementById("client-phone").value.trim();

    if (!booking.time) {
        alert("Pick a time slot first.");
        return;
    }
    if (!name) {
        alert("Add your name so the barber knows who's coming.");
        return;
    }

    booking.day = document.getElementById("booking-day").value;

    document.getElementById("confirm-details").innerHTML =
        `${name} — ${booking.service.name} (${booking.service.price})<br>` +
        `with ${booking.barber.name}<br>` +
        `${booking.day} at ${booking.time}` +
        (phone ? `<br>We'll text ${phone} if anything changes.` : "");

    showStep(3);
}

/* ============ Init ============ */
document.addEventListener("DOMContentLoaded", () => {
    renderBarbers();
    renderServices();

    // Modal close controls
    document.querySelector(".close-button").addEventListener("click", closeBooking);
    modal().addEventListener("click", (e) => {
        if (e.target === modal()) closeBooking();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal().classList.contains("open")) closeBooking();
    });

    // Step navigation
    document.getElementById("back-to-services").addEventListener("click", () => showStep(1));
    document.getElementById("confirm-booking").addEventListener("click", confirmBooking);
    document.getElementById("done-booking").addEventListener("click", closeBooking);

    // CTA buttons scroll to barbers
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
});
