const EventsRepository = require('../repositories/EventsRepository');

class EventController {
    async index(request, response) {
        const { orderBy } = request.query;
        const events = await EventsRepository.findAll();

        response.json(events);
    }

    async show(request, response) {
        const { id } = request.params;
        const event = await EventsRepository.findById(id);

        if (!event)
            return response.status(404).json({ error: 'Event not found'});

        response.json(event);
    }

    async delete(request, response) {
        const { id } = request.params;
        
        await EventsRepository.delete(id);
        response.sendStatus(204);
    }

    async store(request, response) {
        const { 
            name, type, highlight, completed, startDateTime, lastUpdateDate
        } = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Name is a mandatory data.'});
        }

        const eventExists = await EventsRepository.findByName(name);

        if (eventExists) {
            return response.status(400).json({ error: 'This event is already been registered.'});
        }

        const event = await EventsRepository.create({
            name, type, highlight, completed, startDateTime, lastUpdateDate
        });

        response.json(event);
    }

    async update(request, response) {
        const { id } = request.params;
        const {
            name, type, highlight, completed, startDateTime, lastUpdateDate 
         } = request.body;

        const eventExists = await EventsRepository.findById(id);

        if (!eventExists) {
            return response.status(404).json({ error: 'Event not found'});
        }
        
        if (!name) {
            return response.status(400).json({ error: 'Name is a mandatory data.'});
        }

        const eventByNameExists = await EventsRepository.findByName(name);

        if (eventByNameExists && eventByNameExists.id !== id) {
            return response.status(400).json({ error: 'This event is already been registered.'});
        }

        const event = await EventsRepository.update(id, {
            name, type, highlight, completed, startDateTime, lastUpdateDate
        });

        response.json(event);
    }

}

module.exports = new EventController();