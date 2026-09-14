
import json, requests, time, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}
HUP={'Authorization':f'Bearer {TOK}'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
imap=json.load(open('/root/smartlaser/data/image_map.json',encoding='utf-8'))
en=[d for d in data if d['_locale']=='en']

# --- delete ALL existing products (demo) ---
r=requests.get(f'{BASE}/api/products?locale=all&pagination[pageSize]=200',headers=H).json()
for pr in r.get('data',[]):
    requests.delete(f"{BASE}/api/products/{pr['id']}",headers=H)
print('deleted existing:', len(r.get('data',[])))

# --- upload images (map linkGroup -> media id) ---
imgids={}
for k,info in imap.items():
    fn=info['filename']; path=f'/root/smartlaser/data/images/{fn}'
    if not os.path.exists(path): continue
    with open(path,'rb') as f:
        up=requests.post(f'{BASE}/api/upload',files={'files':(fn,f,'image/png')},headers=HUP)
    if up.status_code==200:
        imgids[int(k)]=up.json()[0]['id']
    time.sleep(0.2)
print('images uploaded:', len(imgids))

# --- import 19 full EN products (skip 18, 24 = missing specs) ---
SKIP={18,24}
ok=0
for pr in en:
    g=pr['_linkGroup']
    if g in SKIP: continue
    specs=pr.get('specs')
    if isinstance(specs,str):
        try: specs=json.loads(specs)
        except: specs=None
    body={'data':{
        'name':pr['name'],
        'shortDescription':pr['shortDescription'],
        'fullDescription':pr['fullDescription'],
        'detailedContent':pr['detailedContent'],
        'specs':specs,
        'order':pr['order'],
        'isActive':True,
        'locale':'en',
        'publishedAt':'2026-08-29T00:00:00.000Z',
    }}
    if g in imgids: body['data']['mainImage']=imgids[g]
    rr=requests.post(f'{BASE}/api/products',json=body,headers=H)
    if rr.status_code==200: ok+=1
    else: print('FAIL',g,rr.status_code,rr.text[:150])
    time.sleep(0.2)
print('imported EN:', ok)

# verify
v=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=100&populate=mainImage',headers=H).json()
print('EN total now:', v.get('meta',{}).get('pagination',{}).get('total'))
