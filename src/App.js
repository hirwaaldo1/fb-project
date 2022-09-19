import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './router/router';
function App() {
  if(localStorage.getItem('token')=== null || localStorage.getItem('token') === "" || localStorage.getItem('token') === undefined){
    localStorage.setItem('token',"")
  }
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
