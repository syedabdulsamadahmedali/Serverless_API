# Testing the CRUD Application

The following sections provide details on testing API functionality using **Postman**.

## 1. GET `/users`
Retrieve all users.

### Testing GET in Postman
1. Navigate to Sam-0073/Web_API_Design/blob/main/MyAnonymousFunction/Application.txt
2. Copy the Application link and paste it in Postman URL field
3. Set the request type to `GET`.
4. Hit Send button

## 2. POST `/users`
Add a new user.

### Request Body example in JSON
{
  "name": "Sam",
  "email": "sam@unb.ca"
}

### Testing POST in Postman
1. Navigate to Sam-0073/Web_API_Design/blob/main/MyAnonymousFunction/Application.txt
2. Copy the Application link and paste it in Postman URL field
3. Set the request type to POST.
4. Go to the Body tab, select raw, and set the format to JSON.
5. Paste the JSON body.
6. Hit Send button

## 3. PUT `/users`
Edit the details of user.

### Testing PUT in Postman
1. Navigate to Sam-0073/Web_API_Design/blob/main/MyAnonymousFunction/Application.txt
2. Copy the Application link and paste it in Postman URL field
3. Set the request type to PUT.
4. Go to the Body tab, select raw, and set the format to JSON.
5. Input the JSON body of the user you want to edit including id.
6. Append the Application URL with ?id=1  Replace 1 here with the id of the user
7. Hit Send button

## 4. DELETE `/users`
Delete a user.

### Testing DELETE in Postman
1. Navigate to Sam-0073/Web_API_Design/blob/main/MyAnonymousFunction/Application.txt
2. Copy the Application link and paste it in Postman URL field
3. Set the request type to DELETE.
4. Copy the id of the user you want to delete.
5. Append the Application URL with ?id=1  Replace 1 here with the id of the user.
6. Hit Send button
