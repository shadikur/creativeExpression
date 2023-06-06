import { Button } from "@material-tailwind/react";
import useTitle from "./hooks/useTitle";

function App() {

  return (
    <>
      {
        useTitle("Home", "This is the home page")
      }
      <Button>Button</Button>
    </>
  )
}

export default App
