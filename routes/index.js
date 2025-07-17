// routes/index.js
const express = require('express');
const router = express.Router();

// Middlewares & Controllers
const { signupValidation, loginValidation } = require('../middlewares/validation');
const { signup } = require('../controllers/signup');
const { login } = require('../controllers/login');
const { products, upload } = require('../controllers/Products');
const { getproducts } = require('../controllers/getproducts');
const { createPaymentIntent } = require('../controllers/Appointment');
const { verifyPayment } = require('../controllers/payments');
const { services } = require('../controllers/Services');
const { verifyemail } = require('../controllers/Verifyemail');
const { requestotp, verifyotp, resetpassword } = require('../controllers/Otp');
const {
  getProductOrders,
  shipOrder,
  updateQuantity,
} = require('../controllers/productorders');
const {
  getPhotoshootBookings,
  getArtistBookings,
  getBridalBookings,
  getOnlineAppointments,
  
} = require('../controllers/Viewproducts');

// ─── AUTH ─────────────────────────────────────────────────────────────────────
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

// ─── PRODUCT MANAGEMENT ─────────────────────────────────────────────────────────
router.get('/products', getproducts);
router.post('/addproducts', upload.single('image'), products);

// ─── OTP & EMAIL VERIFICATION ──────────────────────────────────────────────────
router.post('/check-email', verifyemail);
router.post('/request-otp', requestotp);
router.post('/verify-otp', verifyotp);
router.post('/reset-password', resetpassword);

// ─── PRODUCT ORDERS ────────────────────────────────────────────────────────────
router.get('/product-orders', getProductOrders);
router.post('/send-shipping-email', shipOrder);
router.post('/update-quantity', updateQuantity);

// ─── SERVICES PAYMENT ───────────────────────────────────────────────────────────
router.post('/services/online-appointment', createPaymentIntent);
router.post('/payment/verify', verifyPayment);

// ─── BOOKINGS & APPOINTMENTS ───────────────────────────────────────────────────
router.get('/photoshoot-bookings', getPhotoshootBookings);
router.get('/artist-bookings', getArtistBookings);
router.get('/bridal-bookings', getBridalBookings);
router.get('/online-appointments', getOnlineAppointments);

// ─── (OPTIONAL) COMBINED PRODUCT ORDERS CONTROLLER ─────────────────────────────
// If you have a separate combined view:

module.exports = router;
