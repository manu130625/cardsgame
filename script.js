var icons = ["🍓","🍒","🍎","🍉","🍊","🥭","🍍","🍋","🍏","🍐","🥝","🍇","🥥","🍅","🌶","🍄","🧅","🥦","🥑","🍔","🍕","🧁","🎂","🍬","🍩","🍫","🎈","💐","🌹","🌻","🏵","🌺","🌴","🌈"];
var p= icons.length;

//Array shuffle

for(var i=0;i<p;i++){
    var c= Math.floor(Math.random() * (p+1));
    var temp = icons[c];
    icons[c]= icons[i];
    icons[i]=temp;
}

//Game start 

var min, sec, moves, time, mode, count;
function start(r,c){
    // Time and Moves automation.
    min=0, sec=0, moves=0;
    $("#one").html("Moves: 0");
    $("#two").html("Time: 00:00");
    time = setInterval( function(){
        sec++;
        if(sec==60){
            min++;
            sec=0;
        }
        if(sec<10){
            $("#two").html("Time: "+min+":0"+sec);
        }
        else{
            $("#two").html("Time: "+min+":" +sec);
        }
    }, 1000);

    // Generating array of required items and shuffling.

    count= r*c/2;
    mode = r+"x"+c;
    
    var items =[];
    for(var i=0;i<count;i++){
        items.push(icons[i]);
    }
    for(var i=0;i<count;i++){
        items.push(icons[i]);
    }
    var p=items.length;
    for(var i=0;i<p;i++){
        var c= Math.floor(Math.random() * (p+1));
        var temp = items[c];
        items[c]= items[i];
        items[i]=temp;
    }

    // Grid Creation

    $("table").html("");
    var n=1;
    for(var i=1;i<=r;i++){
        $("table").append("<tr>");
        for(var j=1;j<=c;j++){
            $("table").append(`<td id='${n}' onclick="change(${n})"> 
            <div class='inner'>
                <div class ='front'>
                    <div class = 'back'>
                        <p>${items[n-1]}</p>
                    </div>
                </div>
            </div>
            </td>`);
            n++;
        }
        $("table").append("</tr>");      
    }
    //----------------- hiding need or not check tmrw
}

// Change function for flipping
var flip = "rotateY(180deg)", flipback="rotateY(0deg)", turn =0, pID, ppID=0, pre="";

function change(x){
    let i = "#" + x +".inner";
    let f = "#" + x +".inner .front";
    let b = "#" + x +".inner .back";

    //Conditions for not to flip

    if(turn ==2 || $(i).attr("flip")=="block" || ppID == x){}

    //Flip 
    else{
        $(i).css(t,flip);
        //If first card
        if(turn ==1){
            turn=2;
            //If cards are not same
            if(pre !=$(b).text()){
                setTimeout(function() {
                    $(pID).css(t, flipBack);
                    $(i).css(t, flipBack);
                    ppID=0;
                 },1000);
            }

            //If cards are same
            else{
                count--;
                $(i).attr("flip", "block");
                $(pID).attr("flip", "block");
            }

            //updating moves
            setTimeout(function(){
                turn=0;
                moves++;
                $("#one").html("Moves: "+moves);
            },1000);
        }
        else{
            pre = $(b).text();
            ppID=x;
            pID = "#"+x+".inner";
            turn=1;
        }

        // If all pairs matched
        if(count==0){
            clearInterval(time);
            if(min==0){
                time=${sec} seconds
            }
            else{
                time = ${min} minutes(s) and ${sec} second(s);
            }
            //Completion page.
            setTimeout(function(){
                $("#ol").html(`
                    <centre>
                        <div id="iol>
                            <h2>
                            Congrats!
                            </h2>
                            <p>You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p>
                            <a href="index.html">
                            <button>Play Again ?</button>
                            </a>
                        </div>
                    </centre>
                `);
            },1500);
        }
    }

}