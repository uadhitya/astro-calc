/**
 * Ba Zi (Four Pillars of Destiny) Calculator
 */

class BaZiCalculator {
    constructor() {
        this.stems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
        this.stemsCN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        this.stemsElements = ['Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth', 'Metal', 'Metal', 'Water', 'Water'];
        this.stemsYinYang = ['Yang', 'Yin', 'Yang', 'Yin', 'Yang', 'Yin', 'Yang', 'Yin', 'Yang', 'Yin'];
        
        this.branches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
        this.branchesCN = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        this.branchesElements = ['Water', 'Earth', 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Earth', 'Water'];
        
        // Hidden stems for each branch
        this.hiddenStems = {
            'Zi': ['Gui'],
            'Chou': ['Ji', 'Gui', 'Xin'],
            'Yin': ['Jia', 'Bing', 'Wu'],
            'Mao': ['Yi'],
            'Chen': ['Yi', 'Wu', 'Gui'],
            'Si': ['Bing', 'Wu', 'Geng'],
            'Wu': ['Ding', 'Ji'],
            'Wei': ['Yi', 'Ji', 'Ding'],
            'Shen': ['Geng', 'Ren', 'Wu'],
            'You': ['Xin'],
            'Xu': ['Wu', 'Xin', 'Ding'],
            'Hai': ['Ren', 'Jia']
        };
        
        this.animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                       'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    }

    // Convert Gregorian to lunar (simplified - uses approximation)
    // For accurate calculation: use astronomical new moon data
    gregorianToLunar(year, month, day) {
        // Base date: 1900-01-31 = Lunar 1900-01-01
        const baseDate = new Date(1900, 0, 31);
        const targetDate = new Date(year, month - 1, day);
        const diffTime = targetDate - baseDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Simplified lunar month length (alternating 29/30 days)
        // This is approximation - real lunar calendar has complex rules
        let remaining = diffDays;
        let lunarYear = 1900;
        let lunarMonth = 1;
        let lunarDay = 1;
        
        // Approximate year length (354 days average)
        const yearDays = [384, 354, 355, 383, 354, 354, 384, 354, 355, 384]; // Cycle
        
        while (remaining > 354) {
            const yearLength = yearDays[lunarYear % 10];
            if (remaining >= yearLength) {
                remaining -= yearLength;
                lunarYear++;
            } else {
                break;
            }
        }
        
        // Month approximation
        const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]; // 13 months max (leap)
        for (let i = 0; i < 13 && remaining > 0; i++) {
            if (remaining >= monthLengths[i]) {
                remaining -= monthLengths[i];
                lunarMonth++;
            } else {
                lunarDay = remaining + 1;
                break;
            }
        }
        
        return { year: lunarYear, month: lunarMonth, day: lunarDay };
    }

    // Get year pillar
    getYearPillar(lunarYear) {
        const stemIndex = (lunarYear - 4) % 10;
        const branchIndex = (lunarYear - 4) % 12;
        return {
            stem: this.stems[stemIndex],
            stemCN: this.stemsCN[stemIndex],
            branch: this.branches[branchIndex],
            branchCN: this.branchesCN[branchIndex],
            animal: this.animals[branchIndex],
            element: this.stemsElements[stemIndex],
            yinYang: this.stemsYinYang[stemIndex]
        };
    }

    // Get month pillar (based on solar terms - simplified)
    getMonthPillar(lunarYear, lunarMonth) {
        // Month stem is determined by year stem
        const yearStemIndex = (lunarYear - 4) % 10;
        const monthStemBase = [2, 14, 26, 38, 50, 62, 74, 86, 98, 110]; // Magic numbers for month stem
        const stemIndex = (monthStemBase[yearStemIndex] + lunarMonth) % 10;
        const branchIndex = (lunarMonth + 1) % 12; // Yin starts at month 11
        
        return {
            stem: this.stems[stemIndex],
            stemCN: this.stemsCN[stemIndex],
            branch: this.branches[branchIndex],
            branchCN: this.branchesCN[branchIndex],
            element: this.stemsElements[stemIndex],
            yinYang: this.stemsYinYang[stemIndex]
        };
    }

    // Get day pillar (complex calculation - simplified)
    getDayPillar(julianDay) {
        // Day stem calculation from Julian Day
        const dayStemIndex = Math.floor(julianDay + 49) % 10;
        const dayBranchIndex = Math.floor(julianDay + 49) % 12;
        
        return {
            stem: this.stems[dayStemIndex],
            stemCN: this.stemsCN[dayStemIndex],
            branch: this.branches[dayBranchIndex],
            branchCN: this.branchesCN[dayBranchIndex],
            element: this.stemsElements[dayStemIndex],
            yinYang: this.stemsYinYang[dayStemIndex]
        };
    }

    // Get hour pillar
    getHourPillar(dayStem, hour) {
        // Chinese hour: 23-1 Zi, 1-3 Chou, etc.
        const chineseHour = Math.floor((hour + 1) / 2) % 12;
        
        // Hour stem based on day stem
        const dayStemIndex = this.stems.indexOf(dayStem);
        const hourStemBase = [0, 10, 8, 6, 4, 2, 0, 10, 8, 6]; // Starting stems for each day stem
        const stemIndex = (hourStemBase[dayStemIndex] + chineseHour) % 10;
        
        return {
            stem: this.stems[stemIndex],
            stemCN: this.stemsCN[stemIndex],
            branch: this.branches[chineseHour],
            branchCN: this.branchesCN[chineseHour],
            element: this.stemsElements[stemIndex],
            yinYang: this.stemsYinYang[stemIndex],
            hourRange: this.getHourRange(chineseHour)
        };
    }

    getHourRange(branchIndex) {
        const ranges = ['23-01', '01-03', '03-05', '05-07', '07-09', '09-11', 
                       '11-13', '13-15', '15-17', '17-19', '19-21', '21-23'];
        return ranges[branchIndex];
    }

    // Calculate full chart
    calculate(date, time) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = time ? time.getHours() : 12;
        
        const lunar = this.gregorianToLunar(year, month, day);
        
        // Calculate Julian Day for day pillar
        const jd = (date - new Date(2000, 0, 1)) / 86400000 + 2451545;
        
        const yearPillar = this.getYearPillar(lunar.year);
        const monthPillar = this.getMonthPillar(lunar.year, lunar.month);
        const dayPillar = this.getDayPillar(jd);
        const hourPillar = this.getHourPillar(dayPillar.stem, hour);
        
        // Analyze elements
        const elements = this.analyzeElements(yearPillar, monthPillar, dayPillar, hourPillar);
        
        // Day Master analysis
        const dayMaster = this.analyzeDayMaster(dayPillar, elements);
        
        return {
            lunar: lunar,
            pillars: {
                year: yearPillar,
                month: monthPillar,
                day: dayPillar,
                hour: hourPillar
            },
            elements: elements,
            dayMaster: dayMaster
        };
    }

