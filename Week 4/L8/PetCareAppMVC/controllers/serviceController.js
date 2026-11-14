const petModel = require('../models/petModel');
const serviceModel = require('../models/serviceModel');
const serviceBookingModel = require('../models/serviceBookingModel');

const validationMessage = 'Choose a pet, service, and valid booking date.';
const unavailableMessage = 'That pet or service is unavailable for booking.';
const saveErrorMessage = 'Unable to create the booking. Please try again.';
const successMessage = 'Booking created. Payment is pending; no payment has been processed.';

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parsePositiveId(value) {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

function isValidBookingDate(value, today) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);

  return year >= 1000
    && date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day
    && value >= today;
}

function listServices(req, res) {
  const ownerId = req.session.user.id;

  petModel.getPetsByOwner(ownerId, (petError, pets) => {
    if (petError) {
      console.error('Error loading pets for service booking:', petError);
      return res.status(500).send('Unable to load pets.');
    }

    serviceModel.getActiveServices((serviceError, services) => {
      if (serviceError) {
        console.error('Error loading active services:', serviceError);
        return res.status(500).send('Unable to load services.');
      }

      const requestedPetId = req.query.petId;
      const selectedPet = pets.find((pet) => String(pet.id) === requestedPetId);
      return res.render('services', {
        pets,
        services,
        selectedPetId: selectedPet ? String(selectedPet.id) : '',
        today: getToday(),
        messages: req.flash('success'),
        errors: req.flash('error'),
        session: req.session
      });
    });
  });
}

function createBooking(req, res) {
  const petId = parsePositiveId(req.body.petId);
  const serviceId = parsePositiveId(req.body.serviceId);
  const bookingDate = req.body.bookingDate;
  const today = getToday();

  if (!petId || !serviceId || !isValidBookingDate(bookingDate, today)) {
    req.flash('error', validationMessage);
    return res.redirect('/services');
  }

  serviceBookingModel.createPendingBooking(
    req.session.user.id,
    petId,
    serviceId,
    bookingDate,
    (bookingError, result) => {
      if (bookingError) {
        console.error('Error creating service booking:', bookingError);
        req.flash('error', saveErrorMessage);
        return res.redirect(`/services?petId=${encodeURIComponent(String(petId))}`);
      }

      if (!result) {
        req.flash('error', unavailableMessage);
        return res.redirect('/services');
      }

      req.flash('success', successMessage);
      return res.redirect('/bookings');
    }
  );
}

function listBookings(req, res) {
  serviceBookingModel.getBookingsByOwner(req.session.user.id, (error, bookings) => {
    if (error) {
      console.error('Error loading booking history:', error);
      return res.status(500).send('Unable to load booking history.');
    }

    return res.render('bookings', {
      bookings,
      messages: req.flash('success'),
      errors: req.flash('error'),
      session: req.session
    });
  });
}

module.exports = {
  listServices,
  createBooking,
  listBookings
};
