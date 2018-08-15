class table{

    constructor(width,length){
        this.width = width;
        this.length = length;
        var table = [];
        var tmp = [];
        for(var i=0;i<width;i++){
            tmp = [];
            for(var j=0;j<length;j++){
                tmp.push(false);
            }
            table.push(tmp);
        }
        this.table = table;
        this.position = [];
        this.placed = false;
    }

    var _step = function(x_step,y_step){

    }

    PLACE(X,Y){
        if(!this.placed){
            this.position = [X,Y];
            this.table[X][Y] = true;
            this.placed = true;
        }
        else alert("The drone had been placed already!");
    }

    MOVE(direction){
        var x_pivot = this.position[0];
        var y_pivot = this.position[1];
        if(direction === "NORTH") this.table[x_pivot,y_pivot] 
        else if(direction === "SOUTH")
        else if(direction === "WEST")
        else if(direction === "EAST")
    }
    
    function LEFT() {
        
    }

    function RIGTH(params) {
        
    }
    
}

const x = new table(2,5);
console.log(x.table)