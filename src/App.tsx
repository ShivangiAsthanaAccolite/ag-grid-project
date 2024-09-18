import ChartExample from "./component/charts/index";
import ChartTypeExample from "./component/chartTypes/index";
import GridExample from "./component/GridExample";
import MyComponent from "./component/MyComponent";

function App() {
  return (
    <>
      <MyComponent />
      <hr></hr>
      <GridExample />
      <hr></hr>
      <ChartExample />
      <hr></hr>
      <ChartTypeExample />
    </>
  );
}

export default App;
