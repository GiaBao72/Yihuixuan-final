
import json, requests, os, time
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

# EN products (have image). Match localizations to copy same media id.
en=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=200&populate[mainImage]=true&populate[localizations]=true',headers=H).json()['data']
print('EN count', len(en))

fixed_vi=0; fixed_zh=0; noimg=0
for p in en:
    a=p['attributes']
    mi=(a.get('mainImage') or {}).get('data')
    if not mi:
        noimg+=1; continue
    mid=mi['id']
    locs=a.get('localizations',{}).get('data',[])
    for l in locs:
        la=l['attributes']; lid=l['id']; loc=la.get('locale')
        # set same mainImage on this localization row
        r=requests.put(f"{BASE}/api/products/{lid}?locale={loc}",json={'data':{'mainImage':mid}},headers=H)
        if r.status_code==200:
            if loc=='vi': fixed_vi+=1
            elif loc=='zh': fixed_zh+=1
        else:
            print('FAIL',lid,loc,r.status_code,r.text[:120])
        time.sleep(0.15)

print('vi fixed',fixed_vi,'zh fixed',fixed_zh,'en without img',noimg)

# verify
for loc in ('vi','zh'):
    r=requests.get(f'{BASE}/api/products?locale={loc}&pagination[pageSize]=100&populate=mainImage',headers=H).json()['data']
    wi=sum(1 for x in r if (x['attributes'].get('mainImage') or {}).get('data'))
    print(loc,'withImage now',wi,'/',len(r))
