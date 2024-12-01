const router =  require("express").Router();
const Event = require("../models/Event");
const moment = require ("moment")

router.post("/criar_evento", async(req, res) => {
    const event = Event(req.body);
    await event.save();
    res.sendStatus(201)
})

router.get("/get_events", async (req, res)=>{
    const events = await Event.find({
    start: {$gte: moment (req.query.start).toDate() }, 
    });

    res.send(events);
});

module.exports =  router;