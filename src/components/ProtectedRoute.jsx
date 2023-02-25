import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { IsLoggedIn } from '../lib/Context';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(IsLoggedIn);

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;