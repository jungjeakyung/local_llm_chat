// import { useState } from 'react'

import Header from "./components/Header";
import Greeting from "./components/Greeting"
import Counter from "./components/Counter"
import InputState from "./components/InputState"
import ListRender from "./components/ListRender"
import ConditionalRender from "./components/ConditionalRender"
import UseEffectRender from "./components/UseEffectRender"
import OllamaChat from "./components/OllamaChat"
import { useState } from "react";

function App() {
  const [selectedModel, setSelectedModel] = useState("");

  return (
  

    <div>

    <Header />
      <>
      {/* ★ props 전달 */}
      <UseEffectRender
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <hr />

      {/* ★ props 전달 */}
      <OllamaChat selectedModel={selectedModel} />
    </>


      {/* <OllamaChat/> 
      <UseEffectRender/>   */}  
      <hr></hr>
      <Greeting />
      <Counter />
      <InputState />
      
      <ListRender />
        

      <ConditionalRender/>

      

    </div>

  );
}

export default App;
