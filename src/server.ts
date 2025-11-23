import express from "express";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
