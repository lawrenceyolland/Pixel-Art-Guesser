const baseUrlArts = "http://localhost:3000//api/v1/arts"
const per_page = (n) => `/?per_page=9&page=${n}`
const headTitle = document.querySelector("#head-title")
headTitle.dataset.history_page = 1
let historyPage = parseInt(headTitle.dataset.history_page)

// --- Call showHistoryGames

const fetchArtData = (n = 1) => {
    return fetch(baseUrlArts + per_page(n))
    .then(resp=> resp.json())
}

const showHistoryGames = (page = 1) => {
    fetchArtData(page)
    .then(arts => {
        appendHistoryPage(arts)
    })
}

const nextHistoryPage = (event) => {
    
    const art_number = document.querySelector(".history_main_div").dataset.art_number
    if (!(art_number < 9)) {
        historyPage += 1
        showHistoryGames(historyPage)
    } else { alert("No more Arts") }
    
}
const previousHistoryPage = (event) => {
    const art_number = document.querySelector(".history_main_div").dataset.art_number
    if (historyPage > 1) {
        debugger
        historyPage -= 1
        showHistoryGames(historyPage)
    } else { alert("This is first page!") }
    
}

const appendHistoryPage = (arts) => {
    selectedBody.innerHTML = ""
    const historyDiv = document.createElement("div")
    historyDiv.className = "history_main_div"
    historyDiv.dataset.art_number = arts.data.length
    const previousButton = document.createElement("button")
    previousButton.innerText = "Previous"
    previousButton.className = "history-button"
    previousButton.addEventListener("click", (event) => previousHistoryPage(event))

    const nextButton = document.createElement("button")
    nextButton.addEventListener("click", (event) => nextHistoryPage(event))
    nextButton.innerText = "Next"
    nextButton.className = "history-button"

    const pageArts = document.createElement("p")
    pageArts.innerText = `This Page Arts: ${arts.data.length}`

    historyDiv.append(previousButton, nextButton, pageArts)

    selectedBody.appendChild(historyDiv)

    arts.data.forEach(art => {
        const eachArtDivElem = document.createElement("div")
        eachArtDivElem.className = "art_div"
        eachArtDivElem.dataset.id = art.id
        const eachArtImg = document.createElement("img")
        eachArtImg.src = art.attributes.img_url
        eachArtImg.className = "img"
        const eachPArtElem = document.createElement("p")
        eachPArtElem.innerText = art.attributes.title
        eachArtDivElem.append(eachArtImg, eachPArtElem)

        historyDiv.appendChild(eachArtDivElem)
    })
}