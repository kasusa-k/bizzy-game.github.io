import React, {ReactNode, useRef} from "react";
import './styles.sass';

interface IOverlayController {
    isShow: boolean,
    hide: () => void,
    show: () => void
}

export const createOverlayObj = () => {
    return {
        isShow: false,
        hide: () => {},
        show: () => {}
    } as IOverlayController
}

interface OverlayProps {
    hiddenDefault?: boolean
    obj: IOverlayController
    children: ReactNode
}

export default function Overlay({ obj, children, hiddenDefault }: OverlayProps) {
    obj.isShow = hiddenDefault != null ? !hiddenDefault : false;

    const overlayRef = useRef<HTMLDivElement>(null)
    obj.hide = () => {
        if (overlayRef.current) {
            obj.isShow = false;
            overlayRef.current.style.display = "none"
        }
    }

    obj.show = () => {
        if (overlayRef.current) {
            obj.isShow = true;
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
