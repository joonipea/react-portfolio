import React, {useEffect, useState} from "react";
import "./DynamicBackground.css";

export const DynamicBackground = () => {
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    
   const getMousePos = (e) => {
        setMousePos({x: e.clientX, y: e.clientY});
    }
    
    useEffect(() => {
        document.addEventListener("mousemove", getMousePos);
        return () => document.removeEventListener("mousemove", getMousePos);
    }
    , []);

    return (
        <div className="dynamic-background">
            <div className="blur"></div>
            <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, -${mousePos.y / 8}px)`}}>
                <div className="dynamic-panel" style={{transform: `translate(-${mousePos.x / 8}px, -${mousePos.y / 8}px)`}}>
                    <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                        <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                            <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                                <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                                    <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                                        <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                                            <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                                                <div className="dynamic-panel" style={{transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`}}>
                                                    <div className="dynamic-panel" style={{transform: `translate(${mousePos.x}px, ${mousePos.y}px)`}}>
                                                        <div className="dynamic-panel" style={{transform: `translate(${mousePos.x}px, ${mousePos.y}px)`}}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};
