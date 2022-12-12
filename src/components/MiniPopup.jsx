import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useMousePosition from '../utils/mousePosition'
const MiniPopup = props => {
    const mousePosition = useMousePosition()
    const minipopupFunctionRef = useRef(null)

    const closeOptionMenu = () => {
        let valid = document.activeElement.children[0] ? document.activeElement.children[0].classList : ""
        if (!(valid.value === "gridoption")) {
            minipopupFunctionRef.current.classList.remove('show')
            props.close()
            window.removeEventListener('click', closeOptionMenu)
        }
    }
    const openOptionMenu = () => {
        minipopupFunctionRef.current.style.top = `${mousePosition.y + 5 + document.documentElement.scrollTop}px`
        minipopupFunctionRef.current.style.left = `${mousePosition.x + 5}px`
        minipopupFunctionRef.current.classList.add('show')
        window.addEventListener('click', closeOptionMenu)
    }
    useEffect(() => {
        if (props.open) {
            openOptionMenu()
        }
    }, [props.open])
    return (
        <div className="minipopup">
            <div className="minipopup-function" ref={minipopupFunctionRef} >
                {
                    props.actions ?
                        props.actions.map((item, index) => {
                            return (
                                <div key={index} className="minipopup-function-item" onClick={item.click}>
                                    {item.name}
                                </div>
                            )
                        })

                        : <React.Fragment />
                }
            </div>
        </div>
    )
}

MiniPopup.propTypes = {
    actions: PropTypes.array,
    open: PropTypes.bool,
    close: PropTypes.func
}

export default MiniPopup
