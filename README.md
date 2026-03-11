# 🏢 Office Rental System  (More to come Stay tuned) 

A full-stack web application that allows companies to browse and book office spaces, while admins manage buildings and offices. A SuperAdmin oversees the entire platform by approving or rejecting admin registrations.

🔗 **Live Demo:** [office-rental-system.vercel.app](https://office-rental-system.vercel.app)

---

## 👥 User Roles

```
SuperAdmin
    └── Approves / Rejects Admin registrations
    
Admin (Owner)
    └── Adds buildings & offices
    └── Approves / Rejects company bookings
    
Company
    └── Browses & books office spaces
```

---

## ✨ Features

### 🔑 SuperAdmin
- Approve or reject admin/owner registration requests
- Full platform oversight

### 👤 Admin (Owner)
- Register & login (requires SuperAdmin approval)
- Add buildings and offices
- View all booking requests
- Approve or reject bookings from companies

### 🏬 Company
- Register & login
- Browse available office spaces
- View office details
- Book an office for a date range
- View booking history

### 🔐 Authentication
- JWT based authentication
- Cookie based sessions
- Role based access control (SuperAdmin / Admin / Company)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|------------|-------|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| React Router | Client side routing |
| Axios | API calls |

### Backend
| Technology | Usage |
|------------|-------|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Cookie Parser | Cookie handling |
| CORS | Cross origin requests |

---

## 📁 Project Structure

```
OfficeRentalSystem/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── company/
│   │   ├── components/
│   │   ├── context/
│   │   └── api.js
│   ├── vercel.json
│   └── package.json
└── backend/
    ├── routes/
    ├── models/
    ├── controllers/
    ├── middleware/
    └── index.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Git

### 1. Clone the repo
```bash
git clone https://github.com/krishna4698/OfficeRentalSystem.git
cd OfficeRentalSystem
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=3000
NODE_ENV=development
```

Start the backend:
```bash
node index.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Update `src/api.js`:
```js
const API = "http://localhost:3000";
export default API;
```

Start the frontend:
```bash
npm run dev
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |

### SuperAdmin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/superadmin/pendingadmins` | Get all pending admin requests |
| PATCH | `/superadmin/approve/:id` | Approve admin registration |
| PATCH | `/superadmin/reject/:id` | Reject admin registration |

### Buildings (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getmybuildings` | Get all buildings |
| POST | `/addbuilding` | Add a building |

### Offices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/office/getoffices` | Get all offices |
| POST | `/office/create` | Add an office |
| GET | `/alloffices` | Browse all offices (company) |
| GET | `/officedetials/:id` | Get office details |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/booking/create` | Create a booking |
| GET | `/getmybookings` | Get company bookings |
| GET | `/getbookings` | Get all bookings (admin) |
| PATCH | `/booking/updatebooking` | Approve / Reject booking |

---

## 🔄 Registration Flow

```
Admin registers
      ↓
Status: "pending"
      ↓
SuperAdmin reviews
      ↓
Approved ✅ → Admin can login and manage offices
Rejected ❌ → Admin cannot access the platform
```

---

## 🌍 Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Database** → [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 👨‍💻 Author

**Krishna Joshi**
- GitHub: [@krishna4698](https://github.com/krishna4698)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
