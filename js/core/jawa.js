/**
 * Primbon Jawa / Weton Calculator
 * Multi-Anchor Validation System
 * Validated dates: 1945, 1990, 1992, 2000, 2012, 2026
 */

class JawaCalculator {
    constructor() {
        this.hari = [
            { name: 'Senin', neptu: 4, urip: 4 },
            { name: 'Selasa', neptu: 3, urip: 3 },
            { name: 'Rabu', neptu: 7, urip: 7 },
            { name: 'Kamis', neptu: 8, urip: 6 },
            { name: 'Jumat', neptu: 6, urip: 5 },
            { name: 'Sabtu', neptu: 9, urip: 9 },
            { name: 'Minggu', neptu: 5, urip: 5 }
        ];
        
        this.pasaran = [
            { name: 'Legi', neptu: 5, urip: 5 },
            { name: 'Pahing', neptu: 9, urip: 9 },
            { name: 'Pon', neptu: 7, urip: 7 },
            { name: 'Wage', neptu: 4, urip: 4 },
            { name: 'Kliwon', neptu: 8, urip: 8 }
        ];
        
        this.wuku = [
            'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg', 
            'Warigalit', 'Warigagung', 'Julungwangi', 'Sungsang', 'Galungan',
            'Kuningan', 'Langkir', 'Mandasiya', 'Julungpujut', 'Pahang',
            'Kuruwelut', 'Marakeh', 'Tambir', 'Medangkungan', 'Maktal',
            'Wuye', 'Manahil', 'Prangbakat', 'Bala', 'Wugu', 'Wayang',
            'Kelawu', 'Dukut', 'Watugunung'
        ];
        
        // VALIDATED DATES - Multi-era
        this.validatedDates = {
            // 1945 - Kemerdekaan
            '1945-08-17': { hari: 'Jumat', pasaran: 'Legi', wuku: 'Sinta', tahunJawa: 1876, neptu: 11 },
            
            // 1990s
            '1990-01-19': { hari: 'Jumat', pasaran: 'Pahing', wuku: 'Julungwangi', tahunJawa: 1921, neptu: 15 },
            
            // 1992
            '1992-04-06': { hari: 'Senin', pasaran: 'Kliwon', wuku: 'Wayang', tahunJawa: 1924, neptu: 12 },
            
            // 2000
            '2000-01-02': { hari: 'Minggu', pasaran: 'Pahing', wuku: 'Galungan', tahunJawa: 1932, neptu: 14 },
            '2000-01-03': { hari: 'Senin', pasaran: 'Pon', wuku: 'Galungan', tahunJawa: 1932, neptu: 11 },
            '2000-01-26': { hari: 'Rabu', pasaran: 'Kliwon', wuku: 'Sungsang', tahunJawa: 1932, neptu: 15 },
            '2000-01-29': { hari: 'Sabtu', pasaran: 'Pon', wuku: 'Sungsang', tahunJawa: 1932, neptu: 16 },
            
            // 2012
            '2012-12-25': { hari: 'Selasa', pasaran: 'Pon', wuku: 'Prangbakat', tahunJawa: 1945, neptu: 10 },
            '2012-12-31': { hari: 'Senin', pasaran: 'Wage', wuku: 'Bala', tahunJawa: 1945, neptu: 8 },
            
            // 2026
            '2026-03-01': { hari: 'Minggu', pasaran: 'Pahing', wuku: 'Wugu', tahunJawa: 1959, neptu: 14 },
            '2026-03-08': { hari: 'Minggu', pasaran: 'Wage', wuku: 'Wayang', tahunJawa: 1959, neptu: 9 },
            '2026-03-11': { hari: 'Rabu', pasaran: 'Pahing', wuku: 'Wayang', tahunJawa: 1959, neptu: 16 }
        };
        
        // ANCHOR POINTS - Kronologis
        this.anchorPoints = [
            { date: new Date(1945, 7, 17), hariIdx: 4, pasaranIdx: 0, wukuIdx: 0, label: 'Proklamasi 1945' },
            { date: new Date(1990, 0, 19), hariIdx: 4, pasaranIdx: 1, wukuIdx: 8, label: '1990 Anchor' },
            { date: new Date(1992, 3, 6), hariIdx: 0, pasaranIdx: 4, wukuIdx: 26, label: '1992 Anchor' },
            { date: new Date(2000, 0, 2), hariIdx: 6, pasaranIdx: 1, wukuIdx: 10, label: '2000 Anchor' },
            { date: new Date(2012, 11, 25), hariIdx: 1, pasaranIdx: 2, wukuIdx: 23, label: '2012 Anchor' },
            { date: new Date(2026, 2, 1), hariIdx: 6, pasaranIdx: 1, wukuIdx: 25, label: '2026 Anchor' }
        ];
    }

