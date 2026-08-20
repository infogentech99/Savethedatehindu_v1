"use client";

import { useEffect, useRef } from "react";

const ScratchHeart = ({ title, value, valueClass = "" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const isDrawing = useRef(false);
  const lastPoint = useRef(null);
  const imageRef = useRef(null);

  /*
   * ==========================================
   * SETUP CANVAS
   * ==========================================
   */
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /*
     * Canvas resolution
     */
    canvas.width = Math.round(rect.width * dpr);

    canvas.height = Math.round(rect.height * dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");

    /*
     * Reset transform
     */
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    /*
     * Scale according to device pixel ratio
     */
    ctx.scale(dpr, dpr);

    /*
     * Clear canvas
     */
    ctx.clearRect(0, 0, rect.width, rect.height);

    /*
     * Use already loaded image if available
     */
    if (imageRef.current?.complete) {
      drawHeart(ctx, imageRef.current, rect.width, rect.height);
      return;
    }

    /*
     * Load heart image
     */
    const heartImage = new Image();

    heartImage.src = "/assets/gold-heart.png";

    heartImage.onload = () => {
      imageRef.current = heartImage;

      /*
       * Canvas may have changed while image loaded
       */
      const currentRect = container.getBoundingClientRect();

      drawHeart(ctx, heartImage, currentRect.width, currentRect.height);
    };
  };

  /*
   * ==========================================
   * DRAW HEART
   * ==========================================
   */
  const drawHeart = (ctx, image, width, height) => {
    /*
     * Padding prevents side clipping.
     */
    const padding = 8;

    const availableWidth = width - padding * 2;

    const availableHeight = height - padding * 2;

    const imageRatio = image.naturalWidth / image.naturalHeight;

    const containerRatio = availableWidth / availableHeight;

    let drawWidth;
    let drawHeight;

    if (imageRatio > containerRatio) {
      drawWidth = availableWidth;
      drawHeight = drawWidth / imageRatio;
    } else {
      drawHeight = availableHeight;
      drawWidth = drawHeight * imageRatio;
    }

    const x = (width - drawWidth) / 2;

    const y = (height - drawHeight) / 2;

    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  };


  useEffect(() => {
    setupCanvas();

    const handleResize = () => {
     
      if (!isDrawing.current) {
        setupCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const getPoint = (e) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

 
  const scratchBetween = (from, to) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.save();

   
    ctx.globalCompositeOperation = "destination-out";


    const distance = Math.hypot(to.x - from.x, to.y - from.y);

    const steps = Math.max(Math.ceil(distance / 4), 1);

    const brushSize = 20;

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;

      const x = from.x + (to.x - from.x) * progress;

      const y = from.y + (to.y - from.y) * progress;

      ctx.beginPath();

      ctx.arc(x, y, brushSize, 0, Math.PI * 2);

      ctx.fill();
    }

    ctx.restore();
  };

  const handlePointerDown = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;

    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

    isDrawing.current = true;

    const point = getPoint(e);

    if (!point) return;

    lastPoint.current = point;

    /*
     * Initial scratch
     */
    scratchBetween(point, point);
  };

  /*
   * ==========================================
   * POINTER MOVE
   * ==========================================
   */
  const handlePointerMove = (e) => {
    if (!isDrawing.current) return;

    e.preventDefault();

    const point = getPoint(e);

    if (!point || !lastPoint.current) {
      return;
    }

    scratchBetween(lastPoint.current, point);

    lastPoint.current = point;
  };

  /*
   * ==========================================
   * STOP SCRATCH
   * ==========================================
   */
  const stopScratching = (e) => {
    isDrawing.current = false;

    lastPoint.current = null;

    try {
      canvasRef.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  /*
   * ==========================================
   * CHECK SCRATCH PERCENTAGE
   * ==========================================
   */
  const checkScratchProgress = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    /*
     * Canvas actual size
     */
    const width = canvas.width;

    const height = canvas.height;

    if (!width || !height) return;

    /*
     * Smaller sample for performance
     */
    const sampleWidth = Math.min(120, width);

    const scale = sampleWidth / width;

    const sampleHeight = Math.max(1, Math.floor(height * scale));

    const tempCanvas = document.createElement("canvas");

    tempCanvas.width = sampleWidth;

    tempCanvas.height = sampleHeight;

    const tempCtx = tempCanvas.getContext("2d");

    /*
     * Draw current canvas
     */
    tempCtx.drawImage(canvas, 0, 0, sampleWidth, sampleHeight);

    const imageData = tempCtx.getImageData(0, 0, sampleWidth, sampleHeight);

    const pixels = imageData.data;

    let transparent = 0;
    let total = 0;

    /*
     * Count transparent pixels
     */
    for (let i = 3; i < pixels.length; i += 4) {
      total++;

      if (pixels[i] < 50) {
        transparent++;
      }
    }

    if (!total) return;

    const percentage = (transparent / total) * 100;

    /*
     * Auto reveal after 65%
     */
    if (percentage >= 65) {
      ctx.clearRect(0, 0, width, height);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDrawing.current) {
        checkScratchProgress();
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

 
  return (
    <div
      ref={containerRef}
      className="
        relative
        w-full
        aspect-square
        flex
        items-center
        justify-center
        overflow-visible
      "
    >
     
      <div
        className="
          absolute
          inset-0
          z-0
          flex
          items-center
          justify-center
          text-center
          pointer-events-none
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <p
            className="
              font-serif
              text-[9px]
              sm:text-[11px]
              md:text-sm
              lg:text-base
              tracking-[2px]
              text-[#A25000]
              uppercase
              leading-none
            "
          >
            {title}
          </p>

          <p
            className={`
              font-serif
              text-[#A25000]
              leading-none
              mt-2
              ${valueClass}
            `}
          >
            {value}
          </p>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          z-10
          w-full
          h-full
          touch-none
          cursor-pointer
        "
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopScratching}
        onPointerCancel={stopScratching}
        onPointerLeave={stopScratching}
      />
    </div>
  );
};


const ScratchCard = () => {
  return (
    <section
      className="
        w-full
        px-3
        sm:px-5
        md:px-8
        py-8
        overflow-visible
      "
    >
      <div className=" mx-auto w-full max-w-[1200px] flex items-center justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-9 overflow-visible " >
     
        <div  className="md-w-[24%] w-[50%] flex items-center justify-center overflow-visible" >
          <ScratchHeart
            title="DAY"
            value="26"
            valueClass="text-[14px] sm:text-[42px] md:text-[54px] lg:text-[50px]"
          />
        </div>

       
        <div
          className="
            md:w-[24%]
            w-[50%]
            flex
            items-center
            justify-center
            overflow-visible
          "
        >
          <ScratchHeart
            title="MONTH"
            value="JUNE"
            valueClass="
              text-[14px]
              md:text-[42px]
              lg:text-[35px]
            "
          />
        </div>
        <div
          className="
           md:w-[24%]
            w-[50%]
            flex
            items-center
            justify-center
            overflow-visible
          "
        >
          <ScratchHeart
            title="YEAR"
            value="2026"
            valueClass="
              text-[14px]
              sm:text-[40px]
              md:text-[52px]
              lg:text-[35px]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default ScratchCard;
