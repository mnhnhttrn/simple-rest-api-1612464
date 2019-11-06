var Room = require('./Room')
var userModel = require('../models/user')
var actionTypes = require('./actionTypes')

const FROM_USER = 0
const TO_USER = 1

const GET_GAME_STATE = 'get game state'

const socketServer = (server) => {
    let io = require('socket.io')(server);
    
    //Global var
    let currentRoomCount = 0;
    let Rooms = new Map()
    let OnlineUsers = new Map()
    let PendingUsers = []
    let InRoomUsers = new Map()

    function NewGame({userPayload1, userPayload2}){
        Rooms.set(currentRoomCount, new Room(currentRoomCount,userPayload1, userPayload2));
        currentRoomCount++;
    }

    function UserConnect(uid){
        userModel.findOneByID(uid).then(users=>{
            if (users.length){
                user = users[0]
                OnlineUsers.set(uid,{username: user.account_username, avatarURL: user.account_avatar})
            }
        })
    }

    function UserDisconnect(uid){
        OnlineUsers.delete(uid)
        
        //Delete uid in pending list
        for(let i; i <PendingUsers.length; i++){
            if (PendingUsers[i][FROM_USER] === uid || PendingUsers[i][TO_USER] === uid){
                PendingUsers.splice(i,1)
            }
        }

        let iru = InRoomUsers.get(uid)
        iru.isAFL = false

        InRoomUsers.set(uid,{})
    }
/**     Socket server 
Objects:
	
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
        // console.log('client', socket)
        socket.emit('greeting','hello!')     
    })
}

module.exports = socketServer
