const express = require("express");
const router = express.Router();
const { registerUser , Login , GetUser,updateUser,deleteUser,GetUserByEmail } = require("./Controllers/userController");
const authMiddleware = require("./Middleware/authMiddleware");

const {
    createShirt,
    getShirts,
    updateShirt,
    deleteShirt,
  } = require("./Controllers/shirtController");

router.post("/users", registerUser);
router.get("/users", GetUser);
router.post("/login", Login);
router.put("/update/:id", updateUser);
router.delete("/delete",deleteUser);
router.get("/users/:email",GetUserByEmail)
router.post("/Shirt", createShirt);
router.get("/Shirt", getShirts);
router.put("/Shirt/:ShirtId", updateShirt);
router.delete("/Shirt", deleteShirt);


module.exports = router;
