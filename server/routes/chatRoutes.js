const express = require('express');
const {accessChats, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/').post(protect,accessChats);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
router.route('/renamegroup').put(protect,renameGroup);
router.route('/addtogroup').put(protect,addToGroup);
router.route('/removefromgroup').put(protect,removeFromGroup);


module.exports = router; 