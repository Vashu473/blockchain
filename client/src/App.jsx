import {
  Loader,
  Navbar,
  Transaction,
  Services,
  Welcome,
  Footer,
} from "./components/index";
const App = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Welcome />
      </div>
      <Transaction />
      <Services />
      <Footer />
    </div>
  );
};

export default App;
