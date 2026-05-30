import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "./db";

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
// Zod Schemas
const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  gender: z.enum(["Male", "Female", "Others"]),
  channelName: z.string().optional(),
  description: z.string().optional(),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const uploadSchema = z.object({
  slug: z.string(),
  VideoUrl: z.string().url(),
  thumbnail: z.string().url(),
});

// Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Auth Routes
app.post("/signup", async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findFirst({
      where: { username: data.username },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, userId: user.id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Video Routes
app.get("/videos", async (req, res) => {
  try {
    const videos = await prisma.uploads.findMany({
      include: {
        user: {
          select: {
            username: true,
            channelName: true,
            ProfileImage: true,
            
          },
        },
      },
    });
    res.json(videos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/videos/:slug", async (req, res) => {
  try {
    const video = await prisma.uploads.findFirst({
      where: { slug: req.params.slug },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      include: {
        user: {
          select: {
            username: true,
            channelName: true,
            ProfileImage: true,
            subsciberCount: true,
            description: true,
          },
        },
      },
    });

    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Search query is required" });

  try {
    const videos = await prisma.uploads.findMany({
      where: {
        OR: [
          { slug: { contains: String(q), mode: "insensitive" } },
          { user: { channelName: { contains: String(q), mode: "insensitive" } } },
        ],
      },
      include: {
        user: {
          select: {
            username: true,
            channelName: true,
            ProfileImage: true,
          },
        },
      },
    });
    res.json(videos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/upload", authenticateToken, async (req: any, res: any) => {
  try {
    const data = uploadSchema.parse(req.body);
    const video = await prisma.uploads.create({
      data: {
        ...data,
        userId: req.user.userId,
      },
    });
    res.status(201).json(video);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// User Routes
app.get("/user/profile", authenticateToken, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        upload: true,
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        upload: true,
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
