
// import React, {useState} from 'react';
// import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
// import { Tooltip as ReactTooltip } from 'react-tooltip';
// import mapData from '../../data/world-map.json';
// import { locationMarkers } from '../../data/demoData';

// const LocationMap = () => {
//   const [tooltipContent, setTooltipContent] = useState(''); 
//   const maxRevenue = Math.ceil(Math.max(...locationMarkers.map(loc => loc.revenue)) / 10000) * 10000;


//   return (
//     <div className="bg-card rounded-xl border border-border shadow-sm p-5">
//       <h4 className="text-lg font-semibold mb-4">Revenue by Location</h4>
      
//       <div data-tooltip-id="map-tooltip" className="w-full h-80">
//         <ComposableMap projectionConfig={{ scale: 160 }}>
//           <ZoomableGroup center={[0, 0]} zoom={1}>
//             <Geographies geography={mapData}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography key={geo.rsmKey} geography={geo} onMouseEnter={() => { setTooltipContent(`${geo.properties.name}`); }} onMouseLeave={() => { setTooltipContent(''); }}
//                     style={{
//                       default: { fill: 'var(--bg-main)', stroke: 'var(--border-color)', strokeWidth: 0.5, outline: 'none' },
//                       hover: { fill: '#A5B4FC', outline: 'none' }, pressed: { fill: '#6366F1', outline: 'none' },
//                     }}
//                   />
//                 ))
//               }
//             </Geographies>
//             {locationMarkers.map(({ name, coordinates }) => (
//               <Marker key={name} coordinates={coordinates}>
//                 <g transform="translate(-12, -12)">
//                   <circle cx="12" cy="10" r="3" fill="var(--accent-color)" />
//                   <text textAnchor="middle" y={-5} style={{ fontFamily: "system-ui", fill: "var(--foreground)", fontSize: "10px", fontWeight: "500" }}>{name}</text>
//                 </g>
//               </Marker>
//             ))}
//           </ZoomableGroup>
//         </ComposableMap>
//       </div>
//       <ReactTooltip id="map-tooltip" content={tooltipContent} />
 
//       <div className="space-y-4 mt-20 mb-5">
//         {locationMarkers.map((location) => (
//           <div key={location.name}>
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm text-muted">{location.name}</span>
//               <span className="text-sm font-medium text-foreground">
//                 ${(location.revenue / 1000).toFixed(0)}K
//               </span>
//             </div>
//             <div className="w-full bg-[var(--bg-main)] rounded-full h-1.5">
//               <div className="bg-accent h-1.5 rounded-full" style={{ width: `${(location.revenue / maxRevenue) * 100}%` }}></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LocationMap;





import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import mapData from '../../data/world-map.json';
import { locationMarkers } from '../../data/demoData';

// --- Reusable Sub-Component for Progress Bars ---
const LocationProgressList = ({ locations, maxRevenue }) => (
    <div className="space-y-4 mt-60 mb-10">
        {locations.map((location) => (
            <div key={location.name}>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted">{location.name}</span>
                    <span className="text-sm font-medium text-foreground">
                        ${(location.revenue / 1000).toFixed(0)}K
                    </span>
                </div>
                <div className="w-full bg-[var(--bg-main)] rounded-full h-1.5">
                    <div
                        className="bg-accent h-1.5 rounded-full"
                        style={{ width: `${(location.revenue / maxRevenue) * 100}%` }}
                    ></div>
                </div>
            </div>
        ))}
    </div>
);
// ----------------------------------------------

const LocationMap = () => {
    const [tooltipContent, setTooltipContent] = useState('');
    const maxRevenue = Math.ceil(Math.max(...locationMarkers.map(loc => loc.revenue)) / 10000) * 10000;
    const getMarkerRadius = (revenue) => {
        // Map revenue to a marker radius between 3 and 10
        const minRadius = 3;
        const maxRadius = 10;
        const scale = (maxRadius - minRadius) / (maxRevenue - 0);
        return minRadius + (revenue * scale);
    };

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
            <h4 className="text-lg font-semibold mb-4">Revenue by Location</h4>
            <div data-tooltip-id="map-tooltip" className="w-full h-80">
                <ComposableMap projectionConfig={{ scale: 160 }}>
                    <ZoomableGroup center={[0, 0]} zoom={1}>
                        <Geographies geography={mapData}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const hasLocation = locationMarkers.some(
                                        (loc) => loc.coordinates[0] === geo.properties.longitude && loc.coordinates[1] === geo.properties.latitude
                                    );
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => setTooltipContent(geo.properties.name)}
                                            onMouseLeave={() => setTooltipContent('')}
                                            style={{
                                                default: {
                                                    fill: hasLocation ? '#A5B4FC' : 'var(--bg-main)',
                                                    stroke: 'var(--border-color)',
                                                    strokeWidth: 0.5,
                                                    outline: 'none',
                                                },
                                                hover: { fill: '#6366F1', outline: 'none' },
                                                pressed: { fill: '#6366F1', outline: 'none' },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                        {locationMarkers.map(({ name, coordinates, revenue }) => (
                            <Marker
                                key={name}
                                coordinates={coordinates}
                                onMouseEnter={() => setTooltipContent(`${name}: $${(revenue / 1000).toFixed(0)}K`)}
                                onMouseLeave={() => setTooltipContent('')}
                            >
                                <g transform="translate(-12, -12)">
                                    <circle cx="12" cy="10" r={getMarkerRadius(revenue)} fill="var(--accent-color)" />
                                    <text
                                        textAnchor="middle"
                                        y={-5}
                                        style={{
                                            fontFamily: 'system-ui',
                                            fill: 'var(--foreground)',
                                            fontSize: '10px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {name}
                                    </text>
                                </g>
                            </Marker>
                        ))}
                    </ZoomableGroup>
                </ComposableMap>
            </div>
            <ReactTooltip id="map-tooltip" content={tooltipContent} />
            <LocationProgressList locations={locationMarkers} maxRevenue={maxRevenue} />
        </div>
    );
};

export default LocationMap;