import Header from "./Header";
import AppMain from "./AppMain";
import Footer from "./Footer";
import "./styles/App.css";
// import Login from "./Login";

const App = () => {
  return (
    <div className="app">
      <Header />
      <AppMain />
      <Footer />
      {/* <Login /> */}
    </div>
  );
};

export default App;
