
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

# fetch all zh (preview to catch drafts too)
r=requests.get(f'{BASE}/api/products?locale=zh&publicationState=preview&pagination[pageSize]=200',headers=H).json()
items=r.get('data',[])
print('zh items:', len(items))
fixed=0
for it in items:
    pid=it['id']; a=it['attributes']
    dc=a.get('detailedContent') or ''
    changed=False
    if 'Thông số kỹ thuật' in dc:
        dc=dc.replace('Thông số kỹ thuật','技术参数'); changed=True
    if changed:
        body={'data':{'detailedContent':dc}}
        up=requests.put(f'{BASE}/api/products/{pid}?locale=zh',json=body,headers=H)
        if up.status_code==200: fixed+=1
        else: print('FAIL',pid,up.status_code,up.text[:120])
print('html fixed:', fixed)

# ensure all published
pub=0
r2=requests.get(f'{BASE}/api/products?locale=zh&publicationState=preview&pagination[pageSize]=200',headers=H).json()
for it in r2.get('data',[]):
    if not it['attributes'].get('publishedAt'):
        up=requests.put(f"{BASE}/api/products/{it['id']}?locale=zh",json={'data':{'publishedAt':'2026-08-29T00:00:00.000Z'}},headers=H)
        if up.status_code==200: pub+=1
print('published now:', pub)

# verify sample html
v=requests.get(f'{BASE}/api/products?locale=zh&pagination[pageSize]=1',headers=H).json()
s=v['data'][0]['attributes']['detailedContent']
import re
m=re.search(r'<h3[^>]*>([^<]+)</h3>', s)
print('sample h3:', m.group(1) if m else 'none')
print('has VN heading:', 'Thông số kỹ thuật' in s)
