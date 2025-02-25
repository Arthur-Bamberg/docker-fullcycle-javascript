import { createPool } from 'mysql2/promise';

export class PeopleRepository {    
    constructor() {
        this.pool = createPool({
            host: 'mysql',  
            user: 'root',       
            password: 'root', 
            database: 'fullcycle', 
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    _generateRandomName() {
        const names = ['Lucas', 'Ana', 'Carlos', 'Mariana', 'Rafael', 'Beatriz', 'Fernando', 'Camila'];
        const lastNames = ['Silva', 'Souza', 'Oliveira', 'Pereira', 'Santos', 'Rodrigues'];
        return `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    };
    
    async insertRandomPerson() {
        try {
            const connection = await this.pool.getConnection();
            const name = this._generateRandomName();
            await connection.execute('INSERT INTO people (name) VALUES (?)', [name]);
            connection.release();
        } catch (error) {
            console.error('Erro ao inserir pessoa:', error);
        }
    };
    
    async getPeople() {
        try {
            const connection = await this.pool.getConnection();
            const [rows] = await connection.execute('SELECT * FROM people');
            connection.release();
            return rows;
        } catch (error) {
            console.error('Erro ao buscar pessoas:', error);
        }
    };
} 