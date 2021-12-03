// ROCK PAPER SCISSORS
let audio = new Audio("../assets/audio/swamp.ogg")
audio.addEventListener("loadeddata", () => {
    audio.play()
})
// let promise = audio.play()
// if (promise !== undefined) {
//     promise
//         .then((_) => {
//             // Autoplay started!
//         })
//         .catch((error) => {
//             // Autoplay was prevented.
//             console.log(error)
//             // Show a "Play" button so that user can start playback.
//         })
// }
// Get all the needed Elements
let mainBtns = document.querySelectorAll(".btnGroup > button")
let playerScore = document.querySelector(".score > p:nth-of-type(1)")
let aiScore = document.querySelector(".score > p:nth-of-type(2)")
let range = document.querySelector("#range")

// Give them all the events they need s
mainBtns.forEach((btn) => {
    btn.addEventListener("click", play)
})
// Inital Game Setup
let rounds = 3
let hands = ["Rock", "Paper", "Scissor"]
let bulletUrls = ["../assets/img/stone2.png", "../assets/img/paper.png", "../assets/img/scissors.png"]
let playerPoints = 0
let aiPoints = 0

function play(e) {
    if (rounds > 0) {
        let aiResult = skynet()
        let playerWin = false
        console.log(e.target.parentNode.value)
        let bothResults = e.target.parentNode.value + hands[aiResult]
        switch (bothResults) {
            case "RockPaper":
                aiPoints++
                break
            case "RockScissor":
                playerPoints++
                playerWin = true
                break
            case "PaperRock":
                playerPoints++
                playerWin = true
                break
            case "PaperScissor":
                aiPoints++
                break
            case "ScissorPaper":
                playerPoints++
                playerWin = true
                break
            case "ScissorRock":
                aiPoints++
                break
            default:
            //draw()
        }
        shoot(hands.indexOf(e.target.parentNode.value), aiResult, playerWin)
        playerScore.innerHTML = playerPoints
        aiScore.innerHTML = aiPoints
        rounds--
        checkForVictory()
    }
}

let skynet = () => {
    return Math.floor(Math.random() * 3)
}

let shoot = (playerChoice, aiChoice, didPlayerWin) => {
    let playerBullet = document.createElement("img")
    let aiBullet = document.createElement("img")
    let flying = null
    let playerPos = 0
    let height = (window.innerHeight / 100) * 30
    let aiPos = window.innerWidth
    playerBullet.src = bulletUrls[playerChoice]
    aiBullet.src = bulletUrls[aiChoice]
    playerBullet.classList.add("bullet")
    aiBullet.classList.add("bullet")
    playerBullet.style.left = playerPos + "px"
    playerBullet.style.top = height + "px"
    aiBullet.style.top = height + "px"
    aiBullet.style.left = aiPos + "px"
    playerBullet.style.transform = "rotate(90deg)"
    aiBullet.style.transform = "rotate(-90deg)"
    range.appendChild(playerBullet)
    range.appendChild(aiBullet)
    flying = setInterval(frame, 1)
    function frame() {
        if (playerPos >= window.innerWidth + 500) {
            clearInterval(flying)
        } else {
            playerPos += 2
            aiPos -= 2
            height += 0.6
            didPlayerWin ? (aiBullet.style.top = height + "px") : (playerBullet.style.top = height + "px")
            playerBullet.style.left = playerPos + "px"
            aiBullet.style.left = aiPos + "px"
        }
    }
}

let checkForVictory = () => {
    if (rounds === 0) {
        if (playerPoints > aiPoints) {
            let vicotyContainer = document.createElement("div")
            let img = document.createElement("img")
            img.src = "../assets/img/playerwins.png"
            img.style.position = "relative"
            img.style.left = "20%"
            img.style.zIndex = "2"
            range.appendChild(img)
        } else if (playerPoints === aiPoints) {
            rounds++
        }
    }
}
