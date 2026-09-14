
import json, requests, time, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
en=[d for d in data if d['_locale']=='en']
zh=[d for d in data if d['_locale']=='zh']
SKIP={18,24}

# map linkGroup -> order_en (order used when EN was imported = pr['order'])
grp_order = {d['_linkGroup']: d['order'] for d in en}

# fetch EN products on server: map order -> en_id
r=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=200',headers=H).json()
order2id={}
for pr in r['data']:
    order2id[pr['attributes']['order']]=pr['id']
print('EN on server:', len(order2id))

ok=0; fail=0
for pr in zh:
    g=pr['_linkGroup']
    if g in SKIP: continue
    order_en=grp_order.get(g)
    en_id=order2id.get(order_en)
    if not en_id:
        print('NO EN BASE grp',g,'order',order_en); fail+=1; continue
    specs=pr.get('specs')
    if isinstance(specs,str):
        try: specs=json.loads(specs)
        except: specs=None
    body={
        'name':pr['name'],
        'shortDescription':pr['shortDescription'],
        'fullDescription':pr['fullDescription'],
        'detailedContent':pr['detailedContent'],
        'specs':specs,
        'order':pr['order'],
        'locale':'zh',
    }
    rr=requests.post(f'{BASE}/api/products/{en_id}/localizations',json=body,headers=H)
    if rr.status_code in (200,201):
        ok+=1
    else:
        print('FAIL grp',g,rr.status_code,rr.text[:150]); fail+=1
    time.sleep(0.2)
print('ZH linked:', ok, 'fail:', fail)

# publish all zh
v=requests.get(f'{BASE}/api/products?locale=zh&pagination[pageSize]=200',headers=H).json()
pub=0
for pr in v['data']:
    if not pr['attributes'].get('publishedAt'):
        u=requests.put(f"{BASE}/api/products/{pr['id']}",json={'data':{'publishedAt':'2026-08-29T00:00:00.000Z'}},headers=H)
        if u.status_code==200: pub+=1
    time.sleep(0.1)
print('ZH published now:', pub, 'total zh:', v.get('meta',{}).get('pagination',{}).get('total'))
