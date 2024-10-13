// Job data
const jobs = [
    { title: "Software Developer", company: "ABC Corp", location: "New York", description: "Develop software solutions for enterprise clients." },
    { title: "Data Analyst", company: "XYZ Inc.", location: "San Francisco", description: "Analyze datasets and provide insights for business decisions." },
    { title: "Frontend Developer", company: "Tech Solutions", location: "Remote", description: "Work on client-side development using React and modern frameworks." }
];

// Function to display jobs based on the selected location filter
function displayJobs(filterLocation) {
    const jobListingsElement = document.getElementById('job-listings');
    jobListingsElement.innerHTML = ''; // Clear previous job listings

    const filteredJobs = jobs.filter(job =>
        filterLocation === 'all' || job.location.toLowerCase() === filterLocation.toLowerCase()
    );

    if (filteredJobs.length === 0) {
        jobListingsElement.innerHTML = '<li>No jobs found for the selected location.</li>';
    } else {
        filteredJobs.forEach(job => {
            const jobElement = document.createElement('li');
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description}</p>
            `;
            jobListingsElement.appendChild(jobElement);
        });
    }
}

// Initial job display without filters
displayJobs('all');

// Event listener for location filter dropdown
const locationFilter = document.getElementById('filter-location');
locationFilter.addEventListener('change', function() {
    const selectedLocation = this.value;
    displayJobs(selectedLocation);
});

// Form handling
const form = document.getElementById('application-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form); // Get form data

    // Send form data to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Display success message
            successMessage.style.display = 'block';

            // Clear the form fields
            form.reset();

            // Optionally, hide the success message after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000); // 5 seconds
        } else {
            alert("There was a problem with your submission. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was a problem with your submission. Please try again.");
    });
});
