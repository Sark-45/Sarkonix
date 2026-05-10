import requests
import json

brands = [
    "zepto", "meesho", "Groww", "Khatabook", "Apollo Clinic", "Manipal Hospitals",
    "TVS Motors", "TVS Credit", "Muthoot Finance", "Jio", "bigbasket", "Urban Company",
    "Nykaa", "blinkit", "boAt", "lenskart"
]

def search_wikimedia(query):
    url = f"https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": f"{query} logo filetype:svg",
        "utf8": "",
        "format": "json"
    }
    try:
        r = requests.get(url, params=params, timeout=10)
        data = r.json()
        if data['query']['search']:
            title = data['query']['search'][0]['title']
            return title
    except:
        pass
    return None

def get_image_url(title):
    url = f"https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json"
    }
    try:
        r = requests.get(url, params=params, timeout=10)
        pages = r.json()['query']['pages']
        for page_id in pages:
            return pages[page_id]['imageinfo'][0]['url']
    except:
        pass
    return None

for brand in brands:
    title = search_wikimedia(brand)
    if title:
        img_url = get_image_url(title)
        if img_url:
            print(f"Found {brand}: {img_url}")
            try:
                svg_data = requests.get(img_url, timeout=10).text
                if "<svg" in svg_data:
                    filename = f"{brand.lower().replace(' ', '-')}.svg"
                    with open(filename, "w", encoding="utf-8") as f:
                        f.write(svg_data)
                    print(f"-> Saved {filename}")
            except:
                print(f"-> Failed to download {brand}")
        else:
            print(f"No image url for {brand} ({title})")
    else:
        print(f"Not found on wiki: {brand}")
