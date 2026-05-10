import os

brand_styles = {
    'zepto': {'color': '#3A0070', 'font': 'Arial', 'weight': 'bold', 'text': 'Zepto', 'style': 'italic'},
    'meesho': {'color': '#F43397', 'font': 'Arial', 'weight': 'bold', 'text': 'meesho'},
    'groww': {'color': '#00D09C', 'font': 'Arial', 'weight': 'bold', 'text': 'Groww'},
    'khatabook': {'color': '#0054F1', 'font': 'Arial', 'weight': 'bold', 'text': 'Khatabook'},
    'apollo-clinic': {'color': '#007A33', 'font': 'Times New Roman', 'weight': 'bold', 'text': 'Apollo Clinic'},
    'manipal-hospitals': {'color': '#00478F', 'font': 'Arial', 'weight': 'bold', 'text': 'Manipal Hospitals'},
    'tvs-motors': {'color': '#0033A0', 'font': 'Arial', 'weight': '900', 'text': 'TVS'},
    'tvs-credit': {'color': '#0033A0', 'font': 'Arial', 'weight': '900', 'text': 'TVS Credit'},
    'muthoot-finance': {'color': '#D42127', 'font': 'Arial', 'weight': 'bold', 'text': 'Muthoot Finance'},
    'jio': {'color': '#0D27CC', 'font': 'Arial', 'weight': '900', 'text': 'Jio'},
    'bigbasket': {'color': '#84C225', 'font': 'Arial', 'weight': 'bold', 'text': 'bb'},
    'urban-company': {'color': '#000000', 'font': 'Arial', 'weight': 'bold', 'text': 'UC'},
    'nykaa': {'color': '#FC2779', 'font': 'Arial', 'weight': 'bold', 'text': 'NYKAA'},
    'blinkit': {'color': '#F8CB46', 'font': 'Arial', 'weight': 'bold', 'text': 'blinkit'},
    'boat': {'color': '#FF0000', 'font': 'Arial', 'weight': '900', 'text': 'boAt'},
    'lenskart': {'color': '#329c92', 'font': 'Arial', 'weight': 'bold', 'text': 'Lenskart'}
}

for key, props in brand_styles.items():
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="100%" height="100%">
    <rect width="300" height="100" fill="transparent"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="{props.get('font', 'Arial')}, sans-serif" font-size="40" font-weight="{props.get('weight', 'normal')}" fill="{props.get('color', '#000')}" font-style="{props.get('style', 'normal')}">{props.get('text', key)}</text>
</svg>"""
    filename = f"{key}.svg"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {filename}")
