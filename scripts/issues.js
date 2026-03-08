const container = document.getElementById("issuesContainer")

const loadIssues = async () => {

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

displayIssues(data.data)

}

const displayIssues = (issues) => {

container.innerHTML = ""

issues.forEach(issue => {

const div = document.createElement("div")

div.classList = "card bg-base-100 shadow"

div.innerHTML = `

<div class="card-body">

<h2 class="card-title">${issue.title}</h2>

<p>${issue.description}</p>

<div class="badge badge-primary">${issue.status}</div>

</div>

`

container.appendChild(div)

})

}

loadIssues()



document.getElementById("logoutBtn").addEventListener("click",()=>{

localStorage.removeItem("isLoggedIn")

window.location.href="index.html"

})

document.getElementById("searchInput").addEventListener("input",(e)=>{

const value = e.target.value.toLowerCase()

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res=>res.json())
.then(data=>{

const filtered = data.data.filter(issue =>
issue.title.toLowerCase().includes(value)
)

displayIssues(filtered)

})

})