
import json, requests, os, time
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
en_by_name={d['name'].strip(): d['_linkGroup'] for d in data if d['_locale']=='en'}
vi={d['_linkGroup']:d for d in data if d['_locale']=='vi'}
SKIP={18,24}

# fetch EN on server: match by name -> linkGroup -> id
srv=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=200',headers=H).json()['data']
grp_to_enid={}
unmatched=[]
for p in srv:
    nm=p['attributes']['name'].strip()
    g=en_by_name.get(nm)
    if g is not None: grp_to_enid[g]=p['id']
    else: unmatched.append(nm)
print('EN matched by name:', len(grp_to_enid), 'unmatched:', len(unmatched))
for x in unmatched: print('  UNMATCHED:', x[:50])

# check which groups already have a VI localization (avoid dup)
already_vi=set()
for p in srv:
    g=en_by_name.get(p['attributes']['name'].strip())
    if g is None: continue
    locs=p['attributes'].get('localizations',{}).get('data',[])
    # can't see locale here without populate; skip, rely on POST result

ok=0; fail=0
for g in sorted(grp_to_enid):
    if g in SKIP: continue
    d=vi.get(g)
    if not d:
        print('no VI for grp',g); fail+=1; continue
    en_id=grp_to_enid[g]
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
        'locale':'vi',
    }
    r=requests.post(f'{BASE}/api/products/{en_id}/localizations',json=body,headers=H)
    if r.status_code in (200,201): ok+=1
    else: print('FAIL grp',g,r.status_code,r.text[:150]); fail+=1
    time.sleep(0.2)
print('VI linked:',ok,'fail:',fail)

# publish all vi drafts
v=requests.get(f'{BASE}/api/products?locale=vi&publicationState=preview&pagination[pageSize]=200',headers=H).json()['data']
pub=0
for p in v:
    if not p['attributes'].get('publishedAt'):
        uu=requests.put(f"{BASE}/api/products/{p['id']}?locale=vi",json={'data':{'publishedAt':'2026-08-29T00:00:00.000Z'}},headers=H)
        if uu.status_code==200: pub+=1
    time.sleep(0.1)
print('VI published:',pub)

pubchk=requests.get(f'{BASE}/api/products?locale=vi&pagination[pageSize]=200')
print('PUBLIC vi total:', pubchk.json().get('meta',{}).get('pagination',{}).get('total'))
