// ProtectedRoute.jsx
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { UseAuth } from "./UseAuth";

const ProtectedRouter = ({ children }) => {
  const { isAuthenticated } = UseAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
// PropTypes validation
ProtectedRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRouter;
