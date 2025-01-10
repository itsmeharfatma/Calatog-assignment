import Tabs from "./components/Tabs";
import Price from "./components/Price";

const App = () => {
  return (
    <section className="max-md:container lg:max-w-6xl mx-auto p-4 fontStyle">
      <Price />
      <Tabs />
    </section>
  );
};

export default App;
