'use client';
import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

const CircularWheel = () => {
    const [items] = useState([
        { name: 'Free', probability: 10, color: '#FF6B6B' },
        { name: 'No', probability: 20, color: '#4ECDC4' }
    ]);

    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);
    const wheelRef = useRef(null);

    const normalizeProbabilities = () => {
        const total = items.reduce((sum, item) => sum + item.probability, 0);
        return items.map(item => ({
            ...item,
            probability: (item.probability / total) * 100
        }));
    };

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setWinner(null);

        const normalizedItems = normalizeProbabilities();
        const random = Math.random() * 100;
        let cumulativeProbability = 0;
        let selectedIndex = 0;

        for (let i = 0; i < normalizedItems.length; i++) {
            cumulativeProbability += normalizedItems[i].probability;
            if (random <= cumulativeProbability) {
                selectedIndex = i;
                break;
            }
        }

        const extraSpins = 5;
        const baseRotation = 360 * extraSpins;
        const itemRotation = (360 / items.length) * selectedIndex;
        const finalRotation = baseRotation + itemRotation;

        setRotation(rotation + finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setWinner(items[selectedIndex].name);
        }, 5000);
    };

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-8">
                {/* Wheel Section */}
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
                            <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
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

                                    // Calculate text rotation and position
                                    const midPercent = (startPercent + endPercent) / 2;
                                    const [textX, textY] = getCoordinatesForPercent(midPercent);
                                    const textAngle = (midPercent * 360) + 90;
                                    const textDistance = 0.65;  // Distance from center (0-1)

                                    return (
                                        <g key={i}>
                                            <path
                                                d={pathData}
                                                fill={item.color}
                                            />
                                            <text
                                                x={textX * textDistance}
                                                y={textY * textDistance}
                                                fontSize="0.12"
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
                        bg-blue-500 hover:bg-blue-600 text-white rounded-full p-6 shadow-lg 
                        disabled:opacity-50 z-20"
                        >
                            <Play size={32} />
                        </button>
                    </div>
                </div>

                {/* Controls Section */}

                {winner && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                        <p className="font-bold">Kết quả: {winner}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CircularWheel;