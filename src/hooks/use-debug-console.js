import { useEffect } from "react";

export default function useDebugConsoleLog(Value,name){
useEffect(() => {
    console.log(`${name}:`, Value);
  }, [Value]);

}