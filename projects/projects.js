async function fetchProjects() {
    const apiEndpoints = [
        'https://ssg-f83i.onrender.com/api/projects',
        'http://localhost:10000/api/projects'
    ];

    for (const api of apiEndpoints) {
        try {
            const response = await fetch(api);
            if (response.ok) {
                const projects = await response.json();
                console.log(`Fetched Projects from ${api}:`, projects); // Debugging
                populateProjectCards(projects);
                return; // Stop fetching if successful
            } else {
                console.warn(`API ${api} returned status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching from ${api}:`, error);
        }
    }
    console.error("All API endpoints failed");
}

function populateProjectCards(projects) {
    const rows = document.querySelectorAll(".row");
    if (!rows.length) {
        console.error("Error: No rows found on the page.");
        return;
    }
    
    // Clear existing static content
    rows.forEach(row => row.querySelector(".card-groups").innerHTML = "");
    
    const sortedProjects = {};
    
    // Sort projects into respective rows
    projects.forEach(project => {
        if (!sortedProjects[project.row]) {
            sortedProjects[project.row] = [];
        }
        sortedProjects[project.row].push(project);
    });
    
    rows.forEach(row => {
        const rowID = row.getAttribute("data-row");
        const projectList = sortedProjects[rowID] || [];
        
        const cardGroups = document.createElement("div");
        cardGroups.classList.add("card-groups");
        
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        
        projectList.forEach((project, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            
            const thumbnail = document.createElement("img");
            thumbnail.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
            thumbnail.alt = "Video Thumbnail";
            
            cardElement.appendChild(thumbnail);
            cardContainer.appendChild(cardElement);
            
            // Group cards in sets of 3
            if ((index + 1) % 3 === 0) {
                cardGroups.appendChild(cardContainer);
                cardContainer = document.createElement("div");
                cardContainer.classList.add("card-container");
            }
        });
        
        if (cardContainer.childElementCount > 0) {
            cardGroups.appendChild(cardContainer);
        }
        
        row.querySelector(".card-groups").appendChild(cardGroups);
    });
}

// Fetch projects when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects);
