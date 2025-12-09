// ---------------------------
// NAVIGATION TOGGLE
// ---------------------------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
});

// Optional: close nav menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.add('hidden');
    }
});

// ---------------------------
// QUIZ LOGIC
// ---------------------------
const quizForm = document.getElementById('quizForm');

if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(quizForm);
        const answers = {};
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }

        // Scoring logic
        const score = {
            low: 0,
            arvr: 0,
            full: 0,
            ml: 0
        };

        for (let key in answers) {
            const val = answers[key];
            if (score[val] !== undefined) {
                score[val]++;
            }
        }

        // Determine the highest scoring specialisation
        let maxScore = 0;
        let specialisation = 'Undetermined';
        for (let key in score) {
            if (score[key] > maxScore) {
                maxScore = score[key];
                specialisation = key;
            }
        }

        // Save result in localStorage
        localStorage.setItem('specialisation', specialisation);

        // Redirect to results page
        window.location.href = 'result.html';
    });
}

// ---------------------------
// RESULT PAGE LOGIC
// ---------------------------
const specialisationName = document.getElementById('specialisationName');
const specialisationDescription = document.getElementById('specialisationDescription');
const nextSteps = document.getElementById('nextSteps');

if (specialisationName) {
    const result = localStorage.getItem('specialisation');

    const specialisations = {
        low: {
            name: 'Low-Level Systems',
            description: 'You enjoy working close to hardware and system-level programming.',
            steps: ['Learn C/C++', 'Explore Embedded Systems', 'Practice Microcontrollers']
        },
        arvr: {
            name: 'AR/VR Development',
            description: 'You are passionate about immersive digital worlds and interactive experiences.',
            steps: ['Learn Unity/Unreal', '3D Modeling Basics', 'Create AR/VR Prototypes']
        },
        full: {
            name: 'Full-Stack Web Development',
            description: 'You like designing and building websites and applications end-to-end.',
            steps: ['Learn HTML/CSS/JS', 'Master a Framework', 'Build Portfolio Projects']
        },
        ml: {
            name: 'Machine Learning & Data Science',
            description: 'You love solving problems using data and algorithms.',
            steps: ['Learn Python', 'Study ML Algorithms', 'Practice on Real Datasets']
        },
        Undetermined: {
            name: 'Undetermined',
            description: 'No clear specialisation match. Try the quiz again!',
            steps: ['Retake the quiz']
        }
    };

    const spec = specialisations[result] || specialisations['Undetermined'];

    specialisationName.textContent = spec.name;
    specialisationDescription.textContent = spec.description;

    nextSteps.innerHTML = '';
    spec.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        nextSteps.appendChild(li);
    });
}

// ---------------------------
// CONTACT FORM VALIDATION
// ---------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you! Your message has been sent.');
        contactForm.reset();
    });
}

function validateEmail(email) {
    // Simple email regex
    return /\S+@\S+\.\S+/.test(email);
}