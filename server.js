import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));
app.use(express.json());

// serve public assets (admin UI)
app.use(express.static(path.join(__dirname, 'public')));

// LowDB setup
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { users: [] });

if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({ users: [] }, null, 2));
}

await db.read();
db.data ||= { users: [] };

// create default admin if missing
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';
let adminExists = db.data.users.find(u => u.email === ADMIN_EMAIL);
if (!adminExists) {
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const adminUser = {
    id: uuidv4(),
    name: 'Admin',
    email: ADMIN_EMAIL,
    password: hashed,
    role: 'admin',
    joinDate: new Date().toISOString(),
    status: 'active',
    createdAt: Date.now()
  };
  db.data.users.push(adminUser);
  await db.write();
  console.log('✅ Default admin user created:', ADMIN_EMAIL);
}

// helper to create token (include role)
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

// auth routes
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  await db.read();
  if (db.data.users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already registered' });
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    name,
    email,
    password: hashed,
    role: 'user',
    joinDate: new Date().toISOString(),
    status: 'active',
    createdAt: Date.now()
  };
  db.data.users.push(user);
  await db.write();
  const token = createToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, joinDate: user.joinDate, status: user.status } });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = createToken({ id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, joinDate: user.joinDate, status: user.status } });
});

// middleware to require auth
const verifyToken = (req) => {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.replace('Bearer ', '');
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
};

const requireAuth = async (req, res, next) => {
  const payload = verifyToken(req);
  if (!payload) return res.status(401).json({ error: 'Missing or invalid token' });
  await db.read();
  const user = db.data.users.find(u => u.id === payload.id);
  if (!user) return res.status(401).json({ error: 'User not found' });
  req.user = user;
  next();
};

// users routes (require auth)
app.get('/api/users', requireAuth, async (req, res) => {
  await db.read();
  const users = db.data.users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, joinDate: u.joinDate, status: u.status }));
  res.json({ users });
});

// profile
app.get('/api/profile', requireAuth, (req, res) => {
  const u = req.user;
  res.json({ id: u.id, name: u.name, email: u.email, role: u.role, joinDate: u.joinDate, status: u.status });
});

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`🚀 capitalflowx-admin running on http://localhost:${port}`));
