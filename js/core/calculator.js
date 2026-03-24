/**
 * AstroCalc Core Calculator
 * Multi-tradisi: Western + Ba Zi + Jawa
 */

class AstroCalculator {
    constructor() {
        this.J2000 = 2451545.0; // Julian date 2000.0
        this.DEG_TO_RAD = Math.PI / 180;
        this.RAD_TO_DEG = 180 / Math.PI;
    }

    // Julian Day calculation
    getJulianDay(date, time) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = time ? time.getHours() + time.getMinutes()/60 : 12;
        
        let y = year;
        let m = month;
        if (m <= 2) {
            y -= 1;
            m += 12;
        }
        
        const A = Math.floor(y / 100);
        const B = 2 - A + Math.floor(A / 4);
        
        const JD = Math.floor(365.25 * (y + 4716)) + 
                   Math.floor(30.6001 * (m + 1)) + 
                   day + hour/24 + B - 1524.5;
        
        return JD;
    }

    // Simplified planetary positions (low precision for demo)
    // For production: use Swiss Ephemeris or Moshier ephemeris
    getPlanetPositions(jd) {
        const T = (jd - this.J2000) / 36525; // Julian centuries from J2000
        const d = jd - this.J2000; // Days from J2000
        
        // Mean longitude calculations (simplified)
        const planets = {
            Sun: this.normalizeDegree(280.46646 + 36000.76983 * T + 0.0003032 * T * T),
            Moon: this.normalizeDegree(218.316 + 13.176396 * d),
            Mercury: this.normalizeDegree(252.251 + 4.092338 * d),
            Venus: this.normalizeDegree(181.979 + 1.602130 * d),
            Mars: this.normalizeDegree(355.433 + 0.524033 * d),
            Jupiter: this.normalizeDegree(34.351 + 0.083091 * d),
            Saturn: this.normalizeDegree(50.077 + 0.033444 * d),
            Uranus: this.normalizeDegree(314.055 + 0.011728 * d),
            Neptune: this.normalizeDegree(304.349 + 0.005981 * d),
            Pluto: this.normalizeDegree(238.929 + 0.003978 * d)
        };
        
        // Add some perturbations (very simplified)
        planets.Mercury += 0.2 * Math.sin((d * 0.1) * this.DEG_TO_RAD);
        planets.Venus += 0.1 * Math.sin((d * 0.08) * this.DEG_TO_RAD);
        
        return planets;
    }

    normalizeDegree(deg) {
        while (deg < 0) deg += 360;
        while (deg >= 360) deg -= 360;
        return deg;
    }

    // Get zodiac sign from degree
    getZodiacSign(degree) {
        const signs = [
            { name: 'Aries', symbol: '♈', element: 'Fire', start: 0 },
            { name: 'Taurus', symbol: '♉', element: 'Earth', start: 30 },
            { name: 'Gemini', symbol: '♊', element: 'Air', start: 60 },
            { name: 'Cancer', symbol: '♋', element: 'Water', start: 90 },
            { name: 'Leo', symbol: '♌', element: 'Fire', start: 120 },
            { name: 'Virgo', symbol: '♍', element: 'Earth', start: 150 },
            { name: 'Libra', symbol: '♎', element: 'Air', start: 180 },
            { name: 'Scorpio', symbol: '♏', element: 'Water', start: 210 },
            { name: 'Sagittarius', symbol: '♐', element: 'Fire', start: 240 },
            { name: 'Capricorn', symbol: '♑', element: 'Earth', start: 270 },
            { name: 'Aquarius', symbol: '♒', element: 'Air', start: 300 },
            { name: 'Pisces', symbol: '♓', element: 'Water', start: 330 }
        ];
        
        for (let i = signs.length - 1; i >= 0; i--) {
            if (degree >= signs[i].start) {
                return { ...signs[i], degree: degree - signs[i].start };
            }
        }
        return signs[0];
    }

    // Calculate houses (Placidus system - simplified)
    calculateHouses(jd, lat, lon) {
        // Simplified: return equal houses as approximation
        // For accurate Placidus: need oblique ascension calculation
        
        const planets = this.getPlanetPositions(jd);
        const ascendant = this.calculateAscendant(jd, lat, lon);
        
        const houses = [];
        for (let i = 0; i < 12; i++) {
            const cusp = this.normalizeDegree(ascendant + i * 30);
            houses.push({
                number: i + 1,
                cusp: cusp,
                sign: this.getZodiacSign(cusp)
            });
        }
        
        return { ascendant, houses };
    }

    // Simplified ascendant calculation
    calculateAscendant(jd, lat, lon) {
        // Local Sidereal Time approximation
        const T = (jd - this.J2000) / 36525;
        const LST = 280.46061837 + 360.98564736629 * (jd - this.J2000) + 
                    0.000387933 * T * T - T * T * T / 38710000;
        
        const obliquity = 23.4397; // Simplified
        const latRad = lat * this.DEG_TO_RAD;
        
        // Simplified ascendant formula
        let asc = Math.atan2(
            Math.cos(LST * this.DEG_TO_RAD),
            -(Math.sin(obliquity * this.DEG_TO_RAD) * Math.tan(latRad) + 
              Math.cos(obliquity * this.DEG_TO_RAD) * Math.sin(LST * this.DEG_TO_RAD))
        ) * this.RAD_TO_DEG;
        
        return this.normalizeDegree(asc);
    }

    // Calculate aspects between planets
    calculateAspects(positions) {
        const aspects = [];
        const planets = Object.keys(positions);
        const aspectTypes = [
            { name: 'Conjunction', angle: 0, orb: 8 },
            { name: 'Sextile', angle: 60, orb: 6 },
            { name: 'Square', angle: 90, orb: 8 },
            { name: 'Trine', angle: 120, orb: 8 },
            { name: 'Opposition', angle: 180, orb: 8 }
        ];
        
        for (let i = 0; i < planets.length; i++) {
            for (let j = i + 1; j < planets.length; j++) {
                const p1 = planets[i];
                const p2 = planets[j];
                const diff = Math.abs(positions[p1] - positions[p2]);
                const circleDiff = Math.min(diff, 360 - diff);
                
                for (const aspect of aspectTypes) {
                    const orb = Math.abs(circleDiff - aspect.angle);
                    if (orb <= aspect.orb) {
                        aspects.push({
                            planet1: p1,
                            planet2: p2,
                            aspect: aspect.name,
                            angle: circleDiff.toFixed(1),
                            orb: orb.toFixed(1)
                        });
                    }
                }
            }
        }
        
        return aspects;
    }

    // Main calculation function
    calculate(birthData) {
        const { date, time, lat, lon, gender } = birthData;
        
        const jd = this.getJulianDay(date, time);
        const planets = this.getPlanetPositions(jd);
        const { ascendant, houses } = this.calculateHouses(jd, lat, lon);
        const aspects = this.calculateAspects(planets);
        
        // Add house positions to planets
        const planetsWithHouses = {};
        for (const [name, degree] of Object.entries(planets)) {
            const house = houses.find(h => {
                const nextCusp = houses[h.number % 12].cusp;
                if (h.cusp < nextCusp) {
                    return degree >= h.cusp && degree < nextCusp;
                } else {
                    return degree >= h.cusp || degree < nextCusp;
                }
            }) || houses[0];
            
            planetsWithHouses[name] = {
                degree: degree,
                sign: this.getZodiacSign(degree),
                house: house.number
            };
        }
        
        return {
            julianDay: jd,
            ascendant: this.getZodiacSign(ascendant),
            planets: planetsWithHouses,
            houses: houses,
            aspects: aspects,
            rawPlanets: planets
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AstroCalculator;
}
