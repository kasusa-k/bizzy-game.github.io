import React from "react";
import "./styles.sass";

interface FullscreenComicsProps {
    imageSrc: string,
    backgroundColor: string
    onClick?: () => void
}

export default function FullscreenComics({ imageSrc, backgroundColor, onClick }: FullscreenComicsProps) {
    return (
        <div className="fullscreen-comics" style={{ backgroundColor: backgroundColor }}>
            <img src={imageSrc} onClick={onClick} />
        </div>
    )
}
