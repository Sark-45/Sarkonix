import requests
from bs4 import BeautifulSoup
import urllib.parse

brands = [
    {"name": "zepto", "url": "https://www.zeptonow.com/"},
    {"name": "meesho", "url": "https://meesho.com/"},
    {"name": "groww", "url": "https://groww.in/"},
    {"name": "khatabook", "url": "https://khatabook.com/"},
    {"name": "apollo-clinic", "url": "https://www.apolloclinic.com/"},
    {"name": "manipal-hospitals", "url": "https://www.manipalhospitals.com/"},
    {"name": "tvs-motors", "url": "https://www.tvsmotor.com/"},
    {"name": "tvs-credit", "url": "https://www.tvscredit.com/"},
    {"name": "muthoot-finance", "url": "https://www.muthootfinance.com/"},
    {"name": "jio", "url": "https://www.jio.com/"},
    {"name": "bigbasket", "url": "https://www.bigbasket.com/"},
    {"name": "urban-company", "url": "https://www.urbancompany.com/"},
    {"name": "nykaa", "url": "https://www.nykaa.com/"},
    {"name": "blinkit", "url": "https://blinkit.com/"},
    {"name": "boat", "url": "https://www.boat-lifestyle.com/"},
    {"name": "lenskart", "url": "https://www.lenskart.com/"}
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for brand in brands:
    print(f"Scraping {brand['name']}...")
    try:
        r = requests.get(brand['url'], headers=headers, timeout=10)
        soup = BeautifulSoup(r.text, 'html.parser')
        
        svg_found = False
        
        # Look for inline svgs that might be logos
        svgs = soup.find_all('svg')
        for svg in svgs:
            # check if it has logo in class or id or aria-label
            svg_str = str(svg).lower()
            if 'logo' in svg_str or brand['name'].lower() in svg_str:
                with open(f"{brand['name']}.svg", "w", encoding="utf-8") as f:
                    f.write(str(svg))
                print(f"-> Saved inline SVG for {brand['name']}")
                svg_found = True
                break
                
        if not svg_found:
            # Look for img with .svg
            imgs = soup.find_all('img')
            for img in imgs:
                src = img.get('src', '')
                if '.svg' in src.lower() and ('logo' in src.lower() or brand['name'].lower() in src.lower()):
                    if src.startswith('/'):
                        src = urllib.parse.urljoin(brand['url'], src)
                    svg_data = requests.get(src, headers=headers, timeout=10).text
                    with open(f"{brand['name']}.svg", "w", encoding="utf-8") as f:
                        f.write(svg_data)
                    print(f"-> Saved img SVG for {brand['name']}")
                    svg_found = True
                    break
        
        if not svg_found:
            print(f"-> No SVG found for {brand['name']}")
            
    except Exception as e:
        print(f"-> Failed: {e}")

