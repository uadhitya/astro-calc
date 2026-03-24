/**
 * Synastry Calculator - Multi-Tradisi Compatibility
 */

class SynastryCalculator {
    constructor(westernCalc, baziCalc, jawaCalc) {
        this.western = westernCalc;
        this.bazi = baziCalc;
        this.jawa = jawaCalc;
    }

    /**
     * Main synastry calculation
     */
    calculate(person1, person2) {
        // Calculate individual charts
        const chart1 = {
            western: this.western.calculate(person1),
            bazi: this.bazi.calculate(person1.date, person1.time),
            jawa: this.jawa.calculate(person1.date)
        };
        
        const chart2 = {
            western: this.western.calculate(person2),
            bazi: this.bazi.calculate(person2.date, person2.time),
            jawa: this.jawa.calculate(person2.date)
        };

        // Calculate compatibilities
        const westernSynastry = this.calculateWesternSynastry(chart1.western, chart2.western);
        const baziSynastry = this.calculateBaZiSynastry(chart1.bazi, chart2.bazi);
        const jawaSynastry = this.calculateJawaSynastry(chart1.jawa, chart2.jawa);

        // Cross-tradisi synthesis
        const synthesis = this.synthesize(westernSynastry, baziSynastry, jawaSynastry, chart1, chart2);

        return {
            person1: chart1,
            person2: chart2,
            western: westernSynastry,
            bazi: baziSynastry,
            jawa: jawaSynastry,
            synthesis: synthesis,
            overallScore: this.calculateOverallScore(westernSynastry, baziSynastry, jawaSynastry)
        };
    }

    /**
     * Western Astrology Synastry
     */
    calculateWesternSynastry(chart1, chart2) {
        const aspects = [];
        const planets1 = chart1.planets;
        const planets2 = chart2.planets;
        
        // Key planets for relationship
        const relationshipPlanets = ['Sun', 'Moon', 'Venus', 'Mars', 'Ascendant'];
        
        // Calculate inter-chart aspects
        for (const [p1Name, p1Data] of Object.entries(planets1)) {
            for (const [p2Name, p2Data] of Object.entries(planets2)) {
                // Only check key planets combinations
                if (!relationshipPlanets.includes(p1Name) && !relationshipPlanets.includes(p2Name)) {
                    continue;
                }
                
                const aspect = this.calculateAspect(p1Data.degree, p2Data.degree);
                if (aspect) {
                    aspects.push({
                        planet1: p1Name,
                        planet2: p2Name,
                        aspect: aspect.type,
                        orb: aspect.orb,
                        meaning: this.getWesternAspectMeaning(p1Name, p2Name, aspect.type)
                    });
                }
            }
        }

        // Sun-Moon compatibility (core emotional bond)
        const sunMoon = this.analyzeSunMoon(chart1.planets.Sun, chart2.planets.Sun, 
                                          chart1.planets.Moon, chart2.planets.Moon);
        
        // Venus-Mars compatibility (romantic/sexual)
        const venusMars = this.analyzeVenusMars(chart1.planets.Venus, chart1.planets.Mars,
                                                chart2.planets.Venus, chart2.planets.Mars);

        // Composite Midpoint (relationship entity)
        const composite = this.calculateComposite(chart1, chart2);

        return {
            aspects: aspects,
            sunMoon: sunMoon,
            venusMars: venusMars,
            composite: composite,
            score: this.scoreWesternSynastry(aspects, sunMoon, venusMars)
        };
    }

