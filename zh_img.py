
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

# ZH order -> linkGroup: zh order 28..47 map to groups 1..20; group = order_zh - 27
# But safer: use products_complete.json to map zh order -> linkGroup, then linkGroup -> image via image_map
data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
imap=json.load(open('/root/smartlaser/data/image_map.json',encoding='utf-8'))

# EN products on server have mainImage set -> get linkGroup via order match
# Build: order_en -> media id  (from EN server records)
en_srv=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=100&populate=mainImage',headers=H).json()['data']
# order -> media id
order_to_media={}
for pr in en_srv:
    a=pr['attributes']
    mi=a.get('mainImage',{}).get('data')
    if mi: order_to_media[a['order']]=mi['id']

# map en order -> zh order via products_complete linkGroup
# en order and zh order share linkGroup
g_to_en_order={}; g_to_zh_order={}
for d in data:
    if d['_locale']=='en': g_to_en_order[d['_linkGroup']]=d['order']
    if d['_locale']=='zh': g_to_zh_order[d['_linkGroup']]=d['order']

zh_order_to_media={}
for g,zo in g_to_zh_order.items():
    eo=g_to_en_order.get(g)
    if eo in order_to_media:
        zh_order_to_media[zo]=order_to_media[eo]

# now fetch zh products (preview to include drafts, but they are published)
zh=requests.get(f'{BASE}/api/products?locale=zh&pagination[pageSize]=100',headers=H).json()['data']
fixed=0
for pr in zh:
    a=pr['attributes']; pid=pr['id']; o=a['order']
    mid=zh_order_to_media.get(o)
    if mid:
        rr=requests.put(f'{BASE}/api/products/{pid}',json={'data':{'mainImage':mid}},headers=H)
        if rr.status_code==200: fixed+=1
        else: print('FAIL',pid,rr.status_code,rr.text[:120])
print('zh image fixed:', fixed)

# verify
v=requests.get(f'{BASE}/api/products?locale=zh&pagination[pageSize]=100&populate=mainImage',headers=H).json()['data']
withimg=sum(1 for x in v if x['attributes'].get('mainImage',{}).get('data'))
print('zh with image now:', withimg, '/', len(v))
