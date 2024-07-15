import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/products");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">HELLO, LEXARTLABS PRODUCTS!</h1>
    </div>
  );
}