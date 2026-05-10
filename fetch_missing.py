import requests
import base64

missing = {
    "meesho": [
        "https://cdn.worldvectorlogo.com/logos/meesho.svg",
        "https://cdn.worldvectorlogo.com/logos/meesho-logo.svg",
        "https://www.meesho.com/assets/svgicons/meeshoLogo.svg"
    ],
    "khatabook": [
        "https://cdn.worldvectorlogo.com/logos/khatabook.svg",
        "https://khatabook-assets.s3.amazonaws.com/media/khatabook_logo.svg",
        "https://khatabook.com/assets/logo.svg"
    ],
    "muthoot-finance": [
        "https://cdn.worldvectorlogo.com/logos/muthoot-finance.svg",
        "https://cdn.worldvectorlogo.com/logos/muthoot-group.svg"
    ],
    "urban-company": [
        "https://cdn.worldvectorlogo.com/logos/urbanclap.svg",
        "https://cdn.worldvectorlogo.com/logos/urban-company.svg"
    ],
    "nykaa": [
        "https://cdn.worldvectorlogo.com/logos/nykaa-1.svg",
        "https://cdn.worldvectorlogo.com/logos/nykaa.svg",
        "https://www.nykaa.com/media/wysiwyg/2021/Nykaa_logo_black.svg"
    ],
    "blinkit": [
        "https://cdn.worldvectorlogo.com/logos/blinkit.svg",
        "https://cdn.worldvectorlogo.com/logos/grofers.svg",
        "https://cdn.worldvectorlogo.com/logos/grofers-1.svg"
    ]
}

headers = {'User-Agent': 'Mozilla/5.0'}

for name, urls in missing.items():
    success = False
    for url in urls:
        print(f"Trying {url}...")
        try:
            r = requests.get(url, headers=headers, timeout=5)
            if r.status_code == 200 and '<svg' in r.text.lower():
                with open(f"{name}.svg", "w", encoding="utf-8") as f:
                    f.write(r.text)
                print(f"-> Saved {name}.svg")
                success = True
                break
        except Exception as e:
            pass
    if not success:
        # Generate SVG with base64 encoded Clearbit PNG
        print(f"-> Falling back to Clearbit for {name}")
        domain_map = {
            "meesho": "meesho.com",
            "khatabook": "khatabook.com",
            "muthoot-finance": "muthootfinance.com",
            "urban-company": "urbancompany.com",
            "nykaa": "nykaa.com",
            "blinkit": "blinkit.com"
        }
        cb_url = f"https://logo.clearbit.com/{domain_map[name]}"
        try:
            r = requests.get(cb_url, headers=headers, timeout=5)
            if r.status_code == 200:
                b64 = base64.b64encode(r.content).decode('utf-8')
                svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><image href="data:image/png;base64,{b64}" width="200" height="200" /></svg>'
                with open(f"{name}.svg", "w", encoding="utf-8") as f:
                    f.write(svg)
                print(f"-> Saved clearbit SVG for {name}")
            else:
                print(f"-> Failed clearbit for {name}")
        except:
            print(f"-> Failed clearbit for {name}")
