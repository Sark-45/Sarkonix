import glob
import os

css_additions = """
    /* --- MOBILE RESPONSIVENESS FIXES --- */
    @media (max-width: 768px) {
      /* Prevent horizontal scrolling */
      html, body { overflow-x: hidden; width: 100%; }
      
      /* Fix massive logo scaling */
      .logo img, .foot-logo img { height: 44px !important; width: auto !important; max-width: 60vw !important; object-fit: contain !important; }
      
      /* Improve navbar layout */
      nav { padding: 0 4vw !important; height: 60px !important; }
      .mobile-drawer, .drawer { top: 60px !important; }
      
      /* Better spacing for hero to not be under header */
      #hero, .page-hero { padding-top: 6rem !important; }
      
      /* Better footer layout */
      footer { padding: 3rem 5vw !important; }
    }
"""

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Neutralize the problematic generic img sizing 
    content = content.replace("img { max-width: 100%; height: auto; }", "/* img fixed */")
    content = content.replace("img { max-width: 100% !important; height: auto !important; }", "/* img fixed */")
    
    # 2. Append the new CSS chunk before </style>
    if "/* --- MOBILE RESPONSIVENESS FIXES --- */" not in content:
        content = content.replace("</style>", css_additions + "\n  </style>")
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print(f"Updated {len(files)} HTML files.")
