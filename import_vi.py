
import json, requests, os, time
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
en=[d for d in data if d['_locale']=='en']
vi={d['_linkGroup']:d for d in data if d['_locale']=='vi'}
SKIP={18,24}

# map linkGroup -> order_en (used as order on server)
g_order={d['_linkGroup']:d['order'] for d in en}

# fetch EN on server: order -> id
srv=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=200',headers=H).json()['data']
order2id={p['attributes']['order']:p['id'] for p in srv}
print('EN on server:', len(order2id))

ok=0; fail=0
for g in sorted(g_order):
    if g in SKIP: continue
    d=vi.get(g)
    if not d:
        print('no VI for grp',g); fail+=1; continue
    en_id=order2id.get(g_order[g])
    if not en_id:
        print('no EN base grp',g); fail+=1; continue
    specs=d.get('specs')
    if isinstance(specs,str):
        try: specs=json.loads(specs)
        except: specs=None
    body={
        'name':d['name'],
        'shortDescription':d['shortDescription'],
        'fullDescription':d['fullDescription'],
        'detailedContent':d['detailedContent'],
        'specs':specs,
        'order':g_order[g],
        'locale':'vi',
    }
    r=requests.post(f'{BASE}/api/products/{en_id}/localizations',json=body,headers=H)
    if r.status_code in (200,201): ok+=1
    else: print('FAIL grp',g,r.status_code,r.text[:150]); fail+=1
    time.sleep(0.2)
print('VI linked:',ok,'fail:',fail)

# publish all vi
v=requests.get(f'{BASE}/api/products?locale=vi&publicationState=preview&pagination[pageSize]=200',headers=H).json()['data']
pub=0
for p in v:
    if not p['attributes'].get('publishedAt'):
        u=requests.put(f"{BASE}/api/products/{p['id']}?locale=vi",json={'data':{'publishedAt':'2026-08-29T00:00:00.000Z'}},headers=H)
        if u.status_code==200: pub+=1
    time.sleep(0.1)
print('VI published:',pub)

pubchk=requests.get(f'{BASE}/api/products?locale=vi&pagination[pageSize]=200')
print('PUBLIC vi total:', pubchk.json().get('meta',{}).get('pagination',{}).get('total'))
