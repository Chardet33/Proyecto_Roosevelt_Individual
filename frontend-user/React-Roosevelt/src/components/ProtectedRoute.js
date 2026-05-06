// import { Navigate } from "react-router-dom";
// export default function ProtectedRoute({ children }) {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const isAdmin = user?.roles?.includes("ROLE_ADMIN");
//    if (!isAdmin) {
//     return <Navigate to="/" replace />; 
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}