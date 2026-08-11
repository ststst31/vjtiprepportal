# VJTI PrepPortal

## Simple Overview
VJTI PrepPortal is a student-driven web platform designed to help students understand placement preparation through shared experiences, peer interaction, and structured placement roadmaps. The platform allows students to post their preparation journey, view previous placement statistics, and explore profiles of other students for guidance and reference.

The main objective of this project is to create a transparent and collaborative environment where students can learn from real placement experiences instead of relying only on scattered information.

---

## Description
Placement preparation in engineering colleges often depends on informal communication between seniors and juniors. Important information such as interview processes, preparation strategies, and timelines is usually not documented in one place.

VJTI PrepPortal attempts to solve this problem by providing a centralized system where students can share placement experiences, maintain a personal placement roadmap, view previous placement statistics, and learn from peer journeys in a structured manner.

The system is developed as a full-stack web application using the MERN stack (MongoDB, Express.js, React.js, Node.js). The focus of the project is usability, simplicity, and practical application within a college environment.

---

## Getting Started

### Dependencies
The following software is required before running the project:

- Windows 10 / Windows 11 or Linux
- Node.js (v16 or above recommended)
- MongoDB Atlas or Local MongoDB installation
- Modern web browser (Chrome recommended)

Libraries used:
- React.js
- Express.js
- MongoDB & Mongoose
- Axios
- React Router DOM

---

### Installing

1. Clone the repository 
(paste link) 

2. Open the project folder

3. Install dependencies for backend  
cd server 
npm install 


4. Install dependencies for frontend  
cd client 
npm install


5. Create a `.env` file in the server folder and add:
MONGO_URI=mongodb+srv://Admin:atmkbdsybau@prepportal-cluster.sbx88x4.mongodb.net/prepportal?appName=PrepPortal-Cluster
PORT=5000


---

### Executing Program

Step 1 – Start Backend
cd server 
node index.js 


You should see:
Server running on port 5000
MongoDB Connected Successfully


Step 2 – Start Frontend
cd client 
npm run dev 


Open browser at:
http://localhost:5173/


---

## Features Implemented

- User authentication (Login / Signup)
- Profile creation and editing
- Profile picture and resume upload
- Placement roadmap tracking with status indicators (Applied, Interview Process, Placed)
- Post creation with timestamp display
- User search functionality
- Dark mode support
- Responsive layout with sidebar navigation

---

## Help / Common Issues

- If MongoDB does not connect, check the connection string in `.env`.
- Ensure backend is running before starting frontend.
- If images or profile data do not update, clear browser local storage and login again.

---

## Authors

**Stesha Parkhe**  
VJTI – Electronics Engineering

---

## Version History

### 0.2
- Added user search functionality  
- Added placement roadmap status system  
- UI improvements and dark mode support  

### 0.1
- Initial release with posting and profile system

---

## Acknowledgments

- Inheritance mentors 
- Open-source documentation for React and Express
- MongoDB documentation


