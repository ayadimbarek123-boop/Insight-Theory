import { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random(),
      opacityDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    // Create nebula particles
    const nebulae = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 200 + 100,
      color: Math.random() > 0.5 ? 'rgba(34, 211, 238, 0.1)' : 'rgba(168, 85, 247, 0.1)',
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach((nebula) => {
        nebula.x += nebula.speedX;
        nebula.y += nebula.speedY;

        // Wrap around screen
        if (nebula.x < -nebula.size) nebula.x = canvas.width + nebula.size;
        if (nebula.x > canvas.width + nebula.size) nebula.x = -nebula.size;
        if (nebula.y < -nebula.size) nebula.y = canvas.height + nebula.size;
        if (nebula.y > canvas.height + nebula.size) nebula.y = -nebula.size;

        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.size);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(nebula.x - nebula.size, nebula.y - nebula.size, nebula.size * 2, nebula.size * 2);
      });

      // Draw stars
      stars.forEach((star) => {
        star.y += star.speed;
        star.opacity += star.opacityDirection * 0.01;

        if (star.opacity <= 0 || star.opacity >= 1) {
          star.opacityDirection *= -1;
        }

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}

export default AnimatedBackground;
