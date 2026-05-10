import requests
import json
import urllib.parse

brands = [
    "zepto", "meesho", "Groww", "Khatabook", "Apollo Clinic", "Manipal Hospitals",
    "TVS Motors", "TVS Credit", "Muthoot Finance", "Jio", "bigbasket", "Urban Company",
    "Nykaa", "blinkit", "boAt", "lenskart"
]

def search_wvl(query):
    url = f"https://worldvectorlogo.com/api/v2/search/{urllib.parse.quote(query)}"
    try:
        r = requests.get(url, timeout=10)
        data = r.json()
        if data.get('results'):
            return data['results'][0]['slug']
    except Exception as e:
        pass
    return None

for brand in brands:
    print(f"Searching {brand}...")
    slug = search_wvl(brand)
    if slug:
        svg_url = f"https://cdn.worldvectorlogo.com/logos/{slug}.svg"
        print(f"-> Found slug {slug}, downloading from {svg_url}")
        try:
            svg_data = requests.get(svg_url, timeout=10).text
            if "<svg" in svg_data:
                filename = f"{brand.lower().replace(' ', '-')}.svg"
                with open(filename, "w", encoding="utf-8") as f:
                    f.write(svg_data)
                print(f"-> Saved {filename}")
        except:
            print(f"-> Failed to download {brand}")
    else:
        print(f"-> Not found on wvl: {brand}")
