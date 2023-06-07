import { Button } from "@material-tailwind/react";
import useTitle from "./hooks/useTitle";

function App() {

  return (
    <>
      {
        useTitle()
      }
      <Button>Button</Button>
    </>
  )
}

export default App
