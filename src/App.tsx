import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Changevalues = {
  value: string,
  index: number
}

function App() {

  // strp 1
  const INPUT_SIZE = 5; 
  // step 1.2
  const [inputArr, setInputArr ] = useState<string[]>(new Array(INPUT_SIZE).fill(""));

  const refArr = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  // step 2.1
  const handleChange = ({ value, index }: Changevalues) => {

    // step 2.2
    if(isNaN(Number(value))) return;

    // step 2.1
    console.log(value, index);
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index]=newValue.slice(-1);  // addd lsive(-1) to remove multple inputs here it take only lsat input whatever you type here
    setInputArr(newArr);
    if (newValue) refArr.current[index + 1]?.focus();

  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // console.log(e.key);
    if(!e.currentTarget.value && e.key == "Backspace"){
      refArr.current[index-1]?.focus();
    }
  }


  return (
    <div className=' mt-4'>
      <h1 className="flex justify-center font-bold text-3xl underline">
       Validate -  OTP
      </h1>

      {/*  step 1.3  */}
      <div className="flex justify-center mt-4">
        {
          inputArr.map((_, index) => (
            <input 
            className="px-3 items-center border border-black w-10 h-10 text-2xl font-semibold"
            key={index} type="text" 
            value={inputArr[index]} 
            // step 3
            ref={(input) => { refArr.current[index] = input; }}
            // step 2.0
            onChange={(e) => handleChange({ value: e.target.value, index })}
            onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
