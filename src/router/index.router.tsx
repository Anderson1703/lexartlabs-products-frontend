import { Route, Routes } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import ProductsPage from '../pages/products'
import ProductDetailsPage from '../pages/product-details'
import ProductsLogsPage from '../pages/products-logs'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Router() {

    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/auth">
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                    </Route>
                    <Route path="/products" >
                        <Route path="" element={<ProductsPage />} />
                        <Route path=":productUUID/details" element={<ProductDetailsPage />} />
                    </Route>
                    <Route path="/products-logs" element={<ProductsLogsPage />} />
                </Routes>
            </QueryClientProvider>
            <ToastContainer />
        </>
    )
}
