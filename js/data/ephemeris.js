/**
 * Simplified Ephemeris Data (1900-2050)
 * Mean positions for Sun, Moon, and planets
 * For high precision, use Swiss Ephemeris or Moshier algorithm
 */

const EphemerisData = {
    // Base positions for J2000.0 (2000 Jan 1.5 TT = JD 2451545.0)
    J2000: {
        Sun: 280.46646,
        Moon: 218.31617,
        Mercury: 252.25084,
        Venus: 181.97973,
        Mars: 355.43300,
        Jupiter: 34.35148,
        Saturn: 50.07744,
        Uranus: 314.05500,
        Neptune: 304.34866,
        Pluto: 238.92881
    },
    
    // Daily motion (degrees per day)
    DailyMotion: {
        Sun: 0.98564736,
        Moon: 13.17639646,
        Mercury: 4.092338,
        Venus: 1.602130,
        Mars: 0.524033,
        Jupiter: 0.083091,
        Saturn: 0.033444,
        Uranus: 0.011728,
        Neptune: 0.005981,
        Pluto: 0.003978
    },
    
    // Perturbation coefficients (simplified)
    Perturbations: {
        Mercury: { amp: 0.2, freq: 0.1 },
        Venus: { amp: 0.1, freq: 0.08 },
        Mars: { amp: 0.15, freq: 0.05 },
        Jupiter: { amp: 0.05, freq: 0.02 },
        Saturn: { amp: 0.04, freq: 0.015 }
    },
    
    // Retrograde periods (approximate JD ranges)
    Retrograde: {
        Mercury: [
            [2451545, 2451560], [2451880, 2451900], // 2000
            // ... more data
        ],
        Venus: [
            [2451545, 2451580], // 2000
        ],
        Mars: [
            [2451545, 2451620], // 2000
        ]
    },
    
    // Key dates for validation
    KeyDates: {
        '1992-04-06': {
            Sun: 16.5, // Aries 16°30'
            Moon: 180.2, // Libra ~0°
            Mercury: 26.2,
            Venus: 29.7,
            Mars: 9.3,
            Jupiter: 6.7,
            Saturn: 17.8,
            Uranus: 18.1,
            Neptune: 18.9,
            Pluto: 22.5
        },
        '1990-01-19': {
            Sun: 298.8, // Aquarius ~29°
            Moon: 45.3,
            Mercury: 285.4,
            Venus: 310.2,
            Mars: 280.1,
            Jupiter: 5.2,
            Saturn: 15.6,
            Uranus: 275.3,
            Neptune: 282.1,
            Pluto: 220.4
        }
    },
    
    // House cusps calculation (Placidus)
    HouseCusps: {
        // Obliquity of ecliptic
        Obliquity: 23.4397,
        
        // Calculate ascendant
        calculateAscendant: function(jd, lat, lon) {
            const T = (jd - 2451545.0) / 36525;
            const LST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
                       0.000387933 * T * T - T * T * T / 38710000;
            
            const eps = this.Obliquity * Math.PI / 180;
            const latRad = lat * Math.PI / 180;
            
            let asc = Math.atan2(
                Math.cos(LST * Math.PI / 180),
                -(Math.sin(eps) * Math.tan(latRad) + 
                  Math.cos(eps) * Math.sin(LST * Math.PI / 180))
            ) * 180 / Math.PI;
            
            return (asc + 360) % 360;
        },
        
        // Calculate MC (Midheaven)
        calculateMC: function(jd, lon) {
            const T = (jd - 2451545.0) / 36525;
            const LST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
                       0.000387933 * T * T;
            
            const eps = this.Obliquity * Math.PI / 180;
            let mc = Math.atan2(
                Math.tan(LST * Math.PI / 180),
                Math.cos(eps)
            ) * 180 / Math.PI;
            
            return (mc + 360) % 360;
        }
    },
    
    // Zodiac signs
    ZodiacSigns: [
        { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', ruler: 'Mars' },
        { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', ruler: 'Venus' },
        { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', ruler: 'Mercury' },
        { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', ruler: 'Moon' },
        { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', ruler: 'Sun' },
        { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', ruler: 'Mercury' },
        { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', ruler: 'Venus' },
        { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', ruler: 'Pluto' },
        { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', ruler: 'Jupiter' },
        { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', ruler: 'Saturn' },
        { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', ruler: 'Uranus' },
        { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', ruler: 'Neptune' }
    ],
    
    // Aspect definitions
    Aspects: {
        Conjunction: { angle: 0, orb: 8, nature: 'Neutral' },
        SemiSextile: { angle: 30, orb: 2, nature: 'Slightly harmonious' },
        SemiSquare: { angle: 45, orb: 2, nature: 'Slightly challenging' },
        Sextile: { angle: 60, orb: 6, nature: 'Harmonious' },
        Square: { angle: 90, orb: 8, nature: 'Challenging' },
        Trine: { angle: 120, orb: 8, nature: 'Harmonious' },
        Sesquiquadrate: { angle: 135, orb: 2, nature: 'Challenging' },
        Quincunx: { angle: 150, orb: 2, nature: 'Adjustment required' },
        Opposition: { angle: 180, orb: 8, nature: 'Polarity' }
    }
};

// Export
if (typeof module !== 'undefined') module.exports = EphemerisData;
