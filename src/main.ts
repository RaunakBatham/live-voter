import server from "./app-websocket";
import 'dotenv/config'

server.listen(process.env.PORT, () => {
  console.log(`Application Running on http://localhost:${process.env.PORT}`);
});
