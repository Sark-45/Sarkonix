import glob
import re

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove the wrongly injected plain text class after the >
    content = content.replace('> class="img-fluid w-full max-w-[50vw] sm:max-w-[200px] h-auto object-contain"', '>')
    
    # Optionally remove double class attributes if the first regex was misconstructed
    content = re.sub(r'class="img-fluid w-full max-w-\[50vw\] sm:max-w-\[200px\] h-auto object-contain"\s*class="img-fluid w-full max-w-\[50vw\] sm:max-w-\[200px\] h-auto object-contain"', 'class="img-fluid w-full max-w-[50vw] sm:max-w-[200px] h-auto object-contain"', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
