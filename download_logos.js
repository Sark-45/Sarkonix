const fs = require('fs');
const https = require('https');

const brands = [
    'zepto', 'meesho', 'Groww', 'Khatabook', 'Apollo Clinic', 'Manipal Hospitals',
    'TVS Motors', 'TVS Credit', 'Muthoot Finance', 'Jio', 'bigbasket', 'Urban Company',
    'Nykaa', 'blinkit', 'boAt', 'lenskart'
];

async function downloadLogo(brand) {
    const namesToTry = [
        brand.toLowerCase().replace(/ /g, '-'),
        brand.toLowerCase().replace(/ /g, ''),
        brand.toLowerCase().replace(/ /g, '-') + '-logo',
        brand.toLowerCase().replace(/ /g, '-') + '-1'
    ];

    for (const name of namesToTry) {
        const url = `https://cdn.worldvectorlogo.com/logos/${name}.svg`;
        console.log(`Trying ${url}`);
        try {
            const success = await new Promise((resolve) => {
                https.get(url, (res) => {
                    if (res.statusCode === 200) {
                        let data = '';
                        res.on('data', chunk => data += chunk);
                        res.on('end', () => {
                            if (data.includes('<svg')) {
                                fs.writeFileSync(`${brand}.svg`, data);
                                console.log(`[SUCCESS] Downloaded ${brand}.svg from ${url}`);
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    } else {
                        resolve(false);
                    }
                }).on('error', () => resolve(false));
            });
            if (success) return true;
        } catch (e) {
            continue;
        }
    }
    console.log(`[FAILED] Could not find SVG for ${brand}`);
    return false;
}

async function main() {
    for (const brand of brands) {
        await downloadLogo(brand);
    }
}

main();
