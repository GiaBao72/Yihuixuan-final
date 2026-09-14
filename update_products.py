# -*- coding: utf-8 -*-
import openpyxl, requests, os, json
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}'}

wb=openpyxl.load_workbook('/root/smartlaser/chuan-final.xlsx')
ws=wb.active
rows=list(ws.iter_rows(values_only=True))
header=rows[0]

# Parse: every 3 columns = 1 product (vi, zh, en)
# structure: ID, Locale, Name, Short, Full, _, ID, Locale, Name, Short, Full, _, ID...
products={}
for row in rows[1:]:
    if not row[0]: continue
    # VI block
    vid=int(row[0]) if isinstance(row[0], (int,float)) else int(float(row[0]))
    if vid not in products: products[vid]={'vi':{},'zh':{},'en':{}}
    if row[1]=='vi':
        products[vid]['vi']={'name':row[2],'short':row[3],'full':row[4]}
    # ZH block (col 6+)
    if len(row)>7 and row[7]=='zh':
        products[vid]['zh']={'name':row[8],'short':row[9],'full':row[10]}
    # EN block (col 12+)
    if len(row)>13 and row[13]=='en':
        products[vid]['en']={'name':row[14],'short':row[15],'full':row[16]}

print(f'Parsed {len(products)} products from Excel')

# Upload images first (dedupe by name)
uploaded_imgs={}
for fn in os.listdir('/root/smartlaser/images'):
    if not fn.lower().endswith('.jpg'): continue
    with open(f'/root/smartlaser/images/{fn}','rb') as f:
        files={'files':('产品图片.jpg',f,'image/jpeg')}
        r=requests.post(f'{BASE}/api/upload',files=files,headers=H)
        if r.status_code in (200,201):
            data=r.json()
            if data and len(data)>0:
                uploaded_imgs[fn]=data[0]['id']
                print(f'Uploaded {fn} -> ID {data[0]["id"]}')
        else:
            print(f'FAIL upload {fn}: {r.status_code}')

# Get existing products mapping (by order)
r_vi=requests.get(f'{BASE}/api/products?locale=vi&pagination[pageSize]=100&fields[0]=id&sort=order:asc',headers=H).json()
pid_map={}  # excel_id -> strapi_id
for idx, pr in enumerate(r_vi['data'], start=1):
    pid_map[idx]=pr['id']

print(f'Product ID mapping: {len(pid_map)} entries')

# Update each product
updated=0
for xid, data in products.items():
    if xid not in pid_map:
        print(f'SKIP excel ID {xid} - no mapping')
        continue
    pid=pid_map[xid]
    
    # Image: {xid}.jpg or {xid}.JPG
    img_fn=f'{xid}.jpg'
    img_id=uploaded_imgs.get(img_fn) or uploaded_imgs.get(f'{xid}.JPG')
    
    for loc in ['vi','zh','en']:
        if not data[loc].get('name'): continue
        body={
            'name': data[loc]['name'],
            'shortDescription': data[loc]['short'],
            'fullDescription': data[loc]['full']
        }
        if img_id and loc=='vi':  # only set images on VI (shared across locales)
            body['images']=[img_id]
        
        u=requests.put(f'{BASE}/api/products/{pid}?locale={loc}',json={'data':body},headers={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'})
        if u.status_code==200:
            updated+=1
        else:
            print(f'FAIL {loc} product {pid}: {u.status_code} {u.text[:120]}')

print(f'Updated {updated} product-locale records')
