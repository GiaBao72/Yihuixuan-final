
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
TARGET={18,24}
sel=[d for d in data if d['_linkGroup'] in TARGET]
print('records for grp 18/24:', len(sel))
for d in sorted(sel, key=lambda x:(x['_linkGroup'], x['_locale'])):
    print(f"  grp{d['_linkGroup']:>2} {d['_locale']}  short={len(d.get('shortDescription') or '')} full={len(d.get('fullDescription') or '')}  {d['name'][:38]}")

print()
print('=== media files on server (p18 / p24) ===')
r=requests.get(f'{BASE}/api/upload/files?pagination[pageSize]=100',headers=H)
if r.status_code==200:
    files=r.json()
    arr=files if isinstance(files,list) else files.get('results',[])
    for f in arr:
        nm=f.get('name','')
        if nm.startswith('p18') or nm.startswith('p24'):
            print('  ', f['id'], nm)
else:
    print('  files fetch',r.status_code, r.text[:150])

print()
print('=== existing homepage-features ===')
hf=requests.get(f'{BASE}/api/homepage-features?locale=all&publicationState=preview&pagination[pageSize]=100',headers=H)
print('  status',hf.status_code,'total',hf.json().get('meta',{}).get('pagination',{}).get('total') if hf.status_code==200 else '')
