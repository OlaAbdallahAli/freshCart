import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let tokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </tokenContext.Provider>
  );
}
