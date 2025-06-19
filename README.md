# 🎧 Spotify Clone – Microservices Architecture

A full-featured Spotify clone built using a microservice architecture. This project includes secure user authentication, role-based admin access, album and song management, and thumbnail uploads — all deployed on AWS EC2.

🔗 **Live Site**: [http://ec2-13-235-76-71.ap-south-1.compute.amazonaws.com](http://ec2-13-235-76-71.ap-south-1.compute.amazonaws.com)

---

## 🚀 Features

- 🔐 JWT-based authentication with role-based access (Admin/User)
- 🎵 Add, update, delete songs and albums
- 🖼️ Upload thumbnails for albums
- 🛠️ Admin panel for managing content
- 🧱 Microservices-based backend
- ☁️ Deployed on AWS EC2 (Frontend + Backend)

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- TailwindCSS

### Backend (Microservices)
- Node.js / Express.js
- MongoDB
- Multer (for file uploads)
- JWT (Authentication)

### Deployment
- AWS EC2 (Ubuntu)
- Nginx or PM2 (if used)
- Git + GitHub

---

## 📸 Screenshots

> Add UI screenshots of the user dashboard, admin panel, album views, etc.

---

## ⚙️ Getting Started

### 1. Clone the Repositories

```bash
git clone https://github.com/NeetuSarkar/Spotify-Frontend.git
git clone https://github.com/yourusername/spotify-backend.git
```

### 2. Setup - Backend

```bash
cd spotify-backend
npm install

# Create a .env file
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

npm start
```

### 3. Setup - Frontend

```bash
cd Spotify-Frontend
npm install
npm run dev
```

Update the frontend `.env` or axios base URLs if needed to point to your backend.

---

## 🧪 Admin Demo Credentials

> For testing purposes only:
> - **Email:** `admin@example.com`
> - **Password:** `admin123`

---

## 🌐 Live Demo

Frontend: [http://ec2-13-235-76-71.ap-south-1.compute.amazonaws.com](http://ec2-13-235-76-71.ap-south-1.compute.amazonaws.com)

---

## 🔭 Roadmap

- [ ] CI/CD with GitHub Actions
- [ ] Dockerize microservices
- [ ] Deploy with ECS or Kubernetes
- [ ] Playlist and Favorites support
- [ ] Enhanced search and filters

---

## 🧠 Lessons Learned

- Building scalable microservices
- Role-based authentication systems
- AWS EC2 deployment with Node.js and React
- Handling file uploads (Multer)
- API integration and route protection in React

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 🙋‍♀️ Author

Built by [Neetu Sarkar](https://github.com/NeetuSarkar)
