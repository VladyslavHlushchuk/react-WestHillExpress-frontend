import React, { useState, useEffect, useRef, useCallback } from 'react';
import './QuoteForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns';
registerLocale('en-US', enUS);

const QuoteForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distance, setDistance] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formData, setFormData] = useState({
    vin: '',
    carType: '',
    condition: '',
    year: '',
    make: '',
    model: '',
    pickupDate: null,
    transportType: '',
    notes: '',
  });

  const [showClientFields, setShowClientFields] = useState(false);
  const [showVehicleFields, setShowVehicleFields] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const directionsRendererRef = useRef(null);

  const initAutocomplete = (id, setter) => {
    const input = document.getElementById(id);
    if (!input || !window.google) return;
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.setFields(['geometry', 'formatted_address']);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setter(place.formatted_address);
      }
    });
  };

  useEffect(() => {
    if (window.google && mapRef.current && !mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 4,
        center: { lat: 39.5, lng: -98.35 },
      });
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({ suppressMarkers: false });
      directionsRendererRef.current.setMap(mapInstance.current);

      initAutocomplete('from-location', setFrom);
      initAutocomplete('to-location', setTo);
    }
  }, []);

  const calculateDistance = useCallback(() => {
    if (!from || !to || !window.google) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && directionsRendererRef.current) {
          directionsRendererRef.current.setDirections(result);
          const distanceInMeters = result.routes[0].legs[0].distance.value;
          const miles = (distanceInMeters / 1609.34).toFixed(1);
          setDistance(miles);
          setShowClientFields(true);
        }
      }
    );
  }, [from, to]);

  useEffect(() => {
    if (from && to) {
      calculateDistance();
    }
  }, [from, to, calculateDistance]);

  useEffect(() => {
    if (clientInfo.name && clientInfo.email && clientInfo.phone) {
      setShowVehicleFields(true);
    }
  }, [clientInfo]);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isClientInfoFilled = clientInfo.name && clientInfo.email && clientInfo.phone;
  const isFormReadyToSubmit = Object.values(formData).every(field => field !== '' && field !== null) && isClientInfoFilled && distance;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormReadyToSubmit) return;

    const formattedDate = formData.pickupDate ? format(formData.pickupDate, 'MM/dd/yyyy') : '';

    const fullData = {
      from,
      to,
      distance,
      ...clientInfo,
      ...formData,
      pickupDate: formattedDate  // ← ось тут ми замінюємо дату на форматовану
    };
    

    setIsSending(true);

    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData)
      });

      if (res.ok) {
        toast.success('✅ Quote sent successfully!');
        setClientInfo({ name: '', email: '', phone: '' });
        setFormData({
          vin: '', carType: '', condition: '', year: '', make: '',
          model: '', pickupDate: null, transportType: '', notes: ''
        });
      } else {
        toast.error('❌ Something went wrong. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to connect to the server.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="quote-form-container">
      <h2>Request a Quote</h2>

      <div className="form-section-quote two-cols">
        <div className="form-group">
          <label>From</label>
          <input id="from-location" type="text" placeholder="Pickup location" />
        </div>
        <div className="form-group">
          <label>To</label>
          <input id="to-location" type="text" placeholder="Delivery location" />
        </div>
      </div>

      {distance && (
        <p className="quote-distance"><strong>Distance:</strong> {distance} mi</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={`fade-section ${showClientFields ? 'visible' : ''}`}>
          <div className="form-section-quote three-cols">
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={clientInfo.name} onChange={handleClientChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={clientInfo.email} onChange={handleClientChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={clientInfo.phone} onChange={handleClientChange} />
            </div>
          </div>
        </div>

        <div className={`fade-section ${showVehicleFields ? 'visible' : ''}`}>
          <div className="form-section-quote three-cols">
            <div className="form-group">
              <label>VIN</label>
              <input name="vin" value={formData.vin} onChange={handleAdditionalChange} />
            </div>
            <div className="form-group">
              <label>Car Type</label>
              <select name="carType" value={formData.carType} onChange={handleAdditionalChange}>
                <option value="">Select</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="pickup">Pickup</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
              </select>
            </div>
            <div className="form-group">
              <label>Condition</label>
              <div className="radio-inline">
                <label><input type="radio" name="condition" value="Running" checked={formData.condition === 'Running'} onChange={handleAdditionalChange} /> Running</label>
                <label><input type="radio" name="condition" value="Not Running" checked={formData.condition === 'Not Running'} onChange={handleAdditionalChange} /> Not Running</label>
              </div>
            </div>
          </div>

          <div className="form-section-quote three-cols">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="year"
                min="1920"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleAdditionalChange}
              />
            </div>
            <div className="form-group">
              <label>Make</label>
              <input name="make" value={formData.make} onChange={handleAdditionalChange} />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input name="model" value={formData.model} onChange={handleAdditionalChange} />
            </div>
          </div>

          <div className="form-section-quote three-cols">
            <div className="form-group">
              <label>Pickup Date</label>
              <DatePicker
                selected={formData.pickupDate}
                onChange={(date) =>
                  setFormData(prev => ({ ...prev, pickupDate: date }))
                }
                placeholderText="Earliest Pickup Date"
                dateFormat="MM/dd/yyyy"
                locale="en-US"
                className="form-control"
                minDate={new Date()}
                isClearable
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
            <div className="form-group">
              <label>Transport Type</label>
              <select name="transportType" value={formData.transportType} onChange={handleAdditionalChange}>
                <option value="">Select</option>
                <option value="open">Open</option>
                <option value="enclosed">Enclosed</option>
              </select>
            </div>
          </div>

          <div className="form-section-quote full-width">
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleAdditionalChange}></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={!isFormReadyToSubmit || isSending}>
            {isSending ? 'Sending...' : 'Send Quote'}
          </button>
        </div>

        <div className="quote-map" ref={mapRef}></div>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default QuoteForm;