    calculateAspect(deg1, deg2) {
        const diff = Math.abs(deg1 - deg2);
        const circleDiff = Math.min(diff, 360 - diff);
        
        const aspectTypes = [
            { type: 'Conjunction', angle: 0, orb: 8, score: 10 },
            { type: 'Sextile', angle: 60, orb: 6, score: 8 },
            { type: 'Square', angle: 90, orb: 8, score: 5 },
            { type: 'Trine', angle: 120, orb: 8, score: 9 },
            { type: 'Opposition', angle: 180, orb: 8, score: 6 }
        ];
        
        for (const aspect of aspectTypes) {
            const orb = Math.abs(circleDiff - aspect.angle);
            if (orb <= aspect.orb) {
                return { type: aspect.type, orb: orb.toFixed(1), score: aspect.score };
            }
        }
        return null;
    }

    getWesternAspectMeaning(p1, p2, aspect) {
        const meanings = {
            'Sun-Sun': {
                'Conjunction': 'Identitas yang sangat mirip, pemahaman mendalam',
                'Trine': 'Harmoni tujuan hidup, saling mendukung',
                'Square': 'Konflik ego, kompetisi',
                'Opposition': 'Attraction of opposites, balancing'
            },
            'Sun-Moon': {
                'Conjunction': 'Emosional & identitas terintegrasi',
                'Trine': 'Natural emotional understanding',
                'Square': 'Emotional friction, growth through conflict',
                'Opposition': 'Complementary yin-yang dynamic'
            },
            'Venus-Venus': {
                'Conjunction': 'Shared values, similar love language',
                'Trine': 'Harmonious love expression',
                'Square': 'Different love needs, adjustment required',
                'Opposition': 'Attraction through difference'
            },
            'Venus-Mars': {
                'Conjunction': 'Strong romantic/sexual chemistry',
                'Trine': 'Natural passion flow',
                'Square': 'Sexual tension, attraction & conflict',
                'Opposition': 'Magnetic attraction, polarity'
            },
            'Moon-Moon': {
                'Conjunction': 'Deep emotional resonance',
                'Trine': 'Comfortable emotional rhythm',
                'Square': 'Different emotional needs',
                'Opposition': 'Emotional complementarity'
            }
        };
        
        const key1 = `${p1}-${p2}`;
        const key2 = `${p2}-${p1}`;
        
        return (meanings[key1] && meanings[key1][aspect]) || 
               (meanings[key2] && meanings[key2][aspect]) || 
               `${p1} ${aspect} ${p2}: Dynamic interaction`;
    }

    analyzeSunMoon(sun1, sun2, moon1, moon2) {
        // Person 1 Sun to Person 2 Moon (how P1 expresses to P2's emotions)
        const s1m2 = this.calculateAspect(sun1.degree, moon2.degree);
        // Person 2 Sun to Person 1 Moon
        const s2m1 = this.calculateAspect(sun2.degree, moon1.degree);
        
        let score = 0;
        let interpretation = [];
        
        if (s1m2) {
            score += s1m2.score;
            interpretation.push(`P1 Sun ${s1m2.aspect} P2 Moon: ${this.getWesternAspectMeaning('Sun', 'Moon', s1m2.aspect)}`);
        }
        if (s2m1) {
            score += s2m1.score;
            interpretation.push(`P2 Sun ${s2m1.aspect} P1 Moon: ${this.getWesternAspectMeaning('Sun', 'Moon', s2m1.aspect)}`);
        }
        
        // Sun sign compatibility
        const sunCompatibility = this.getSunSignCompatibility(sun1.sign.name, sun2.sign.name);
        
        return {
            score: score,
            aspects: { s1m2, s2m1 },
            interpretation: interpretation,
            sunCompatibility: sunCompatibility
        };
    }

