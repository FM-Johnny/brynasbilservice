import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sv } from 'date-fns/locale/sv';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './BookingForm.css'; // Import custom styles for modal

export const BookingFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [services, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/services')
        .then(response => setServices(response.data))
        .catch(error => console.error('Error fetching services:', error));
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      customerName,
      customerEmail,
      customerPhone,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
    };

    axios.post('/api/bookings', bookingData)
      .then(() => {
        alert('Bokning skickad!');
        onClose();
      })
      .catch(error => {
        console.error('Error submitting booking:', error);
        alert('Ett fel inträffade. Försök igen.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2 className="modal-title">Boka en tid</h2>

          <label className="modal-label">
            Datum:
            <DatePicker
              selected={selectedDate ? new Date(selectedDate) : null}
              onChange={(date) => setSelectedDate(date)}
              locale={sv}
              dateFormat="dd/MM/yyyy"
              className="modal-input"
              placeholderText="Välj ett datum"
              required
            />
          </label>

          <label className="block mb-2">
            Tid:
            <TimePicker
              onChange={setSelectedTime}
              value={selectedTime}
              clockIcon={null}
              disableClock={true}
              format="HH:mm"
              className="modal-input"
              required
            />
          </label>

          <label className="modal-label">
            Tjänst:
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="modal-input"
              required
            >
              <option value="">Välj en tjänst</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </label>

          <label className="modal-label">
            Namn:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="modal-input"
              required
            />
          </label>

          <label className="modal-label">
            E-post:
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="modal-input"
              required
            />
          </label>

          <label className="modal-label">
            Telefon:
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="block w-full p-2 border rounded"
              required
            />
          </label>

          <button type="submit" className="modal-submit">
            Skicka bokning
          </button>
        </form>
      </div>
    </div>
  );
};