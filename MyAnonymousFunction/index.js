// In-memory user data storage
let users = [];
let currentId = 1;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const { method } = req;
    try {
        switch (method) {
            case 'GET':
                // Pagination and sorting
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const sortBy = req.query.sortBy || 'id';
                const order = req.query.order === 'desc' ? -1 : 1; // ascending
                // Search
                const search = req.query.search || '';
                let filteredUsers = users.filter(user => 
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                );
                // Sort
                filteredUsers.sort((a, b) => {
                    if (a[sortBy] < b[sortBy]) return -order;
                    if (a[sortBy] > b[sortBy]) return order;
                    return 0;
                });
                // Pagination
                const totalUsers = filteredUsers.length;
                const totalPages = Math.ceil(totalUsers / limit);
                const startIndex = (page - 1) * limit;
                const endIndex = startIndex + limit;
                const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
                context.res = {
                    status: 200,
                    body: {
                        totalUsers,
                        totalPages,
                        currentPage: page,
                        users: paginatedUsers,
                    },
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
                newUser.id = currentId++;
                users.push(newUser);
                context.res = {
                    status: 201,
                    body: newUser,
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
                const index = users.findIndex(u => u.id === updatedUser.id);
                if (index !== -1) {
                    users[index] = updatedUser;
                    context.res = {
                        status: 200,
                        body: "User updated successfully.",
                    };
                } else {
                    context.res = {
                        status: 404,
                        body: "User not found.",
                    };
                }
                break;
            case 'DELETE':
                const deleteId = req.query.id;
                if (!deleteId) {
                    context.res = {
                        status: 400,
                        body: "Please provide user id to delete.",
                    };
                    return;
                }
                const deleteIndex = users.findIndex(u => u.id === parseInt(deleteId));
                if (deleteIndex !== -1) {
                    users.splice(deleteIndex, 1);
                    context.res = {
                        status: 200,
                        body: "User deleted successfully.",
                    };
                } else {
                    context.res = {
                        status: 404,
                        body: "User not found.",
                    };
                }
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