    getSunSignCompatibility(sign1, sign2) {
        const elements = {
            'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
            'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
            'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
            'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
        };
        
        const e1 = elements[sign1];
        const e2 = elements[sign2];
        
        if (e1 === e2) return { score: 8, text: 'Same element - natural understanding' };
        if ((e1 === 'Fire' && e2 === 'Air') || (e1 === 'Air' && e2 === 'Fire')) return { score: 9, text: 'Fire-Air: Stimulating' };
        if ((e1 === 'Earth' && e2 === 'Water') || (e1 === 'Water' && e2 === 'Earth')) return { score: 9, text: 'Earth-Water: Nurturing' };
        if ((e1 === 'Fire' && e2 === 'Water') || (e1 === 'Water' && e2 === 'Fire')) return { score: 5, text: 'Fire-Water: Steam or extinguishing' };
        if ((e1 === 'Earth' && e2 === 'Air') || (e1 === 'Air' && e2 === 'Earth')) return { score: 6, text: 'Earth-Air: Dust or foundation' };
        
        return { score: 7, text: 'Different elements - growth potential' };
    }

    analyzeVenusMars(venus1, mars1, venus2, mars2) {
        const v1m2 = this.calculateAspect(venus1.degree, mars2.degree);
        const v2m1 = this.calculateAspect(venus2.degree, mars1.degree);
        const v1v2 = this.calculateAspect(venus1.degree, venus2.degree);
        const m1m2 = this.calculateAspect(mars1.degree, mars2.degree);
        
        let score = 0;
        const aspects = [];
        
        [v1m2, v2m1, v1v2, m1m2].forEach(asp => {
            if (asp) {
                score += asp.score;
                aspects.push(asp);
            }
        });
        
        return {
            score: score,
            aspects: aspects,
            passionLevel: score > 30 ? 'High' : score > 20 ? 'Moderate' : 'Low',
            harmonyLevel: v1v2 && v1v2.score > 7 ? 'High' : 'Needs work'
        };
    }

    calculateComposite(chart1, chart2) {
        // Midpoint composite method
        const compositePlanets = {};
        
        for (const planet of ['Sun', 'Moon', 'Venus', 'Mars', 'Mercury']) {
            const p1 = chart1.planets[planet].degree;
            const p2 = chart2.planets[planet].degree;
            
            // Calculate midpoint (handle 360° wrap)
            let mid = (p1 + p2) / 2;
            if (Math.abs(p1 - p2) > 180) {
                mid = (mid + 180) % 360;
            }
            
            compositePlanets[planet] = {
                degree: mid,
                sign: this.western.getZodiacSign(mid)
            };
        }
        
        return {
            planets: compositePlanets,
            interpretation: this.interpretComposite(compositePlanets)
        };
    }

    interpretComposite(composite) {
        const sunSign = composite.Sun.sign.name;
        const moonSign = composite.Moon.sign.name;
        
        return {
            relationshipIdentity: `Relationship as ${sunSign} - ${this.getCompositeSunMeaning(sunSign)}`,
            emotionalTone: `Emotional climate: ${moonSign} - ${this.getCompositeMoonMeaning(moonSign)}`
        };
    }

    getCompositeSunMeaning(sign) {
        const meanings = {
            'Aries': 'Dynamic, action-oriented partnership',
            'Taurus': 'Stable, sensual, value-focused',
            'Gemini': 'Communicative, curious, versatile',
            'Cancer': 'Nurturing, protective, home-centered',
            'Leo': 'Creative, dramatic, prideful',
            'Virgo': 'Practical, service-oriented, analytical',
            'Libra': 'Harmonious, diplomatic, partnership-focused',
            'Scorpio': 'Intense, transformative, deep bonding',
            'Sagittarius': 'Adventurous, philosophical, freedom-loving',
            'Capricorn': 'Ambitious, structured, long-term',
            'Aquarius': 'Unconventional, friendship-based, humanitarian',
            'Pisces': 'Spiritual, compassionate, boundary-blurring'
        };
        return meanings[sign] || 'Unique dynamic';
    }

