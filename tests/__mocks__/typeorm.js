const typeorm = require('typeorm');

typeorm.getConnectionManager().create({
	name: 'admin-auth',
	type: 'postgres',
	host: 'localhost',
	database: 'test',
	username: 'node',
	password: 'asdfasdf',
	synchronize: true,
	port: 5432,
	entities: [
		__dirname + '/../../lib/**/*.entity.ts'
	]
});

typeorm.getConnectionManager().create({
	name: 'mongo-view',
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	database: 'test',
	entities: [
		__dirname + '/../../lib/**/*.collection.ts'
	]
});

module.exports = typeorm;