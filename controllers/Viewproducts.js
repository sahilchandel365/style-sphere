// backend/controllers/orders.js

// Make sure these paths & filenames match your actual files in /models
const PhotoshootBooking   = require('../models/Booking');
const ArtistBooking       = require('../models/Artist');
const BridalBooking       = require('../models/BridalBooking');
const OnlineAppointment   = require('../models/Appointment');


// GET /auth/photoshoot-bookings
const getPhotoshootBookings = async (req, res) => {
  try {
    const bookings = await PhotoshootBooking.find().lean();
    return res.json(bookings);
  } catch (error) {
    console.error('Error fetching photoshoot bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/artist-bookings
const getArtistBookings = async (req, res) => {
  try {
    const bookings = await ArtistBooking.find().lean();
    return res.json(bookings);
  } catch (error) {
    console.error('Error fetching artist bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/bridal-bookings
const getBridalBookings = async (req, res) => {
  try {
    const bookings = await BridalBooking.find().lean();
    return res.json(bookings);
  } catch (error) {
    console.error('Error fetching bridal bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /auth/online-appointments
const getOnlineAppointments = async (req, res) => {
  try {
    const appointments = await OnlineAppointment.find().lean();
    return res.json(appointments);
  } catch (error) {
    console.error('Error fetching online appointments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getPhotoshootBookings,
  getArtistBookings,
  getBridalBookings,
  getOnlineAppointments,
};