    getCompositeMoonMeaning(sign) {
        const meanings = {
            'Aries': 'Emotionally direct, reactive',
            'Taurus': 'Emotionally stable, needs security',
            'Gemini': 'Emotionally curious, needs communication',
            'Cancer': 'Deeply nurturing, family-oriented',
            'Leo': 'Emotionally expressive, needs recognition',
            'Virgo': 'Emotionally practical, helpful',
            'Libra': 'Emotionally balanced, needs harmony',
            'Scorpio': 'Emotionally intense, private',
            'Sagittarius': 'Emotionally optimistic, needs freedom',
            'Capricorn': 'Emotionally reserved, responsible',
            'Aquarius': 'Emotionally detached, friendly',
            'Pisces': 'Emotionally sensitive, empathetic'
        };
        return meanings[sign] || 'Complex emotional needs';
    }

    scoreWesternSynastry(aspects, sunMoon, venusMars) {
        let total = 0;
        aspects.forEach(a => total += (a.orb < 3 ? a.score : a.score * 0.7));
        total += sunMoon.score;
        total += venusMars.score;
        
        return Math.min(Math.round(total / 5), 10); // Normalize to 10
    }

    /**
     * Ba Zi Synastry
     */
    calculateBaZiSynastry(bazi1, bazi2) {
        // Day Master compatibility
        const dm1 = bazi1.dayMaster;
        const dm2 = bazi2.dayMaster;
        
        const dayMasterCompat = this.analyzeDayMasters(dm1, dm2);
        
        // Pillar clashes/harms
        const pillarAnalysis = this.analyzePillars(bazi1.pillars, bazi2.pillars);
        
        // Element balance together
        const combinedElements = this.combineElements(bazi1.elements, bazi2.elements);
        
        // Spouse star analysis
        const spouseStar = this.analyzeSpouseStars(bazi1, bazi2);

        return {
            dayMaster: dayMasterCompat,
            pillars: pillarAnalysis,
            combinedElements: combinedElements,
            spouseStar: spouseStar,
            score: this.scoreBaZiSynastry(dayMasterCompat, pillarAnalysis, spouseStar)
        };
    }

    analyzeDayMasters(dm1, dm2) {
        const stemCompat = {
            'Jia': { 'Jia': 7, 'Yi': 8, 'Bing': 6, 'Ding': 5, 'Wu': 7, 'Ji': 6, 'Geng': 5, 'Xin': 4, 'Ren': 6, 'Gui': 7 },
            'Yi': { 'Jia': 8, 'Yi': 7, 'Bing': 5, 'Ding': 6, 'Wu': 6, 'Ji': 7, 'Geng': 4, 'Xin': 5, 'Ren': 7, 'Gui': 6 },
            // ... complete matrix
        };
        
        const elementFlow = {
            'Wood-Wood': 'Supportive, growth',
            'Wood-Fire': 'Generative, inspiring',
            'Fire-Earth': 'Productive, stabilizing',
            'Earth-Metal': 'Controlling, structuring',
            'Metal-Water': 'Producing, fluid',
            'Water-Wood': 'Nourishing, feeding'
        };
        
        const key = `${dm1.element}-${dm2.element}`;
        const reverseKey = `${dm2.element}-${dm1.element}`;
        
        return {
            stemScore: (stemCompat[dm1.stem] && stemCompat[dm1.stem][dm2.stem]) || 6,
            elementDynamic: elementFlow[key] || elementFlow[reverseKey] || 'Neutral interaction',
            yinYangBalance: dm1.yinYang !== dm2.yinYang ? 'Complementary' : 'Similar energy',
            interpretation: `${dm1.stem} (${dm1.yinYang} ${dm1.element}) with ${dm2.stem} (${dm2.yinYang} ${dm2.element})`
        };
    }

