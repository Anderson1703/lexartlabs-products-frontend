import { Route, Routes } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import ProductsPage from '../pages/products'
import ProductDetailsPage from '../pages/product-details'
import ProductsLogsPage from '../pages/products-logs'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/auth">
                <Route path="login" element={<LoginPage/>} />
                <Route path="register" element={<RegisterPage/>} />
            </Route>
            <Route path="/products" element={<ProductsPage/>} >
                <Route path=":productUUID" element={<ProductDetailsPage/>} />
            </Route>
            <Route path="/products-logs" element={<ProductsLogsPage/>} />
        </Routes>
    )
}
