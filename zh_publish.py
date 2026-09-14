
import requests, os, json, time
B='http://127.0.0.1:1337'; T=os.environ['TOK']; H={'Authorization':f'Bearer {T}','Content-Type':'application/json'}
# Fetch all ZH drafts
r=requests.get(f'{B}/api/products?locale=zh&publicationState=preview&pagination[pageSize]=100',headers=H)
print('fetch',r.status_code)
data=r.json().get('data',[])
print('ZH drafts found',len(data))
ok=0
for p in data:
    a=p['attributes']; html=a.get('detailedContent') or ''
    # Localize generated HTML heading correctly
    html=html.replace('Thông số kỹ thuật','技术参数').replace('Technical Specifications','技术参数')
    body={'data':{'detailedContent':html,'publishedAt':'2026-08-29T00:00:00.000Z'}}
    # locale query ensures localized row is updated
    u=requests.put(f"{B}/api/products/{p['id']}?locale=zh",json=body,headers=H)
    if u.status_code==200: ok+=1
    else: print('FAIL',p['id'],u.status_code,u.text[:120])
    time.sleep(.1)
print('ZH updated/published',ok)
# Verify PUBLIC (no token)
v=requests.get(f'{B}/api/products?locale=zh&pagination[pageSize]=100')
print('public status',v.status_code,'total',v.json().get('meta',{}).get('pagination',{}).get('total'))
