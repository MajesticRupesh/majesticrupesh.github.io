from flask import Flask,render_template,request,json
import os.path
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")

@app.route('/signup/<username>/<password>/')
def signup(username, password):
    f = open("players.txt", "r")
    for line in f:
        if(username==line.split(None, 1)[0]):
            return "0"
    f.close()
    f = open("players.txt","a+")
    f.write(username+" "+password+"\n")
    f.close()
    return "1"

@app.route('/login/<username>/<password>/')
def login(username, password):
    f = open("players.txt", "r")
    for line in f:
        if (username == line.split(None, 1)[0] and password == (line.split(None, 1)[1]).strip()):
            return "1"
    f.close()
    return "0"

@app.route('/create/<username>/<id>/')
def createroom(username, id):
    if os.path.exists(id+'.txt'):
        return "not created"
    else:
        f=open(id+".txt","w+")
        f.write(username+"\n")
        f.close()
        return "created"

@app.route('/join/<username>/<id>/')
def joinroom(username, id):
    if os.path.exists(id+'.txt'):
        f = open(id + ".txt", "a+")
        f.write(username + "\n")
        f.write(str(0)+"\n")
        f.write(str(0) + "\n")
        f.write(str(0) + "\n")
        f.close()
        return "joined"
    else:
        return "not joined"

@app.route('/waitforjoin/<username>/<id>/')
def waitforjoin(username,id):
    f=open(id+".txt","r")
    if(f.readline().strip()==username):
        # authorized user
        player2 = f.readline().strip()
        if(player2==''):
            return "not joined"
        else:
            return str(player2+" joined")
    else:
        "unauthorized"

@app.route('/updatearray/<row>/<col>/<player>/<id>/')
def updatearray(row, col, player, id):
    f = open(id + ".txt", "r")
    player1 = f.readline().strip()
    player2 = f.readline().strip()
    f.close()
    f = open(id + ".txt", "w+")
    f.write(player1+"\n")
    f.write(player2 + "\n")
    f.write(row + "\n")
    f.write(col + "\n")
    f.write(player + "\n")
    f.close()
    return "updated"

@app.route('/getupdate/<id>/')
def getupdate(id):
    f = open(id + ".txt", "r")
    player1 = f.readline().strip()
    player2 = f.readline().strip()
    row = f.readline().strip()
    col = f.readline().strip()
    player = f.readline().strip()
    f.close()
    return json.jsonify([row,col,player])


if __name__ == "__main__":
    #localhost is 127.0.0.1:5000
    #different device 192.168.43.175:5000    find out by running cmd > ipconfig > ipv4 address
    app.run(host='0.0.0.0',port=5000,debug=True)