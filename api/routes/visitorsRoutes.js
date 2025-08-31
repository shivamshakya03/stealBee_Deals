import express from "express";
import { getUniqueVisitors, trackVisitor,trackVisit, getVisitStats } from "../controller/visitorController.js";


const router = express.Router();

// POST → track a visitor
router.post("/track", trackVisitor);

// GET → get unique visitors per day
router.get("/stats", getUniqueVisitors );




// FOr separate table which save specific date and total users per day 
router.post("/dailyperdaytrack", trackVisit);   // Track visits
router.get("/dailyperdaystats", getVisitStats); // Fetch stats

export default router;
