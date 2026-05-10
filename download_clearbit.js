const fs = require('fs');
const https = require('https');

const brands = [
    { name: 'zepto', domain: 'zeptonow.com' },
    { name: 'meesho', domain: 'meesho.com' },
    { name: 'Groww', domain: 'groww.in' },
    { name: 'Khatabook', domain: 'khatabook.com' },
    { name: 'Apollo Clinic', domain: 'apolloclinic.com' },
    { name: 'Manipal Hospitals', domain: 'manipalhospitals.com' },
    { name: 'TVS Motors', domain: 'tvsmotor.com' },
    { name: 'TVS Credit', domain: 'tvscredit.com' },
    { name: 'Muthoot Finance', domain: 'muthootfinance.com' },
    { name: 'Jio', domain: 'jio.com' },
    { name: 'bigbasket', domain: 'bigbasket.com' },
    { name: 'Urban Company', domain: 'urbancompany.com' },
    { name: 'Nykaa', domain: 'nykaa.com' },
    { name: 'blinkit', domain: 'blinkit.com' },
    { name: 'boAt', domain: 'boat-lifestyle.com' },
    { name: 'lenskart', domain: 'lenskart.com' }
];

async function downloadLogo(brand) {
    // Clearbit typically returns PNGs
    const url = `https://logo.clearbit.com/${brand.domain}`;
    const filename = `${brand.name.toLowerCase().replace(/ /g, '-')}.png`;
    
    console.log(`Downloading ${brand.name}...`);
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(filename);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    console.log(`[SUCCESS] Saved ${filename}`);
                    resolve(true);
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                     if (res2.statusCode === 200) {
                        const fileStream = fs.createWriteStream(filename);
                        res2.pipe(fileStream);
                        fileStream.on('finish', () => {
                            console.log(`[SUCCESS] Saved ${filename}`);
                            resolve(true);
                        });
                     } else {
                        console.log(`[FAILED] Status ${res2.statusCode} for ${brand.name}`);
                        resolve(false);
                     }
                }).on('error', () => resolve(false));
            } else {
                console.log(`[FAILED] Status ${res.statusCode} for ${brand.name}`);
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
}

async function main() {
    for (const brand of brands) {
        await downloadLogo(brand);
    }
}

main();
