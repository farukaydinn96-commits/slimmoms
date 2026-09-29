import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import AppContent from './AppContent';
import Loader from './components/Loader/Loader';

const App = () => {
  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <AppContent />
    </PersistGate>
  );
};

export default App;
