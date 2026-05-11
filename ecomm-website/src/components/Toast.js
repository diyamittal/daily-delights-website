import React, { useEffect } from "react"
import '../style/toast.css'

export default function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`toast toast-${type}`}>
            {message}
        </div>
    )
}