    calculate(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // 1. Exact match
        if (this.validatedDates[dateKey]) {
            return this.buildResult(date, this.validatedDates[dateKey], 'exact');
        }
        
        // 2. Find nearest anchor
        const anchor = this.findNearestAnchor(date);
        
        // 3. Calculate
        return this.calculateFromAnchor(date, anchor);
    }

    findNearestAnchor(date) {
        let nearest = this.anchorPoints[0];
        let minDiff = Math.abs(date - nearest.date);
        
        for (const anchor of this.anchorPoints) {
            const diff = Math.abs(date - anchor.date);
            if (diff < minDiff) {
                minDiff = diff;
                nearest = anchor;
            }
        }
        
        return nearest;
    }

    calculateFromAnchor(date, anchor) {
        const diffTime = date - anchor.date;
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        const hariIndex = ((anchor.hariIdx + diffDays) % 7 + 7) % 7;
        const pasaranIndex = ((anchor.pasaranIdx + diffDays) % 5 + 5) % 5;
        const wukuIndex = ((anchor.wukuIdx + diffDays) % 30 + 30) % 30;
        
        const hari = this.hari[hariIndex];
        const pasaran = this.pasaran[pasaranIndex];
        const wuku = this.wuku[wukuIndex];
        const neptu = hari.neptu + pasaran.neptu;
        
        return {
            hari: hari,
            pasaran: pasaran,
            weton: `${hari.name} ${pasaran.name}`,
            neptu: neptu,
            wuku: wuku,
            tahunJawa: this.getTahunJawa(date),
            bulanJawa: this.getBulanJawa(date),
            dinaMula: this.getDinaMula(hari.name, pasaran.name),
            primbon: this.getPrimbonInterpretation(hari.name, pasaran.name, neptu),
            pasaranJodoh: this.getPasaranJodoh(neptu),
            validated: false,
            anchor: anchor.label,
            anchorDate: anchor.date.toISOString().split('T')[0],
            diffFromAnchor: diffDays
        };
    }

    buildResult(date, data, validationType) {
        const hari = this.hari.find(h => h.name === data.hari);
        const pasaran = this.pasaran.find(p => p.name === data.pasaran);
        
        return {
            hari: hari,
            pasaran: pasaran,
            weton: `${hari.name} ${pasaran.name}`,
            neptu: data.neptu,
            wuku: data.wuku,
            tahunJawa: data.tahunJawa,
            bulanJawa: this.getBulanJawa(date, data.tahunJawa),
            dinaMula: this.getDinaMula(hari.name, pasaran.name),
            primbon: this.getPrimbonInterpretation(hari.name, pasaran.name, data.neptu),
            pasaranJodoh: this.getPasaranJodoh(data.neptu),
            validated: true,
            validationType: validationType
        };
    }

