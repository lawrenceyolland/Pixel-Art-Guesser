// write js here

const baseUrl = "http://localhost:3000//api/v1/games"

const fetchData = () => {
    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            games: {
                user_id: 1,
                result: true,
                score: 90
            }
        })
    })
}