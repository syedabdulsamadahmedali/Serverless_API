const { CosmosClient } = require('@azure/cosmos');

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = 'UserDatabase';
const containerId = 'Users';

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const { method } = req;
    const database = client.database(databaseId);
    const container = database.container(containerId);

    try {
        switch (method) {
            case 'GET':
                const { resources: users } = await container.items.query('SELECT * FROM c').fetchAll();
                context.res = {
                    status: 200,
                    body: users.map(user => ({ id: user.id, name: user.name, email: user.email })),
                };
                break;
            case 'POST':
                const newUser = req.body;
                if (!newUser.name || !newUser.email) {
                    context.res = {
                        status: 400,
                        body: "Please provide name and email.",
                    };
                    return;
                }
                newUser.id = `${Date.now()}`;
                const { resource: createdUser } = await container.items.create(newUser);
                context.res = {
                    status: 201,
                    body: createdUser,
                };
                break;
            case 'PUT':
                const updatedUser = req.body;
                if (!updatedUser.id || !updatedUser.name || !updatedUser.email) {
                    context.res = {
                        status: 400,
                        body: "Please provide id, name, and email.",
                    };
                    return;
                }
                const { resource: user } = await container.item(updatedUser.id).read();
                if (!user) {
                    context.res = {
                        status: 404,
                        body: "User not found.",
                    };
                    return;
                }
                user.name = updatedUser.name;
                user.email = updatedUser.email;
                const { resource: updatedResource } = await container.items.upsert(user);
                context.res = {
                    status: 200,
                    body: updatedResource,
                };
                break;
            case 'DELETE':
                const userIdToDelete = req.query.id;
                if (!userIdToDelete) {
                    context.res = {
                        status: 400,
                        body: "Please provide an id.",
                    };
                    return;
                }
                await container.item(userIdToDelete).delete();
                context.res = {
                    status: 204,
                    body: null,
                };
                break;
            default:
                context.res = {
                    status: 405,
                    body: "Method not allowed.",
                };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: "An error occurred: " + error.message,
        };
    }
};