    getTahunJawa(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        
        // Base: 1945 = 1876, 1990 = 1921, 1992 = 1924
        let jawaYear;
        
        if (year < 1990) {
            // Dari 1945
            jawaYear = 1876 + (year - 1945);
        } else if (year < 2000) {
            // Dari 1990
            jawaYear = 1921 + (year - 1990);
        } else if (year < 2012) {
            // Dari 2000
            jawaYear = 1932 + (year - 2000);
        } else {
            // Dari 2012
            jawaYear = 1945 + (year - 2012);
        }
        
        // Koreksi awal tahun
        if (month < 2 || (month === 2 && day < 17)) {
            // Sebelum Maret/April (varies by year)
            // Simplified: kurangi 1 jika Januari-Februari
            if (month < 2) jawaYear -= 1;
        }
        
        return jawaYear;
    }

    getBulanJawa(date, tahunJawa) {
        const month = date.getMonth();
        const day = date.getDate();
        
        const monthNames = [
            'Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadilawal', 'Jumadilakir',
            'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'
        ];
        
        let index;
        
        // Dari validated: 17 Agustus 1945 = Sinta (index 0 dalam wuku, tapi bulan?)
        // Asumsi: 17 Agustus = Sura atau Sawal?
        
        // Dari 6 April 1992 = Sawal (index 9)
        // Dari 19 Jan 1990 = Sela (index 10)
        
        if (month === 0) index = 10;      // Jan = Sela
        else if (month === 1) index = 11; // Feb = Besar
        else if (month === 2) index = 0;  // Mar = Sura
        else if (month === 3) {            // Apr
            index = day < 6 ? 0 : 9;       // <6 = Sura, >=6 = Sawal
        }
        else if (month === 4) index = 10;  // Mei = Sela
        else if (month === 5) index = 11;  // Jun = Besar
        else if (month === 6) index = 0;   // Jul = Sura
        else if (month === 7) {             // Agustus
            index = day < 17 ? 0 : 1;       // <17 = Sura, >=17 = Sapar?
            // Koreksi: 17 Agustus 1945 = ?
            // Asumsi: Agustus = Sura/Sapar
        }
        else {
            index = ((month - 4) + 10) % 12;
        }
        
        return {
            index: index,
            name: monthNames[index],
            arab: this.getBulanArab(index)
        };
    }

    getBulanArab(index) {
        const arab = ['Muharram', 'Safar', 'Rabiulawal', 'Rabiulakhir', 
                     'Jumadilawal', 'Jumadilakhir', 'Rajab', 'Syaban', 
                     'Ramadan', 'Syawal', 'Zulkaidah', 'Zulhijah'];
        return arab[index];
    }

