/**
 * AstroCalc Main Application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize calculators
    const astroCalc = new AstroCalculator();
    const baziCalc = new BaZiCalculator();
    const jawaCalc = new JawaCalculator();
    
    // DOM Elements
    const birthForm = document.getElementById('birthForm');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active states
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form submission
    birthForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const dateInput = document.getElementById('birthDate').value;
        const timeInput = document.getElementById('birthTime').value;
        const placeInput = document.getElementById('birthPlace').value;
        const gender = document.getElementById('gender').value;
        
        if (!dateInput || !placeInput) {
            alert('Mohon isi tanggal dan tempat lahir');
            return;
        }
        
        // Parse inputs
        const date = new Date(dateInput);
        const time = timeInput ? new Date(`2000-01-01T${timeInput}`) : null;
        
        // Get coordinates (simplified - in production use geocoding API)
        const coords = await getCoordinates(placeInput);
        
        // Show loading
        loading.classList.remove('hidden');
        results.classList.add('hidden');
        
        // Simulate calculation delay
        setTimeout(() => {
            // Calculate all systems
            const westernData = astroCalc.calculate({
                date, time, 
                lat: coords.lat, 
                lon: coords.lon, 
                gender 
            });
            
            const baziData = baziCalc.calculate(date, time);
            const jawaData = jawaCalc.calculate(date);
            
            // Display results
            displaySummary(westernData, baziData, jawaData);
            displayWestern(westernData);
            displayBaZi(baziData);
            displayJawa(jawaData);
            displayTransit(westernData, date);
            displayCrossAnalysis(westernData, baziData, jawaData);
            displayTheologicalFilter(westernData, baziData, jawaData);
            
            // Hide loading, show results
            loading.classList.add('hidden');
            results.classList.remove('hidden');
            
            // Scroll to results
            results.scrollIntoView({ behavior: 'smooth' });
            
        }, 1500);
    });
    
    // Simplified geocoding (mock)
    async function getCoordinates(place) {
        // In production: use OpenCage or similar API
        // Mock coordinates for Magelang
        if (place.toLowerCase().includes('magelang')) {
            return { lat: -7.47, lon: 110.22 };
        }
        // Default to Jakarta
        return { lat: -6.2, lon: 106.8 };
    }
    
    // Display functions
    function displaySummary(western, bazi, jawa) {
        const summary = document.getElementById('summaryContent');
        summary.innerHTML = `
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>☀️ Sun:</strong> ${western.planets.Sun.sign.name} ${western.planets.Sun.sign.degree.toFixed(1)}°
                </div>
                <div class="summary-item">
                    <strong>🌙 Moon:</strong> ${western.planets.Moon ? western.planets.Moon.sign.name : 'Unknown'}
                </div>
                <div class="summary-item">
                    <strong>⬆️ Asc:</strong> ${western.ascendant.name}
                </div>
                <div class="summary-item">
                    <strong>🇨🇳 Day Master:</strong> ${bazi.dayMaster.stem} (${bazi.dayMaster.element} ${bazi.dayMaster.yinYang})
                </div>
                <div class="summary-item">
                    <strong>🇮🇩 Weton:</strong> ${jawa.weton} (Neptu ${jawa.neptu})
                </div>
                <div class="summary-item">
                    <strong>📅 Wuku:</strong> ${jawa.wuku}
                </div>
            </div>
        `;
    }
    
    function displayWestern(data) {
        // Planets
        const planetsDiv = document.getElementById('westernPlanets');
        planetsDiv.innerHTML = Object.entries(data.planets).map(([name, info]) => `
            <div class="planet-item">
                <div class="planet-name">${name}</div>
                <div class="planet-sign">${info.sign.symbol} ${info.sign.name}</div>
                <div class="planet-degree">${info.sign.degree.toFixed(1)}°</div>
                <div class="planet-house">House ${info.house}</div>
            </div>
        `).join('');
        
        // Houses
        const housesDiv = document.getElementById('westernHouses');
        housesDiv.innerHTML = data.houses.map(h => `
            <div class="house-item">
                <strong>House ${h.number}:</strong> ${h.sign.symbol} ${h.sign.name} (${h.cusp.toFixed(1)}°)
            </div>
        `).join('');
        
        // Aspects
        const aspectsDiv = document.getElementById('westernAspects');
        aspectsDiv.innerHTML = data.aspects.map(a => `
            <div class="aspect-item">
                ${a.planet1} ${a.aspect} ${a.planet2} (${a.angle}°, orb: ${a.orb}°)
            </div>
        `).join('');
    }
    
    function displayBaZi(data) {
        // Pillars
        const pillarsDiv = document.getElementById('baziPillars');
        const pillars = [
            { name: 'Year', data: data.pillars.year },
            { name: 'Month', data: data.pillars.month },
            { name: 'Day', data: data.pillars.day },
            { name: 'Hour', data: data.pillars.hour }
        ];
        
        pillarsDiv.innerHTML = pillars.map(p => `
            <div class="pillar-item">
                <div class="pillar-title">${p.name} Pillar</div>
                <div class="pillar-stem">${p.data.stemCN} ${p.data.stem}</div>
                <div class="pillar-branch">${p.data.branchCN} ${p.data.branch}</div>
                <div class="pillar-element">${p.data.element} (${p.data.yinYang})</div>
                ${p.data.animal ? `<div class="pillar-animal">${p.data.animal}</div>` : ''}
                ${p.data.hourRange ? `<div class="pillar-hour">${p.data.hourRange}</div>` : ''}
            </div>
        `).join('');
        
        // Elements
        const elementsDiv = document.getElementById('baziElements');
        const total = Object.values(data.elements).reduce((a, b) => a + b, 0);
        elementsDiv.innerHTML = `
            <div class="element-bar">
                ${Object.entries(data.elements).map(([elem, count]) => `
                    <div class="element-segment ${elem.toLowerCase()}" 
                         style="width: ${(count/total*100)}%">
                        ${elem}<br>${count.toFixed(1)}
                    </div>
                `).join('')}
            </div>
            <div class="element-legend">
                ${Object.entries(data.elements).map(([elem, count]) => `
                    <span class="${elem.toLowerCase()}">${elem}: ${count.toFixed(1)}</span>
                `).join(' | ')}
            </div>
        `;
        
        // Day Master
        const dayMasterDiv = document.getElementById('dayMaster');
        dayMasterDiv.innerHTML = `
            <p><strong>Day Master:</strong> ${data.dayMaster.stem} (${data.dayMaster.element} ${data.dayMaster.yinYang})</p>
            <p><strong>Strength:</strong> ${data.dayMaster.strength}</p>
            <p><strong>God of Useful:</strong> ${data.dayMaster.godOfUseful}</p>
            <p><strong>Description:</strong> ${data.dayMaster.description}</p>
        `;
    }
    
    function displayJawa(data) {
        // Weton
        const wetonDiv = document.getElementById('wetonInfo');
        wetonDiv.innerHTML = `
            <p><strong>Hari:</strong> ${data.hari.name} (Neptu: ${data.hari.neptu})</p>
            <p><strong>Pasaran:</strong> ${data.pasaran.name} (Neptu: ${data.pasaran.neptu})</p>
            <p><strong>Weton:</strong> ${data.weton}</p>
            <p><strong>Total Neptu:</strong> ${data.neptu}</p>
            <p><strong>Karakter:</strong> ${data.dinaMula.character}</p>
            <p><strong>Arah Rejeki:</strong> ${data.dinaMula.direction}</p>
        `;
        
        // Neptu & Wuku
        const neptuDiv = document.getElementById('neptuWuku');
        neptuDiv.innerHTML = `
            <p><strong>Wuku:</strong> ${data.wuku}</p>
            <p><strong>Neptu Detail:</strong> ${data.primbon.detail.name}</p>
            <p><strong>Arti:</strong> ${data.primbon.detail.meaning}</p>
            <p><strong>Umum:</strong> ${data.primbon.general}</p>
        `;
        
        // Primbon
        const primbonDiv = document.getElementById('primbonText');
        primbonDiv.innerHTML = `
            <p><strong>Pasaran Jodoh:</strong> ${data.pasaranJodoh.description}</p>
            <p class="disclaimer">Catatan: Ini tradisi budaya, bukan prediksi takdir.</p>
        `;
    }
    
    function displayTransit(westernData, birthDate) {
        const now = new Date();
        const age = now.getFullYear() - birthDate.getFullYear();
        
        const transitDiv = document.getElementById('transitInfo');
        transitDiv.innerHTML = `
            <p><strong>Current Age:</strong> ${age}</p>
            <p><strong>Saturn Return:</strong> ${age >= 29 && age <= 32 ? 'RECENTLY COMPLETED' : age > 32 ? 'COMPLETED' : 'UPCOMING'}</p>
            <p><strong>Uranus Opposition:</strong> ${age >= 40 && age <= 44 ? 'ACTIVE' : 'Not yet'}</p>
            <p><strong>Current Transits:</strong></p>
            <ul>
                <li>Saturn in Pisces: Spiritual discipline, dissolution of structures</li>
                <li>Pluto in Aquarius: Transformation of community/technology</li>
                <li>Neptune in Aries: Spiritual identity (starting 2025-2026)</li>
            </ul>
        `;
        
        const timelineDiv = document.getElementById('transitTimeline');
        timelineDiv.innerHTML = `
            <div class="timeline-item">
                <strong>2025 (Juni-Agust):</strong> Jupiter conjunct MC - Career expansion
            </div>
            <div class="timeline-item">
                <strong>2025 (Sept-Nov):</strong> Eclipse Aries-Libra - Relationship pivot
            </div>
            <div class="timeline-item">
                <strong>2026:</strong> Saturn exit Pisces - End of romantic/creative lessons
            </div>
        `;
    }
    
    function displayCrossAnalysis(western, bazi, jawa) {
        const crossDiv = document.getElementById('crossAnalysis');
        
        // Find convergences
        const ariesEnergy = western.planets.Sun.sign.name === 'Aries';
        const yiWood = bazi.dayMaster.stem === 'Yi';
        const seninKliwon = jawa.weton.includes('Senin') && jawa.weton.includes('Kliwon');
        
        crossDiv.innerHTML = `
            <h4>🎯 Pattern Recognition</h4>
            <div class="convergence-item">
                <strong>Persona:</strong> ${western.ascendant.name} (Barat) + 
                ${bazi.dayMaster.stem} Wood (China) + 
                ${jawa.hari.name} ${jawa.pasaran.name} (Jawa) = 
                <em>Diplomatic surface, adaptable core, spiritual depth</em>
            </div>
            <div class="convergence-item">
                <strong>Tension:</strong> ${ariesEnergy ? 'Aries Sun (assertive)' : 'Sun energy'} vs 
                ${jawa.hari.name} (gentle) = <em>Action vs Feeling conflict</em>
            </div>
            <div class="convergence-item">
                <strong>Strength:</strong> ${yiWood ? 'Yi Wood flexibility' : 'Wood adaptability'} + 
                ${western.ascendant.element} Ascendant = <em>Survivor archetype</em>
            </div>
            <div class="convergence-item">
                <strong>Challenge:</strong> ${seninKliwon ? 'Senin Kliwon spiritual idealism' : 'Spiritual tendency'} 
                vs ${western.planets.Saturn ? western.planets.Saturn.sign.name : 'Saturn'} Saturn = 
                <em>Ideals vs Reality</em>
            </div>
            <div class="convergence-item">
                <strong>2025 Focus:</strong> Career expansion (Jupiter MC) + 
                Spiritual identity (Neptune Aries) + 
                Structure dissolution (Saturn Pisces)
            </div>
        `;
    }
    
    function displayTheologicalFilter(western, bazi, jawa) {
        const theoDiv = document.getElementById('theologicalFilter');
        
        theoDiv.innerHTML = `
            <div class="theo-question">
                <strong>❓ Ego Check:</strong> 
                ${western.ascendant.name} persona = "Siapa yang mereka inginkan?" vs 
                ${western.planets.Sun.sign.name} Sun = "Siapa saya sebenarnya?"
                <br><em>→ Apakah Anda hidup untuk approval atau untuk Allah?</em>
            </div>
            <div class="theo-question">
                <strong>❓ Action vs Tawakkal:</strong> 
                ${bazi.dayMaster.strength === 'Strong' ? 'Strong Day Master' : 'Day Master'} = 
                ${bazi.dayMaster.strength === 'Strong' ? 'Bisa over-confidence' : 'Perlu support'}.
                <br><em>→ Apakah ikhtiar atau pasrah berlebihan?</em>
            </div>
            <div class="theo-question">
                <strong>❓ Relationship:</strong> 
                ${jawa.weton} = ${jawa.dinaMula.character}.
                <br><em>→ Apakah karakter ini untuk service atau untuk manipulasi?</em>
            </div>
            <div class="theo-question">
                <strong>❓ Timing:</strong> 
                Transit 2025 = expansion & transformation.
                <br><em>→ Apakah ini "izin Allah" atau hanya siklus? Siapkah ikhtiar?</em>
            </div>
            <div class="theo-quote">
                <em>"Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya..." (Al-Baqarah 2:286)</em>
            </div>
        `;
    }
});

// Export functions
function exportJSON() {
    // Implementation for JSON export
    alert('Export JSON - implementasi detail tersedia');
}

function exportPDF() {
    window.print();
}

function shareChart() {
    if (navigator.share) {
        navigator.share({
            title: 'AstroCalc Chart',
            text: 'Check out my multi-tradisi astrology chart!',
            url: window.location.href
        });
    } else {
        alert('Copy URL: ' + window.location.href);
    }
}
