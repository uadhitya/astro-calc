/**
 * Ba Zi (Four Pillars) Data
 * Heavenly Stems, Earthly Branches, and related calculations
 */

const BaZiData = {
    // Heavenly Stems (天干)
    Stems: {
        names: ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'],
        chinese: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        elements: ['Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth', 'Metal', 'Metal', 'Water', 'Water'],
        yinYang: ['Yang', 'Yin', 'Yang', 'Yin', 'Yang', 'Yin', 'Yang', 'Yin', 'Yang', 'Yin'],
        
        // Get stem by index
        getStem: function(index) {
            return {
                name: this.names[index % 10],
                chinese: this.chinese[index % 10],
                element: this.elements[index % 10],
                yinYang: this.yinYang[index % 10],
                index: index % 10
            };
        }
    },
    
    // Earthly Branches (地支)
    Branches: {
        names: ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'],
        chinese: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
        elements: ['Water', 'Earth', 'Wood', 'Wood', 'Earth', 'Fire', 'Fire', 'Earth', 'Metal', 'Metal', 'Earth', 'Water'],
        animals: ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'],
        
        // Hidden stems (地支藏干)
        hiddenStems: {
            'Zi': [{ stem: 'Gui', percent: 100 }],
            'Chou': [{ stem: 'Ji', percent: 60 }, { stem: 'Gui', percent: 30 }, { stem: 'Xin', percent: 10 }],
            'Yin': [{ stem: 'Jia', percent: 60 }, { stem: 'Bing', percent: 30 }, { stem: 'Wu', percent: 10 }],
            'Mao': [{ stem: 'Yi', percent: 100 }],
            'Chen': [{ stem: 'Yi', percent: 60 }, { stem: 'Wu', percent: 30 }, { stem: 'Gui', percent: 10 }],
            'Si': [{ stem: 'Bing', percent: 60 }, { stem: 'Wu', percent: 30 }, { stem: 'Geng', percent: 10 }],
            'Wu': [{ stem: 'Ding', percent: 70 }, { stem: 'Ji', percent: 30 }],
            'Wei': [{ stem: 'Yi', percent: 60 }, { stem: 'Ji', percent: 30 }, { stem: 'Ding', percent: 10 }],
            'Shen': [{ stem: 'Geng', percent: 60 }, { stem: 'Ren', percent: 30 }, { stem: 'Wu', percent: 10 }],
            'You': [{ stem: 'Xin', percent: 100 }],
            'Xu': [{ stem: 'Wu', percent: 60 }, { stem: 'Xin', percent: 30 }, { stem: 'Ding', percent: 10 }],
            'Hai': [{ stem: 'Ren', percent: 70 }, { stem: 'Jia', percent: 30 }]
        },
        
        getBranch: function(index) {
            return {
                name: this.names[index % 12],
                chinese: this.chinese[index % 12],
                element: this.elements[index % 12],
                animal: this.animals[index % 12],
                hiddenStems: this.hiddenStems[this.names[index % 12]],
                index: index % 12
            };
        }
    },
    
    // 12 Stages of Life (十二长生)
    LifeStages: ['Birth', 'Bath', 'Preparation', 'Prime', 'Prosperity', 'Decline', 'Sickness', 'Death', 'Tomb', 'Extinction', 'Conception', 'Nurture'],
    
    // Get life stage for stem-branch combination
    getLifeStage: function(stemIndex, branchIndex) {
        const startPositions = [11, 11, 2, 2, 5, 5, 8, 8, 2, 2]; // Start position for each stem
        const start = startPositions[stemIndex % 10];
        const stage = (branchIndex - start + 12) % 12;
        return this.LifeStages[stage];
    },
    
    // Nayin (纳音) - Melodic Element
    Nayin: [
        { pair: ['Jia-Zi', 'Yi-Chou'], element: 'Metal', name: 'Gold from the Sea' },
        { pair: ['Bing-Yin', 'Ding-Mao'], element: 'Fire', name: 'Fire from the Furnace' },
        { pair: ['Wu-Chen', 'Ji-Si'], element: 'Wood', name: 'Wood from the Forest' },
        { pair: ['Geng-Wu', 'Xin-Wei'], element: 'Earth', name: 'Earth from the Road' },
        { pair: ['Ren-Shen', 'Gui-You'], element: 'Metal', name: 'Metal from the Sword' },
        { pair: ['Jia-Xu', 'Yi-Hai'], element: 'Fire', name: 'Fire from the Volcano' },
        { pair: ['Bing-Zi', 'Ding-Chou'], element: 'Water', name: 'Water from the Stream' },
        { pair: ['Wu-Yin', 'Ji-Mao'], element: 'Earth', name: 'Earth from the Wall' },
        { pair: ['Geng-Chen', 'Xin-Si'], element: 'Metal', name: 'Metal from the Wax' },
        { pair: ['Ren-Wu', 'Gui-Wei'], element: 'Wood', name: 'Wood from the Willow' },
        { pair: ['Jia-Shen', 'Yi-You'], element: 'Water', name: 'Water from the Spring' },
        { pair: ['Bing-Xu', 'Ding-Hai'], element: 'Earth', name: 'Earth from the Roof' },
        { pair: ['Wu-Zi', 'Ji-Chou'], element: 'Fire', name: 'Fire from the Thunder' },
        { pair: ['Geng-Yin', 'Xin-Mao'], element: 'Wood', name: 'Wood from the Pine' },
        { pair: ['Ren-Chen', 'Gui-Si'], element: 'Water', name: 'Water from the River' },
        { pair: ['Jia-Wu', 'Yi-Wei'], element: 'Metal', name: 'Metal from the Sand' },
        { pair: ['Bing-Shen', 'Ding-You'], element: 'Fire', name: 'Fire from the Mountain' },
        { pair: ['Wu-Xu', 'Ji-Hai'], element: 'Wood', name: 'Wood from the Plain' },
        { pair: ['Geng-Zi', 'Xin-Chou'], element: 'Earth', name: 'Earth from the Mud' },
        { pair: ['Ren-Yin', 'Gui-Mao'], element: 'Metal', name: 'Metal from the Gold' },
        { pair: ['Jia-Chen', 'Yi-Si'], element: 'Fire', name: 'Fire from the Lamp' },
        { pair: ['Bing-Wu', 'Ding-Wei'], element: 'Water', name: 'Water from the Sky' },
        { pair: ['Wu-Shen', 'Ji-You'], element: 'Earth', name: 'Earth from the Big Post' },
        { pair: ['Geng-Xu', 'Xin-Hai'], element: 'Metal', name: 'Metal from the Hairpin' },
        { pair: ['Ren-Zi', 'Gui-Chou'], element: 'Wood', name: 'Wood from the Mulberry' },
        { pair: ['Jia-Yin', 'Yi-Mao'], element: 'Water', name: 'Water from the Rapids' },
        { pair: ['Bing-Chen', 'Ding-Si'], element: 'Earth', name: 'Earth from the Sand' },
        { pair: ['Wu-Wu', 'Ji-Wei'], element: 'Fire', name: 'Fire from the Sun' },
        { pair: ['Geng-Shen', 'Xin-You'], element: 'Wood', name: 'Wood from the Pomegranate' },
        { pair: ['Ren-Xu', 'Gui-Hai'], element: 'Water', name: 'Water from the Ocean' }
    ],
    
    // Get Nayin for year pillar
    getNayin: function(stem, branch) {
        const key1 = `${stem}-${branch}`;
        const key2 = `${stem}-${branch}`; // Check both orders
        
        for (const nayin of this.Nayin) {
            if (nayin.pair.includes(key1) || nayin.pair.includes(key2)) {
                return nayin;
            }
        }
        return { element: 'Unknown', name: 'Unknown' };
    },
    
    // Ten Gods (十神) relationships
    TenGods: {
        // For Yang Day Master
        Yang: {
            'Same Yang': 'Friend',
            'Same Yin': 'Rob Wealth',
            'Produces': 'Eating God',
            'Produced By': 'Injured Officer',
            'Controls': 'Direct Wealth',
            'Controlled By': 'Indirect Wealth',
            'Drains': 'Direct Officer',
            'Drained By': 'Seven Killings'
        },
        // For Yin Day Master
        Yin: {
            'Same Yin': 'Friend',
            'Same Yang': 'Rob Wealth',
            'Produces': 'Injured Officer',
            'Produced By': 'Eating God',
            'Controls': 'Indirect Wealth',
            'Controlled By': 'Direct Wealth',
            'Drains': 'Seven Killings',
            'Drained By': 'Direct Officer'
        }
    },
    
    // Calculate Ten God relationship
    getTenGod: function(dayMaster, otherStem) {
        const dmData = this.Stems.getStem(this.Stems.names.indexOf(dayMaster));
        const otherData = this.Stems.getStem(this.Stems.names.indexOf(otherStem));
        
        const sameElement = dmData.element === otherData.element;
        const produces = this.elementProduces(dmData.element, otherData.element);
        const producedBy = this.elementProduces(otherData.element, dmData.element);
        const controls = this.elementControls(dmData.element, otherData.element);
        const controlledBy = this.elementControls(otherData.element, dmData.element);
        
        let relationship;
        if (sameElement) {
            relationship = dmData.yinYang === otherData.yinYang ? 'Same Yang' : 'Same Yin';
        } else if (produces) {
            relationship = 'Produces';
        } else if (producedBy) {
            relationship = 'Produced By';
        } else if (controls) {
            relationship = 'Controls';
        } else if (controlledBy) {
            relationship = 'Controlled By';
        } else {
            // Drains/Drained By
            relationship = dmData.yinYang === 'Yang' ? 'Drains' : 'Drained By';
        }
        
        const table = dmData.yinYang === 'Yang' ? this.TenGods.Yang : this.TenGods.Yin;
        return table[relationship];
    },
    
    // Element relationships
    elementProduces: function(element1, element2) {
        const production = {
            'Wood': 'Fire',
            'Fire': 'Earth',
            'Earth': 'Metal',
            'Metal': 'Water',
            'Water': 'Wood'
        };
        return production[element1] === element2;
    },
    
    elementControls: function(element1, element2) {
        const control = {
            'Wood': 'Earth',
            'Earth': 'Water',
            'Water': 'Fire',
            'Fire': 'Metal',
            'Metal': 'Wood'
        };
        return control[element1] === element2;
    },
    
    // Seasonal influences
    Seasons: {
        'Spring': { months: [1, 2], element: 'Wood', strength: 'Strong' },
        'Summer': { months: [3, 4], element: 'Fire', strength: 'Strong' },
        'Autumn': { months: [7, 8], element: 'Metal', strength: 'Strong' },
        'Winter': { months: [9, 10], element: 'Water', strength: 'Strong' }
    },
    
    // Special structures (格局)
    SpecialStructures: {
        'Follow the Leader': '从格',
        'Transformation': '化格',
        'Vibrant': '旺格',
        'Weak': '弱格'
    },
    
    // Luck pillars calculation
    calculateLuckPillars: function(yearStem, gender, lunarMonth, isLeapMonth) {
        const direction = (yearStem.yinYang === 'Yang' && gender === 'male') ||
                         (yearStem.yinYang === 'Yin' && gender === 'female') ? 1 : -1;
        
        const startAge = isLeapMonth ? 3 : 1;
        const pillars = [];
        
        for (let i = 0; i < 8; i++) {
            const stemIdx = (this.Stems.names.indexOf(yearStem.name) + (i + 1) * direction + 10) % 10;
            const branchIdx = (lunarMonth + (i + 1) * direction + 12) % 12;
            
            pillars.push({
                age: startAge + i * 10,
                stem: this.Stems.getStem(stemIdx),
                branch: this.Branches.getBranch(branchIdx)
            });
        }
        
        return pillars;
    }
};

// Export
if (typeof module !== 'undefined') module.exports = BaZiData;
