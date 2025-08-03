const games = {};

const players = {};

module.exports =function(io){
    io.on('connection',(socket)=>{
        console.log('New client coneccted');

        //event when a player tries to join a  game
        socket.on('joinGame',(data)=>{
            const { code,color,timeControl, username } = data;
            console.log('Player ${username} joining game ${code} as ${colo}');

            //if the game does not exist, create it with initial values
            if(!games[code]){
                games[code] = {
                    white: null,
                    black: null,
                    timeControl: timeControl,
                    whiteReady: false,
                    blackReady: false,
                    gameStarted: false,
                    WhiteTime: timeControl * 60,
                    BlackTime: timeControl * 60,
                    turn: 'white',
                    moves: []
                    
                }
            };
            //save the information about the player in the players object
            players[socket.io] = {
                username: username,
                gameCode: code,
                color: color
            };

            //players join the game room of socket.io with the game code
            socket.join(code);

            //we assign the player to the game color
            if(color === 'white'){
                games[code].white = socket.id;
            }else if (color === 'black'){
                games[code].black = socket.id;
            }

            //if both players are connected we notify everone in the game room
            if(games[code].white && game[code].black){
                console.log('Both players are connected in game ${code}');

                io.to(code).emit('playersConnected',{
                    white: players[games[code].white].username,
                    black: players[games[code].black].username
                });
            }
        })
    })
}