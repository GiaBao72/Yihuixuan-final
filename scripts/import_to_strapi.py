#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Import products to Strapi v4.
Must run AFTER creating admin user and getting API token.
"""
import requests
import json
import time
from pathlib import Path

STRAPI_URL = 'http://127.0.0.1:1337'
import os; API_TOKEN = os.environ['ST_TOKEN']

if not API_TOKEN:
    print('ERROR: API token required')
    exit(1)

headers = {
    'Authorization': f'Bearer {API_TOKEN}',
    'Content-Type': 'application/json',
}

DATA_DIR = Path(__file__).parent.parent / 'data'
products_path = DATA_DIR / 'products_complete.json'
image_map_path = DATA_DIR / 'image_map.json'
images_dir = DATA_DIR / 'images'

with open(products_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

with open(image_map_path, 'r', encoding='utf-8') as f:
    image_map = json.load(f)

print(f'Loaded {len(products)} products, {len(image_map)} images')
print()

# === STEP 1: Upload images ===
print('=== STEP 1: Uploading images ===')
uploaded_images = {}
for num_str, info in image_map.items():
    num = int(num_str)
    filename = info['filename']
    img_path = images_dir / filename
    
    if not img_path.exists():
        print(f'  ⚠️  Missing: {filename}')
        continue
    
    with open(img_path, 'rb') as f:
        files = {'files': (filename, f, 'image/png')}
        resp = requests.post(f'{STRAPI_URL}/api/upload', files=files, headers={'Authorization': f'Bearer {API_TOKEN}'})
    
    if resp.status_code == 200:
        data = resp.json()
        if data and len(data) > 0:
            img_id = data[0]['id']
            uploaded_images[num] = img_id
            print(f'  ✅ {num:2d} → {filename[:40]:40s} → ID {img_id}')
        else:
            print(f'  ❌ {filename}: no data')
    else:
        print(f'  ❌ {filename}: {resp.status_code} {resp.text[:100]}')
    
    time.sleep(0.3)

print(f'\n✅ Uploaded {len(uploaded_images)} images\n')

# === STEP 2: Create vi products first (default locale) ===
print('=== STEP 2: Creating vi products ===')
vi_products = [p for p in products if p['_locale'] == 'vi']
vi_id_map = {}  # linkGroup -> Strapi ID

for p in vi_products:
    link_group = p['_linkGroup']
    
    # Parse specs JSON if string
    specs = p['specs']
    if isinstance(specs, str):
        try:
            specs = json.loads(specs)
        except:
            specs = None
    
    # Parse applications JSON if string
    apps = p.get('applications')
    if isinstance(apps, str):
        try:
            apps = json.loads(apps)
        except:
            apps = None
    
    data = {
        'data': {
            'name': p['name'],
            'shortDescription': p['shortDescription'],
            'fullDescription': p['fullDescription'],
            'detailedContent': p['detailedContent'],
            'specs': specs,
            'applications': apps,
            'category': p.get('category'),
            'ctaText': p.get('ctaText'),
            'ctaLink': p.get('ctaLink'),
            'order': p['order'],
            'isActive': p['isActive'],
            'locale': 'vi',
            'publishedAt': None,  # draft first
        }
    }
    
    # Add mainImage if available
    if link_group in uploaded_images:
        data['data']['mainImage'] = uploaded_images[link_group]
    
    resp = requests.post(f'{STRAPI_URL}/api/products', json=data, headers=headers)
    
    if resp.status_code == 200:
        strapi_id = resp.json()['data']['id']
        vi_id_map[link_group] = strapi_id
        print(f'  ✅ Group {link_group:2d} → {p["name"][:45]:45s} → ID {strapi_id}')
    else:
        print(f'  ❌ Group {link_group}: {resp.status_code} {resp.text[:200]}')
    
    time.sleep(0.3)

print(f'\n✅ Created {len(vi_id_map)} vi products\n')

# === STEP 3: Create zh/en localizations ===
print('=== STEP 3: Creating zh/en localizations ===')
for locale in ['zh', 'en']:
    locale_products = [p for p in products if p['_locale'] == locale]
    print(f'\n--- Locale: {locale} ({len(locale_products)} products) ---')
    
    for p in locale_products:
        link_group = p['_linkGroup']
        if link_group not in vi_id_map:
            print(f'  ⚠️  Group {link_group} has no vi base')
            continue
        
        vi_id = vi_id_map[link_group]
        
        specs = p['specs']
        if isinstance(specs, str):
            try:
                specs = json.loads(specs)
            except:
                specs = None
        
        data = {
            'name': p['name'],
            'shortDescription': p['shortDescription'],
            'fullDescription': p['fullDescription'],
            'detailedContent': p['detailedContent'],
            'specs': specs,
            'ctaText': p.get('ctaText'),
            'ctaLink': p.get('ctaLink'),
            'locale': locale,
        }
        
        resp = requests.post(
            f'{STRAPI_URL}/api/products/{vi_id}/localizations',
            json=data,
            headers=headers
        )
        
        if resp.status_code == 200:
            loc_id = resp.json()['id']
            print(f'  ✅ Group {link_group:2d} {locale} → {p["name"][:40]:40s} → ID {loc_id}')
        else:
            print(f'  ❌ Group {link_group} {locale}: {resp.status_code} {resp.text[:200]}')
        
        time.sleep(0.3)

print()

# === STEP 4: Publish all ===
print('=== STEP 4: Publishing all products ===')
resp = requests.get(f'{STRAPI_URL}/api/products?locale=all&pagination[pageSize]=100', headers=headers)
if resp.status_code == 200:
    all_products = resp.json()['data']
    for p in all_products:
        pid = p['id']
        pub_resp = requests.put(
            f'{STRAPI_URL}/api/products/{pid}',
            json={'data': {'publishedAt': '2026-08-29T00:00:00.000Z'}},
            headers=headers
        )
        if pub_resp.status_code == 200:
            print(f'  ✅ Published ID {pid}')
        else:
            print(f'  ❌ Publish ID {pid}: {pub_resp.status_code}')
        time.sleep(0.2)

print()
print('✅ IMPORT COMPLETE')
print(f'   Total: {len(vi_id_map)} products × 3 locales = {len(vi_id_map)*3} records')
print(f'   Images: {len(uploaded_images)}/21')
