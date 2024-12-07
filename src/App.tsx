import { Filters } from "./components/Filters";
import { AntConfigProvider } from "./AntConfigProvider";
import { Flex } from "antd";
import { BrowserRouter } from "react-router-dom";
import { List } from "./components/List";

function App() {
  return (
    <BrowserRouter>
      <AntConfigProvider>
        <Flex
          vertical
          gap="large"
          className="p-10"
          justify="center"
          align="center"
        >
          <Filters />
          <List />
        </Flex>
      </AntConfigProvider>
    </BrowserRouter>
  );
}

export default App;
