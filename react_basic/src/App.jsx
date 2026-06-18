import { useState } from 'react'
import './App.css'
import Header from "./components/Header"
import Greeting from "./components/Greeting"
import Counter from "./components/Counter"
import InputState from "./components/InputState"
import ListRender from "./components/ListRender"
import ConditionalRender from "./components/ConditionalRender"
import UseEffectRender from "./components/UseEffectRender"
import OllamaChat from "./components/OllamaChat"

function App() {
  // const title = "로컬 LLM 채팅 앱";

  return(
    <div>
      {/* <h1>{title}</h1>; */}
      <Header />
      <OllamaChat />
      <hr />
      <Greeting />
      <hr />
      <Counter />
      <InputState />
      <ListRender />
      <ConditionalRender />
      <UseEffectRender />

    </div>
  )
}

export default App;

