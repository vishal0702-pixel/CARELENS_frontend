import { BrowserRouter } from "react-router";
import Home from "./components/home";
import { Provider } from "react-redux";
import{store} from "./store/store"

function App(){
  return (
    <>
    <Provider store={store}>
    <BrowserRouter><Home></Home></BrowserRouter>
    </Provider>
    </>
  )
}

export default App ;