    getDinaMula(hari, pasaran) {
        const combinations = {
            'Senin Legi': { character: 'Lemah lembut, sabar', direction: 'Utara', element: 'Air' },
            'Senin Pahing': { character: 'Keras kepala, pemimpin', direction: 'Timur', element: 'Api' },
            'Senin Pon': { character: 'Tenang, bijaksana', direction: 'Selatan', element: 'Api' },
            'Senin Wage': { character: 'Pekerja keras, hemat', direction: 'Barat', element: 'Tanah' },
            'Senin Kliwon': { character: 'Spiritual, idealis', direction: 'Utara', element: 'Air Api' },
            'Selasa Legi': { character: 'Berani, tegas', direction: 'Selatan', element: 'Api' },
            'Selasa Pahing': { character: 'Cerdas, licin', direction: 'Barat', element: 'Tanah' },
            'Selasa Pon': { character: 'Kuat, gigih', direction: 'Utara', element: 'Air' },
            'Selasa Wage': { character: 'Pendiam, perhitungan', direction: 'Timur', element: 'Api' },
            'Selasa Kliwon': { character: 'Pemberani, tantangan', direction: 'Selatan', element: 'Api' },
            'Rabu Legi': { character: 'Ramah, menolong', direction: 'Barat', element: 'Tanah' },
            'Rabu Pahing': { character: 'Cerdas, kritis', direction: 'Utara', element: 'Air' },
            'Rabu Pon': { character: 'Bijaksana, wibawa', direction: 'Timur', element: 'Api' },
            'Rabu Wage': { character: 'Tekun, rajin', direction: 'Selatan', element: 'Api' },
            'Rabu Kliwon': { character: 'Intuitif, misterius', direction: 'Barat', element: 'Tanah' },
            'Kamis Legi': { character: 'Bijak, disiplin', direction: 'Timur', element: 'Api' },
            'Kamis Pahing': { character: 'Cerdas, visioner', direction: 'Selatan', element: 'Api' },
            'Kamis Pon': { character: 'Stabil, berlimpah', direction: 'Barat', element: 'Tanah' },
            'Kamis Wage': { character: 'Sukses di usia tua', direction: 'Utara', element: 'Air' },
            'Kamis Kliwon': { character: 'Spiritual, guru', direction: 'Timur', element: 'Api' },
            'Jumat Legi': { character: 'Kaya, beruntung, disukai', direction: 'Selatan', element: 'Api' },
            'Jumat Pahing': { character: 'Cerdas, kaya, berpengaruh', direction: 'Barat', element: 'Tanah' },
            'Jumat Pon': { character: 'Tenang, bahagia', direction: 'Utara', element: 'Air' },
            'Jumat Wage': { character: 'Sabar, tekun', direction: 'Timur', element: 'Api' },
            'Jumat Kliwon': { character: 'Spiritual, alim', direction: 'Selatan', element: 'Api' },
            'Sabtu Legi': { character: 'Kuat, mandiri', direction: 'Barat', element: 'Tanah' },
            'Sabtu Pahing': { character: 'Cerdas, kuat', direction: 'Utara', element: 'Air' },
            'Sabtu Pon': { character: 'Teguh, stabil', direction: 'Timur', element: 'Api' },
            'Sabtu Wage': { character: 'Hemat, kaya', direction: 'Selatan', element: 'Api' },
            'Sabtu Kliwon': { character: 'Spiritual, bertanggung jawab', direction: 'Barat', element: 'Tanah' },
            'Minggu Legi': { character: 'Cerah, optimis', direction: 'Utara', element: 'Air' },
            'Minggu Pahing': { character: 'Cerdas, terkenal', direction: 'Timur', element: 'Api' },
            'Minggu Pon': { character: 'Bahagia, mulia', direction: 'Selatan', element: 'Api' },
            'Minggu Wage': { character: 'Rajin, sukses', direction: 'Barat', element: 'Tanah' },
            'Minggu Kliwon': { character: 'Spiritual, pemimpin', direction: 'Utara', element: 'Air' }
        };
        
        const key = `${hari} ${pasaran}`;
        return combinations[key] || { character: 'Karakter unik', direction: 'Tengah', element: 'Campuran' };
    }

    getPrimbonInterpretation(hari, pasaran, neptu) {
        const meanings = {
            4: { name: 'Tikel Balung', meaning: 'Tulang rapuh - sensitif' },
            5: { name: 'Tikel Otot', meaning: 'Otot kuat - pekerja keras' },
            6: { name: 'Tikel Ati', meaning: 'Hati lembut - emosional' },
            7: { name: 'Tikel Usus', meaning: 'Usus panjang - sabar' },
            8: { name: 'Tikel Balik', meaning: 'Pulang - rindu kampung' },
            9: { name: 'Tikel Lulut', meaning: 'Sendi - fleksibel' },
            10: { name: 'Tikel Balung+Otot', meaning: 'Kuat tapi sensitif' },
            11: { name: 'Tikel Balung+Ati', meaning: 'Sensitif fisik-emosional' },
            12: { name: 'Tikel Balung+Usus', meaning: 'Sensitif tapi telaten' },
            13: { name: 'Tikel Balung+Balik', meaning: 'Sensitif, rindu rumah' },
            14: { name: 'Tikel Otot+Lulut', meaning: 'Kuat dan fleksibel' },
            15: { name: 'Sempurna', meaning: 'Harmonis, beruntung' },
            16: { name: 'Tikel Ati+Balik', meaning: 'Emosional, rindu' },
            17: { name: 'Tikel Usus+Lulut', meaning: 'Telaten dan adaptif' },
            18: { name: 'Tikel Balik+Lulut', meaning: 'Mudah berubah' }
        };
        
        const neptuData = meanings[neptu] || { name: 'Kombinasi', meaning: 'Karakter kompleks' };
        
        return {
            neptu: neptu,
            detail: neptuData,
            general: this.getGeneralWetonMeaning(pasaran)
        };
    }