    analyzeElements(year, month, day, hour) {
        const counts = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
        
        // Count visible stems
        [year, month, day, hour].forEach(pillar => {
            counts[pillar.element]++;
        });
        
        // Count hidden stems (simplified - count branch elements)
        [year, month, day, hour].forEach(pillar => {
            const hidden = this.hiddenStems[pillar.branch] || [];
            hidden.forEach(stem => {
                const idx = this.stems.indexOf(stem);
                if (idx !== -1) {
                    counts[this.stemsElements[idx]] += 0.5; // Hidden = half weight
                }
            });
        });
        
        return counts;
    }

    analyzeDayMaster(dayPillar, elements) {
        const stem = dayPillar.stem;
        const element = dayPillar.element;
        const yinYang = dayPillar.yinYang;
        
        // Determine strength
        let strength = 'Balanced';
        const elementCount = elements[element];
        
        if (elementCount >= 3) strength = 'Strong';
        else if (elementCount <= 1) strength = 'Weak';
        
        // God of Useful (simplified)
        let godOfUseful = '';
        if (strength === 'Strong') {
            godOfUseful = element === 'Wood' || element === 'Fire' ? 'Earth/Metal' : 'Water/Wood';
        } else {
            godOfUseful = element === 'Wood' || element === 'Fire' ? 'Water/Wood' : 'Earth/Metal';
        }
        
        return {
            stem: stem,
            element: element,
            yinYang: yinYang,
            strength: strength,
            godOfUseful: godOfUseful,
            description: this.getDayMasterDescription(stem, strength)
        };
    }

    getDayMasterDescription(stem, strength) {
        const descriptions = {
            'Jia': 'Big Tree - upright, principled, stubborn',
            'Yi': 'Flower/Grass - flexible, adaptable, diplomatic',
            'Bing': 'Sun Fire - radiant, generous, impulsive',
            'Ding': 'Candle Fire - warm, detail-oriented, sensitive',
            'Wu': 'Mountain Earth - stable, reliable, stubborn',
            'Ji': 'Garden Earth - nurturing, productive, worried',
            'Geng': 'Axe Metal - decisive, sharp, cold',
            'Xin': 'Jewelry Metal - refined, detail-oriented, vain',
            'Ren': 'Ocean Water - deep, wise, unpredictable',
            'Gui': 'Rain Water - gentle, creative, moody'
        };
        
        return descriptions[stem] || 'Unknown';
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaZiCalculator;
}
