import os

replacements = {
    'id="neomycologist"': 'id="fungalinsights"',
    'src="img/banner-NM.png"': 'src="img/FI-banner.png"',
    'src="img/NM.svg"': 'src="img/FI-logo.png"',
    'id="nm-scope" class="nm-subtab-content" style="display:none;">\n                        <img src="img/13.svg"': 'id="nm-scope" class="nm-subtab-content" style="display:none;">\n                        <img src="img/FungalInsights15.jpeg"',
    'src="img/15.svg"': 'src="img/FungalInsights13.jpeg"',
    'src="img/16.svg"': 'src="img/FungalInsights14.jpeg"',
    'src="img/17.svg"': 'src="img/FungalInsights03.jpeg"',
    'src="img/18.svg"': 'src="img/FungalInsights02.jpeg"',
    'id="nm-ethical-publishing-guidelines" class="nm-subtab-content" style="display:none;">\n                        <img src="img/13.svg"': 'id="nm-ethical-publishing-guidelines" class="nm-subtab-content" style="display:none;">\n                        <img src="img/FungalInsights04.jpeg"',
}

files_to_update = [
    '/home/jpmslima/coding/inct-fungos.github.io/index_en.html',
    '/home/jpmslima/coding/inct-fungos.github.io/index_es.html',
    '/home/jpmslima/coding/inct-fungos.github.io/neomycologist_fragment.html',
    '/home/jpmslima/coding/inct-fungos.github.io/neomycologist-dist/index.html',
    '/home/jpmslima/coding/inct-fungos.github.io/neomycologist-dist/index_es.html',
    '/home/jpmslima/coding/inct-fungos.github.io/neomycologist-dist/index_en.html',
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        for old, new in replacements.items():
            if old in content:
                content = content.replace(old, new)
                modified = True
        
        # some may be formatted differently due to whitespace
        if 'img/13.svg' in content:
           # fallback for scope and ethical if whitespace differs
           scope_start = content.find('id="nm-scope"')
           ethical_start = content.find('id="nm-ethical-publishing-guidelines"')
           # manually replace
           # We will handle it by doing generic replace if they exist identically
           pass
           
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {filepath}')

