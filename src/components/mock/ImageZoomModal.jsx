import { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function ImageZoomModal({ isOpen, onClose, imageUrl, imageCaption }) {
  const [scale, setScale] = useState(1);

  if (!isOpen || !imageUrl) return null;

  const handleZoomIn = () => setScale(s => Math.min(3, s + 0.3));
  const handleZoomOut = () => setScale(s => Math.max(0.6, s - 0.3));
  const handleReset = () => setScale(1);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Toolbar */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="text-white text-xs font-semibold truncate">
            {imageCaption || 'Question Diagram Zoom'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              title="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-red-900/40 hover:bg-red-800 rounded-xl transition ml-2"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-slate-900/60 min-h-[300px]">
          <img
            src={imageUrl}
            alt={imageCaption || 'Zoomed diagram'}
            style={{ transform: `scale(${scale})` }}
            className="transition-transform duration-200 max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl border border-slate-700/50 cursor-grab"
          />
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-2 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Scale: {Math.round(scale * 100)}% • Use buttons above to inspect details
        </div>
      </div>
    </div>
  );
}
