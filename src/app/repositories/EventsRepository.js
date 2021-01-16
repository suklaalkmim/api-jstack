const db = require('../../database');

class EventRepository {
    async findAll(orderBy = 'ASC') {
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const rows = await db.query(`SELECT * FROM events_header ORDER BY startDateTime ${direction}`);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query('SELECT * FROM events_header WHERE id = $1', [id]);
        
        return row;
    }    
    
    async findByName(name) {
        const [row] = await db.query('SELECT * FROM events_header WHERE name = $1', [name]);

        return row;
    }

    async delete(id) {
        const deleteOp = await db.query('DELETE FROM events_header WHERE id = $1', [id]);

        return deleteOp;
    }

    async create({ 
        name, type, highlight, completed, startDateTime, lastUpdateDateTime 
    }) {
        const startDate = Date.parse(startDateTime);
        console.log(startDate);

        const [row] = await db.query(`
            INSERT INTO events_header(
                name, type, highlight, completed, startDateTime, lastUpdateDateTime) 
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `, [name, type, highlight, completed, startDateTime, lastUpdateDateTime]);
        
        console.log(startDate);

        console.log(row);
        return row;
    }

    async update(id, 
        { name, type, highlight, completed, startDateTime, lastUpdateDateTime }) {
            //console.log({startDateTime});
            
            const [row] = await db.query(`
                UPDATE events_header
                SET name = $1,
                    type = $2,
                    highlight = $3,
                    completed = $4,
                    startDateTime = $5,
                    lastUpdateDateTime = $6
                WHERE id = $7
                RETURNING *
            `, [name, type, highlight, completed, startDateTime, lastUpdateDateTime, id]);
            
            //console.log({startDateTime});
            //console.log(row);
            return row;
    }
}

module.exports = new EventRepository();