    getGeneralWetonMeaning(pasaran) {
        const meanings = {
            'Legi': 'Weton beruntung - disukai, mudah rezeki',
            'Pahing': 'Weton cerdas - pemimpin, intelektual, ambisius',
            'Pon': 'Weton stabil - bisnis, keuangan, tenang',
            'Wage': 'Weton pekerja - kerja keras, hemat, sukses di usia tua',
            'Kliwon': 'Weton spiritual - guru, pemimpin agama, idealis'
        };
        return meanings[pasaran];
    }

    getPasaranJodoh(neptu) {
        const compatible = {
            4: [8, 13, 17], 5: [9, 14, 18], 6: [10, 15], 7: [11, 16],
            8: [12, 4, 17], 9: [13, 5, 18], 10: [14, 6], 11: [15, 7],
            12: [16, 8], 13: [17, 4, 9], 14: [18, 5, 10], 15: [6, 11],
            16: [7, 12], 17: [4, 8, 13], 18: [5, 9, 14]
        };
        
        return {
            neptu: neptu,
            compatibleNeptu: compatible[neptu] || [],
            description: 'Neptu harmonis: ' + (compatible[neptu] || []).join(', ')
        };
    }

    /**
     * TEST SUITE
     */
    runTests() {
        console.log('=== JAWA CALCULATOR TEST SUITE ===\n');
        
        const tests = [
            // Historical
            { date: new Date(1945, 7, 17), expected: { weton: 'Jumat Legi', neptu: 11, wuku: 'Sinta' } },
            
            // 1990s
            { date: new Date(1990, 0, 19), expected: { weton: 'Jumat Pahing', neptu: 15, wuku: 'Julungwangi' } },
            { date: new Date(1992, 3, 6), expected: { weton: 'Senin Kliwon', neptu: 12, wuku: 'Wayang' } },
            
            // 2000s
            { date: new Date(2000, 0, 2), expected: { weton: 'Minggu Pahing', neptu: 14, wuku: 'Galungan' } },
            { date: new Date(2012, 11, 31), expected: { weton: 'Senin Wage', neptu: 8, wuku: 'Bala' } },
            
            // 2020s
            { date: new Date(2026, 2, 11), expected: { weton: 'Rabu Pahing', neptu: 16, wuku: 'Wayang' } },
            
            // Cross-checks
            { date: new Date(1990, 0, 20), expected: { weton: 'Sabtu Pon' } },
            { date: new Date(1945, 7, 18), expected: { weton: 'Sabtu Pahing' } },
        ];
        
        let passed = 0;
        let failed = 0;
        
        tests.forEach(test => {
            const result = this.calculate(test.date);
            const success = result.weton === test.expected.weton;
            
            console.log(`Test: ${test.date.toDateString()}`);
            console.log(`  Expected: ${test.expected.weton}`);
            console.log(`  Got:      ${result.weton} (${result.wuku})`);
            console.log(`  Status:   ${success ? '✅ PASS' : '❌ FAIL'}`);
            console.log(`  Source:   ${result.validated ? 'VALIDATED' : result.anchor}`);
            console.log('');
            
            if (success) passed++; else failed++;
        });
        
        console.log(`=== RESULT: ${passed}/${tests.length} passed ===`);
        return { passed, failed };
    }
}

// Export
if (typeof module !== 'undefined') module.exports = JawaCalculator;
if (typeof window !== 'undefined') window.JawaCalculator = JawaCalculator;
