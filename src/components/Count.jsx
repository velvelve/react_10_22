import { useState } from "react";


export const Count = () => {
    let [count, setCount] = useState(1);
    const handleClick = () => {
        setCount(++count);
    }

    return <div>
        <p>Count: {count}</p>
        <button type="button" onClick={handleClick}>Increase count</button>
    </div>
}
