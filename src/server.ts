import { app } from "./app";

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

main();
