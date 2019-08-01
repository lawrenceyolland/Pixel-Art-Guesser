const baseUrlGames = "http://localhost:3000//api/v1/games"
const baseUrlUsers = "http://localhost:3000//api/v1/users"

// const selectedBody = document.querySelector("body")

// Call createLeaderBoards()


const fetchScoreBoards = () => {
    return fetch(baseUrlGames)
    .then(resp => resp.json())
}

const sortDataRanking = () => {
    return fetchScoreBoards()
    .then(games => {
        const sorted_games = games.data.sort(function(a, b){
            return a.attributes.score - b.attributes.score
        })
        const users = games.included
        return [sorted_games.reverse().slice(0, 11), users]
    })
}

const createLeaderBoards = () => {
    sortDataRanking()
    .then(appendBodyWithLeaderBoards)
}


const appendBodyWithLeaderBoards = (ranking) => {
    const games = ranking[0]
    const players = ranking[1]
    selectedBody.innerHTML = ""
    const boardDiv = document.createElement("div")
    boardDiv.className = "leaderboard"

    const boardUl = document.createElement("ul")
    boardUl.className = "boardul"
    games.forEach(game => {
        players
        const player_id = game.relationships.user.data.id
        const player_name = players.find(user => user.id === player_id).attributes.name
        const boardLi = document.createElement("li")
        boardLi.dataset.game_id = game.id
        boardLi.innerText = `Player: ${player_name}, Score ${game.attributes.score}!`

        boardUl.appendChild(boardLi)
    })

    boardDiv.appendChild(boardUl)
    selectedBody.appendChild(boardDiv)

}