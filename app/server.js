import { createServer } from 'http';
import { PeopleRepository } from './people-repository.js';

const peopleRepository = new PeopleRepository();

const server = createServer(async (req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        return res.end();
    }

    await peopleRepository.insertRandomPerson();
    const people = await peopleRepository.getPeople();

    const peopleList = people.map(person => `<br>- ${person.name}`).join('');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>Full Cycle Rocks!</h1>
        ${peopleList}
    `);
});

const PORT = 80;
server.listen(PORT);
