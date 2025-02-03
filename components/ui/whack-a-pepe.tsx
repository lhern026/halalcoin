import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const WhackAPepe = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [pepePosition, setPepePosition] = useState({ x: 0, y: 0 });
  const [showPepe, setShowPepe] = useState(false);
  
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setShowPepe(true);
  };

  const movePepe = useCallback(() => {
    if (!gameActive) return;
    
    // More constrained area for Pepe
    const x = Math.floor(Math.random() * 60) + 20;
    const y = Math.floor(Math.random() * 60) + 20;
    
    // Show new Pepe
    setPepePosition({ x, y });
    setShowPepe(true);
    
    // Keep Pepe visible for much longer
    setTimeout(() => {
      if (gameActive) {
        setShowPepe(false);
        // Longer pause between appearances
        setTimeout(() => {
          if (gameActive) movePepe();
        }, 1000); // 1 second pause between appearances
      }
    }, 3000); // Pepe stays visible for 3 seconds
  }, [gameActive]);

  const handleClick = () => {
    if (!gameActive || !showPepe) return;
    
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= 10) {
        setGameActive(false);
        return 10;
      }
      return newScore;
    });
    
    setShowPepe(false);
    // Longer pause after successful click
    setTimeout(() => {
      if (gameActive) movePepe();
    }, 1000);
  };

  // Timer effect
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Start moving Pepe when game starts
  useEffect(() => {
    if (gameActive) {
      movePepe();
    }
  }, [gameActive, movePepe]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-xl mb-4">
        Score: {score} / 10 | Time: {timeLeft}s
      </div>
      
      <div className="relative w-96 h-96 bg-gray-900 rounded-lg overflow-hidden">
        {showPepe && (
          <button
            onClick={handleClick}
            className="absolute p-4 transition-transform duration-500 focus:outline-none hover:scale-110"
            style={{ 
              left: `${pepePosition.x}%`, 
              top: `${pepePosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Image
              src="/pepe.png"
              alt="Pepe"
              width={80}
              height={80}
              className="w-20 h-20 object-contain pointer-events-none"
              priority
            />
          </button>
        )}
      </div>

      {!gameActive && (
        <div className="text-center">
          {score >= 10 ? (
            <div className="text-2xl text-green-500 mb-4">You Won! 🎉</div>
          ) : timeLeft === 0 ? (
            <div className="text-2xl text-red-500 mb-4">Time's Up! Try Again!</div>
          ) : (
            <div className="text-2xl text-yellow-500 mb-4">Click Pepe 10 Times to Win!</div>
          )}
          <Button
            onClick={startGame}
            size="lg"
            className="bg-green-500 hover:bg-green-600"
          >
            {score >= 10 || timeLeft === 0 ? 'Play Again' : 'Start Game'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WhackAPepe;