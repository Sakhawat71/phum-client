import MainLayout from "./components/layout/MainLayout"
import ProtectedRoute from "./components/layout/ProtectedRoute"

function App() {
  return (
    <ProtectedRoute role="student">
      <MainLayout />
    </ProtectedRoute>
  )
};

export default App;
