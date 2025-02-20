class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.score = 0;
    }
}

let players = [
    new Player("Lebron","Lakers"),
    new Player("Curry","Warriors"),
    new Player("Jordan", "Bulls"),
    new Player("Shaq","Heat"),
    new Player("Kobe","Lakers")
];

function randomizer() {
    return Math.random() > 0.5;
}

function startRound(players, attempts = 5) {
    players.forEach(player => {
        player.score = 0;
        let ptShot =0;
        for (let i = 0; i < attempts; i++) {
            if (randomizer()) {
                ptShot++;
            }
        }
        player.score = ptShot;
    })
}

function rankingDisplay(players) {
    players.sort((a, b) => b.score - a.score);
    console.log("\n" + String.fromCodePoint(0x1F3C6) + " Rankings after this round:");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} (${player.team}) - ${player.score} points`);
    });
}

function tieBreaker(players){
    let tiedPlayers = players.filter(player => player.score === players[0].score);
    if (tiedPlayers.length === 1) {
        console.log("\n" + String.fromCodePoint(0x1F3C6) + ` The champion is ${tiedPlayers[0].name} (${tiedPlayers[0].team}) with ${tiedPlayers[0].score} points!`);
        return;
    }

    console.log("\n" + String.fromCodePoint(0x1F3B2) + ` Tiebreaker needed between: ${tiedPlayers.map(p => `${p.name} (${p.team})`).join(", ")}`);
    console.log("\n" + String.fromCodePoint(0x1F3C0) + " Round 2 Begins!");

    startRound(tiedPlayers, 3);
    tiedPlayers.forEach(player => console.log(`${player.name} (${player.team}) scored ${player.score} successful shots.`));

    rankingDisplay(tiedPlayers);
    tieBreaker(tiedPlayers);
}

console.log(String.fromCodePoint(0x1F3C0) + " Starting the game! \n");
startRound(players);
rankingDisplay(players);
tieBreaker(players);

