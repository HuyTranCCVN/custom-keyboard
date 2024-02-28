import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

export default function App() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    let input = event.target.value;
    const keyboardInput = keyboard.current.getInput();
    if (input >= keyboardInput) {
      input = keyboardInput;
    }

    setInput(input);
    keyboard.current.setInput(input);
  };

  // Japanese hiragana layout
  const japaneseHiraganaLayout = {
    default: [
      "あ い う え お か き く け こ",
      "さ し す せ そ た ち つ て と",
      "{shift} な に ぬ ね の は ひ ふ へ ほ",
      "{space} や ゆ よ ー わ を ん {bksp}",
    ],
    shift: [
      "1 2 3 4 5 6 7 8 9 0",
      "Q W E R T Y U I O P",
      "A S D F G H J K L :",
      "{shift} Z X C V B N M <",
      "( ) # % {space} & = - _",
      "{bksp}",
    ],
  };

  return (
    <div className="App">
      <input
        value={input}
        placeholder={"place holder"}
        onChange={onChangeInput}
        className={"input"}
      />
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        layout={japaneseHiraganaLayout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onModulesLoaded={() => {
          console.log("Modules loaded!");
        }}
      />
    </div>
  );
}
