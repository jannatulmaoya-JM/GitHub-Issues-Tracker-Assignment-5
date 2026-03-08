
const container = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

let allIssues = [];


const setActiveButton = (activeBtn) => {

    // reset all buttons
    allBtn.classList.remove("bg-primary","text-white");
    openBtn.classList.remove("bg-primary","text-white");
    closedBtn.classList.remove("bg-primary","text-white");

    allBtn.classList.add("text-black");
    openBtn.classList.add("text-black");
    closedBtn.classList.add("text-black");

    // active button style
    activeBtn.classList.remove("text-black");

    activeBtn.classList.add(
        "bg-primary",
        "text-white"
    );

}
const loadIssues = async () => {

    try {

        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();

        allIssues = data.data;

        displayIssues(allIssues, "all");

    } catch (error) {

        console.error("Error loading issues:", error);

        container.innerHTML = "<p class='text-red-500'>Failed to load issues.</p>";
        issueCount.textContent = "0 Issues";

    }

}

const displayIssues = (issues, statusFilter = "all") => {

    container.innerHTML = "";

    let visibleCount = 0;

    issues.forEach(issue => {

        if (statusFilter !== "all" && issue.status.toLowerCase() !== statusFilter) return;

        visibleCount++;

        let borderColor = "border-t-4 ";

        if(issue.status.toLowerCase() === "open"){
            borderColor += "border-green-500";
        }

        else if(issue.status.toLowerCase() === "closed"){
            borderColor += "border-purple-500";
        }


        // Priority badge
        let badgeColor = "";

        const priority = issue.priority.toUpperCase();

        if(priority === "HIGH"){
            badgeColor = "bg-red-100 text-red-600";
        }

        else if(priority === "MEDIUM"){
            badgeColor = "bg-yellow-100 text-yellow-600";
        }

        else if(priority === "LOW"){
            badgeColor = "bg-gray-200 text-gray-700";
        }


        // Labels

        let labelsHTML = "";

        if(issue.labels && issue.labels.length > 0){

            issue.labels.forEach(label => {

                let labelColor = "bg-gray-200 text-gray-700";

                if(label.toLowerCase() === "bug"){
                    labelColor = "bg-red-100 text-red-600";
                }

                if(label.toLowerCase() === "help wanted"){
                    labelColor = "bg-yellow-100 text-yellow-700";
                }

                if(label.toLowerCase() === "enhancement"){
                    labelColor = "bg-green-100 text-green-700";
                }

                if(label.toLowerCase() === "documentation"){
                    labelColor = "bg-yellow-100 text-yellow-700";
                }

                labelsHTML += `
                <span class="text-xs px-2 py-1 rounded-full font-medium ${labelColor}">
                    ${label}
                </span>
                `;

            });

        }


        // Status icon

        let statusIcon = issue.status.toLowerCase() === "closed"
        ? "./assets/Closed- Status .png"
        : "./assets/Open-Status.png";


        const div = document.createElement("div");

        div.className = `bg-white rounded-lg shadow ${borderColor} p-5`;

        div.innerHTML = `

        <div class="flex justify-between items-center mb-3">

            <div class="flex items-center gap-2">
                <img src="${statusIcon}" class="w-4 h-4">
            </div>

            <span class="px-3 py-1 text-xs rounded-full font-semibold ${badgeColor}">
                ${issue.priority}
            </span>

        </div>


        <h2 class="font-semibold text-md mb-2">
            ${issue.title}
        </h2>


        <p class="text-gray-500 text-sm mb-3">
            ${issue.description.slice(0, 80)}...
        </p>


        <div class="flex gap-2 mb-4 flex-wrap">
            ${labelsHTML}
        </div>


        <div class="border-t pt-3 text-sm text-gray-500 flex justify-between">
            <span>#${issue.id} by ${issue.author}</span>
            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>

        `;

        container.appendChild(div);

    });
    issueCount.textContent = `${visibleCount} Issues`;

}
allBtn.addEventListener("click", () => {

    setActiveButton(allBtn);

    displayIssues(allIssues, "all");

});


openBtn.addEventListener("click", () => {

    setActiveButton(openBtn);

    displayIssues(allIssues, "open");

});


closedBtn.addEventListener("click", () => {

    setActiveButton(closedBtn);

    displayIssues(allIssues, "closed");

});




setActiveButton(allBtn);

loadIssues();