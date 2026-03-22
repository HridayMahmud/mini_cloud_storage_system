const express = require('express');


const router = express.Router();


const createUser = require('../controllers/userController');
const uploadFile = require('../controllers/fileController');
const deleteFile = require('../controllers/deleteController');
const storageSummary = require('../controllers/storageSummary');
const listFiles = require('../controllers/listFiles');


//uploadfile
router.post("/:userId/files",uploadFile);

//create user
router.post("/create-user",createUser);
//delete file
router.delete("/:userId/files/:fileId",deleteFile);

//storage summary
router.get("/:userId/storage-summary",storageSummary);
//get file list
router.get("/:userId/listfiles",listFiles);
module.exports = router;