    analyzePillars(p1, p2) {
        const clashes = [];
        const harmonies = [];
        
        // Check branch clashes (6 clashes in Ba Zi)
        const branchClashPairs = [
            ['Zi', 'Wu'], ['Chou', 'Wei'], ['Yin', 'Shen'],
            ['Mao', 'You'], ['Chen', 'Xu'], ['Si', 'Hai']
        ];
        
        const allBranches1 = [p1.year.branch, p1.month.branch, p1.day.branch, p1.hour.branch];
        const allBranches2 = [p2.year.branch, p2.month.branch, p2.day.branch, p2.hour.branch];
        
        for (const b1 of allBranches1) {
            for (const b2 of allBranches2) {
                const clash = branchClashPairs.find(pair => 
                    (pair[0] === b1 && pair[1] === b2) || (pair[0] === b2 && pair[1] === b1)
                );
                if (clash) {
                    clashes.push(`${b1}-${b2}`);
                }
            }
        }
        
        return {
            clashCount: clashes.length,
            clashes: clashes,
            harmonyCount: 4 - clashes.length,
            interpretation: clashes.length === 0 ? 'Harmonious pillars' : 
                          clashes.length > 2 ? 'Significant friction points' : 'Some tension, manageable'
        };
    }

    combineElements(e1, e2) {
        const combined = {};
        for (const elem of ['Wood', 'Fire', 'Earth', 'Metal', 'Water']) {
            combined[elem] = (e1[elem] || 0) + (e2[elem] || 0);
        }
        
        // Check balance
        const max = Math.max(...Object.values(combined));
        const min = Math.min(...Object.values(combined));
        const balance = max - min;
        
        return {
            elements: combined,
            balance: balance < 3 ? 'Well balanced' : balance < 5 ? 'Slightly imbalanced' : 'Needs balancing',
            dominant: Object.entries(combined).sort((a,b) => b[1]-a[1])[0][0]
        };
    }

    analyzeSpouseStars(bazi1, bazi2) {
        // In Ba Zi, spouse star is determined by Day Master
        // For men: Wealth star (element controlled by DM)
        // For women: Officer star (element that controls DM)
        
        return {
            p1SpouseIndicator: this.identifySpouseStar(bazi1),
            p2SpouseIndicator: this.identifySpouseStar(bazi2),
            compatibility: 'Analysis of spouse star interactions'
        };
    }

    identifySpouseStar(bazi) {
        const dm = bazi.dayMaster;
        // Simplified - spouse star identification
        const spouseElements = {
            'Wood': { male: 'Earth', female: 'Metal' },
            'Fire': { male: 'Metal', female: 'Water' },
            'Earth': { male: 'Water', female: 'Wood' },
            'Metal': { male: 'Wood', female: 'Fire' },
            'Water': { male: 'Fire', female: 'Earth' }
        };
        
        return spouseElements[dm.element] || { male: 'Unknown', female: 'Unknown' };
    }

    scoreBaZiSynastry(dayMaster, pillars, spouseStar) {
        let score = dayMaster.stemScore;
        score += (4 - pillars.clashCount) * 2;
        return Math.min(Math.round(score / 2), 10);
    }

    /**
     * Jawa Synastry
     */
    calculateJawaSynastry(jawa1, jawa2) {
        // Neptu compatibility
        const neptu1 = jawa1.neptu;
        const neptu2 = jawa2.neptu;
        const totalNeptu = neptu1 + neptu2;
        
        const neptuCategory = this.getNeptuCategory(totalNeptu);
        
        // Weton specific interpretation
        const wetonMatch = this.getWetonMatch(jawa1.weton, jawa2.weton);
        
        // Wuku harmony
        const wukuHarmony = this.analyzeWukuHarmony(jawa1.wuku, jawa2.wuku);
        
        // Direction compatibility
        const directionCompat = this.getDirectionCompatibility(
            jawa1.dinaMula.direction, 
            jawa2.dinaMula.direction
        );

        return {
            neptu: { p1: neptu1, p2: neptu2, total: totalNeptu, category: neptuCategory },
            wetonMatch: wetonMatch,
            wuku: wukuHarmony,
            direction: directionCompat,
            score: this.scoreJawaSynastry(neptuCategory, wetonMatch)
        };
    }

