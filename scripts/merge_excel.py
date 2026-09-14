#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Merge Excel files into complete products JSON for Strapi import.
Data from: main file (63 records) + template (apps/cat/cta/order) + specs file
"""
import openpyxl
import json
import glob
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent.parent / 'data'
OUTPUT_DIR.mkdir(exist_ok=True)

# Find the main file (vietnamese name)
main_path = glob.glob(r'C:\Users\vgbvg\Downloads\*hoàn chỉnh yihuixuan.xlsx')[0]
template_path = r'C:\Users\vgbvg\Downloads\yihuixuan_product_template.xlsx'
specs_path = r'C:\Users\vgbvg\Downloads\yihuixuan_specs.xlsx'

print(f'Main: {Path(main_path).name}')
print(f'Template: {Path(template_path).name}')
print(f'Specs: {Path(specs_path).name}')
print()

# Load main file
wb_main = openpyxl.load_workbook(main_path, data_only=True)
ws_main = wb_main.worksheets[0]
rows_main = list(ws_main.iter_rows(values_only=True))

# Load template (has applications, category, cta, order) — only 1 row filled
wb_tpl = openpyxl.load_workbook(template_path, data_only=True)
ws_tpl = wb_tpl['Sản phẩm']
# Row 4 is first data row with full info
tpl_apps = ws_tpl.cell(4, 6).value  # applications JSON
tpl_cat = ws_tpl.cell(4, 7).value   # category
tpl_cta = ws_tpl.cell(4, 8).value   # cta_text
tpl_link = ws_tpl.cell(4, 9).value  # cta_link

# Load specs file (might have better JSON than main)
wb_specs = openpyxl.load_workbook(specs_path, data_only=True)
ws_specs = wb_specs.worksheets[0]
rows_specs = list(ws_specs.iter_rows(values_only=True))

# Build specs map: (id, locale) -> specs_json
specs_map = {}
for r in rows_specs:
    if r[0] and r[1] and r[2]:  # id, locale, name present
        specs_map[(int(r[0]), str(r[1]))] = r[3]  # specs JSON

print(f'Main rows: {len(rows_main)}, Specs map: {len(specs_map)}')
print()

# Parse main file: 3 blocks (vi=0-5, zh=6-11, en=12-17)
products = []
blocks = [('vi', 0, 6), ('zh', 6, 12), ('en', 12, 18)]

for row_idx, row in enumerate(rows_main[1:], start=2):  # skip header
    for locale, start_col, end_col in blocks:
        seg = row[start_col:end_col]
        if not seg[2]:  # Name not present
            continue
        
        prod_id = int(seg[0]) if seg[0] else None
        if not prod_id:
            continue
        
        # Get specs from specs_map if available, else from main
        specs_raw = specs_map.get((prod_id, locale)) or seg[5]
        
        product = {
            '_id': prod_id,
            '_locale': locale,
            '_row': row_idx,
            'name': str(seg[2]) if seg[2] else '',
            'shortDescription': str(seg[3]) if seg[3] else '',
            'fullDescription': str(seg[4]) if seg[4] else '',
            'specs': specs_raw if specs_raw else None,
            # Template-sourced (use vi template for all — will translate later)
            'applications': tpl_apps if locale == 'vi' else None,
            'category': tpl_cat if locale == 'vi' else None,
            'ctaText': tpl_cta if locale == 'vi' else None,
            'ctaLink': tpl_link if locale == 'vi' else None,
            'order': prod_id,  # use ID as order
            'isActive': True,
        }
        products.append(product)

print(f'Parsed {len(products)} product records')
print()

# Group by ID to create localization links
from collections import defaultdict
by_id = defaultdict(list)
for p in products:
    # Group vi/zh/en by their number (vi 1-24, zh 28-51, en 55-78)
    # Map to group: vi n → group n, zh n → group n-27, en n → group n-54
    locale = p['_locale']
    pid = p['_id']
    if locale == 'vi':
        group = pid
    elif locale == 'zh':
        group = pid - 27
    elif locale == 'en':
        group = pid - 54
    else:
        group = pid
    p['_linkGroup'] = group
    by_id[group].append(p)

print(f'Localization groups: {len(by_id)}')
print('Sample groups:')
for g in sorted(by_id.keys())[:5]:
    locales = [p['_locale'] for p in by_id[g]]
    names = [(p['_locale'], p['name'][:30]) for p in by_id[g]]
    print(f'  Group {g}: {locales} → {names}')
print()

# Check missing specs
missing_specs = [p for p in products if not p['specs']]
print(f'Records with MISSING specs: {len(missing_specs)}')
for p in missing_specs[:10]:
    print(f"  [{p['_locale']}] ID {p['_id']}: {p['name'][:50]}")
print()

# Save
output_path = OUTPUT_DIR / 'products_merged.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f'✅ Saved to: {output_path}')
print(f'   {len(products)} records')

wb_main.close()
wb_tpl.close()
wb_specs.close()
