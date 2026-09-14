#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate detailedContent HTML from specs JSON + fullDescription.
Reconstruct the format found in the 100-char truncated samples.
"""
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / 'data'
products_path = DATA_DIR / 'products_merged.json'

with open(products_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f'Loaded {len(products)} products')
print()

def generate_html(product):
    """Generate product detail HTML from specs + description."""
    name = product['name']
    full_desc = product['fullDescription']
    specs_raw = product['specs']
    
    # Parse specs JSON if present
    specs_list = []
    if specs_raw:
        try:
            if isinstance(specs_raw, str):
                specs_obj = json.loads(specs_raw)
            else:
                specs_obj = specs_raw
            if isinstance(specs_obj, list):
                specs_list = specs_obj
        except:
            pass
    
    # Build HTML
    html = '<div class="product-detail">\n'
    html += f'  <h2 style="font-size: 24px; border-bottom: 2px solid; padding-bottom: 10px; margin-bottom: 20px;">{name}</h2>\n'
    html += f'  <div style="margin-bottom: 30px; line-height: 1.8;">{full_desc}</div>\n'
    
    if specs_list:
        html += '  <h3 style="font-size: 20px; margin-top: 30px; margin-bottom: 15px;">Thông số kỹ thuật</h3>\n'
        html += '  <table style="width: 100%; border-collapse: collapse;">\n'
        html += '    <tbody>\n'
        for spec in specs_list:
            label = spec.get('label', '')
            value = spec.get('value', '')
            html += f'      <tr style="border-bottom: 1px solid #ddd;">\n'
            html += f'        <td style="padding: 12px; font-weight: 600; width: 40%;">{label}</td>\n'
            html += f'        <td style="padding: 12px;">{value}</td>\n'
            html += '      </tr>\n'
        html += '    </tbody>\n'
        html += '  </table>\n'
    
    html += '</div>'
    return html

# Generate for all products
generated = 0
for p in products:
    html = generate_html(p)
    p['detailedContent'] = html
    generated += 1

print(f'✅ Generated detailedContent HTML for {generated} products')

# Save updated JSON
output_path = DATA_DIR / 'products_complete.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f'✅ Saved to: {output_path}')
print()

# Show sample
print('Sample HTML (first 500 chars):')
print(products[0]['detailedContent'][:500])
