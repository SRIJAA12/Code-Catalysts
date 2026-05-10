const prisma = require("../prisma/client");

// POST /api/users/sync  — upsert the Firebase user in Postgres
async function syncUser(req, res) {
  const { uid, email, name, picture } = req.user;
  try {
    const user = await prisma.user.upsert({
      where:  { id: uid },
      update: {
        email,
        name:       name    || undefined,
        avatar:     picture || undefined,
        updatedAt:  new Date(),
      },
      create: {
        id:          uid,
        email,
        name:        name    || null,
        avatar:      picture || null,
        firebaseUid: uid,
        updatedAt:   new Date(),
      },
    });
    res.json({ user });
  } catch (err) {
    console.error("syncUser error:", err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { syncUser };
