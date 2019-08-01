const baseUrlUsers = "http://localhost:3000//api/v1/users"

//---- appendNewGameForm()

const fetchPostNewUser = (name_value) => {
    return fetch(baseUrlUsers, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: name_value
            }
        })
    })
}
const appendNewGameForm = () => {
    selectedBody.innerHTML = ""

    const newSectionUser = document.createElement("section")
    newSectionUser.id = "section-new-user"
    const newTextP = document.createElement("p")
    newTextP.innerText = "Hello Player! What is your name?"
    
    const newUserForm = document.createElement("form")
    newUserForm.id = "new-user-form"

    const newInput = document.createElement("input")
    newInput.type = "text"
    newInput.id = "user_name"
    const newButton = document.createElement("button")
    newButton.type = "submit"
    newButton.className = "user-button"
    newButton.innerText = "New Player!"
    newUserForm.addEventListener("submit", (event) => addingUser(event))
    newUserForm.append(newInput, newButton)

    newSectionUser.append(newTextP, newUserForm)

    selectedBody.appendChild(newSectionUser)
}

const addingUser = (event) => {
    event.preventDefault()
    const name = event.target.user_name.value
    if (name == "") {
        alert("Put Name in!")
    } else {
        fetchPostNewUser(name)
        .then(startGuessGame)
    }
}

const fetchGetUsers = () => {
    return fetch(baseUrlUsers)
    .then(resp => resp.json())
}

const startGuessGame = () =>  {
    fetchGetUsers()
    .then(users => {
        const all_users = users.data
        return users.data[all_users.length -1]
    })
    .then(assignArtToGuess)
}

//--- goes to guess_game
let globalScore = 0

fetchAllArts = () => {
    return fetch(baseUrlArts)
    .then(resp => resp.json())
}

const assignArtToGuess = (user) => {
    selectedBody.innerHTML = ""
    fetchAllArts()
    .then(arts => appendRandomArt(arts, user))
}

const appendRandomArt = (arts, user) => {

    const random_number = Math.floor(Math.random(arts.data.length)*10)
    const picked_art = arts.data[random_number]
    const artDiv = document.createElement("div")
    artDiv.id = "div-art-guess"
    artDiv.dataset.user_id = user.id
    artDiv.dataset.img_id = picked_art.id
    const artImg = document.createElement("img")
    artImg.src = picked_art.attributes.img_url
    
    const guessForm = document.createElement("form")
    guessForm.id = "guess-form"
    const guessFormLabel = document.createElement("label")
    const guessFormInput = document.createElement("input")
    guessFormInput.id = "guess_input"
    guessFormLabel.for = "guess_input"
    guessFormInput.type = "text"
    const guessFormButton = document.createElement("button")
    guessFormButton.innerText = "Guess!"
    guessFormButton.className = "guess-button"
    const title = picked_art.attributes.title
    guessForm.addEventListener("submit", (event) => checkAnswer(event, title, user))

    guessForm.append(guessFormLabel,guessFormInput, guessFormButton)


    artDiv.append(artImg, guessForm) 

    selectedBody.append(artDiv)
}
const checkAnswer = (event, title, user) => {
    event
    title
    user

    event.preventDefault()
    const answer = event.target.guess_input.value
    const title_downcase = title.toLowerCase().trim()
    const answer_downcase = answer.toLowerCase().trim()
    if (title_downcase.valueOf() === answer_downcase.valueOf()) {
        globalScore += 100
        assignArtToGuess(user)
    } else {
        fetchPostGame(globalScore, user)
        .then(endGame)
    }
}

const fetchPostGame = (gscore, user) => {
    return fetch(baseUrlGames, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            game: {
                user_id: user.id,
                score: gscore
            }
        })
    })
}

const endGame = () => {
    selectedBody.innerHTML = ""
    const endMessage = document.createElement("p")
    endMessage.innerText = `Game Over: ${globalScore}`

    selectedBody.appendChild(endMessage)
}