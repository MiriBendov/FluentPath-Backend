import app from "./app";
import { PORT } from "./config";

app.listen(Number(PORT), () => {
    console.log(`Server running on port ${PORT}`);
});
