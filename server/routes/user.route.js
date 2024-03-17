import express from 'express';
import { getUserProfileAndRepos } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);

//TODO get like
//TODO post like a profile

export default router;