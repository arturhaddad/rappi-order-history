import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import {
  TableContainer as Container,
  TablePaymentLine as PaymentLine,
  TableProductImage as ProductImage,
} from './styles';
import { HistoryResponse, Order, Product } from './types';

function Table() {
  const [history, setHistory] = useState<HistoryResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>();

  const queryParams = new URLSearchParams(window.location.search);
  const results = queryParams.get('results');

  const historyEndpoint = `https://v2.rappi.com.br/api/orders/history-user?page=1&per_page=${
    results || '100'
  }`;
  const detailsEndpointPrefix =
    'https://services.rappi.com.br/order-resume/fully/';
  const imagePrefix = 'https://images.rappi.com.br/products/';

  const getProductNames = (products: Product[]) =>
    products.map((e) => e.name).join(', ');

  const getOrderImage = (order: Order) => {
    let imageUrl =
      'https://via.placeholder.com/100x100/cccccc/969696?text=No+image';
    if (order.products.length > 0) {
      imageUrl = imagePrefix + order.products[0].image;
    }

    return <ProductImage src={imageUrl} />;
  };

  const fetchOrderDetails = async (id: number) => {
    const endpoint = detailsEndpointPrefix + id;
    try {
      const response = await api(token || '').get(endpoint);
      const details = response.data;

      if (history) {
        const newData = history.data.map((e) => {
          if (e.id !== id) {
            return e;
          } else {
            return { ...e, details };
          }
        });
        const newHistory = { ...history, data: newData };
        setHistory(newHistory);
      }
    } catch (err) {
      const coercedErr = err as any;
      alert(coercedErr.message as string);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api(token || '').get(historyEndpoint);
      console.log(response.data);
      setHistory(response.data);
    } catch (err) {
      const coercedErr = err as any;
      alert(coercedErr.message as string);
      delete localStorage.rappiToken;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  useEffect(() => {
    let newToken;
    if (localStorage.rappiToken) {
      newToken = localStorage.rappiToken;
    } else {
      newToken = prompt('Por favor, insira seu token da Rappi:'); // eslint-disable-line no-alert
      localStorage.rappiToken = newToken;
    }
    setToken(newToken || undefined);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {!token && (
            <p>
              Por favor, insira um token da Rappi para carregar seus pedidos.
            </p>
          )}
          {history && (
            <Container>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Imagem</th>
                  <th>Valor</th>
                  <th>Estabelecimento</th>
                  <th>Produtos</th>
                  <th>Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {history?.data.map((e) => (
                  <tr key={e.id}>
                    <td>{e.created_at}</td>
                    <td>{getOrderImage(e)}</td>
                    <td>{e.total_value}</td>
                    <td>{e.store.name}</td>
                    <td>{getProductNames(e.products)}</td>
                    <td>
                      {e.details ? (
                        <div>
                          {e.details.totals.map((i) => (
                            <PaymentLine key={i.index}>
                              <div>
                                <strong>{i.description}</strong>
                              </div>
                              <div>{i.value}</div>
                            </PaymentLine>
                          ))}
                          <br />
                          <PaymentLine>
                            <div>
                              <strong>Cartão</strong>
                            </div>
                            <div>
                              {e.details.cc_data.card_type} (
                              {e.details.cc_data.last_four_digits})
                            </div>
                          </PaymentLine>
                        </div>
                      ) : (
                        <button onClick={() => fetchOrderDetails(e.id)}>
                          Carregar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

export default Table;
