import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageRouting from "./Routes";
import SidebarComponent from "./components/SidebarComponent/SidebarComponent";
import { API_GET_ORDERS, API_SET_NEW_ORDER } from "./redux/actions/main";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: API_GET_ORDERS });
  }, []);

  return (
    <main className="app">
      <aside className="app__aside">
        <SidebarComponent />
      </aside>
      <section className="app__section">
        <PageRouting />
      </section>
    </main>
  );
}

export default App;
