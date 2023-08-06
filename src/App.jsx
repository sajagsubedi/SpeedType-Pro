import { Header, Footer, Main } from "./Components/index";

export default function App() {
  return (
    <div className="min-h-[100vh] bg-gray-900">
      <Header />
      <hr />
      <Main />
      <hr />
      <Footer />
    </div>
  );
}
