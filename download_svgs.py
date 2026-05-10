import requests
import base64
import os

brands = [
    {"name": "zepto", "domain": "zeptonow.com"},
    {"name": "meesho", "domain": "meesho.com"},
    {"name": "Groww", "domain": "groww.in"},
    {"name": "Khatabook", "domain": "khatabook.com"},
    {"name": "Apollo Clinic", "domain": "apolloclinic.com"},
    {"name": "Manipal Hospitals", "domain": "manipalhospitals.com"},
    {"name": "TVS Motors", "domain": "tvsmotor.com"},
    {"name": "TVS Credit", "domain": "tvscredit.com"},
    {"name": "Muthoot Finance", "domain": "muthootfinance.com"},
    {"name": "Jio", "domain": "jio.com"},
    {"name": "bigbasket", "domain": "bigbasket.com"},
    {"name": "Urban Company", "domain": "urbancompany.com"},
    {"name": "Nykaa", "domain": "nykaa.com"},
    {"name": "blinkit", "domain": "blinkit.com"},
    {"name": "boAt", "domain": "boat-lifestyle.com"},
    {"name": "lenskart", "domain": "lenskart.com"}
]

for brand in brands:
    name = brand['name']
    domain = brand['domain']
    filename = f"{name.lower().replace(' ', '-')}.svg"
    
    url = f"https://logo.clearbit.com/{domain}"
    print(f"Downloading {name}...")
    try:
        response = requests.get(url, allow_redirects=True, timeout=10)
        if response.status_code == 200:
            content_type = response.headers.get('Content-Type', '')
            image_data = response.content
            b64_data = base64.b64encode(image_data).decode('utf-8')
            
            # Create SVG wrapper
            svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <image href="data:{content_type};base64,{b64_data}" width="200" height="200" />
</svg>"""
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(svg_content)
            print(f"[SUCCESS] Saved {filename}")
        else:
            print(f"[FAILED] Status {response.status_code} for {name}")
    except Exception as e:
        print(f"[ERROR] Failed for {name}: {e}")
