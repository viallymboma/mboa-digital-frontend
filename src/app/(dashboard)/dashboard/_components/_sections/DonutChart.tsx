import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

interface DonutChartProps {
  data: {
    name: string;
    count: number;
    color: string;
  }[];
  totalValue: number;
  size?: number;
  thickness?: number;
  gapSize?: number;
}

const DonutChart = ({
  data,
  totalValue,
  size = 300,
  thickness = 60,
  gapSize = 2, // Gap size in radians
}: DonutChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate center and radius
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const innerRadius = radius - thickness;

    let startAngle = -0.5 * Math.PI;

    // Draw segments with gaps
    data.forEach((segment) => {
      const segmentAngle = (segment.count / totalValue) * 2 * Math.PI;
      const adjustedSegmentAngle = segmentAngle - gapSize * (Math.PI / 180); // Convert gap to radians
      const endAngle = startAngle + adjustedSegmentAngle;

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = segment.color;
      ctx.fill();

      // Store midpoint for tooltip
      const midAngle = startAngle + segmentAngle / 2;
      const tooltipX = centerX + (radius - thickness / 2) * Math.cos(midAngle);
      const tooltipY = centerY + (radius - thickness / 2) * Math.sin(midAngle);

      // Mouse event detection
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const distance = Math.sqrt((mouseX - tooltipX) ** 2 + (mouseY - tooltipY) ** 2);
        if (distance < thickness / 2) {
          setTooltip({ x: e.clientX, y: e.clientY, text: `${segment.name}: ${segment.count}` });
        }
      });

      startAngle += segmentAngle; // Keep the original angle for calculations
    });

    // Draw center circle (white)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }, [data, totalValue, size, thickness, gapSize]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} width={size} height={size} className="max-w-full" />
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-[32px] font-bold text-purple-600">{totalValue}</span>
        <span className="text-[20px] text-gray-500">Contacts</span>
      </div>
      {tooltip && (
        <div
          className="absolute bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default DonutChart;


















// import React from 'react';

// interface DonutChartProps {
//     data: {
//       name: string;
//       count: number;
//       color: string;
//     }[];
//     totalValue: number;
//     size?: number;
//     thickness?: number;
//   }

// const DonutChart = ({ 
//     data, 
//     totalValue, 
//     size = 300, 
//     thickness = 60 
//   }: DonutChartProps) => {
//     const canvasRef = React.useRef<HTMLCanvasElement>(null);

//     React.useEffect(() => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
  
//       const ctx = canvas.getContext('2d');
//       if (!ctx) return;
  
//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//       // Calculate center and radius
//       const centerX = canvas.width / 2;
//       const centerY = canvas.height / 2;
//       const radius = Math.min(centerX, centerY) - 10;
//       const innerRadius = radius - thickness;
  
//       // Start angle at top (negative 90 degrees in radians)
//       let startAngle = -0.5 * Math.PI;
  
//       // Draw segments
//       data.forEach((segment) => {
//         const segmentAngle = (segment.count / totalValue) * 2 * Math.PI;
//         const endAngle = startAngle + segmentAngle;
  
//         // Draw segment
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//         ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
//         ctx.closePath();
  
//         ctx.fillStyle = segment.color;
//         ctx.fill();
  
//         startAngle = endAngle;
//       });
  
//       // Draw center circle (white)
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
//       ctx.fillStyle = 'white';
//       ctx.fill();
  
//     }, [data, totalValue, size, thickness]);
  
//     return (
//       <div className="relative flex items-center justify-center">
//         <canvas 
//           ref={canvasRef} 
//           width={size} 
//           height={size}
//           className="max-w-full"
//         />
//         <div className="absolute flex flex-col items-center justify-center text-center">
//           <span className="text-[32px] font-bold text-purple-600">{totalValue}</span>
//           <span className="text-[20px] text-gray-500">Contacts</span>
//         </div>
//       </div>
//     );
// }

// export default DonutChart