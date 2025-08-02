document.addEventListener('DOMContentLoaded', () => {

    const today = new Date();

    // Check if we are on the index.html page
    if (document.getElementById('dobInput')) {
        const submitBtn = document.getElementById('submitBtn');
        const dobInput = document.getElementById('dobInput');
        const errorMessage = document.getElementById('errorMessage');

        submitBtn.addEventListener('click', () => {
            const birthdayString = dobInput.value;

            if (!birthdayString) {
                errorMessage.textContent = 'Please select your birthday.';
                return;
            }

            // Correctly parse the date string to avoid timezone issues
            const dobParts = birthdayString.split('-');
            const dobMonth = parseInt(dobParts[1], 10) - 1; // Month is 0-indexed
            const dobDay = parseInt(dobParts[2], 10);

            // Compare month and day (ignoring the year)
            if (dobMonth === today.getMonth() && dobDay === today.getDate()) {
                window.location.href = 'birthday.html';
            } else {
                window.location.href = `comedate.html?birthday=${birthdayString}`;
            }
        });
    }

    // Check if we are on the birthday.html page
    if (document.getElementById('birthday-page')) {
        // Trigger confetti effect
        triggerConfetti();

        // Add event listener for the back button
        document.getElementById('backBtn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Set the next birthday date text on the birthday page
        const nextBirthdayText = document.getElementById('nextBirthdayText');
        const nextBirthday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const nextBirthdayString = nextBirthday.toLocaleDateString('en-US', options);
        nextBirthdayText.innerHTML = `Come back next year on ${nextBirthdayString}!`;
    }

    // Check if we are on the comedate.html page
    if (document.getElementById('comeback-page')) {
        // Get the birthday from the URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const birthdayString = urlParams.get('birthday');

        if (birthdayString) {
            const dobParts = birthdayString.split('-');
            const dobMonth = parseInt(dobParts[1], 10) - 1;
            const dobDay = parseInt(dobParts[2], 10);
            
            // Calculate next birthday date
            let nextBirthday = new Date(today.getFullYear(), dobMonth, dobDay);
            if (nextBirthday < today) {
                nextBirthday.setFullYear(today.getFullYear() + 1);
            }

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const nextBirthdayString = nextBirthday.toLocaleDateString('en-US', options);

            document.getElementById('nextBirthdayText').innerHTML = `Please come back on:<br>${nextBirthdayString}`;
        }

        // Add event listener for the back button
        document.getElementById('backBtn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Function to create and animate confetti
    function triggerConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        if (confettiContainer) {
            confettiContainer.innerHTML = '';
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.animationDuration = `${2 + Math.random() * 3}s`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                confettiContainer.appendChild(confetti);
            }
        }
    }

});