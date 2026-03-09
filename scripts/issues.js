
const searchInput = document.getElementById("searchInput");
const newIssueBtn = document.getElementById("newIssueBtn");


const container = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

let allIssues = [];

function openModal(title, description, Status, Priority, Labels, Author, Date  ){

    const modal = document.getElementById("modal");

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalStatus").textContent = Status;
    document.getElementById("modalPriority").textContent = Priority;
    document.getElementById("modalLabels").textContent =  Labels;
    document.getElementById("modalAuthor").textContent = Author;
    document.getElementById("modalDate").textContent = Date;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

}

function closeModal(){

    const modal = document.getElementById("modal");

    modal.classList.add("hidden");
    modal.classList.remove("flex");

}

const setActiveButton = (activeBtn) => {

    allBtn.classList.remove("bg-primary","text-white");
    openBtn.classList.remove("bg-primary","text-white");
    closedBtn.classList.remove("bg-primary","text-white");

    allBtn.classList.add("text-black");
    openBtn.classList.add("text-black");
    closedBtn.classList.add("text-black");

    activeBtn.classList.remove("text-black");

    activeBtn.classList.add("bg-primary","text-white");

}

const loadIssues = async () => {

    try {

        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

        const data = await res.json();

        allIssues = data.data;

        displayIssues(allIssues,"all");

    }

    catch(error){

        console.error("Error loading issues:", error);

        container.innerHTML = "<p class='text-red-500'>Failed to load issues.</p>";

        issueCount.textContent = "0 Issues";

    }

}
const displayIssues = (issues, statusFilter="all") => {

    container.innerHTML="";

    let visibleCount = 0;

    issues.forEach(issue => {

        if(statusFilter !== "all" && issue.status.toLowerCase() !== statusFilter) 
            return;

        visibleCount++;

        let borderColor="border-t-4 ";

        if(issue.status.toLowerCase()==="open"){
            borderColor+="border-green-600";
        }

        else if(issue.status.toLowerCase()==="closed"){
            borderColor+="border-purple-500";
        }


        let badgeColor="";

        const priority = issue.priority.toUpperCase();

        if(priority==="HIGH"){
            badgeColor="bg-red-100 text-red-600";
        }

        else if(priority==="MEDIUM"){
            badgeColor="bg-yellow-300 text-yellow-900";
        }

        else if(priority==="LOW"){
            badgeColor="bg-gray-200 text-gray-700";
        }


        let labelsHTML="";

        if(issue.labels && issue.labels.length>0){

            issue.labels.forEach(label=>{

                let labelColor="bg-gray-200 text-gray-700";

                if(label.toLowerCase()==="bug"){
                    labelColor="bg-red-200 text-red-600";
                }

                if(label.toLowerCase()==="help wanted"){
                    labelColor="bg-yellow-300 text-yellow-700";
                }

                if(label.toLowerCase()==="enhancement"){
                    labelColor="bg-green-200 text-green-700";
                }

                if(label.toLowerCase()==="documentation"){
                    labelColor="bg-yellow-300 text-yellow-900";
                }

                labelsHTML+=`
                <span class="text-xs px-2 py-1 rounded-full font-medium ${labelColor}">
                    ${label}
                </span>
                `;

            })

        }


        let statusIcon = issue.status.toLowerCase()==="closed"
        ? "./assets/Closed- Status .png"
        : "./assets/Open-Status.png";


        const div=document.createElement("div");

        div.className=`bg-white rounded-lg shadow ${borderColor} p-5 cursor-pointer`;


        div.innerHTML=`

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
            ${issue.description.slice(0,80)}...
        </p>

        <div class="flex gap-2 mb-4 flex-wrap">
            ${labelsHTML}
        </div>

        <div class="border-t pt-3 text-sm text-gray-500 flex justify-between">
            <span>#${issue.id} by ${issue.author}</span>
            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>

        `;

        div.addEventListener("click",()=>{

           openModal(
                 issue.title,
                 issue.description,
                 issue.status,
                 issue.priority,
                 issue.labels,
                 issue.author,
                 issue.createdAt
                );

        })


        container.appendChild(div);

    });

    issueCount.textContent=`${visibleCount} Issues`;

}
//  function search
function searchAndOpenIssue(keyword) {
    const issue = allIssues.find(issue =>
        issue.title.toLowerCase().includes(keyword.toLowerCase())
    );

    if(issue){
        openModal(
            issue.title,
            issue.description,
            issue.status,
            issue.priority,
            issue.labels,
            issue.author,
            issue.createdAt
        );
    } else {
        alert("");
    }
}

allBtn.addEventListener("click",()=>{
    setActiveButton(allBtn);

    // Loading dekhao
    container.innerHTML = `<div class="col-span-full text-center text-gray-500 text-lg py-20">Loading...</div>`;

    // 5 sec por issues display
    setTimeout(()=>{
        displayIssues(allIssues,"all");
    }, 1000);
})

openBtn.addEventListener("click",()=>{
    setActiveButton(openBtn);

    container.innerHTML = `<div class="col-span-full text-center text-gray-500 text-lg py-20">Loading...</div>`;

    setTimeout(()=>{
        displayIssues(allIssues,"open");
    }, 1000);
})

closedBtn.addEventListener("click",()=>{
    setActiveButton(closedBtn);

    container.innerHTML = `<div class="col-span-full text-center text-gray-500 text-lg py-20">Loading...</div>`;

    setTimeout(()=>{
        displayIssues(allIssues,"closed");
    }, 1000);
})

setActiveButton(allBtn);

loadIssues();


newIssueBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    if(keyword === "") {
     
        displayIssues(allIssues, "all");
    } else {
    
        const filteredIssues = allIssues.filter(issue =>
            issue.title.toLowerCase().includes(keyword)
        );
        displayIssues(filteredIssues, "all");
    }
});