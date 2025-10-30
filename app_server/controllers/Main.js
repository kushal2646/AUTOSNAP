const Appointment = require('../models/appointmentModel'); 

/* GET Dashboard Page and fetch appointments */
const dashboard = (req, res) => {
    // 1. Fetch all appointments, sorted by date (ascending)
    Appointment.find()
        .sort({ preferredDate: 1 }) 
        .exec() 
        .then(appointments => {
            // 2. Render the dashboard.jade view, passing the fetched appointments
            res.render('dashboard', {
                title: 'User Dashboard - AUTOSNAP',
                appointments: appointments // Array passed to the Jade view
            });
        })
        .catch(err => {
            console.error('Error fetching appointments for dashboard:', err);
            // Handle error case
            res.render('dashboard', {
                title: 'User Dashboard - AUTOSNAP',
                error: 'Could not load appointments.',
                appointments: [] 
            });
        });
};

/* GET Appointment Management Page */
const appointmentManage = (req, res) => {
    const appointmentid = req.params.appointmentid;

    // Use findById to retrieve only the appointment with the matching ID
    Appointment.findById(appointmentid)
        .exec()
        .then(appointment => {
            if (!appointment) {
                // Handle case where no appointment is found for the given ID
                return res.status(404).render('error', { message: 'Appointment not found' });
            }

            // Render the new view, passing the single appointment object
            res.render('appointment-manage', {
                title: `Manage: ${appointment.service}`,
                appointment: appointment
            });
        })
        .catch(err => {
            console.error('Error fetching appointment for management:', err);
            res.status(500).render('error', { message: 'Error loading appointment details' });
        });
};


module.exports = {
    dashboard,
    appointmentManage
};