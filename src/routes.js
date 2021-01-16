const { Router } = require('express');

const EventController = require('./app/controller/EventController');

const router = Router();

router.get(
    '/events',
    EventController.index
);

router.get(
    '/events/:id', 
    EventController.show
);

router.delete(
    '/events/:id', 
    EventController.delete
);

router.post(
    '/events', 
    EventController.store
);

router.put(
    '/events/:id',
    EventController.update
);

module.exports = router;