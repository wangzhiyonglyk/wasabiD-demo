import React from "react"
import { Resize } from "../../component";
import { createRoot } from "react-dom/client";
  function Page(){
    return <Resize><div>fsdfsdf</div></Resize>
 }

 const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
