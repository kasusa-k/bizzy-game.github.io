import React from "react";
import './styles.sass';

interface BizzyProps {
    className?: string
}

export default function Bizzy({ className }: BizzyProps) {
    return (
        <div className={`bizzy ${className}`}>
            <img src="/images/bizzy.png" />
            <span>Bizzy</span>
        </div>
    )
}
