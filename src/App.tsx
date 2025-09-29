import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from './routes';
import { Toast } from './components/toast';

export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
