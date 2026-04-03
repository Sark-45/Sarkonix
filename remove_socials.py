import glob
import re

for f in glob.glob('index.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Use regex to find and remove the contact-socials div block
    # We target the specific class and style we added.
    pattern = r'\s*<div class="contact-socials reveal reveal-d5" style="display:flex;gap:1.5rem;margin-top:2.5rem;">.*?</div>'
    new_content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Removed social icons from {f}")
    else:
        print(f"Pattern not found in {f}")
