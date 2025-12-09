import React, { useRef } from 'react';

const SignaturePad = ({ onSave }) => {
  const canvasRef = useRef(null);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
  };

  const draw = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', stopDrawing);
    canvas.removeEventListener('mouseleave', stopDrawing);
  };

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Detect if canvas is blank (transparent)
  const isCanvasBlank = (canvas) => {
    const ctx = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
  };

  const save = () => {
    const canvas = canvasRef.current;

    if (isCanvasBlank(canvas)) {
      alert("Signature is empty. Please draw your signature before saving.");
      return;
    }

    const imageData = canvas.toDataURL('image/png'); // Transparent by default
    onSave(imageData);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        onMouseDown={startDrawing}
        style={{ border: '1px solid black', backgroundColor: 'transparent' }}
      />
      <div className="flex space-x-4">
        <button 
          onClick={clear}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          style={{backgroundColor: '#6c757d', color: '#fff'}}
        >
          Clear
        </button>
        <button 
          onClick={save} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          
        >
          Save Signature
        </button>
        <button 
          onClick={save} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          
        >
          Upload Signature
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
