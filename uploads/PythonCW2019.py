from graphics import *
def main():
    patchchose = patchsize()
    colourchose = patchcolour()
    patchwork(patchchose,colourchose)

def patchcolour():#user chooses 3 colours
    colourchose = []
    colourRef = {"r": "red","g":"green","b": "blue","c": "cyan","o": "orange","m": "magenta"}
    for i in range(3):
        colour = []
        posColour = ["r","g","b","c","o","m"]
        while colour not in posColour:
            colour = str(input("Please enter the first letter of a colour,: Red, Green, Blue, Cyan, Orange and Magenta:  ").lower())
            fullColour = colourRef.get(colour)
            colourchose.append(fullColour)
            print(colourchose)
    return colourchose

def patch1(win, row,column, colourinuse):#draws final patch
    radius = 5
    x = 50
    while radius <= 50:
        y = 100 - radius
        circle_patch = Circle(Point(row+x, column+y), radius)
        circle_patch.setOutline(colourinuse)
        circle_patch.draw(win)
        radius += 5

def patch2(win, row, column, colourinuse):#draws the penultimate patch
    isVal = 1
    for y in range(5):
        for x in range(5):
            square = Rectangle(Point(row+x*20, column+y*20), Point(((row+x*20)+20), ((column+y*20)+20)))
            square.draw(win)
            if isVal == 1:
                square.setFill(colourinuse)
                square.setOutline(colourinuse)
                isVal = - isVal
            else:
                square.setFill("white")
                square.setOutline("white")
                isVal = -isVal
            for circleY in range(2):
                for circleX in range(2):
                    circle = Circle(Point(row+x*20+(10*circleX+5), column+y*20+(10*circleY+5)),4.8)

                    if isVal == 1:
                        circle.setFill(colourinuse)
                        circle.setOutline(colourinuse)
                    else:
                        circle.setFill("white")
                        circle.setOutline("white")
                    circle.draw(win)

def patchsize(): #user chooses the size of window
    validpatch = ['5','7','9']
    patchchose = ""
    while patchchose not in validpatch:
        patchchose = input("Please Enter A Valid Size 5, 7 or 9: ")
        if patchchose in validpatch:
            print ("Valid Answer")
        else:
            print("Answer is invalid")
    return patchchose

def patchwork(patchchose, colourchose):#drawing patches on grid
    patchchose = int(patchchose)*100
    win = GraphWin("938212",patchchose, patchchose)
    win.setBackground("white")
    colourinuse = None
    for column in range(0,patchchose,100):
        for row in range(0,patchchose,100):
            if (column >= 100 and row >= 100) and (column < patchchose-100 and row < patchchose - 100):
                colourinuse = colourchose[2]
            elif (row+column)%200 == 0:
                colourinuse = colourchose[0]
            else:
                colourinuse = colourchose[1]
            if column == row:
                patch1(win, row,column, colourinuse)
            else:
                patch2(win, row, column, colourinuse)
main()