import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Node { id: string; type: 'ia' | 'vendor' | 'work'; label: string; x: number; y: number; vx: number; vy: number; }
interface Edge { source: string; target: string; }

const nodes: Node[] = [
  { id: 'IA-01', type: 'ia', label: 'IA-01', x: 200, y: 150, vx: 0, vy: 0 },
  { id: 'IA-02', type: 'ia', label: 'IA-02', x: 600, y: 150, vx: 0, vy: 0 },
  { id: 'IA-03', type: 'ia', label: 'IA-03', x: 400, y: 80, vx: 0, vy: 0 },
  { id: 'VA', type: 'vendor', label: 'Vendor A', x: 300, y: 280, vx: 0, vy: 0 },
  { id: 'VB', type: 'vendor', label: 'Vendor B', x: 500, y: 280, vx: 0, vy: 0 },
  { id: 'VC', type: 'vendor', label: 'Vendor C', x: 400, y: 380, vx: 0, vy: 0 },
  { id: 'W1042', type: 'work', label: 'W1042', x: 150, y: 380, vx: 0, vy: 0 },
  { id: 'W0982', type: 'work', label: 'W0982', x: 250, y: 420, vx: 0, vy: 0 },
  { id: 'W0931', type: 'work', label: 'W0931', x: 380, y: 460, vx: 0, vy: 0 },
  { id: 'W0812', type: 'work', label: 'W0812', x: 560, y: 380, vx: 0, vy: 0 },
  { id: 'W0678', type: 'work', label: 'W0678', x: 480, y: 440, vx: 0, vy: 0 },
];

const edges: Edge[] = [
  { source: 'IA-01', target: 'VA' }, { source: 'IA-01', target: 'VB' },
  { source: 'IA-02', target: 'VA' }, { source: 'IA-02', target: 'VB' },
  { source: 'IA-03', target: 'VC' },
  { source: 'VA', target: 'W1042' }, { source: 'VA', target: 'W0982' }, { source: 'VA', target: 'W0931' },
  { source: 'VB', target: 'W0812' }, { source: 'VB', target: 'W0678' },
  { source: 'VC', target: 'W0678' },
];

const nodeColors: Record<string, string> = {
  ia: '#1E3A5F', vendor: '#1D4ED8', work: '#6B7280',
};
const nodeRadius: Record<string, number> = { ia: 22, vendor: 18, work: 14 };

export const VendorNetwork: React.FC = () => {
  const [selected, setSelected] = useState<Node | null>(null);
  const [graphNodes, setGraphNodes] = useState<Node[]>(nodes);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const getNodeById = (id: string) => graphNodes.find(n => n.id === id);

  const vendorInfo: Record<string, { works: number; ias: number; districts: number; overlap: string }> = {
    VA: { works: 42, ias: 7, districts: 3, overlap: '62%' },
    VB: { works: 28, ias: 5, districts: 2, overlap: '48%' },
    VC: { works: 15, ias: 2, districts: 1, overlap: '22%' },
  };

  const handleMouseDown = (e: React.MouseEvent<SVGElement>, nodeId: string) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    dragging.current = { id: nodeId, ox: svgPt.x, oy: svgPt.y };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    setGraphNodes(prev => prev.map(n => n.id === dragging.current!.id ? { ...n, x: svgPt.x, y: svgPt.y } : n));
  };

  const handleMouseUp = () => { dragging.current = null; };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Network Analysis</h1>
        <p className="text-sm text-gray-500 mt-0.5">Explore connections between IAs, vendors, and works</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Network graph */}
        <div className="card xl:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-800">Network Graph</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {Object.entries(nodeColors).map(([type, color]) => (
                <span key={type} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  {type === 'ia' ? 'Individual Assembly' : type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <svg
            ref={svgRef}
            width="100%" height={480}
            viewBox="0 0 700 520"
            className="cursor-grab active:cursor-grabbing select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Edges */}
            {edges.map((e, i) => {
              const src = getNodeById(e.source);
              const tgt = getNodeById(e.target);
              if (!src || !tgt) return null;
              const isSuspicious = (e.source === 'IA-01' || e.source === 'IA-02') && (e.target === 'VA' || e.target === 'VB');
              return (
                <line key={i} x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y}
                  stroke={isSuspicious ? '#FCA5A5' : '#E5E7EB'} strokeWidth={isSuspicious ? 2 : 1.5}
                  strokeDasharray={isSuspicious ? '4 2' : undefined}
                />
              );
            })}

            {/* Nodes */}
            {graphNodes.map(n => {
              const r = nodeRadius[n.type];
              const isSelected = selected?.id === n.id;
              return (
                <g key={n.id} transform={`translate(${n.x},${n.y})`}
                  onClick={() => setSelected(s => s?.id === n.id ? null : n)}
                  onMouseDown={e => handleMouseDown(e, n.id)}
                  className="cursor-pointer"
                >
                  {isSelected && <circle r={r + 6} fill={nodeColors[n.type]} opacity={0.15} />}
                  <circle r={r} fill={nodeColors[n.type]} stroke="white" strokeWidth={2} />
                  <text textAnchor="middle" dominantBaseline="central" fill="white" fontSize={n.type === 'ia' ? 9 : 8} fontWeight="600">
                    {n.id.replace('Vendor ', 'V').slice(0, 6)}
                  </text>
                  <text textAnchor="middle" y={r + 12} fontSize={9} fill="#6B7280">{n.label}</text>
                </g>
              );
            })}
          </svg>
          <p className="text-xs text-gray-400 text-center mt-1">Drag nodes to rearrange. Click to inspect.</p>
        </div>

        {/* Selected node info */}
        <div className="space-y-3">
          <div className="card">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Node Details</p>
            {selected ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: nodeColors[selected.type] }}>
                    {selected.id.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{selected.label}</p>
                    <p className="text-xs text-gray-500 capitalize">{selected.type === 'ia' ? 'Individual Assembly' : selected.type}</p>
                  </div>
                </div>
                {selected.type === 'vendor' && vendorInfo[selected.id] && (
                  <div className="space-y-2">
                    {[
                      { label: 'Connected Works', value: vendorInfo[selected.id].works },
                      { label: 'Connected IAs', value: vendorInfo[selected.id].ias },
                      { label: 'Districts', value: vendorInfo[selected.id].districts },
                      { label: 'Vendor Overlap', value: vendorInfo[selected.id].overlap },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold text-gray-800">{value}</span>
                      </div>
                    ))}
                    {vendorInfo[selected.id].overlap > '50%' && (
                      <div className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs font-medium text-amber-700">Possible suspicious cluster</p>
                      </div>
                    )}
                  </div>
                )}
                {selected.type !== 'vendor' && (
                  <p className="text-xs text-gray-500">
                    {selected.type === 'ia' ? 'Individual Assembly node. Click a connected vendor for details.' : `Work node: ${selected.id}. Click to navigate to work investigation.`}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400">Click a node to see details</p>
            )}
          </div>

          <div className="card">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Legend</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-8 h-0.5 bg-red-200 flex-shrink-0" style={{ border: '1px dashed #FCA5A5' }} />
                Suspicious link
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-8 h-0.5 bg-gray-200 flex-shrink-0" />
                Normal connection
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
