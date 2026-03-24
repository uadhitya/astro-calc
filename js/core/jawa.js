/**
 * Primbon Jawa / Weton Calculator
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
        
        // Sapta Wara (7 hari) - Panca Wara (5 pasaran) cycle
        // Total cycle: 35 days
    }

    // Calculate Javanese calendar from Gregorian
    // Reference: 1 Januari 1900 = Senin Legi (approximate)
    calculate(date) {
        const baseDate = new Date(1900, 0, 1);
        const diffTime = date - baseDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Sapta Wara (7-day cycle)
        const saptaIndex = diffDays % 7;
        const hari = this.hari[saptaIndex];
        
        // Panca Wara (5-day cycle)
        const pancaIndex = diffDays % 5;
        const pasaran = this.pasaran[pancaIndex];
        
        // Wuku (30-day cycle)
        // Base: 1 Jan 1900 = Sinta
        const wukuIndex = diffDays % 30;
        const wuku = this.wuku[wukuIndex];
        
        // Neptu total
        const neptu = hari.neptu + pasaran.neptu;
        
        // Dina Mula (birth day characteristics)
        const dinaMula = this.getDinaMula(hari.name, pasaran.name);
        
        // Primbon interpretation
        const primbon = this.getPrimbonInterpretation(hari.name, pasaran.name, neptu);
        
        return {
            hari: hari,
            pasaran: pasaran,
            weton: `${hari.name} ${pasaran.name}`,
            neptu: neptu,
            wuku: wuku,
            dinaMula: dinaMula,
            primbon: primbon,
            pasaranJodoh: this.getPasaranJodoh(neptu)
        };
    }

    getDinaMula(hari, pasaran) {
        // Characteristics based on Weton
        const combinations = {
            'Senin Legi': { character: 'Lemah lembut, sabar, pandai bergaul', direction: 'Utara' },
            'Senin Pahing': { character: 'Keras kepala, pemimpin, ambisius', direction: 'Timur' },
            'Senin Pon': { character: 'Tenang, bijaksana, penyabar', direction: 'Selatan' },
            'Senin Wage': { character: 'Pekerja keras, hemat, cermat', direction: 'Barat' },
            'Senin Kliwon': { character: 'Spiritual, idealis, keras hati', direction: 'Utara' },
            'Selasa Legi': { character: 'Berani, tegas, pemarah', direction: 'Selatan' },
            'Selasa Pahing': { character: 'Cerdas, licin, suka menang', direction: 'Barat' },
            'Selasa Pon': { character: 'Kuat, gigih, keras kepala', direction: 'Utara' },
            'Selasa Wage': { character: 'Pendiam, penuh perhitungan', direction: 'Timur' },
            'Selasa Kliwon': { character: 'Pemberani, suka tantangan', direction: 'Selatan' },
            'Rabu Legi': { character: 'Ramah, suka menolong, pemurah', direction: 'Barat' },
            'Rabu Pahing': { character: 'Cerdas, kritis, perfeksionis', direction: 'Utara' },
            'Rabu Pon': { character: 'Bijaksana, disegani, berwibawa', direction: 'Timur' },
            'Rabu Wage': { character: 'Tekun, rajin, detail-oriented', direction: 'Selatan' },
            'Rabu Kliwon': { character: 'Intuitif, spiritual, misterius', direction: 'Barat' },
            'Kamis Legi': { character: 'Bijak, berwibawa, disiplin', direction: 'Timur' },
            'Kamis Pahing': { character: 'Cerdas, berjiwa besar, visioner', direction: 'Selatan' },
            'Kamis Pon': { character: 'Stabil, kaya, berkelimpahan', direction: 'Barat' },
            'Kamis Wage': { character: 'Pekerja keras, sukses di usia tua', direction: 'Utara' },
            'Kamis Kliwon': { character: 'Spiritual, guru, pemimpin agama', direction: 'Timur' },
            'Jumat Legi': { character: 'Kaya, beruntung, disukai', direction: 'Selatan' },
            'Jumat Pahing': { character: 'Cerdas, kaya, berpengaruh', direction: 'Barat' },
            'Jumat Pon': { character: 'Tenang, bahagia, harmonis', direction: 'Utara' },
            'Jumat Wage': { character: 'Sabar, tekun, sukses bertahap', direction: 'Timur' },
            'Jumat Kliwon': { character: 'Spiritual, alim, dermawan', direction: 'Selatan' },
            'Sabtu Legi': { character: 'Kuat, gigih, mandiri', direction: 'Barat' },
            'Sabtu Pahing': { character: 'Cerdas, kuat, berpengaruh', direction: 'Utara' },
            'Sabtu Pon': { character: 'Teguh, stabil, kaya', direction: 'Timur' },
            'Sabtu Wage': { character: 'Pekerja keras, hemat, kaya', direction: 'Selatan' },
            'Sabtu Kliwon': { character: 'Spiritual, kuat, bertanggung jawab', direction: 'Barat' },
            'Minggu Legi': { character: 'Cerah, optimis, berani', direction: 'Utara' },
            'Minggu Pahing': { character: 'Cerdas, terkenal, berpengaruh', direction: 'Timur' },
            'Minggu Pon': { character: 'Bahagia, kaya, mulia', direction: 'Selatan' },
            'Minggu Wage': { character: 'Rajin, tekun, sukses', direction: 'Barat' },
            'Minggu Kliwon': { character: 'Spiritual, pemimpin, dermawan', direction: 'Utara' }
        };
        
        const key = `${hari} ${pasaran}`;
        return combinations[key] || { character: 'Karakter unik', direction: 'Tengah' };
    }

    getPrimbonInterpretation(hari, pasaran, neptu) {
        // Neptu interpretations
        const neptuMeanings = {
            4: { name: 'Tikel Balung', meaning: 'Tulang rapuh - sensitif, mudah terluka, butuh perlindungan' },
            5: { name: 'Tikel Otot', meaning: 'Otot kuat - fisik kuat, pekerja keras' },
            6: { name: 'Tikel Ati', meaning: 'Hati lembut - sensitif, emosional, penyayang' },
            7: { name: 'Tikel Usus', meaning: 'Usus panjang - sabar, telaten, detail' },
            8: { name: 'Tikel Balik', meaning: 'Pulang - suka pulang kampung, homesick' },
            9: { name: 'Tikel Lulut', meaning: 'Sendi - fleksibel, adaptif, mudah berubah' },
            10: { name: 'Tikel Balung + Otot', meaning: 'Kombinasi tulang-otot - kuat tapi sensitif' },
            11: { name: 'Tikel Balung + Ati', meaning: 'Kombinasi tulang-hati - sensitif fisik-emosional' },
            12: { name: 'Tikel Balung + Usus', meaning: 'Kombinasi tulang-usus - sensitif tapi telaten' },
            13: { name: 'Tikel Balung + Balik', meaning: 'Kombinasi tulang-pulang - sensitif, rindu rumah' },
            14: { name: 'Tikel Otot + Lulut', meaning: 'Kombinasi otot-sendi - kuat dan fleksibel' },
            15: { name: 'Sempurna', meaning: 'Neptu 15 - sempurna, harmonis, beruntung' },
            16: { name: 'Tikel Ati + Balik', meaning: 'Kombinasi hati-pulang - emosional, rindu' },
            17: { name: 'Tikel Usus + Lulut', meaning: 'Kombinasi usus-sendi - telaten dan adaptif' },
            18: { name: 'Tikel Balik + Lulut', meaning: 'Kombinasi pulang-sendi - mudah berubah, tidak menetap' }
        };
        
        const neptuData = neptuMeanings[neptu] || { name: 'Kombinasi', meaning: 'Karakter kompleks' };
        
        return {
            neptu: neptu,
            detail: neptuData,
            general: this.getGeneralWetonMeaning(hari, pasaran)
        };
    }

    getGeneralWetonMeaning(hari, pasaran) {
        // General weton categories
        if (pasaran === 'Kliwon') {
            return 'Weton spiritual - cocok untuk jabatan spiritual, guru, pemimpin agama. Keras hati tapi idealis.';
        } else if (pasaran === 'Pahing') {
            return 'Weton cerdas - cocok untuk pemimpin, pengusaha, intelektual. Ambisius dan berpengaruh.';
        } else if (pasaran === 'Legi') {
            return 'Weton beruntung - disukai banyak orang, mudah dapat rezeki, karakter menyenangkan.';
        } else if (pasaran === 'Pon') {
            return 'Weton stabil - cocok untuk bisnis, keuangan, karakter tenang dan bijaksana.';
        } else if (pasaran === 'Wage') {
            return 'Weton pekerja - sukses melalui kerja keras, hemat, cermat, sukses di usia tua.';
        }
        return 'Karakter unik';
    }

    getPasaranJodoh(neptu) {
        // Traditional compatibility based on neptu
        const compatible = {
            4: [8, 13, 17],    // Senin + Legi/Pahing/Pon/Wage/Kliwon
            5: [9, 14, 18],    // Selasa + Legi/Pahing/Pon/Wage/Kliwon
            6: [10, 15],       // Rabu + ...
            7: [11, 16],       // Kamis + ...
            8: [12, 4, 17],    // Jumat + ...
            9: [13, 5, 18],    // Sabtu + ...
            10: [14, 6],       // Minggu + ...
            11: [15, 7],
            12: [16, 8],
            13: [17, 4, 9],
            14: [18, 5, 10],
            15: [6, 11],
            16: [7, 12],
            17: [4, 8, 13],
            18: [5, 9, 14]
        };
        
        const pasaranNames = {
            4: 'Senin Legi', 5: 'Senin Pahing', 6: 'Senin Pon', 7: 'Senin Wage', 8: 'Senin Kliwon',
            9: 'Selasa Legi', 10: 'Selasa Pahing', 11: 'Selasa Pon', 12: 'Selasa Wage', 13: 'Selasa Kliwon',
            14: 'Rabu Legi', 15: 'Rabu Pahing', 16: 'Rabu Pon', 17: 'Rabu Wage', 18: 'Rabu Kliwon'
            // ... continue for all combinations
        };
        
        const compatNeptu = compatible[neptu] || [];
        return {
            neptu: neptu,
            compatibleNeptu: compatNeptu,
            description: 'Neptu yang harmonis untuk: ' + compatNeptu.join(', ')
        };
    }

    // Calculate compatibility between two weton
    calculateCompatibility(weton1, weton2) {
        const neptu1 = weton1.neptu;
        const neptu2 = weton2.neptu;
        const total = neptu1 + neptu2;
        
        // Traditional Javanese compatibility categories
        let category = '';
        let description = '';
        
        if (total === 14 || total === 17 || total === 21 || total === 28) {
            category = 'Sangat Baik (Pegat)';
            description = 'Cocok, harmonis, saling melengkapi';
        } else if (total === 15 || total === 18 || total === 24) {
            category = 'Baik (Ratu)';
            description = 'Sejahtera, kaya, berwibawa';
        } else if (total === 16 || total === 19 || total === 23) {
            category = 'Cukup (Jodoh)';
            description = 'Cocok, bahagia, tapi perlu usaha';
        } else if (total === 20 || total === 22) {
            category = 'Kurang (Topo)';
            description = 'Sering berpisah, butuh pengorbanan';
        } else {
            category = 'Perlu Perhatian';
            description = 'Tantangan dalam hubungan, butuh komunikasi';
        }
        
        return {
            neptu1, neptu2, total, category, description
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JawaCalculator;
}
