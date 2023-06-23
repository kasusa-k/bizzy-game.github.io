import React, {ReactNode, useRef} from "react";
import './styles.sass';

interface OverlayProps {
    hiddenDefault?: boolean
    obj: { hide?: () => void, show?: () => void }
    children: ReactNode
}

export default function Overlay({ obj, children, hiddenDefault }: OverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    obj.hide = () => {
        if (overlayRef.current) {
            overlayRef.current.style.display = "none"
        }
    }

    obj.show = () => {
        if (overlayRef.current) {
            overlayRef.current.style.display = "block"
        }
    }

    return (
        <div ref={overlayRef} className="overlay" style={{ display: hiddenDefault ? "none" : "block" }}>
            <div className="overlay_children">
                {children}
            </div>
        </div>
    )
}
