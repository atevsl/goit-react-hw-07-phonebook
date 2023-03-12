import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
