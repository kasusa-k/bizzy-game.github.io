import React from "react";
import './styles.sass';

interface BizzyDialogProps {
    title: string,
    subtitle: string,
    buttonText: string,
    onButtonClick?: () => void
    textWithImg?: {
        text: string,
        imgSrc: string
    },
}

export default function BizzyDialog({ title, subtitle, textWithImg, buttonText, onButtonClick }: BizzyDialogProps) {
    return (
        <div className="bizzy-dialog_container">
            <div className="bizzy-dialog_bizzy">
                <img src="/images/full_bizzy.png" />
                <span>Bizzy</span>
            </div>
            <div className="bizzy-dialog_text-container">
                <span>{title}</span>
                {subtitle}
                {textWithImg && <div className="bizzy-dialog_text-container_with-img">
                    <span>{textWithImg.text}</span>
                    <img src={textWithImg.imgSrc} />
                </div>}
                <div className="bizzy-dialog_text-container_button" onClick={onButtonClick}>
                    {buttonText}
                </div>
            </div>
        </div>
    )
}
