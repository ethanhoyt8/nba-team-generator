// const baseURL = 'http://localhost:7654'
// console.log('It works')

let getPlayerBtn = document.querySelector("#getPlayers")
let playersView = document.querySelector('.playersView')
let playersDisplay = document.querySelector('#playersDisplay')
let teamsDisplay = document.querySelector('.teamsDisplay')
let getTeamsBtn = document.querySelector('#getTeams')
let selectedPlayerNames = document.querySelector('#newteamplayers')

let selectedPlayers = []

const addPlayers = () => {
    selectedPlayers.push(player)
    let playerName = document.createElement('p')
    playerName.textContent = player.name
    selectedPlayerNames.appendChild(playerName)
    
}

const buildPlayerCards = (players) => {
    if(!teamsDisplay.classList.contains('invisible')){
        teamsDisplay.classList.add('invisible')
    }
    if(playersView.classList.contains('invisible')){
        playersView.classList.remove('invisible')
    }
    playersDisplay.innerHTML = ""

    players.forEach(player => {
        let playerDiv = document.createElement('div')
        playerDiv.classList.add('player')
        playerDiv.innerHTML = `<img class="player-image" src=${player.imgURL} alt="image">
        <p class="player-name">${player.name}</p>
        <p class="player-stats">Offense: ${player.stats.offense}</p>
        <p class="player-stats">Defense: ${player.stats.defense}</p>
        <button onclick="addPlayers()">Add to team</button>`

        playersDisplay.appendChild(playerDiv)
    })
}

const buildTeamCards = (teams) => {
    console.log(teamsDisplay)
    if(!playersView.classList.contains('invisible')){
        playersView.classList.add('invisible')
    }
    if(teamsDisplay.classList.contains('invisible')){
        teamsDisplay.classList.remove('invisible')
    }
    teamsDisplay.innerHTML = ""

    teams.forEach(team => {
        console.log(team)
        
        let teamDiv = document.createElement('div')
        teamDiv.classList.add('team')
        teamDiv.innerHTML = `<h2 class="team-name">${team.name}</h2>`
        
        
        for(let i = 0; i < team.players.length; i++){
            let teamPlayerDiv = document.createElement('div')
            teamPlayerDiv.innerHTML = `
            <img class='playerIMG' src='${team.players[i].imgURL}'/>
            <p class="team-players">${team.players[i].name}</p>
            ` 
            teamDiv.appendChild(teamPlayerDiv)
        }
        teamsDisplay.appendChild(teamDiv)
    })



}

const getPlayer = () => {
    axios.get('http://localhost:7654/players')
      .then(res => {
        buildPlayerCards(res.data)
      })
  }

const getTeams = () => {
    axios.get('http://localhost:7654/teams')
    .then(res => {
        buildTeamCards(res.data)
    })
}
  

getPlayerBtn.addEventListener('click', getPlayer)
getTeamsBtn.addEventListener('click', getTeams)





