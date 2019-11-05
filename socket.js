const socketServer = (server) => {
    let io = require('socket.io')(server);
    
    //Global var
    let currentRoomCount = 0;
    let Rooms = new Map()
    let 
    
    const initialGameState = {
        history: [{squares: Array(400).fill(null), historyPos: -1}],
					    xIsNext: true,
					    isDone: false,
					    stepNumber: 0,
					    isStepListDesc: true,
					    winLine: Array(5).fill(null)
    }
    /*arg users
    [{
            id: users[0].account_id,
            username: users[0].account_username,
            avatarURL: users[0].account_avatar
          }, 
          ...]
    */
    /*
          MsgObj{
              from: uid,
              msg: string
          }
    */
    const initialRoom = (users) =>{
        currentRoomCount++;
        return [currentRoomCount,{
            players: users,
            firstPlayer: -1,
            initialGameState,
            chat:[]
        }]
    }
/**     Socket server 
Objects:
	Rooms: Map(
		[
			[room_id,
			{
				players:[{uid,username,password},{uid,username,password}],
				firstPlayer:uid,
				gameState:{
					history: [{squares: Array(400).fill(null), historyPos: -1}],
					    xIsNext: true,
					    isDone: false,
					    stepNumber: 0,
					    isStepListDesc: true,
					    winLine: Array(5).fill(null)
				},
				chat:[{from:uid,msg:""}]
			}]
		]),
	OnlineUsers: Map([
			[user_id,
			{
				username, avatarurl
			}]
		]).
	PendingUsers:
		Map([[from_uid,to_uid]])
	InRoomUsers:
        Map([[uid,{room_id, isAFK}]])
**/
    


    io.of('/socket').on('connect', socket => {
        //console.log('client', socket)
        
    })
}

module.exports = socketServer
