
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

# find media id for p18 (prefer the long-name version)
up=requests.get(f'{BASE}/api/upload/files?pagination[pageSize]=200',headers={'Authorization':f'Bearer {TOK}'}).json()
p18=None
for f in up:
    n=f.get('name','')
    if n.startswith('p18_May_Han_Xung'):
        p18=f['id']; break
if not p18:
    for f in up:
        if f.get('name','').startswith('p18'):
            p18=f['id']; break
print('p18 media id:', p18)

# homepage-features: gan p18 cho ban #18 (Precision pulse / 精密脉冲焊机 / May han xung) o zh + en
names18={'精密脉冲焊机','Precision pulse welding machine','Máy hàn xung chính xác'}
fixed=0
for loc in ['zh','en','vi']:
    r=requests.get(f'{BASE}/api/homepage-features?locale={loc}&publicationState=preview&pagination[pageSize]=50&populate=mainImage',headers=H).json()['data']
    for hf in r:
        a=hf['attributes']
        if a['name'] in names18 and not (a.get('mainImage',{}) or {}).get('data'):
            u=requests.put(f"{BASE}/api/homepage-features/{hf['id']}?locale={loc}",json={'data':{'mainImage':p18}},headers=H)
            if u.status_code==200: fixed+=1; print('fixed',loc,a['name'][:20])
            else: print('FAIL',loc,u.status_code,u.text[:120])
print('hf image fixed:', fixed)

# verify
for loc in ['vi','zh','en']:
    v=requests.get(f'{BASE}/api/homepage-features?locale={loc}&pagination[pageSize]=50&populate=mainImage',headers=H).json()['data']
    wi=sum(1 for x in v if (x['attributes'].get('mainImage',{}) or {}).get('data'))
    print(loc,'withImg',wi,'/',len(v))
