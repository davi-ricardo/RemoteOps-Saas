// Arquivo de configuração do cliente HTTP Axios
import axios from "axios";

// Cria uma instância do Axios com a URL base da API
// Se estiver rodando em localhost (desenvolvimento), usa localhost:3000
// Se estiver rodando em produção (VPS), usa o hostname da página com a porta 3000
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? "http://localhost:3000" 
    : `http://${window.location.hostname}:3000`
});

// Interceptor de requisição: adiciona o token JWT automaticamente no header Authorization
// Isso evita ter que enviar o token manualmente em cada requisição
api.interceptors.request.use(config => {
  // Busca o token armazenado no localStorage
  const token = localStorage.getItem("token");
  // Se o token existir, adiciona no header Authorization no formato "Bearer <token>"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
