import React from 'react'
import {render} from "react-dom";

const Second = <div style={{color: "pink"}}>我是第二个入口文件</div>

render(<Second />,document.getElementById('root'))



// document.getElementById('root').appendChild(hello);

