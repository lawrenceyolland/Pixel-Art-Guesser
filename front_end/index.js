// write js here

const baseUrlGames = "http://localhost:3000//api/v1/games"
const baseUrlUsers = "http://localhost:3000//api/v1/users"
const baseUrlArts = "http://localhost:3000//api/v1/arts"

const fetchPost = () => {
    fetch(baseUrlGames, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game: {
                user_id: 2,
                result: false,
                score: 110
            }
        })
    })
}

const fetchData = () => {
    return fetch(baseUrlGames)
    .then(resp => resp.json())
    .then(data => {debugger})
}

const fetchUserPost = () => {
    fetch(baseUrlUsers, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: "TestSubject01"
            }
        })
    })
}

const fetchArtPost = () => {
    fetch(baseUrlArts, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            art: {
                title: "Art03",
                img_url: "blank"
            }
        })
    })
}