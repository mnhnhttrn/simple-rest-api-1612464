var GameState = require('./GameState')
var actionTypes = require ('./actionTypes')
// Rooms: Map(
//     [
//         [room_id,
//         {
//             players:[{uid,username,password},{uid,username,password}],
//             firstPlayer:uid,
//             gameState:{
//                 history: [{squares: Array(400).fill(null), historyPos: -1}],
//                     xIsNext: true,
//                     isDone: false,
//                     stepNumber: 0,
//                     isStepListDesc: true,
//                     winLine: Array(5).fill(null)
//             },
//             chat:[{from:uid,msg:""}]
//         }]
//     ]),
function Room(roomId, user1, user2) {
    this.id = roomId
    this.players = [user1, user2]
    this.first = -1
    this.gameState = new GameState()
    this.chat = []
    this.dialog = [-1,'']
}

Room.prototype.addChatMessage = function(userId,message) {
    this.chat.push({from:userId,msg:message})
}

Room.prototype.acceptDialog = (fromUId) => {
    if (this.dialog[0] !== -1 && fromUId !==this.dialog[0]){
        //player accept dialog
        
        //CLEAR DIALOG AFTER done
        this.dialog= [-1,'']
    }
}

Room.prototype.denyDialog = (fromUId) => {
    if (this.dialog[0] !== -1 && fromUId !==this.dialog[0]){
        //player deny dialog
        
        //CLEAR DIALOG AFTER done
        this.dialog= [-1,'']
    }

}

Room.prototype.addDialog = (fromUId, actionType) => {
    this.dialog = [fromUId,actionType]
}
module.exports = Room