import re
import os

def parse_markdown(md_content):
    # Split by H2
    sections = re.split(r'^(?=##\s+)', md_content, flags=re.MULTILINE)
    
    # 1. Fungal Insights (Intro - whatever is before first ##)
    # The first split will be the intro if the file doesn't start with ##
    # In file: line 1 is "# *Fungal Insights*". 
    # line 23 is "## A Comprehensive..."
    
    # So sections[0] is the intro.
    # We want "The H2 ... are the new subtabs".
    # What about the intro?
    # Maybe the intro should be the default view or a "Home" subtab?
    # User said "The H2 of the markdown file ... are the new subtabs".
    # I'll create a "Home" or "Presentation" subtab for the H1/Intro content.
    
    subtabs = []
    
    # Intro
    intro_lines = sections[0].strip().split('\n')
    # Remove H1 if present
    if intro_lines[0].startswith('# '):
        title = intro_lines[0][2:].strip().replace('*', '') # Remove markdown bold/italic chars from title if simple
        content = '\n'.join(intro_lines[1:])
    else:
        title = "Introduction"
        content = sections[0]
        
    subtabs.append({'title': title, 'content': content, 'id': 'nm-intro'})
    
    # Other sections
    for i, section in enumerate(sections[1:]):
        lines = section.strip().split('\n')
        header = lines[0]
        # remove '## '
        title = header.replace('##', '').strip()
        content = '\n'.join(lines[1:])
        
        # Safe ID
        safe_id = 'nm-' + re.sub(r'[^a-zA-Z0-9-]', '-', title.lower()).strip('-')
        
        subtabs.append({'title': title, 'content': content, 'id': safe_id})
        
    return subtabs

def md_to_html(md_text):
    # Basic MD to HTML converter
    lines = md_text.split('\n')
    html_lines = []
    
    in_list = False
    
    for line in lines:
        line = line.strip()
        if not line:
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            html_lines.append('<br>') # preserve breaks
            continue
            
        # Headers
        if line.startswith('### '):
            if in_list: html_lines.append('</ul>'); in_list=False
            html_lines.append(f'<h3>{process_inline(line[4:])}</h3>')
        elif line.startswith('#### '):
            if in_list: html_lines.append('</ul>'); in_list=False
            html_lines.append(f'<h4>{process_inline(line[5:])}</h4>')
        elif line.startswith('##### '):
            if in_list: html_lines.append('</ul>'); in_list=False
            html_lines.append(f'<h5>{process_inline(line[6:])}</h5>')
        elif line.startswith('- '):
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
            html_lines.append(f'<li>{process_inline(line[2:])}</li>')
        else:
             if in_list: html_lines.append('</ul>'); in_list=False
             # Paragraph or plain text
             # Handling > blockquotes roughly
             if line.startswith('> '):
                 html_lines.append(f'<blockquote>{process_inline(line[2:])}</blockquote>')
             elif line.startswith('---'):
                 html_lines.append('<hr>')
             else:
                 html_lines.append(f'<p>{process_inline(line)}</p>')
                 
    if in_list:
        html_lines.append('</ul>')
        
    return '\n'.join(html_lines)

def process_inline(text):
    # **bold**
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    # *italic*
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
    # [link](url)
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2" target="_blank">\1</a>', text)
    return text

def generate_html_structure(subtabs):
    # Icons/Images for decoration
    # Files: 13.svg to 18.svg
    # We have 8 subtabs (Intro + 7 H2s)
    # Images: 13, 14, 15, 16, 17, 18 (6 images)
    # Mapping: 
    # Intro -> ? (Maybe none or NM.svg)
    # 1 -> 13
    # 2 -> 14
    # 3 -> 15
    # 4 -> 16
    # 5 -> 17
    # 6 -> 18
    # 7 -> 13 (cycle)
    
    images = ['13.svg', '14.svg', '15.svg', '16.svg', '17.svg', '18.svg']
    
    html = []
    
    # Banner
    html.append('<div class="nm-banner-container"><img src="img/banner-NM.png" alt="Fungal Insights Banner" class="nm-banner"></div>')
     
    html.append('<div class="nm-container">')
    
    # Navigation Sidebar
    html.append('<div class="nm-sidebar">')
    html.append('<div class="nm-nav-buttons">')
    for i, tab in enumerate(subtabs):
        active_class = ' active' if i == 0 else ''
        html.append(f'<button class="nm-nav-btn{active_class}" onclick="openNeoTab(event, \'{tab["id"]}\')">{tab["title"]}</button>')
    html.append('</div>') # nm-nav-buttons
    html.append('</div>') # nm-sidebar
    
    # Content Area
    html.append('<div class="nm-content-area">')
    for i, tab in enumerate(subtabs):
        display = 'block' if i == 0 else 'none'
        
        # Decide content decoration image
        # Using 13 to 18.
        # Let's say we put the image at the top right of the content or as a background watermark.
        # User said "decorate every subtabs".
        
        # Map i to image
        img_idx = (i) % len(images)
        img_file = images[img_idx]
        if i == 0: # Intro tab
             img_file = 'NM.svg' # Use generic for intro? Or cycle?
             # User said "13 to 1.svg files will decorate every subtabs".
             # Intro is technically not an H2, so maybe user didn't count it as a subtab?
             # But it has content.
             # I'll stick to cycling 13-18 for H2s.
             # Intro: let's use NM.svg or something.
             pass
        else:
             # H2s start at index 1 in the list
             img_idx = (i - 1) % len(images)
             img_file = images[img_idx]
        
        html.append(f'<div id="{tab["id"]}" class="nm-subtab-content" style="display:{display};">')
        
        # Decoration Image
        html.append(f'<img src="img/{img_file}" class="nm-decoration-icon" alt="Decoration">')
        
        html.append(f'<h2>{tab["title"]}</h2>')
        html.append(md_to_html(tab["content"]))
        html.append('</div>')
        
    html.append('</div>') # nm-content-area
    
    html.append('</div>') # nm-container
    
    return '\n'.join(html)

def main():
    with open('NeoMycologist.md', 'r') as f:
        md_content = f.read()
        
    subtabs = parse_markdown(md_content)
    html_output = generate_html_structure(subtabs)
    
    with open('neomycologist_fragment.html', 'w') as f:
        f.write(html_output)
        
    # Also generate CSS stub
    css_output = """
/* Fungal Insights Tab Styles */
.nm-banner-container {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}
.nm-banner {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.nm-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
}
.nm-sidebar {
    flex: 0 0 250px;
    border-right: 1px solid #ddd;
    padding-right: 20px;
}
.nm-nav-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.nm-nav-btn {
    padding: 12px 15px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    color: #444;
}
.nm-nav-btn:hover {
    background-color: #eef;
    color: #004a91;
    border-color: #cce;
}
.nm-nav-btn.active {
    background-color: #004a91;
    color: #fff;
    border-color: #004a91;
}
.nm-content-area {
    flex: 1;
    min-width: 300px;
    position: relative;
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.nm-subtab-content {
    position: relative;
    animation: fadeIn 0.5s;
}
.nm-decoration-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    opacity: 0.2;
    z-index: 0;
    pointer-events: none;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@media (max-width: 768px) {
    .nm-container {
        flex-direction: column;
    }
    .nm-sidebar {
        flex: auto;
        border-right: none;
        border-bottom: 1px solid #ddd;
        padding-right: 0;
        padding-bottom: 20px;
    }
}
"""
    with open('css/neomycologist.css', 'w') as f:
        f.write(css_output)

if __name__ == '__main__':
    main()
