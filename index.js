import server from "./app/config/config.server.js";
import connectDB from "./app/config/config.db.js";

const PORT = process.env.PORT || 4010;

server.listen(PORT, () => {
  connectDB();
  console.log(`listening on port ${PORT}`);
});
