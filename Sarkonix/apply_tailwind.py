import glob
import re

tailwind_cdn = """
  <!-- Tailwind CSS (No Preflight to protect existing styles) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      corePlugins: { preflight: false }
    }
  </script>
</head>"""

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Inject Tailwind CDN right before </head> if not exists
    if "cdn.tailwindcss.com" not in content:
        content = content.replace("</head>", tailwind_cdn)
    
    # 2. Add Tailwind & Bootstrap responsive classes to the logo images
    # We'll match <img src="Sarkonix-Logo1.jpeg" ...> and add the classes.
    # The existing images might have no class or some styles.
    
    # Header logo
    content = re.sub(
        r'(<a[^>]*class="logo"[^>]*>.*?(?:<img[^>]*src="[^"]*Logo[^"]*"[^>]*))(>)',
        r'\1 class="img-fluid w-full max-w-[45vw] sm:max-w-[200px] h-auto object-contain"\2',
        content,
        flags=re.IGNORECASE | re.DOTALL
    )
    
    # Footer logo
    content = re.sub(
        r'(<div[^>]*class="foot-logo"[^>]*>.*?(?:<img[^>]*src="[^"]*Logo[^"]*"[^>]*))(style="[^"]*")([^>]*>)',
        r'\1 \3 class="img-fluid w-full max-w-[50vw] sm:max-w-[200px] h-auto object-contain"',
        content,
        flags=re.IGNORECASE | re.DOTALL
    )
    # Fallback if no style attribute in footer logo
    content = re.sub(
        r'(<div[^>]*class="foot-logo"[^>]*>.*?(?:<img[^>]*src="[^"]*Logo[^"]*")(?!\s*style=)[^>]*)(>)',
        r'\1 class="img-fluid w-full max-w-[50vw] sm:max-w-[200px] h-auto object-contain"\2',
        content,
        flags=re.IGNORECASE | re.DOTALL
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Applied Tailwind classes to all logos and injected Tailwind CDN.")
