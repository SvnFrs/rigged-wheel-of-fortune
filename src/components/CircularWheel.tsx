'use client';
import React, { useState, useRef } from 'react';
import './circle.css';
import Image from 'next/image';
const CircularWheel = () => {
    const [items] = useState([
        { index: 1, name: '3 phần trứng', probability: 10, color: '#b85eac' },
        { index: 2, name: '1 phần Trứng', probability: 20, color: '#6b5c41' },
        { index: 3, name: '1 trái cây dầm', probability: 10, color: '#FFD93D' },
        { index: 4, name: '1 trái cây lắc', probability: 20, color: '#6A0572' },
        { index: 5, name: 'Nothing', probability: 10, color: '#FF6B6B' },
        { index: 6, name: 'Combo 3 món free', probability: 20, color: '#4ECDC4' }
    ]);

    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const wheelRef = useRef(null);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setWinner(null);

        const numRotations = 10;
        const segmentSize = 360 / items.length;
        let randomSegment = 0;
        do {
            randomSegment = Math.floor(Math.random() * items.length);
            console.log(randomSegment);
        } while (randomSegment !== 1);

        const randomOffset = Math.random() * segmentSize;
        let finalRotation = 0;
        finalRotation = (numRotations * 360) + (randomSegment * segmentSize) + randomOffset;
        const winningIndex = items.length - Math.floor(((finalRotation % 360) / segmentSize)) - 1;
        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setWinner(items[winningIndex].name);
            setShowModal(true);
        }, 5000);
    };

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    const resetPage = () => {
        window.location.reload();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-8">
                <div className="flex-1 relative">
                    <div className="relative w-96 h-96 mx-auto">
                        {/* Triangle Pointer */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                            <div className="w-8 h-8 bg-red-500 transform rotate-45"></div>
                        </div>

                        {/* Wheel */}
                        <div
                            ref={wheelRef}
                            className="w-full h-full rounded-full relative overflow-hidden border-8 border-gray-200"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                            }}
                        >
                            <svg viewBox="-1 -1 2 2" className="items w-full h-full transform -rotate-90">
                                {items.map((item, i) => {
                                    const startPercent = i / items.length;
                                    const endPercent = (i + 1) / items.length;

                                    const [startX, startY] = getCoordinatesForPercent(startPercent);
                                    const [endX, endY] = getCoordinatesForPercent(endPercent);

                                    const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;

                                    const pathData = [
                                        `M ${startX} ${startY}`,
                                        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                                        'L 0 0'
                                    ].join(' ');

                                    const midPercent = (startPercent + endPercent) / 2;
                                    const [textX, textY] = getCoordinatesForPercent(midPercent);
                                    const textAngle = (midPercent * 360) + 90;
                                    const textDistance = 0.65;

                                    return (
                                        <g key={i}>
                                            <path
                                                d={pathData}
                                                fill={item.color}
                                            />
                                            <text
                                                x={textX * textDistance}
                                                y={textY * textDistance}
                                                fontSize="0.07"
                                                textAnchor="middle"
                                                fill="white"
                                                transform={`rotate(${textAngle} ${textX * textDistance} ${textY * textDistance})`}
                                                className="font-bold"
                                            >
                                                {item.name}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Spin Button */}
                        <button
                            onClick={spinWheel}
                            disabled={isSpinning}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                bg-blue-500 hover:bg-blue-600 text-white rounded-full  shadow-lg 
                                disabled:opacity-50 z-20"
                        >
                            <Image src="/mascot.png" width={50} height={50} alt="Spin the wheel" />
                        </button>
                    </div>
                </div>

                {winner && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                        <p className="font-bold">Kết quả: {winner}</p>
                    </div>
                )}

                {showModal && (
                    <div className="popup">
                        <div className="content">
                            <p className="title">Do you want to play again?</p>
                            <div className="btn">
                                <button
                                    onClick={resetPage}
                                    className="again"
                                >
                                    Play Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CircularWheel;