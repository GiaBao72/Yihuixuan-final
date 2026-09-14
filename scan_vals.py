
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}'}
out=[]
for loc in ['vi','zh','en']:
    r=requests.get(f'{BASE}/api/products?locale={loc}&pagination[pageSize]=100&fields[0]=name&fields[1]=specs&sort=order:asc',headers=H).json()
    out.append(f'===== {loc} =====')
    vals=set()
    for pr in r.get('data',[]):
        specs=pr['attributes'].get('specs') or []
        for s in specs:
            vals.add(f"{s.get('label')} || {s.get('value')}")
    for v in sorted(vals):
        out.append(v)
open('/root/smartlaser/scan_vals.txt','w',encoding='utf-8').write('\n'.join(out))
print('written', sum(1 for _ in out))
