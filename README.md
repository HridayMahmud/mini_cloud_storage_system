# Mini Cloud Storage System
A backend system to simulate cloud file storage with user-specific storage limit, file upload, delete, and storage summary features.

---

## Project Structure

The project is organized as follows:
cloud-storage/
├── controllers/           # API logic
├── models/                # Mongoose schemas
├── routes/                # Express routes
├── config/                # Database config
├── server.js              # Entry point
├── package.json
├── .env                   # Environment variables (gitignored)
├── README.md
└── CloudStorageAPI.postman_collection.json  # Postman collection

## Project Setup
1. Clone the repository:

```bash
git clone https://github.com/HridayMahmud/mini_cloud_storage_system.git
cd cloud-storage

Install dependencies:
npm install

How to Run
Local development:
npm run dev

Or using node:
node server.js
Server will run on: http://localhost:3000

Database Setup
Use MongoDB (local or Atlas cloud)

Local DB:

MONGO_URI=mongodb://localhost:27017/mini-cloud-storage-system
PORT=3000

MongoDB Atlas (cloud):

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cloudstorage
PORT=3000
Make sure .env is gitignored

API Endpoints
1. Create User

POST /users/create-user

Body (JSON):

{
  "name": "User1"
}
2. Upload File

POST /users/:userId/files

Body (JSON):

{
  "fileName": "file1.png",
  "fileSize": 100,
  "fileHash": "abc123"
}
3. Delete File

DELETE /users/:userId/files/:fileId

4. Get Storage Summary
GET /users/:userId/storage-summary

5. List User Files
GET /users/:userId/filesGET /users/:userId/files

Design Decisions / Assumptions
MongoDB used for flexible schema
usedStorage tracked in User model for fast calculation
Soft delete implemented using deleted field in File model
Users are assumed pre-created for testing
Only file metadata stored, not actual file content
Concurrency Control

MongoDB transactions used for atomic updates
Prevents race conditions in simultaneous uploads
Ensures storage limit (500MB per user) is never exceeded
Scaling Approach (100K Users)

Indexes on userId and fileName for fast queries
Cloud storage (e.g., AWS S3) recommended for physical files
Redis caching for frequently accessed storage summaries
Horizontal scaling with multiple server instances

Sample Requests (cURL)
Create User
curl -X POST http://localhost:3000/users/create-user \
-H "Content-Type: application/json" \
-d '{"name":"User1"}'

Upload File
curl -X POST http://localhost:3000/users/{userId}/files \
-H "Content-Type: application/json" \
-d '{"fileName":"file1.png","fileSize":100,"fileHash":"abc123"}'

Storage Summary
curl http://localhost:3000/users/{userId}/storage-summary

Delete File
curl -X DELETE http://localhost:3000/users/{userId}/files/{fileId}
List Files
curl http://localhost:3000/users/{userId}/files
List Files
curl http://localhost:3000/users/{userId}/files
