import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductRegistration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: parseFloat(price),
      available,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setMessage('Produto cadastrado com sucesso!');
        setTimeout(() => {
          navigate('/');
        }, 1000); // Redireciona após 1 segundo
      } else {
        setMessage('Erro ao cadastrar produto. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Cadastro de Produtos</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Preço:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Disponível:</label>
          <div>
            <button
              type="button"
              onClick={() => setAvailable(1)}
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                backgroundColor: available === 1 ? 'green' : 'lightgray',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Sim
            </button>
            <button
              type="button"
              onClick={() => setAvailable(0)}
              style={{
                padding: '10px 20px',
                backgroundColor: available === 0 ? 'red' : 'lightgray',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Não
            </button>
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default ProductRegistration;
