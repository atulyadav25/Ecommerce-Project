const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');


router.post("/register", registerUser);                                             // Register A User (Create A User)
router.post("/login", loginUser);                                                  // Login A User 
router.get("/me", isAuthenticatedUser, getUserDetail);                            // Access user detail
router.post("/password/forgot", forgotPassword)                                  // Password Forget
router.put("/password/reset/:token", resetPassword)                             // Reset Password
router.put("/password/update", isAuthenticatedUser, updatePassword)            // Update Password
router.put("/me/update", isAuthenticatedUser, updateProfile)                  // Update Password
router.get("/logout", logoutUser);                                           // Logout A User 



// Admin
router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"), getAllUsers)       // Get All Users (Admin)
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"), getSingleUser)       // Get Single User (Admin)
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"), updateUserRole)       // Update User (Admin)
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"), deleteUser)       // Delete User (Admin)


module.exports = router;