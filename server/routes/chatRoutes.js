const express = require('express');
const {accessChats, fetchChats} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/').post(protect,accessChats);
router.route('/').get(protect,fetchChats);
// router.route('/group').post(protect,createGroupChat);
// router.route('/renamegroup').put(protect,renameGroup);
// router.route('/removegroup').put(protect,removeGroup);
// router.route('/addgroup').put(protect,addGroup);

module.exports = router; 