# คู่มือการเชื่อมต่อ Frontend และ Backend

### 1. ติดตั้ง Dependencies

**Backend:**
```bash
cd backEnd
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ `backEnd/` ด้วยเนื้อหาดังนี้:

```env
# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:3000

# MongoDB Configuration
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_HOST=your_mongodb_cluster.mongodb.net
DB_NAME=your_database_name

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Configuration (for nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🚀 วิธีการรันโปรเจค

### Terminal 1 - Backend Server
```bash
cd backEnd
npm run dev
```
Backend จะรันที่ `http://localhost:3000`

### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```
Frontend จะรันที่ `http://localhost:5173`

## 🔗 การเชื่อมต่อ

### 1. Vite Proxy Configuration
Frontend ใช้ Vite proxy ที่ตั้งค่าไว้ใน `vite.config.ts`:
- Requests ไปที่ `/api/*` จะถูก proxy ไปที่ `http://localhost:3000`

### 2. CORS Configuration
Backend ตั้งค่า CORS ใน `app.js`:
- อนุญาตให้ frontend (`http://localhost:5173`) เข้าถึงได้
- รองรับ credentials (cookies/session)

### 3. API Calls
Frontend ใช้ `src/utils/api.ts` สำหรับเรียก API:
- Base URL: `/api` (จะถูก proxy ไปที่ backend)
- รองรับ `withCredentials: true` สำหรับ session/cookies

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/registerLocal` - สมัครสมาชิก
- `POST /api/auth/verifyEmail` - ยืนยันอีเมล
- `GET /api/auth/google` - Google OAuth login

### Customer
- `POST /api/customer/createCustomer`
- `GET /api/customer/getCustomer/:id`
- `PUT /api/customer/updateCustomer/:id`
- `DELETE /api/customer/deleteCustomer/:id`

### Employee
- `POST /api/employee/createEmployee`
- `GET /api/employee/getEmployee`
- `GET /api/employee/getEmployee/:id`
- `PUT /api/employee/updateEmployee/:id`

### Email
- `POST /api/email/sendEmail`

## ✅ ตรวจสอบการเชื่อมต่อ

1. เปิด Browser Console
2. ตรวจสอบว่า backend รันอยู่: `http://localhost:3000/api/health`
3. ตรวจสอบว่า frontend รันอยู่: `http://localhost:5173`
4. ลอง login ดูว่าสามารถเชื่อมต่อได้หรือไม่

## 🐛 แก้ไขปัญหา

### CORS Error
- ตรวจสอบว่า `FRONTEND_URL` ใน `.env` ตรงกับ frontend URL
- ตรวจสอบว่า backend รันอยู่ที่ port 3000

### Connection Refused
- ตรวจสอบว่า backend server รันอยู่
- ตรวจสอบว่า MongoDB เชื่อมต่อได้

### Proxy Error
- ตรวจสอบ `vite.config.ts` ว่า proxy ตั้งค่าถูกต้อง
- Restart frontend server

## 📝 หมายเหตุ

- Frontend ใช้ React Router สำหรับ navigation
- Backend ใช้ Express + Passport สำหรับ authentication
- Session/cookies จะถูกส่งผ่าน `withCredentials: true`

