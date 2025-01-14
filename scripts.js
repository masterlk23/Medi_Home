// Show page by ID
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// Login functionality
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

   // Simulate a successful login (replace this with actual authentication logic)
   if (username === "username" && password === "password") {
       localStorage.setItem('loggedIn', 'true');
       showPage('main'); // Navigate to main page upon successful login
   } else {
       alert("Invalid username or password. Please try again.");
   }
}


// Open Settings - Placeholder function
function openSettings() {
    alert('Opening settings...');
}

// AI Symptom Checker Function
// Simulate AI Analysis for Image Upload
function simulateAnalysis() {
    const imageInput = document.getElementById('imageInput');
    const resultText = document.getElementById('result-text');
    const analysisResult = document.getElementById('analysis-result');

    if (imageInput.files.length === 0) {
        alert('Please upload an image first.');
        return;
    }

    // Simulate analysis based on the file name
    const fileName = imageInput.files[0].name.toLowerCase();

    let analysisMessage = "No significant issues detected.";
    if (fileName.includes('cancer')) {
        analysisMessage = "Potential signs of cancer detected. Please consult a healthcare professional.";
    } else if (fileName.includes('fracture')) {
        analysisMessage = "Potential bone fracture detected. Immediate medical attention is recommended.";
    } else if (fileName.includes('infection')) {
        analysisMessage = "Signs of infection detected. Consider consulting a doctor.";
    }

    resultText.textContent = analysisMessage;
    analysisResult.classList.remove('hidden');
}

// Symptom Checker Function
function checkSymptoms() {
    const symptomsInput = document.getElementById('symptoms').value.trim();

    if (!symptomsInput) {
        alert("Please enter your symptoms.");
        return;
    }

    // Simulated diagnosis based on input (for demonstration purposes)
    let diagnosis = "Based on your symptoms, you may have a common cold.";

    // Check for urgency (simple keyword check)
    if (symptomsInput.toLowerCase().includes("severe") || symptomsInput.toLowerCase().includes("chest pain")) {
        diagnosis = "Emergency detected! Please seek immediate medical attention.";
        document.getElementById('emergency').classList.remove('hidden');
        document.getElementById('result').classList.add('hidden');
        return;
    }

    document.getElementById('diagnosis').innerText = diagnosis;

    // Show results section
    document.getElementById('result').classList.remove('hidden');
}

// Show Recommendations Function
function showRecommendations() {
    const recommendations = [
        "Stay hydrated.",
        "Get plenty of rest.",
        "Consult a healthcare professional if symptoms persist."
    ];

    const recommendationList = document.getElementById('recommendation-list');

    // Clear previous recommendations
    recommendationList.innerHTML = '';

    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationList.appendChild(li);
    });

    // Show recommendations section
    document.getElementById('recommendations').classList.remove('hidden');
}

// Calendar logic
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function loadCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    monthYear.innerHTML = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentYear}`;

    calendarDays.innerHTML = ''; // Clear previous days

    // Add empty cells for the first day of the month
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        calendarDays.appendChild(emptyCell);
    }

    // Add days to the calendar
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.innerHTML = day;
        calendarDays.appendChild(dayCell);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
   loadCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
   currentMonth++;
   if (currentMonth > 11) {
       currentMonth = 0;
       currentYear++;
   }
   loadCalendar();
});

loadCalendar(); // Initialize the calendar when the page loads

// Profile functions
function editProfile() {
   // Show the edit form and hide the profile info
   document.getElementById('edit-form').classList.remove('hidden');
   // Hide the profile info
   document.querySelector('.profile-info').style.display = 'none';
}

function saveProfile() {
   // Get values from input fields
   const name = document.getElementById('name').value.trim();
   const bio = document.getElementById('bio-input').value.trim();

   // Update profile information
   if (name) {
       document.getElementById('username').innerText = name; // Update name
   }
   
   if (bio) {
       document.getElementById('bio').innerText = bio; // Update bio
   }

   // Hide the edit form and show the profile info again
   document.getElementById('edit-form').classList.add('hidden');
   // Show the profile info
   document.querySelector('.profile-info').style.display = 'block';
}

function cancelEdit() {
   // Hide the edit form and show the profile info again
   document.getElementById('edit-form').classList.add('hidden');
   // Show the profile info
   document.querySelector('.profile-info').style.display = 'block';
}

// Sample medicine database
const medicineDatabase = [
   "Paracetamol",
   "Ibuprofen",
   "Amoxicillin",
   "Aspirin",
   "Ciprofloxacin",
   "Metformin",
   "Losartan",
   "Atorvastatin",
   "Omeprazole",
   "Salbutamol"
];

// Function to search for medicines
function searchMedicine(query = '') {
   const input = query || document.getElementById('medicineInput').value.trim().toLowerCase();
   const medicineList = document.getElementById('medicineList');
   const searchResults = document.getElementById('searchResults');

   // Clear previous results
   medicineList.innerHTML = '';

   if (input === '') {
       alert('Please enter a medicine name.');
       return;
   }

   // Filter the medicine database
   const filteredMedicines = medicineDatabase.filter(med => med.toLowerCase().includes(input));

   if (filteredMedicines.length === 0) {
       medicineList.innerHTML = '<li>No matching medicines found.</li>';
   } else {
       filteredMedicines.forEach(medicine => {
           const li = document.createElement('li');
           li.textContent = medicine;
           medicineList.appendChild(li);
       });
   }

   // Show results section
   searchResults.classList.remove('hidden');
}
// Variable to store selected doctor
let selectedDoctor = null;

// Function to select a doctor
function selectDoctor(doctorCard) {
    // Remove 'selected' class from all doctor cards
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
        card.classList.remove('selected');
    });

    // Add 'selected' class to the clicked doctor card
    doctorCard.classList.add('selected');

    // Store the selected doctor's name or data
    selectedDoctor = doctorCard.getAttribute('data-doctor');
}

// Optional: CSS for selected state
const style = document.createElement('style');
style.innerHTML = `
    .doctor-card.selected {
        background-color: #e0f7fa; /* Light blue background for selected state */
        border: 2px solid #00796b; /* Darker border */
    }
`;
document.head.appendChild(style);
document.getElementById('confirm-button').addEventListener('click', () => {
    if (!selectedDoctor) {
        alert("Please select a doctor before confirming.");
    } else {
        alert(`Appointment confirmed with ${selectedDoctor}`);
        // Proceed with further logic, e.g., saving appointment details
    }
});