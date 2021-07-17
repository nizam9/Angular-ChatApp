import UserCtrl from '../controllers/user-controller';
import { Router } from 'express';

var router = new Router();
(function() {
    router.post('/user/register', UserCtrl.userRegister);
    router.post('/user/login', UserCtrl.login);
    router.get('/fetchUsers', UserCtrl.fetchAllUsers);
    router.get('/user/error', UserCtrl.error);

    // router.post('/student/register', UserCtrl.verify, UserCtrl.registerStudent);
})();

module.exports = router;
