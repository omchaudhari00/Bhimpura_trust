# Bhimpura Trust Web Application

A professional, state-of-the-art web application built for the **Bhimpura Trust** to manage and showcase temple activities, recognition of generous donors, event announcements, and dynamic photo archives.

The application features a beautifully polished, high-aesthetic React frontend combined with a stateless, fast Django REST API backend backed by MongoDB.

---

## 🌟 Key Features

*   **Premium Editorial Design**: Modern, responsive UI utilizing elegant typography (Cormorant Garamond Display, Noto Sans Gujarati, DM Sans), smooth micro-animations (Framer Motion), and harmonious color palettes.
*   **Live Events Portal**: Event page featuring responsive layouts for vertical/horizontal banners, real-time event countdown clock, live status badges, and embedded YouTube Live stream players.
*   **Donor Recognition System**: A categorized leaderboard and directory of donors showcasing names, donation amounts, villages, current placements, and photos.
*   **Moments of Seva Gallery**: Responsive photo gallery with masonry columns and direct download capability.
*   **Visitor Analytics**: Real-time tracking of homepage visits displayed dynamically on the platform.
*   **Secure Admin Panel**: Secure, custom JWT authentication for trust administrators to add/modify donor listings and upload gallery photos.
*   **Cloud Media Storage**: AWS S3 integration for seamless photo upload and retrieval.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React (Vite-powered)
*   **Styling**: TailwindCSS & Custom Vanilla CSS variables
*   **Animations**: Framer Motion
*   **Routing**: React Router DOM

### Backend
*   **Framework**: Django & Django REST Framework
*   **Authentication**: SimpleJWT (JSON Web Tokens)
*   **Database Client**: PyMongo (MongoDB connection driver)
*   **Storage Driver**: Boto3 (AWS S3)
*   **Production Server**: Gunicorn

### Database
*   **Core Database**: MongoDB

---

## ⚙️ Project Structure

```text
Bhimpura Trust/
├── Backend/               # Django REST API application
│   ├── analytics_app/     # Midde-ware & views for tracking page traffic
│   ├── core_api/          # Main project configuration (settings, auth, S3 drivers)
│   ├── donors_app/        # Models & viewsets for donor CRUD operations
│   ├── temple_project_app/# Models & viewsets for event photo management
│   ├── requirements.txt   # Python dependency list
│   └── run-backend.cmd    # Windows command script to start backend server
│
├── frontend/              # React single page application
│   ├── public/            # Static assets (images, posters, redirects configuration)
│   ├── src/
│   │   ├── api/           # Axios/Fetch API client wrapper
│   │   ├── components/    # Reusable components (Hero, Navbar, Footer, DonorCard)
│   │   ├── context/       # Auth state providers
│   │   └── pages/         # Page templates (Home, About, Donors, Events, Gallery, Admin)
│   ├── package.json       # Node dependency list
│   ├── vite.config.js     # Dev server and API proxy configurations
│   └── vercel.json        # Routing overrides for Vercel deployment
```

---

## 🚀 Local Development Setup

Follow these steps to run the application on your local machine:

### 1. Prerequisite: Run MongoDB
Ensure MongoDB is running locally on your machine on port `27017`.
*   If running as a background process or service:
    ```bash
    mongod --dbpath <path-to-your-db-data>
    ```

### 2. Backend Setup
1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Create a `.env` file from the example:
    ```bash
    copy .env.example .env
    ```
5.  Configure your environment variables in `.env` (database connection and AWS credentials).
6.  Start the development server:
    ```bash
    python manage.py runserver
    ```
    The API will be available at `http://127.0.0.1:8000/`.

### 3. Frontend Setup
1.  Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local development server:
    ```bash
    npm run dev
    ```
    The application will launch on `http://localhost:5173/` and proxy `/api/*` calls to the Django backend.

---

## 🌐 Production Deployment

The project is structured for painless deployment across platforms:

### Database (MongoDB Atlas)
*   Deploy a cluster on **MongoDB Atlas** (Free tier supported).
*   Add `0.0.0.0/0` to your database IP Access List.
*   Copy your database connection URI and configure it under `MONGODB_URI` in the backend service.

### Backend (Render or Railway)
*   **Build Command**: `pip install -r requirements.txt`
*   **Start Command**: `gunicorn core_api.wsgi:application`
*   **Environment variables**: Make sure to set `DEBUG=False` and input your production `ALLOWED_HOSTS` and MongoDB keys.

### Frontend (Vercel or Netlify)
*   **Root Directory**: `frontend`
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Environment Variables**: Add `VITE_API_URL` pointing to your hosted backend API URL.
*   **SPA Client Routing**: Pre-configured using [vercel.json](frontend/vercel.json) (for Vercel) and [_redirects](frontend/public/_redirects) (for Netlify) to prevent 404 errors on page reloads.

---

## 🤝 Contributing
For updates, enhancements, or bug fixes:
1. Create a feature branch.
2. Commit changes cleanly.
3. Push to `main` branch.
