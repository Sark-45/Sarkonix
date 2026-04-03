import glob
import re

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace href="#" with href="https://x.com/sarkonix63298" target="_blank" for the X aria-label links
    content = re.sub(
        r'<a\s+href="[^"]*"\s+class="social-link"\s+aria-label="X">',
        r'<a href="https://x.com/sarkonix63298" target="_blank" class="social-link" aria-label="X">',
        content,
        flags=re.IGNORECASE
    )
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Updated all X links.")
