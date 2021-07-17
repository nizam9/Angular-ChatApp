import ChatCtrl from '../controllers/chat-controller';
import { Router } from 'express';

var router = new Router();
(function() {
    router.post('/create/chat', ChatCtrl.createChat);
    router.get('/get/chats/:userid', ChatCtrl.getChats);


})();

module.exports = router;

// export default router;