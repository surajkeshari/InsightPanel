// import React, { useState } from 'react';
// import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
// import { Tooltip as ReactTooltip } from 'react-tooltip';
// import mapData from '../../data/world-map.json';
// import { locationMarkers } from '../../data/demoData';


// const LocationProgressList = ({ locations, maxRevenue }) => (
//     <div className="space-y-4 mt-60 mb-10">
//         {locations.map((location) => (
//             <div key={location.name}>
//                 <div className="flex justify-between items-center mb-1">
//                     <span className="text-sm text-muted">{location.name}</span>
//                     <span className="text-sm font-medium text-foreground">
//                         ${(location.revenue / 1000).toFixed(0)}K
//                     </span>
//                 </div>
//                 <div className="w-full bg-[var(--bg-main)] rounded-full h-1.5">
//                     <div
//                         className="bg-accent h-1.5 rounded-full"
//                         style={{ width: `${(location.revenue / maxRevenue) * 100}%` }}
//                     ></div>
//                 </div>
//             </div>
//         ))}
//     </div>
// );


// const LocationMap = () => {
//     const [tooltipContent, setTooltipContent] = useState('');
//     const maxRevenue = Math.ceil(Math.max(...locationMarkers.map(loc => loc.revenue)) / 10000) * 10000;
//     const getMarkerRadius = (revenue) => {
//         // Map revenue to a marker radius between 3 and 10
//         const minRadius = 3;
//         const maxRadius = 10;
//         const scale = (maxRadius - minRadius) / (maxRevenue - 0);
//         return minRadius + (revenue * scale);
//     };

//     return (
//         <div className="bg-card rounded-xl border border-border shadow-sm p-5">
//             <h4 className="text-lg font-semibold mb-4">Revenue by Location</h4>
//             <div data-tooltip-id="map-tooltip" className="w-full h-80">
//                 <ComposableMap projectionConfig={{ scale: 160 }}>
//                     <ZoomableGroup center={[0, 0]} zoom={1}>
//                         <Geographies geography={mapData}>
//                             {({ geographies }) =>
//                                 geographies.map((geo) => {
//                                     const hasLocation = locationMarkers.some(
//                                         (loc) => loc.coordinates[0] === geo.properties.longitude && loc.coordinates[1] === geo.properties.latitude
//                                     );
//                                     return (
//                                         <Geography
//                                             key={geo.rsmKey}
//                                             geography={geo}
//                                             onMouseEnter={() => setTooltipContent(geo.properties.name)}
//                                             onMouseLeave={() => setTooltipContent('')}
//                                             style={{
//                                                 default: {
//                                                     fill: hasLocation ? '#A5B4FC' : 'var(--bg-main)',
//                                                     stroke: 'var(--border-color)',
//                                                     strokeWidth: 0.5,
//                                                     outline: 'none',
//                                                 },
//                                                 hover: { fill: '#6366F1', outline: 'none' },
//                                                 pressed: { fill: '#6366F1', outline: 'none' },
//                                             }}
//                                         />
//                                     );
//                                 })
//                             }
//                         </Geographies>
//                         {locationMarkers.map(({ name, coordinates, revenue }) => (
//                             <Marker
//                                 key={name}
//                                 coordinates={coordinates}
//                                 onMouseEnter={() => setTooltipContent(`${name}: $${(revenue / 1000).toFixed(0)}K`)}
//                                 onMouseLeave={() => setTooltipContent('')}
//                             >
//                                 <g transform="translate(-12, -12)">
//                                     <circle cx="12" cy="10" r={getMarkerRadius(revenue)} fill="var(--accent-color)" />
//                                     <text
//                                         textAnchor="middle"
//                                         y={-5}
//                                         style={{
//                                             fontFamily: 'system-ui',
//                                             fill: 'var(--foreground)',
//                                             fontSize: '10px',
//                                             fontWeight: '500',
//                                         }}
//                                     >
//                                         {name}
//                                     </text>
//                                 </g>
//                             </Marker>
//                         ))}
//                     </ZoomableGroup>
//                 </ComposableMap>
//             </div>
//             <ReactTooltip id="map-tooltip" content={tooltipContent} />
//             <LocationProgressList locations={locationMarkers} maxRevenue={maxRevenue} />
//         </div>
//     );
// };

