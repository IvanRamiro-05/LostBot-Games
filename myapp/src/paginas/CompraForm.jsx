import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Estilos/CompraForm.css';

const CompraForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state || { game: null };
  
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Colombia'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!game) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          No se encontró información del juego para completar la compra.
        </div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => navigate('/games')}
        >
          Volver a la tienda
        </button>
      </div>
    );
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) newErrors.cardName = 'El nombre es requerido';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'La fecha de vencimiento es requerida';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/YY)';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 o 4 dígitos';
    }
    
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'El código postal es requerido';
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulación de proceso de compra
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/Compra-success', { 
        state: { 
          game,
          orderNumber: Math.floor(Math.random() * 1000000) 
        } 
      });
    }, 2000);
  };
  
  return (
    <div className="Compra-container">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h2 className="mb-0">Formulario de Compra</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Detalles del juego */}
                  <div className="mb-4 border-bottom pb-4">
                    <h5>Detalles del Producto</h5>
                    <div className="row">
                      <div className="col-3">
                        <img 
                          src={game.image} 
                          alt={game.title} 
                          className="img-fluid rounded" 
                        />
                      </div>
                      <div className="col-9">
                        <h4>{game.title}</h4>
                        <p>{game.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Información de pago */}
                  <div className="mb-4">
                    <h5 className="mb-3">Información de Pago</h5>
                    
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="cardName">Nombre en la tarjeta</label>
                      <input 
                        type="text" 
                        id="cardName" 
                        name="cardName"
                        className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                        value={formData.cardName}
                        onChange={handleChange}
                      />
                      {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                    </div>
                    
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="cardNumber">Número de tarjeta</label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        name="cardNumber"
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="expiryDate">Fecha de vencimiento (MM/YY)</label>
                        <input 
                          type="text" 
                          id="expiryDate" 
                          name="expiryDate"
                          className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="cvv">CVV</label>
                        <input 
                          type="text" 
                          id="cvv" 
                          name="cvv"
                          className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="XXX"
                        />
                        {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                      </div>
                    </div>
                    
                    {/* Información de envío */}
                    <h5 className="mb-3">Dirección</h5>
                    
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="address">Dirección</label>
                      <input 
                        type="text" 
                        id="address" 
                        name="address"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="city">Ciudad</label>
                        <input 
                          type="text" 
                          id="city" 
                          name="city"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          value={formData.city}
                          onChange={handleChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="zipCode">Código Postal</label>
                        <input 
                          type="text" 
                          id="zipCode" 
                          name="zipCode"
                          className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                        {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                      </div>
                    </div>
                    
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="country">País</label>
                      <select 
                        className="form-select" 
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="Colombia">Colombia</option>
                        <option value="México">México</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Chile">Chile</option>
                        <option value="Perú">Perú</option>
                        <option value="España">España</option>
                      </select>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Procesando...' : 'Completar Compra'}
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary btn-lg w-100 mt-3"
                      onClick={() => navigate('/')}
                    >
                      Cancelar y Volver
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Resumen</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    {game.title}
                    <span>${game.price}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Impuestos
                    <span>${(parseFloat(game.price) * 0.19).toFixed(2)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total</strong>
                    </div>
                    <span><strong>${(parseFloat(game.price) + parseFloat(game.price) * 0.19).toFixed(2)}</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraForm;