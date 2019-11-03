const socketServer = (server) => {
    let io = require('socket.io')(server);
    // User data: Map([[userID, userProfileObject]...]
    // userProfileObject: username, avatarURL, inGame
    let onlineUsers = new Map()
    
    //Inivitation: Map([[userID, toPlayerID]])
    let pendings = new Map()
    
    //room : Map([[roomID, {roomObject}]])
    // roomObject:
    // {
    //   player1 | player 2: userid, username, avatarURL;
    //   gameState,
    //   messageObj{isFromPlayer1: false, msg: string }
    // }
    // 
    let rooms = new Map()
    
    //
    let userRooms = new Map()

    io.of('/socket').on('connect', socket => {
        console.log('client', socket)
        
    })
}

module.exports = socketServer
