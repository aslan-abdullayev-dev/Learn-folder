import './App.css'

import CompositionInput from "./components/CompositionInput/index.ts";

function App() {

  return (
    <CompositionInput>
      <CompositionInput.Header>
        header dynamic content
      </CompositionInput.Header>
      <CompositionInput.Body>
        body dynamic content
      </CompositionInput.Body>
    </CompositionInput>
  )
}

export default App