    getNeptuCategory(total) {
        const categories = {
            14: { name: 'Pegat', meaning: 'Sangat baik, harmonis', score: 10 },
            15: { name: 'Ratu', meaning: 'Sejahtera, berwibawa', score: 10 },
            16: { name: 'Jodoh', meaning: 'Cocok, bahagia', score: 9 },
            17: { name: 'Topo', meaning: 'Sering berpisah', score: 5 },
            18: { name: 'Tinari', meaning: 'Kaya, bahagia', score: 9 },
            19: { name: 'Padu', meaning: 'Sering bertengkar', score: 4 },
            20: { name: 'Sujanan', meaning: 'Cemburuan', score: 5 },
            21: { name: 'Pesthi', meaning: 'Rukun, damai', score: 9 },
            22: { name: 'Pegat', meaning: 'Berpisah', score: 3 },
            23: { name: 'Ratu', meaning: 'Mulia', score: 10 },
            24: { name: 'Jodoh', meaning: 'Langgeng', score: 9 },
            25: { name: 'Topo', meaning: 'Jauh', score: 4 },
            26: { name: 'Tinari', meaning: 'Rezeki', score: 9 },
            27: { name: 'Padu', meaning: 'Konflik', score: 4 },
            28: { name: 'Sujanan', meaning: 'Cemburu', score: 5 },
            29: { name: 'Pesthi', meaning: 'Harmonis', score: 9 },
            30: { name: 'Pegat', meaning: 'Berakhir', score: 3 }
        };
        
        return categories[total] || { name: 'Unknown', meaning: 'Perlu penjelasan', score: 5 };
    }

    getWetonMatch(weton1, weton2) {
        // Traditional weton matching
        const [h1, p1] = weton1.split(' ');
        const [h2, p2] = weton2.split(' ');
        
        // Same pasaran = good
        if (p1 === p2) {
            return { score: 8, text: `Same ${p1} - natural understanding` };
        }
        
        // Complementary pasaran
        const complementary = {
            'Legi': 'Pahing',
            'Pahing': 'Legi',
            'Pon': 'Wage',
            'Wage': 'Pon',
            'Kliwon': 'Kliwon'
        };
        
        if (complementary[p1] === p2) {
            return { score: 9, text: `Complementary ${p1}-${p2} - perfect balance` };
        }
        
        return { score: 6, text: `${p1}-${p2} - workable differences` };
    }

    analyzeWukuHarmony(wuku1, wuku2) {
        const idx1 = this.jawa.wuku.indexOf(wuku1);
        const idx2 = this.jawa.wuku.indexOf(wuku2);
        const diff = Math.abs(idx1 - idx2);
        
        return {
            sameWuku: wuku1 === wuku2,
            distance: diff,
            interpretation: diff === 0 ? 'Same life cycle' :
                          diff < 5 ? 'Close life phases' :
                          diff < 15 ? 'Different but complementary' :
                          'Very different life paths'
        };
    }

    getDirectionCompatibility(dir1, dir2) {
        const opposites = { 'Utara': 'Selatan', 'Selatan': 'Utara', 'Timur': 'Barat', 'Barat': 'Timur' };
        
        if (dir1 === dir2) return { score: 7, text: 'Same direction - aligned goals' };
        if (opposites[dir1] === dir2) return { score: 9, text: 'Opposite directions - complementary' };
        return { score: 6, text: 'Different directions - need adjustment' };
    }

    scoreJawaSynastry(neptuCategory, wetonMatch) {
        return Math.round((neptuCategory.score + wetonMatch.score) / 2);
    }

