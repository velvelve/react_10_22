export const Child = ({ name, handleCountChange }) => {

    const handleClick = () => {
        handleCountChange(prevCount => ++prevCount)
    }

    return <>
        <p>{name}</p>
        <button type="button" onClick={handleClick}>Increase parent count</button>
    </>
}