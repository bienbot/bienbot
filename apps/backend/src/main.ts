import { config } from "dotenv";
import createApp from "./utils/createApp";

config();

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        const app = createApp();
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
}

main();