// export default LocationMap;



import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import mapData from '../../data/world-map.json';
import { locationMarkers } from '../../data/demoData';

// --- Location Progress List Component (No change needed) ---
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


// --- Main Location Map Component ---
const LocationMap = () => {
    const [tooltipContent, setTooltipContent] = useState('');
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 0]);

    const maxRevenue = Math.ceil(Math.max(...locationMarkers.map(loc => loc.revenue)) / 10000) * 10000;
    
    // Create a map from country name to revenue for quick lookup
    const revenueByCountry = new Map(locationMarkers.map(loc => [loc.country, loc.revenue]));

    // --- Helper function for dynamic marker radius ---
    const getMarkerRadius = (revenue) => {
        const minRadius = 3;
        const maxRadius = 10;
        const scale = (maxRadius - minRadius) / (maxRevenue - 0);
        return minRadius + (revenue * scale);
    };

    // --- Helper function for dynamic country fill color ---
    const getCountryFillColor = (countryName) => {
        const revenue = revenueByCountry.get(countryName);
        if (!revenue) {
            return 'var(--bg-main)'; // Default color if no data
        }
        
        // Simple linear scale from a light to a dark accent color
        const lightAccent = '#A5B4FC'; // Tailwind's indigo-300 equivalent
        const darkAccent = '#4F46E5'; // Tailwind's indigo-600 equivalent
        
        const progress = revenue / maxRevenue;
        
        // This is a simplified color interpolation; for a more robust solution, use a library
        const r = parseInt(lightAccent.slice(1, 3), 16) + progress * (parseInt(darkAccent.slice(1, 3), 16) - parseInt(lightAccent.slice(1, 3), 16));
        const g = parseInt(lightAccent.slice(3, 5), 16) + progress * (parseInt(darkAccent.slice(3, 5), 16) - parseInt(lightAccent.slice(3, 5), 16));
        const b = parseInt(lightAccent.slice(5, 7), 16) + progress * (parseInt(darkAccent.slice(5, 7), 16) - parseInt(lightAccent.slice(5, 7), 16));
        
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    };

    // --- Zoom and Center Control ---
    const handleZoomToRegion = (newCenter, newZoom) => {
        setCenter(newCenter);
        setZoom(newZoom);
    };

    return (
        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
            <h4 className="text-lg font-semibold mb-4">Revenue by Location</h4>
            <div className="flex justify-center mb-4 space-x-2">
                <button 
                    onClick={() => handleZoomToRegion([0, 0], 1)} 
                    className="px-3 py-1 text-sm rounded-full bg-secondary hover:bg-secondary-hover transition-colors"
                >
                    World
                </button>
                <button 
                    onClick={() => handleZoomToRegion([-100, 40], 5)} 
                    className="px-3 py-1 text-sm rounded-full bg-secondary hover:bg-secondary-hover transition-colors"
                >
                    North America
                </button>
                <button 
                    onClick={() => handleZoomToRegion([15, 50], 5)} 
                    className="px-3 py-1 text-sm rounded-full bg-secondary hover:bg-secondary-hover transition-colors"
                >
                    Europe
                </button>
            </div>
            <div data-tooltip-id="map-tooltip" className="w-full h-80">
                <ComposableMap projectionConfig={{ scale: 160 }}>
                    <ZoomableGroup center={center} zoom={zoom}>
                        <Geographies geography={mapData}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const hasLocation = revenueByCountry.has(geo.properties.name);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                const revenue = revenueByCountry.get(geo.properties.name);
                                                setTooltipContent(revenue ? `${geo.properties.name}: $${(revenue / 1000).toFixed(0)}K` : geo.properties.name);
                                            }}
                                            onMouseLeave={() => setTooltipContent('')}
                                            style={{
                                                default: {
                                                    fill: hasLocation ? getCountryFillColor(geo.properties.name) : 'var(--bg-main)',
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
                                <circle cx="12" cy="10" r={getMarkerRadius(revenue)} fill="var(--accent-color)" />
                                {/* Conditionally render text based on zoom level to avoid clutter */}
                                {zoom > 3 && (
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
                                )}
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