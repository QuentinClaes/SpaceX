import { Provider } from "react-redux";
import configureStore from "./store/store";
import Posts from "./components/posts";


const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>
            <Posts />
        </Provider>
    );
};

export default App;