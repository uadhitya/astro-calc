/**
 * Primbon Jawa / Weton Data
 * Comprehensive data for Javanese calendar calculations
 */

const WetonData = {
    // Hari (7-day week)
    Hari: [
        { name: 'Senin', neptu: 4, urip: 4, element: 'Air', direction: 'Utara' },
        { name: 'Selasa', neptu: 3, urip: 3, element: 'Api', direction: 'Selatan' },
        { name: 'Rabu', neptu: 7, urip: 7, element: 'Air', direction: 'Barat' },
        { name: 'Kamis', neptu: 8, urip: 6, element: 'Api', direction: 'Timur' },
        { name: 'Jumat', neptu: 6, urip: 5, element: 'Api', direction: 'Selatan' },
        { name: 'Sabtu', neptu: 9, urip: 9, element: 'Tanah', direction: 'Barat' },
        { name: 'Minggu', neptu: 5, urip: 5, element: 'Api', direction: 'Utara' }
    ],
    
    // Pasaran (5-day market cycle)
    Pasaran: [
        { name: 'Legi', neptu: 5, urip: 5, element: 'Api', nature: 'Beruntung' },
        { name: 'Pahing', neptu: 9, urip: 9, element: 'Tanah', nature: 'Cerdas' },
        { name: 'Pon', neptu: 7, urip: 7, element: 'Air', nature: 'Stabil' },
        { name: 'Wage', neptu: 4, urip: 4, element: 'Api', nature: 'Pekerja' },
        { name: 'Kliwon', neptu: 8, urip: 8, element: 'Air Api', nature: 'Spiritual' }
    ],
    
    // Wuku (30-week cycle)
    Wuku: [
        { name: 'Sinta', number: 1, meaning: 'Awal, benih, potensi' },
        { name: 'Landep', number: 2, meaning: 'Tajam, terbuka' },
        { name: 'Wukir', number: 3, meaning: 'Gunung, tinggi' },
        { name: 'Kurantil', number: 4, meaning: 'Menempel, dekat' },
        { name: 'Tolu', number: 5, meaning: 'Tiga, pertumbuhan' },
        { name: 'Gumbreg', number: 6, meaning: 'Tumpuk, banyak' },
        { name: 'Warigalit', number: 7, meaning: 'Goyang, tidak stabil' },
        { name: 'Warigagung', number: 8, meaning: 'Besar, mulia' },
        { name: 'Julungwangi', number: 9, meaning: 'Terang, bercahaya' },
        { name: 'Sungsang', number: 10, meaning: 'Terbalik, sulit' },
        { name: 'Galungan', number: 11, meaning: 'Menang, besar' },
        { name: 'Kuningan', number: 12, meaning: 'Kuning, emas' },
        { name: 'Langkir', number: 13, meaning: 'Miring, jatuh' },
        { name: 'Mandasiya', number: 14, meaning: 'Tenang, diam' },
        { name: 'Julungpujut', number: 15, meaning: 'Mencolok, menonjol' },
        { name: 'Pahang', number: 16, meaning: 'Gagal, macet' },
        { name: 'Kuruwelut', number: 17, meaning: 'Belit, rumit' },
        { name: 'Marakeh', number: 18, meaning: 'Tahan, bertahan' },
        { name: 'Tambir', number: 19, meaning: 'Tepi, batas' },
        { name: 'Medangkungan', number: 20, meaning: 'Sangkut, terhambat' },
        { name: 'Maktal', number: 21, meaning: 'Patah, putus' },
        { name: 'Wuye', number: 22, meaning: 'Hancur, rusak' },
        { name: 'Manahil', number: 23, meaning: 'Hati, perasaan' },
        { name: 'Prangbakat', number: 24, meaning: 'Prajurit, perang' },
        { name: 'Bala', number: 25, meaning: 'Banyak, kuat' },
        { name: 'Wugu', number: 26, meaning: 'Tumbuh, subur' },
        { name: 'Wayang', number: 27, meaning: 'Bayangan, tiruan' },
        { name: 'Kelawu', number: 28, meaning: 'Lembut, halus' },
        { name: 'Dukut', number: 29, meaning: 'Potong, pisah' },
        { name: 'Watugunung', number: 30, meaning: 'Batu gunung, kokoh' }
    ],
    
    // Dina Mula (birth characteristics by weton)
    DinaMula: {
        'Senin Legi': { character: 'Lemah lembut, sabar, pandai bergaul', arah: 'Utara', pekerjaan: 'Pelayanan, seni' },
        'Senin Pahing': { character: 'Keras kepala, pemimpin, ambisius', arah: 'Timur', pekerjaan: 'Pemimpin, bisnis' },
        'Senin Pon': { character: 'Tenang, bijaksana, penyabar', arah: 'Selatan', pekerjaan: 'Guru, konsultan' },
        'Senin Wage': { character: 'Pekerja keras, hemat, cermat', arah: 'Barat', pekerjaan: 'Akuntan, admin' },
        'Senin Kliwon': { character: 'Spiritual, idealis, keras hati', arah: 'Utara', pekerjaan: 'Spiritual, healing' },
        'Selasa Legi': { character: 'Berani, tegas, pemarah', arah: 'Selatan', pekerjaan: 'Militer, polisi' },
        'Selasa Pahing': { character: 'Cerdas, licin, suka menang', arah: 'Barat', pekerjaan: 'Pengacara, politik' },
        'Selasa Pon': { character: 'Kuat, gigih, keras kepala', arah: 'Utara', pekerjaan: 'Teknik, olahraga' },
        'Selasa Wage': { character: 'Pendiam, penuh perhitungan', arah: 'Timur', pekerjaan: 'Analis, programmer' },
        'Selasa Kliwon': { character: 'Pemberani, suka tantangan', arah: 'Selatan', pekerjaan: 'Petualang, atlit' },
        'Rabu Legi': { character: 'Ramah, suka menolong, pemurah', arah: 'Barat', pekerjaan: 'Sosial, kesehatan' },
        'Rabu Pahing': { character: 'Cerdas, kritis, perfeksionis', arah: 'Utara', pekerjaan: 'Dokter, peneliti' },
        'Rabu Pon': { character: 'Bijaksana, disegani, berwibawa', arah: 'Timur', pekerjaan: 'Hakim, pemimpin' },
        'Rabu Wage': { character: 'Tekun, rajin, detail-oriented', arah: 'Selatan', pekerjaan: 'Craftsman, artist' },
        'Rabu Kliwon': { character: 'Intuitif, spiritual, misterius', arah: 'Barat', pekerjaan: 'Dukun, paranormal' },
        'Kamis Legi': { character: 'Bijak, berwibawa, disiplin', arah: 'Timur', pekerjaan: 'Guru, manajer' },
        'Kamis Pahing': { character: 'Cerdas, berjiwa besar, visioner', arah: 'Selatan', pekerjaan: 'CEO, entrepreneur' },
        'Kamis Pon': { character: 'Stabil, kaya, berkelimpahan', arah: 'Barat', pekerjaan: 'Bankir, investor' },
        'Kamis Wage': { character: 'Pekerja keras, sukses di usia tua', arah: 'Utara', pekerjaan: 'Pengrajin, pedagang' },
        'Kamis Kliwon': { character: 'Spiritual, guru, pemimpin agama', arah: 'Timur', pekerjaan: 'Ustad, pendeta' },
        'Jumat Legi': { character: 'Kaya, beruntung, disukai', arah: 'Selatan', pekerjaan: 'Sales, marketing' },
        'Jumat Pahing': { character: 'Cerdas, kaya, berpengaruh', arah: 'Barat', pekerjaan: 'Politikus, pengusaha' },
        'Jumat Pon': { character: 'Tenang, bahagia, harmonis', arah: 'Utara', pekerjaan: 'Diplomat, mediator' },
        'Jumat Wage': { character: 'Sabar, tekun, sukses bertahap', arah: 'Timur', pekerjaan: 'Petani, pengrajin' },
        'Jumat Kliwon': { character: 'Spiritual, alim, dermawan', arah: 'Selatan', pekerjaan: 'Filantropis, ulama' },
        'Sabtu Legi': { character: 'Kuat, gigih, mandiri', arah: 'Barat', pekerjaan: 'Petani, buruh' },
        'Sabtu Pahing': { character: 'Cerdas, kuat, berpengaruh', arah: 'Utara', pekerjaan: 'Jenderal, polisi' },
        'Sabtu Pon': { character: 'Teguh, stabil, kaya', arah: 'Timur', pekerjaan: 'Pengusaha, properti' },
        'Sabtu Wage': { character: 'Pekerja keras, hemat, kaya', arah: 'Selatan', pekerjaan: 'Pedagang, wiraswasta' },
        'Sabtu Kliwon': { character: 'Spiritual, kuat, bertanggung jawab', arah: 'Barat', pekerjaan: 'Kyai, pemimpin' },
        'Minggu Legi': { character: 'Cerah, optimis, berani', arah: 'Utara', pekerjaan: 'Entertainer, artis' },
        'Minggu Pahing': { character: 'Cerdas, terkenal, berpengaruh', arah: 'Timur', pekerjaan: 'Artis, selebritis' },
        'Minggu Pon': { character: 'Bahagia, kaya, mulia', arah: 'Selatan', pekerjaan: 'Bangsawan, elite' },
        'Minggu Wage': { character: 'Rajin, tekun, sukses', arah: 'Barat', pekerjaan: 'Profesional, akademisi' },
        'Minggu Kliwon': { character: 'Spiritual, pemimpin, dermawan', arah: 'Utara', pekerjaan: 'Raja, presiden' }
    },
    
    // Neptu interpretations (Tikel)
    NeptuInterpretations: {
        4: { name: 'Tikel Balung', meaning: 'Tulang rapuh - sensitif, mudah terluka, butuh perlindungan' },
        5: { name: 'Tikel Otot', meaning: 'Otot kuat - fisik kuat, pekerja keras' },
        6: { name: 'Tikel Ati', meaning: 'Hati lembut - sensitif, emosional, penyayang' },
        7: { name: 'Tikel Usus', meaning: 'Usus panjang - sabar, telaten, detail' },
        8: { name: 'Tikel Balik', meaning: 'Pulang - suka pulang kampung, homesick' },
        9: { name: 'Tikel Lulut', meaning: 'Sendi - fleksibel, adaptif, mudah berubah' },
        10: { name: 'Tikel Balung Otot', meaning: 'Kuat tapi sensitif' },
        11: { name: 'Tikel Balung Ati', meaning: 'Sensitif fisik-emosional' },
        12: { name: 'Tikel Balung Usus', meaning: 'Sensitif tapi telaten' },
        13: { name: 'Tikel Balung Balik', meaning: 'Sensitif, rindu rumah' },
        14: { name: 'Tikel Otot Lulut', meaning: 'Kuat dan fleksibel' },
        15: { name: 'Sempurna', meaning: 'Harmonis, beruntung, ideal' },
        16: { name: 'Tikel Ati Balik', meaning: 'Emosional, rindu' },
        17: { name: 'Tikel Usus Lulut', meaning: 'Telaten dan adaptif' },
        18: { name: 'Tikel Balik Lulut', meaning: 'Mudah berubah, tidak menetap' }
    },
    
    // Jodoh compatibility (Neptu matching)
    JodohCompatibility: {
        categories: {
            'Pegat': { range: [1, 9], meaning: 'Berpisah, tidak cocok', advice: 'Perlu usaha besar' },
            'Ratu': { range: [10, 18], meaning: 'Sejahtera, berwibawa', advice: 'Sangat baik' },
            'Jodoh': { range: [19, 27], meaning: 'Cocok, bahagia', advice: 'Baik' },
            'Topo': { range: [28, 36], meaning: 'Sering berpisah', advice: 'Butuh komunikasi' }
        },
        
        // Specific neptu combinations
        compatiblePairs: {
            4: [8, 13, 17], 5: [9, 14, 18], 6: [10, 15], 7: [11, 16],
            8: [12, 4, 17], 9: [13, 5, 18], 10: [14, 6], 11: [15, 7],
            12: [16, 8], 13: [17, 4, 9], 14: [18, 5, 10], 15: [6, 11],
            16: [7, 12], 17: [4, 8, 13], 18: [5, 9, 14]
        },
        
        calculate: function(neptu1, neptu2) {
            const total = neptu1 + neptu2;
            const remainder = total % 35;
            
            let category;
            if (remainder <= 9) category = 'Pegat';
            else if (remainder <= 18) category = 'Ratu';
            else if (remainder <= 27) category = 'Jodoh';
            else category = 'Topo';
            
            const isCompatible = this.compatiblePairs[neptu1] && 
                                this.compatiblePairs[neptu1].includes(neptu2);
            
            return {
                neptu1, neptu2, total, remainder, category,
                isCompatible,
                advice: this.categories[category].advice
            };
        }
    },
    
    // Pawukon (30-day cycle) for specific purposes
    Pawukon: {
        // Good days for specific activities
        goodDays: {
            'Menanam': ['Sinta', 'Landep', 'Wuku'],
            'Bercocok tanam': ['Tolu', 'Gumbreg'],
            'Membangun rumah': ['Warigalit', 'Warigagung', 'Julungwangi'],
            'Menikah': ['Galungan', 'Kuningan'],
            'Bisnis': ['Bala', 'Wugu', 'Wayang'],
            'Spiritual': ['Sinta', 'Kliwon', 'Pahing']
        },
        
        // Bad days (malam)
        badDays: ['Sungsang', 'Pahang', 'Kuruwelut', 'Wuye']
    },
    
    // Tahun Jawa (Windu cycle)
    TahunJawa: {
        names: ['Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakir'],
        elements: ['Fire', 'Earth', 'Air', 'Water', 'Fire', 'Earth', 'Air', 'Water'],
        
        getTahun: function(year) {
            // 1924 = Be (index 5)
            const index = (year - 1924 + 5) % 8;
            return {
                name: this.names[index],
                element: this.elements[index],
                index: index
            };
        }
    },
    
    // Bulan Jawa
    BulanJawa: {
        names: ['Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadilawal', 'Jumadilakir',
                'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'],
        arab: ['Muharram', 'Safar', 'Rabiulawal', 'Rabiulakhir', 'Jumadilawal', 'Jumadilakhir',
               'Rajab', 'Syaban', 'Ramadan', 'Syawal', 'Zulkaidah', 'Zulhijah'],
        days: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29] // Approximate
    },
    
    // Validated dates from almnk.com
    ValidatedDates: {
        '1945-08-17': { hari: 'Jumat', pasaran: 'Legi', wuku: 'Sinta', tahun: 1876, neptu: 11 },
        '1990-01-19': { hari: 'Jumat', pasaran: 'Pahing', wuku: 'Julungwangi', tahun: 1921, neptu: 15 },
        '1992-04-06': { hari: 'Senin', pasaran: 'Kliwon', wuku: 'Wayang', tahun: 1924, neptu: 12 },
        '2000-01-02': { hari: 'Minggu', pasaran: 'Pahing', wuku: 'Galungan', tahun: 1932, neptu: 14 },
        '2012-12-31': { hari: 'Senin', pasaran: 'Wage', wuku: 'Bala', tahun: 1945, neptu: 8 },
        '2026-03-11': { hari: 'Rabu', pasaran: 'Pahing', wuku: 'Wayang', tahun: 1959, neptu: 16 }
    },
    
    // Helper functions
    getHari: function(name) {
        return this.Hari.find(h => h.name === name);
    },
    
    getPasaran: function(name) {
        return this.Pasaran.find(p => p.name === name);
    },
    
    getWuku: function(name) {
        return this.Wuku.find(w => w.name === name);
    },
    
    getDinaMula: function(hari, pasaran) {
        return this.DinaMula[`${hari} ${pasaran}`] || { 
            character: 'Karakter unik', 
            arah: 'Tengah',
            pekerjaan: 'Bervariasi'
        };
    },
    
    getNeptuInterpretation: function(neptu) {
        return this.NeptuInterpretations[neptu] || { 
            name: 'Kombinasi', 
            meaning: 'Karakter kompleks' 
        };
    }
};

// Export
if (typeof module !== 'undefined') module.exports = WetonData;