    /**
     * Cross-Tradisi Synthesis
     */
    synthesize(western, bazi, jawa, chart1, chart2) {
        const scores = [western.score, bazi.score, jawa.score];
        const avgScore = scores.reduce((a,b) => a+b, 0) / 3;
        
        // Identify patterns
        const patterns = [];
        
        // High Western + Low Ba Zi = strong attraction, different life paths
        if (western.score > 7 && bazi.score < 5) {
            patterns.push('Strong chemistry but different life purposes');
        }
        
        // High Ba Zi + Low Western = compatible but lack spark
        if (bazi.score > 7 && western.score < 5) {
            patterns.push('Good partnership foundation but needs emotional work');
        }
        
        // High Jawa + Low others = culturally/traditionally good, personally challenging
        if (jawa.score > 7 && (western.score < 5 || bazi.score < 5)) {
            patterns.push('Traditionally favored but individual differences exist');
        }
        
        // All high = excellent match
        if (scores.every(s => s >= 8)) {
            patterns.push('Exceptional compatibility across all dimensions');
        }
        
        // All low = challenging
        if (scores.every(s => s <= 4)) {
            patterns.push('Significant challenges, requires conscious effort');
        }

        // Specific warnings
        const warnings = [];
        if (western.venusMars.passionLevel === 'Low' && western.score < 5) {
            warnings.push('Romantic chemistry may need cultivation');
        }
        if (bazi.pillars.clashCount > 2) {
            warnings.push('Fundamental differences in approach to life');
        }
        if (jawa.neptu.category.score < 5) {
            warnings.push('Traditional indicators suggest obstacles');
        }

        return {
            overallPattern: patterns.join('; ') || 'Mixed indicators',
            warnings: warnings,
            strengths: this.identifyStrengths(western, bazi, jawa),
            growthAreas: this.identifyGrowthAreas(western, bazi, jawa),
            recommendation: this.generateRecommendation(avgScore, patterns, warnings)
        };
    }

    identifyStrengths(w, b, j) {
        const strengths = [];
        if (w.sunMoon.score > 15) strengths.push('Deep emotional understanding');
        if (w.venusMars.passionLevel === 'High') strengths.push('Strong romantic chemistry');
        if (b.dayMaster.stemScore > 7) strengths.push('Complementary personalities');
        if (b.pillars.clashCount === 0) strengths.push('Harmonious life paths');
        if (j.neptu.category.score >= 9) strengths.push('Traditionally blessed union');
        if (j.wetonMatch.score >= 8) strengths.push('Natural compatibility');
        return strengths;
    }

    identifyGrowthAreas(w, b, j) {
        const areas = [];
        if (w.sunMoon.score < 10) areas.push('Emotional communication');
        if (w.venusMars.passionLevel === 'Low') areas.push('Keeping romance alive');
        if (b.pillars.clashCount > 1) areas.push('Respecting different approaches');
        if (j.neptu.category.score < 6) areas.push('Overcoming traditional obstacles');
        return areas;
    }

    generateRecommendation(score, patterns, warnings) {
        if (score >= 8) return 'Excellent match - cultivate with gratitude';
        if (score >= 6) return 'Good foundation - invest in understanding';
        if (score >= 4) return 'Mixed potential - conscious effort needed';
        return 'Challenging - evaluate compatibility honestly';
    }

    calculateOverallScore(western, bazi, jawa) {
        const weights = { western: 0.4, bazi: 0.35, jawa: 0.25 };
        const total = (western.score * weights.western) + 
                     (bazi.score * weights.bazi) + 
                     (jawa.score * weights.jawa);
        
        return {
            numeric: Math.round(total * 10) / 10,
            percentage: Math.round(total * 10),
            grade: total >= 8 ? 'A (Excellent)' :
                   total >= 7 ? 'B (Good)' :
                   total >= 5 ? 'C (Fair)' :
                   total >= 3 ? 'D (Challenging)' : 'F (Difficult)',
            summary: total >= 7 ? 'Favorable compatibility' :
                    total >= 5 ? 'Workable with effort' : 'Significant challenges'
        };
    }
}

// Export
if (typeof module !== 'undefined') module.exports = SynastryCalculator;
if (typeof window !== 'undefined') window.SynastryCalculator = SynastryCalculator;
