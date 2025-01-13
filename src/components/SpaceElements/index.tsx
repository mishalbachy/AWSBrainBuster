import React from 'react';
import { useEffect, useRef } from 'react';

const SpaceElements: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type SpaceObject = {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      type: 'planet' | 'star' | 'ship';
      rotation: number;
      color: string;
    };

    const spaceObjects: SpaceObject[] = [];

    // Create initial space objects
    for (let i = 0; i < 20; i++) {
      spaceObjects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        type: Math.random() > 0.8 ? 'planet' : 'star',
        rotation: Math.random() * Math.PI * 2,
        color: `hsl(${Math.random() * 360}, 50%, 70%)`
      });
    }

    // Add a spaceship
    spaceObjects.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      dx: 0.7,
      dy: 0.5,
      type: 'ship',
      rotation: 0,
      color: '#FF9900'
    });

    function drawSpaceObject(obj: SpaceObject) {
      ctx.save();
      ctx.translate(obj.x, obj.y);
      ctx.rotate(obj.rotation);

      if (obj.type === 'star') {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (obj.type === 'planet') {
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(0, 0, obj.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (obj.type === 'ship') {
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.moveTo(-15, -10);
        ctx.lineTo(15, 0);
        ctx.lineTo(-15, 10);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      spaceObjects.forEach(obj => {
        obj.x += obj.dx;
        obj.y += obj.dy;
        obj.rotation += 0.01;

        if (obj.x < -20) obj.x = canvas.width + 20;
        if (obj.x > canvas.width + 20) obj.x = -20;
        if (obj.y < -20) obj.y = canvas.height + 20;
        if (obj.y > canvas.height + 20) obj.y = -20;

        drawSpaceObject(obj);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{ background: 'transparent' }}
    />
  );
};

export default SpaceElements;