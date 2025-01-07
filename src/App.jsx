import Header from "./Header";
import AppMain from "./AppMain";
import Footer from "./Footer";
import "./styles/app.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <AppMain />
      <Footer />
    </div>
  );
};

export default App;
