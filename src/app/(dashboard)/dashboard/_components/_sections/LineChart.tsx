"use client";

import {
  useEffect,
  useRef,
} from 'react';

interface DataPoint {
  month: string;
  sent: number;
  failed: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
}

export function LineChart({ data, height = 400, width = 800 }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Find max value for scaling
    const maxValue = Math.max(
      ...data.map((d) => Math.max(d.sent, d.failed)),
      100 // Minimum scale to 100
    );

    // Draw grid lines and labels
    ctx.strokeStyle = "#e5e7eb";
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "right";

    // Horizontal grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      const value = Math.round(maxValue - (maxValue / gridLines) * i);

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();

      ctx.fillText(value.toString(), padding - 10, y + 4);
    }

    // Month labels
    ctx.textAlign = "center";
    const xStep = chartWidth / (data.length - 1);
    data.forEach((point, i) => {
      const x = padding + xStep * i;
      ctx.fillText(point.month, x, canvas.height - padding / 2);
    });

    // Function to draw smooth curved lines
    const drawSmoothLine = (data: DataPoint[], color: string, key: "sent" | "failed") => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";

      for (let i = 0; i < data.length - 1; i++) {
        const x0 = padding + xStep * i;
        const y0 = padding + chartHeight - (data[i][key] / maxValue) * chartHeight;
        const x1 = padding + xStep * (i + 1);
        const y1 = padding + chartHeight - (data[i + 1][key] / maxValue) * chartHeight;
        
        // Control points for smooth curve
        const xc = (x0 + x1) / 2;
        const yc = (y0 + y1) / 2;

        if (i === 0) ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(x0, y0, xc, yc); // Use Bezier curve
      }

      ctx.stroke();
    };

    // Function to fill gradient under the line
    const fillGradient = (data: DataPoint[], color: string, key: "sent" | "failed") => {
      const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();

      for (let i = 0; i < data.length; i++) {
        const x = padding + xStep * i;
        const y = padding + chartHeight - (data[i][key] / maxValue) * chartHeight;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(padding + chartWidth, padding + chartHeight);
      ctx.lineTo(padding, padding + chartHeight);
      ctx.closePath();
      ctx.fill();
    };

    // Draw and fill the sent SMS line (purple)
    drawSmoothLine(data, "#9333ea", "sent");
    fillGradient(data, "rgba(147, 51, 234, 0.2)", "sent");

    // Draw and fill the failed SMS line (black)
    drawSmoothLine(data, "#1f2937", "failed");
    fillGradient(data, "rgba(31, 41, 55, 0.2)", "failed");

  }, [data, height, width]);

  return <canvas ref={canvasRef} width={width} height={height} className="max-w-full h-auto" />;
}





















// "use client";

// import {
//   useEffect,
//   useRef,
// } from 'react';

// interface DataPoint {
//   month: string;
//   sent: number;
//   failed: number;
// }

// interface LineChartProps {
//   data: DataPoint[];
//   height?: number;
//   width?: number;
// }

// export function LineChart({ data, height = 400, width = 800 }: LineChartProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Chart dimensions
//     const padding = 40;
//     const chartWidth = canvas.width - padding * 2;
//     const chartHeight = canvas.height - padding * 2;
    
//     // Find max value for scaling
//     const maxValue = Math.max(
//       ...data.map(d => Math.max(d.sent, d.failed)),
//       100 // Minimum scale to 100
//     );
    
//     // Draw grid lines and labels
//     ctx.strokeStyle = '#e5e7eb';
//     ctx.fillStyle = '#9ca3af';
//     ctx.font = '12px Inter, sans-serif';
//     ctx.textAlign = 'right';
    
//     // Horizontal grid lines
//     const gridLines = 5;
//     for (let i = 0; i <= gridLines; i++) {
//       const y = padding + (chartHeight / gridLines) * i;
//       const value = Math.round(maxValue - (maxValue / gridLines) * i);
      
//       ctx.beginPath();
//       ctx.moveTo(padding, y);
//       ctx.lineTo(padding + chartWidth, y);
//       ctx.stroke();
      
//       ctx.fillText(value.toString(), padding - 10, y + 4);
//     }
    
//     // Month labels
//     ctx.textAlign = 'center';
//     const xStep = chartWidth / (data.length - 1);
//     data.forEach((point, i) => {
//       const x = padding + xStep * i;
//       ctx.fillText(point.month, x, canvas.height - padding / 2);
//     });
    
//     // Draw sent SMS line (purple)
//     ctx.beginPath();
//     ctx.strokeStyle = '#9333ea'; // Purple
//     ctx.lineWidth = 3;
    
//     data.forEach((point, i) => {
//       const x = padding + xStep * i;
//       const y = padding + chartHeight - (point.sent / maxValue) * chartHeight;
      
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     });
//     ctx.stroke();
    
//     // Add gradient fill under sent line
//     const sentGradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
//     sentGradient.addColorStop(0, 'rgba(147, 51, 234, 0.2)');
//     sentGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
    
//     ctx.fillStyle = sentGradient;
//     ctx.beginPath();
//     data.forEach((point, i) => {
//       const x = padding + xStep * i;
//       const y = padding + chartHeight - (point.sent / maxValue) * chartHeight;
      
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     });
//     ctx.lineTo(padding + chartWidth, padding + chartHeight);
//     ctx.lineTo(padding, padding + chartHeight);
//     ctx.closePath();
//     ctx.fill();
    
//     // Draw failed SMS line (black)
//     ctx.beginPath();
//     ctx.strokeStyle = '#1f2937'; // Dark gray/black
//     ctx.lineWidth = 3;
    
//     data.forEach((point, i) => {
//       const x = padding + xStep * i;
//       const y = padding + chartHeight - (point.failed / maxValue) * chartHeight;
      
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     });
//     ctx.stroke();
    
//     // Add gradient fill under failed line
//     const failedGradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight);
//     failedGradient.addColorStop(0, 'rgba(31, 41, 55, 0.2)');
//     failedGradient.addColorStop(1, 'rgba(31, 41, 55, 0)');
    
//     ctx.fillStyle = failedGradient;
//     ctx.beginPath();
//     data.forEach((point, i) => {
//       const x = padding + xStep * i;
//       const y = padding + chartHeight - (point.failed / maxValue) * chartHeight;
      
//       if (i === 0) {
//         ctx.moveTo(x, y);
//       } else {
//         ctx.lineTo(x, y);
//       }
//     });
//     ctx.lineTo(padding + chartWidth, padding + chartHeight);
//     ctx.lineTo(padding, padding + chartHeight);
//     ctx.closePath();
//     ctx.fill();
    
//   }, [data, height, width]);

//   return (
//     <canvas 
//       ref={canvasRef} 
//       width={width} 
//       height={height}
//       className="max-w-full h-auto"
//     />
//   );
// }