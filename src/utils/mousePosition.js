import React, { useCallback } from 'react'
const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = React.useState({ x: null, y: null });
    const updateMousePosition = useCallback(
        (ev) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        },
        [],
    )
    React.useEffect(() => {

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, [updateMousePosition]);

    return mousePosition;
};
export default useMousePosition