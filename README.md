# BloggerHub - Modern Full-Stack Blogging Platform

BloggerHub is a premium, feature-rich blogging platform built with a focus on modular architecture, high-performance data handling, and professional UI/UX.

##  Features

- **Unified Search**: Search article titles, content, and author names through a single, intelligent search bar.
- **Backend-Driven Filtering & Sorting**:  sorting (Newest/Oldest) and filtering are handled on the server for optimal performance with large datasets.
- **Session Persistence**: Secure user sessions that survive page reloads using Redux Persist with a custom storage layer.
- **Protected Routing**: Granular access control for managing articles and viewing private content.
- **Professional UI**: Responsive design built with Bootstrap 5, featuring truncation logic for long titles, custom modals, and high-fidelity toast notifications.
- **Modular Architecture**: Clean, feature-based folder structure (Auth, Posts, Comments) for easy scalability.

---

##  Technical Choices

### 1. Feature-Based Architecture
Unlike traditional MVC or layer-based structures, this project uses a **Feature-Based Structure**. All logic related to a specific domain (e.g., Auth, Posts) is grouped together. This makes the codebase easier to navigate and isolated

### 2. Redux Persist 
To ensure a seamless user experience, we implemented `redux-persist`. 

### 3. Backend-Controlled Data Flow
To ensure the application remains fast as the number of blogs grows, all sorting and searching are executed at the **Database level (MongoDB)** rather than in the browser. 

### 4. Memory-Safe Token Management
JWT tokens are stored in the Redux state and dynamically injected into every outgoing request via **Axios Interceptors**. This avoids the security risks of hardcoding tokens in headers.

---

##  Challenges Faced

- **Refactoring to Feature-Based**: Migrating a standard "Pages/Components" structure to a "Features" structure required careful re-mapping of all relative imports and Redux slice registrations to maintain state consistency.

- **Debounce Implementation**: To prevent "API Spam" during live search, I implemented a custom debouncing mechanism in the frontend to ensure requests are only fired 400ms after the user stops typing.


---

##  Setup and Installation

### Prerequisites
- Node.js (22.22.0)
- MongoDB (Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Run the server:
```bash
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Run the development server:
```bash
npm run dev
```

---

##  How to Use
1. **Registration**: Create a new account via the Signup page.
2. **Dashboard**: Browse all articles in the "Blog Directory". Use the search bar to find articles by topic or author name.
3. **Write**: Use the "Create Post" button in the Navbar to publish your own article.
4. **Manage**: Authors can Edit or Delete their own articles directly from the directory table.
5. **Engage**: Visit any article to leave a comment and join the discussion.

