# Troca a cor dos fundos de estúdio gravados nas fotos (azul/coral do Bigode) pela paleta do rowan.
# Uso: python scripts/recolorir-fotos.py entrada.webp '[["blue","#012590","#0F766E"]]' saida.webp
import sys, numpy as np
from PIL import Image

def rgb2hsv(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    mx=a.max(-1); mn=a.min(-1); d=mx-mn
    h=np.zeros_like(mx)
    m=d>1e-6
    rr=m&(mx==r); gg=m&(mx==g)&~rr; bb=m&~rr&~gg
    h[rr]=((g-b)[rr]/d[rr])%6; h[gg]=(b-r)[gg]/d[gg]+2; h[bb]=(r-g)[bb]/d[bb]+4
    h=h*60; s=np.where(mx>0,d/np.maximum(mx,1e-6),0)
    return h,s,mx
def hsv2rgb(h,s,v):
    c=v*s; x=c*(1-np.abs((h/60)%2-1)); m=v-c
    z=np.zeros_like(h); i=(h//60).astype(int)%6
    r=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[c,x,z,z,x,c])
    g=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[x,c,c,x,z,z])
    b=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[z,z,x,c,c,x])
    return np.stack([r+m,g+m,b+m],-1)
def hexhsv(hx):
    a=np.array([[[int(hx[i:i+2],16)/255 for i in (1,3,5)]]]); h,s,v=rgb2hsv(a); return h[0,0],s[0,0],v[0,0]
BANDS={'blue':(195,255),'coral':(330,380)}  # coral wraps 0
def recolor(path, rules, out):
    im=Image.open(path).convert('RGB'); a=np.asarray(im).astype(np.float64)/255
    h,s,v=rgb2hsv(a); res=a.copy()
    for band,src,dst in rules:
        lo,hi=BANDS[band]; hh=np.where(h<lo-30,h+360,h) if hi>360 else h
        center=(lo+hi)/2; half=(hi-lo)/2
        hw=np.clip(1-(np.abs(hh-center)-half)/12,0,1)
        sw=np.clip((s-0.12)/0.22,0,1)
        w=(hw*sw)[...,None]
        sh,ss,sv=hexhsv(src); th,ts,tv=hexhsv(dst)
        ns=np.clip(s*ts/ss,0,1); nv=np.clip(v*tv/sv,0,1)
        rec=hsv2rgb(np.full_like(h,th),ns,nv)
        res=res*(1-w)+rec*w
    Image.fromarray((np.clip(res,0,1)*255+0.5).astype(np.uint8)).save(out,'WEBP',quality=84,method=6)
    o=Image.open(out).convert('RGB'); print(out, 'corner', '#%02x%02x%02x'%o.getpixel((8,8)))
if __name__=='__main__':
    import json; recolor(sys.argv[1], json.loads(sys.argv[2]), sys.argv[3])
