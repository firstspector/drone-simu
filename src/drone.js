class drone{

    constructor(){
        this.X = 0;
        this.Y = 0;
        this.F = "";
        this.placed = false;
        this.FACE_DIRECTION = ["North","East","South","West"];
    }

    _check_status(){
        if(this.placed) console.log("the drone is at (" + this.X.toString()+","+this.Y.toString()+") facing to "+ this.FACE_DIRECTION[this.F] );
        else console.log("the drone hasn't been placed yet!");
    }

    place(X,Y,F){
        if(!this.placed){
            this.X = X;
            this.Y = Y;
            this.F = F;
            this.placed = true;
        }
        else alert("The drone had been placed already!");
    }

    move(){
        if(this.placed){
            var direction = this.F;
            if(direction === 0) this.Y++;
            else if(direction === 1) this.X++;
            else if(direction === 2) this.Y--;
            else if(direction === 3) this.X--;
        }
        else alert("The drone hasn't been placed yet!");
    }
    
    left() {
        if(this.placed){
            if(this.F == 0) this.F = 3;
            else this.F--;
        }
        else alert("The drone hasn't been placed yet!");
    }

    right() {
        if(this.placed){
            if(this.F == 3) this.F = 0;
            else this.F++;
        }
        else alert("The drone hasn't been placed yet!");
    }
    
}

const x = new drone();
x._check_status();
x.place(0,0,0);
x.right();
x.move();
x.move();
x.move();
x.left();
x.move();
x.move();
x.right();
x.right();
x._check_status();