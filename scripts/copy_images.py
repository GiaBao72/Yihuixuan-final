#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Copy product images and create mapping.
Use the full-name version (p01_May_Cat_Ong_Laser_Toan_Tu_Dong.png)
"""
import shutil
import json
from pathlib import Path

SRC_DIR = Path(r'C:\Users\vgbvg\Downloads\anh_san_pham_borna_final')
DST_DIR = Path(__file__).parent.parent / 'data' / 'images'
DST_DIR.mkdir(exist_ok=True, parents=True)

# Find files matching p{XX}_*_*.png pattern (full names)
src_files = sorted(SRC_DIR.glob('p[0-9][0-9]_*.png'))
# Filter: only those with UPPERCASE in name (full version, not the lowercase short version)
full_version = [f for f in src_files if any(c.isupper() for c in f.stem)]

print(f'Source dir: {SRC_DIR}')
print(f'Found {len(src_files)} p*.png files')
print(f'Full-name versions: {len(full_version)}')
print()

# Copy and map
image_map = {}
for src_file in full_version:
    # Extract p01, p02... from filename
    num_str = src_file.stem.split('_')[0]  # p01
    num = int(num_str[1:])  # 1, 2, 3...
    
    dst_file = DST_DIR / src_file.name
    shutil.copy2(src_file, dst_file)
    
    # Map to linkGroup (product group 1-21)
    image_map[num] = {
        'filename': src_file.name,
        'linkGroup': num,
        'size_kb': dst_file.stat().st_size // 1024
    }
    print(f'  {num:2d} → {src_file.name[:50]:50s} ({image_map[num]["size_kb"]} KB)')

print()
print(f'✅ Copied {len(image_map)} images to {DST_DIR}')

# Save mapping
map_path = DST_DIR.parent / 'image_map.json'
with open(map_path, 'w', encoding='utf-8') as f:
    json.dump(image_map, f, ensure_ascii=False, indent=2)
print(f'✅ Saved image map to {map_path}')

# Check: product 21 missing?
if 21 not in image_map:
    print()
    print('⚠️  Product 21 (Máy hàn điện trở & laser kết hợp) has NO image')
