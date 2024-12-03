import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Index from './Routes/Index';
import IndexRoutes from './Routes/Index';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './Utils/Theme';

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', background: "green" } }}>
    
       <IndexRoutes/>
    
    </ChakraProvider>
    
  );
}

export default App;
