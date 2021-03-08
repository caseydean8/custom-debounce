// import { useState } from 'react';
// import API from "../utils/API";

const UseDebounce = (value, delay) => {
  // console.log('debouncing it!!!');
  // let stall = "";
  console.log(`value: ${value}, delay: ${delay}`);
  setTimeout(()=> {
    console.log(`value in timeout: ${value}`);
    // stall = value;
    console.log("test again");
    return value
  }, delay);
  // return stall;
};

export default UseDebounce;
