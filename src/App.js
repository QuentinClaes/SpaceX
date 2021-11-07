import { Provider } from "react-redux";
import configureStore from "./store/store";
import Posts from "./components/posts";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 10% 0 10%;
  background-color: #4d5061;
  font-family: system-ui;
`;

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Posts />
      </Wrapper>
    </Provider>
  );
};

export default App;
