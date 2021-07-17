import ChatSchema from '../models/chat-model';

const ChatCtrl = {};

ChatCtrl.createChat = (req, res) => {

    console.log(req.body , 'req.body.usersreq.body.users');

    const chatPayload = new ChatSchema({
        chatName: (req.body.chatName) ? (req.body.chatName) : '',
        isGroupChat: (req.body.isGroupChat) ? (req.body.isGroupChat) : false,
        users: req.body.users,
    });


    chatPayload.save((error, result) => {
        if (result) {
            res.send({ code: 200, result: result, message: 'chat Created Successfully' })
        } else {
            res.send({ code: 300, error: err, message: 'Error ocurred while creating chat' })
        }
    })

}


ChatCtrl.getChats = (req, res) => {
    console.log('get chars called', req.params.userid);


    ChatSchema.find({ users: { $elemMatch: { $eq: req.params.userid } } }).then((chats) => {
        res.send({ code: 200, chats: chats, message: 'Successfully fetched related chats' })
    }, (err) => {
        res.send({ code: 300, error: err, message: 'Error ocurred while retrieving chats' })
    })

}

export default ChatCtrl;

// ps -ef|grep node
//sudo kill ports