import pyautogui as pg

from PIL import Image

import subprocess

import time

rgb_ary = [[[]]]#三次元配列

def main():
    print('クライアントアプリケーションを起動しました')
    print('対象となる画像ファイルのパスを入力してください')

    pg.FAILSAFE = False

    path = input().rstrip()#最後の空白を削除
    im = Image.open(open(path, 'rb'))

    im = load(im)
    rgb_ary = im2rgb_ary(im)

    print(path+"のロードが完了しました。Safariを開きます。")
    openSafari()

    time.sleep(1)
    pg.click(58,40)#最大化をクリック

    time.sleep(1)
    paint(im,rgb_ary)

def openSafari():
    #mdfind appNameを実行
    path = subprocess.check_output(["mdfind", 'Safari.app'])

    #Byte-like型で返ってくるのでUTF-8でデコード
    decode = path.decode("utf-8")

    #分割
    path = decode.split("\n")[0]

    subprocess.call(['open','-a',path,'file:///Users/Manato/Desktop/Paint/index.html'])



def load(im):
    #RGBに変換
    rgb_im = im.convert('RGB')

    #画像サイズを取得
    size = rgb_im.size

    if(size[1] > 600):
        hi = int(size[1] / 600)
        rgb_im.thumbnail((int(size[0]/hi), 600), Image.ANTIALIAS)
        size = rgb_im.size

    #新しいイメージ
    newIm = Image.new("RGB", size)

    for x in range(size[0]):
    #y
        for y in range(size[1]):
            #ピクセルを取得
            r,g,b = rgb_im.getpixel((x,y))

            newIm.putpixel( (x,y), (cut(r),cut(g),cut(b),0) )

    return newIm

#16に減色
def cut(num):
    return int(num / 16) * 16

def im2rgb_ary(im):
    rgb_ary = [[[[] for col in range(16)] for row in range(16)] for what in range(16)]

    #画像サイズを取得
    size = im.size

    for x in range(size[0]):
    #y
        for y in range(size[1]):
            #ピクセルを取得
            r,g,b = im.getpixel((x,y))

            rgb_ary[int(r/16)][int(g/16)][int(b/16)].append((x,y))
    return rgb_ary

def paint(im, ary):
    #画像サイズを取得
    i_width,i_height = im.size

    #中央に補正するやつの画面最大値
    width,height = pg.size()

    addX = int((width - i_width) / 2)
    addY = int((height - i_height) / 2)

    for r in range(16):

        for g in range(16):

            for b in range(16):

                isset = False

                if not len(ary[r][g][b]) == 0:
                    isset = True

                if not isset:
                    continue

                if (r==15) and (g==15) and (b==15):
                    continue

                pg.click(60,744, _pause=False)#色設定

                #2Hex
                h_r = hex(r*16)[2:].zfill(2)
                h_g = hex(g*16)[2:].zfill(2)
                h_b = hex(b*16)[2:].zfill(2)

                pg.typewrite(h_r+h_g+h_b,_pause=False)

                for i in range(len(ary[r][g][b])):

                    x,y = ary[r][g][b][i]

                    pg.click(x+addX, y+addY, _pause=False)




if __name__ == '__main__':
    main()
