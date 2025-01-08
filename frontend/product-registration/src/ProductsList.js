import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products/');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Erro ao buscar produtos');
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Produtos Cadastrados</h1>
      <button
        onClick={sortByPrice}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Ordenar por Preço (Menor para Maior)
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : products.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Descrição</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Preço</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Disponível</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>R$ {product.price.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {product.available === 1 ? 'Sim' : 'Não'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}

        <button
            onClick={() => navigate('/register')}
            style={{
            marginBottom: '20px',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            }}
        >
            Cadastrar Produto
        </button>
    </div>
  );
};

export default ProductList;
