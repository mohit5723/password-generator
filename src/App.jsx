import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

  const[length,setLength] = useState(8);
  const[isNum,setIsNum] = useState(false);
  const[isChar,setIsChar] = useState(false);
  const[copy,setCopy] = useState(false)

  //! password field ko update krne k liye
  const[password,setPassword]= useState("")


  // useCallback uses concept of memorization which handles the pvs stored value and makes changes in it as per need

  const passwordGenerator = useCallback (()=>{

    // to update pass
    let pass = ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNum){
      str += "0123456789"
    }
    if(isChar){
      str += "@#$&*"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length,isChar,isNum,setPassword]) //! setpassword isliye diya h kyuki memorization ka concept h to koi field jism memory store ho rhy vo use krege for optimization

  useEffect(()=>{
    passwordGenerator() 
  },[length,isNum,isChar,passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  },[password])

  let passwordRef = useRef(null)

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >{copy ? 'Copied' : 'copy'}</button>
          
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={isNum}
              id="numberInput"
              onChange={() => {
                  setIsNum((prev) => !prev);
              }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
              <input
                  type="checkbox"
                  defaultChecked={isChar}
                  id="characterInput"
                  onChange={() => {
                      setIsChar((prev) => !prev )
                  }}
              />
              <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
    </div>
    </>
  )
}

export default App
