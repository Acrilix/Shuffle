/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var imgPath = "";
var emptyCell = 0;
var neighbouringPieces = []; //what pieces are neighbours of the current cell
var shuffleCount = 0;
var level = "medium";
var prevLevel = "medium";
var gridSize = 4;
var chosenPuzzle = "parrot";

$("#easyGrid").hide();    
$("#mediumGrid").show();
$("#medium").css("background","white");
$("#medium").css("color","green");
$("#medium").css("border","1px solid green");
$("#hardGrid").hide();

$("#parrot").click(function() {
    chosenPuzzle = "parrot";
    prepareThePuzzle();
});
$("#flower").click(function() {
    chosenPuzzle = "flower";
    prepareThePuzzle();
});
$("#primate").click(function() {
    chosenPuzzle = "primate";
    prepareThePuzzle();
});
$("#rockies").click(function() {
    chosenPuzzle = "rockies";
    prepareThePuzzle();
});

$( "#completePuzzle" ).click(function() {
    clearGrid();
});

$( "#easy" ).click(function() {
    prevLevel = level;
    level = "easy";
    $("#easy").css("background","white");
    $("#easy").css("color","green");
    $("#easy").css("border","1px solid green");
    $("#medium").css("background","green");
    $("#medium").css("color","white");
    $("#medium").css("border","1px solid white");
    $("#hard").css("background","green");
    $("#hard").css("color","white");
    $("#hard").css("border","1px solid white");
    prepareThePuzzle();
});

$( "#medium" ).click(function() {
    prevLevel = level;
    level = "medium";
    $("#easy").css("background","green");
    $("#easy").css("color","white");
    $("#easy").css("border","1px solid white");
    $("#medium").css("background","white");
    $("#medium").css("color","green");
    $("#medium").css("border","1px solid green");
    $("#hard").css("background","green");
    $("#hard").css("color","white");
    $("#hard").css("border","1px solid white");
    prepareThePuzzle();
});

$( "#hard" ).click(function() {
    prevLevel = level;
    level = "hard";
    $("#easy").css("background","green");
    $("#easy").css("color","white");
    $("#easy").css("border","1px solid white");
    $("#medium").css("background","green");
    $("#medium").css("color","white");
    $("#medium").css("border","1px solid white");
    $("#hard").css("background","white");
    $("#hard").css("color","green");
    $("#hard").css("border","1px solid green");
    prepareThePuzzle();
});

$( "#test" ).click(function() {
    $( this ).slideUp();
});

function prepareThePuzzle()
{
    //what level should the grid be set at?
    setGridLevel();
    
    //reset the display
    clearGrid();
    
    //get the parrot puzzle pieces path
    imgPath = "img/" + chosenPuzzle + "/" + level + "/";
    
    //display img sections in order in the puzzle grid.
    loadPuzzle();
    
    //reset the shuffle counter
    shuffleCount = 0;
    
    //wait 1 second;
    //shuffle the pieces until all items have moved at least once.
    setTimeout(shufflePuzzle(2),1000);
    
    //start the clock running
    
}

function setGridLevel()
{
    var rowCount = 0;
    var colCount = 0;
    var cellCount = 1;

    //loop through each row
    for	(c = 0; c < gridSize; c++) {
 
        //loop through each column
        for(r = 0; r < gridSize; r++)
        {
            //go through each child of this cell.
            $("#" + level + "cell" + cellCount).children('img').each(function () {
                resetPiece(this.id);
            });
          
            //hide the cells that are no longer required
            //$("#" + level + "cell" + cellCount).css("display").hide();
          
            cellCount++;
            colCount++;
        }
        
        rowCount++;
    }
    
    //set the size of the new grid
    switch (level)
    {
        case "easy":
                gridSize = 3;
                
                //hide the other grids
                $("#easyGrid").show();    
                $("#mediumGrid").hide();
                $("#hardGrid").hide();
            break;
        case "medium":
                gridSize = 4;
                
                //hide the other grids
                $("#easyGrid").hide();
                $("#mediumGrid").show();
                $("#hardGrid").hide();
            break;
        case "hard":
                gridSize = 5;
                
                //hide the other grids
                $("#easyGrid").hide();
                $("#mediumGrid").hide();
                $("#hardGrid").show();
            break;

    }
}

function clearGrid()
{   
    var rowCount = 0;
    var colCount = 0;
    var cellCount = 1;

    //loop through each row
    for	(c = 0; c < gridSize; c++) {
 
        //loop through each column
        for(r = 0; r < gridSize; r++)
        {
            //shows the cells that are required
            //$("#" + level + "cell" + cellCount).css("display").show();
            
            //go through each child of this cell.
            $("#" + level + "cell" + cellCount).children('img').each(function () {
                resetPiece(this.id);
            });
          
            cellCount++;
            colCount++;
        }
        
        rowCount++;
    }
}

function resetPiece(piece)
{
    var pieceLength = piece.length;
    var pieceNo = 0;

    //remove the level name from id
    piece = piece.replace(level,"");
    
    if(pieceLength > 6)
    {
        pieceNo = parseInt(piece.substr(5,2));
    }
    else
    {
        pieceNo = parseInt(piece.substr(5,1));
    }
    
    $("#" + level + "piece" + pieceNo).moveTo("#" + level + "cell" + (pieceNo+1));
}

function loadPuzzle()
{   
    var rowCount = 0;
    var colCount = 0;
    var pieceCount = 0;
    
    //loop through each row
    for	(c = 0; c < gridSize; c++) {
        
        //loop through each column
        for(r = 0; r < gridSize; r++)
        {
            
            if(r === 0 && c === 0)
            {
                //don't put anything in the first cell when first display the puzzle.
                emptyCell = 1; //top left cell is also the starting point.
            }
            else
            {
                $("#" + level + "piece" + pieceCount).attr("src",imgPath + pieceCount + ".png");
            }
            
            pieceCount++;
            colCount++;
        }
        
        rowCount++;
    }
}

function shufflePuzzle(activeCell)
{
    if(shuffleCount < 30)
    {
        //shuffle the pieces until all have been moved at least once.
        movePiece(activeCell); //move to empty cell

        //identify what cells are around the new empty cell, randomly select one of them.
        activeCell = selectNeighbour();

        //increment the shuffle counter
        shuffleCount++;

        //start the process again.   
        shufflePuzzle(activeCell);
    }
}

function movePiece(activeCell)
{
    var prevEmpty = emptyCell;
    var prevActive = activeCell;
    
    //only allow the move if the emptyCell is a neighbour
    if(isNeighbour(activeCell) == 1)
    {
        //move the image in the activeCell to the emptyCell.
        var kids = $("#" + level + "cell" + activeCell).children();
        kids.detach().appendTo("#" + level + "cell" + emptyCell);

        //reset emptyCell
        emptyCell = prevActive;
        activeCell = prevEmpty;
    }
}

function neighbours()
{
    switch (level)
    {
        case "easy":
            switch (emptyCell)
            {
                case 1:
                        neighbouringPieces = [2,4];
                    break;
                case 2:
                        neighbouringPieces = [1,3,5];
                    break;
                case 3:
                        neighbouringPieces = [2,6];
                    break;
                case 4:
                        neighbouringPieces = [1,5,7];
                    break;
                case 5:
                        neighbouringPieces = [2,4,6,8];
                    break;
                case 6:
                        neighbouringPieces = [3,5,9];
                    break;
                case 7:
                        neighbouringPieces = [4,8];
                    break;
                case 8:
                        neighbouringPieces = [5,7,9];
                    break;
                case 9:
                        neighbouringPieces = [6,8];
                    break;
            }
            break;
        case "medium":
            switch (emptyCell)
            {
                case 1:
                        neighbouringPieces = [2,5];
                    break;
                case 2:
                        neighbouringPieces = [1,3,6];
                    break;
                case 3:
                        neighbouringPieces = [2,4,7];
                    break;
                case 4:
                        neighbouringPieces = [3,8];
                    break;
                case 5:
                        neighbouringPieces = [1,6,9];
                    break;
                case 6:
                        neighbouringPieces = [2,5,7,10];
                    break;
                case 7:
                        neighbouringPieces = [3,6,8,11];
                    break;
                case 8:
                        neighbouringPieces = [4,7,12];
                    break;
                case 9:
                        neighbouringPieces = [5,10,13];
                    break;
                case 10:
                        neighbouringPieces = [6,9,11,14];
                    break;
                case 11:
                        neighbouringPieces = [7,10,12,15];
                    break;
                case 12:
                        neighbouringPieces = [8,11,16];
                    break;
                case 13:
                        neighbouringPieces = [9,14];
                    break;
                case 14:
                        neighbouringPieces = [10,13,15];
                    break;
                case 15:
                        neighbouringPieces = [11,14,16];
                    break;
                case 16:
                        neighbouringPieces = [12,15];
                    break;
            }
            break;
        case "hard":
            switch (emptyCell)
            {
                case 1:
                        neighbouringPieces = [2,6];
                    break;
                case 2:
                        neighbouringPieces = [1,3,7];
                    break;
                case 3:
                        neighbouringPieces = [2,4,8];
                    break;
                case 4:
                        neighbouringPieces = [3,5,9];
                    break;
                case 5:
                        neighbouringPieces = [4,10];
                    break;
                case 6:
                        neighbouringPieces = [1,7,11];
                    break;
                case 7:
                        neighbouringPieces = [2,6,8,12];
                    break;
                case 8:
                        neighbouringPieces = [3,7,9,13];
                    break;
                case 9:
                        neighbouringPieces = [4,8,10,14];
                    break;
                case 10:
                        neighbouringPieces = [5,9,15];
                    break;
                case 11:
                        neighbouringPieces = [6,12,16];
                    break;
                case 12:
                        neighbouringPieces = [7,11,13,17];
                    break;
                case 13:
                        neighbouringPieces = [8,12,14,18];
                    break;
                case 14:
                        neighbouringPieces = [9,13,15,19];
                    break;
                case 15:
                        neighbouringPieces = [10,14,20];
                    break;
                case 16:
                        neighbouringPieces = [11,17,21];
                    break;
                case 17:
                        neighbouringPieces = [12,16,18,22];
                    break;
                case 18:
                        neighbouringPieces = [13,17,19,23];
                    break;
                case 19:
                        neighbouringPieces = [14,18,20,24];
                    break;
                case 20:
                        neighbouringPieces = [15,19,25];
                    break;
                case 21:
                        neighbouringPieces = [16,22];
                    break;
                case 22:
                        neighbouringPieces = [17,21,23];
                    break;
                case 23:
                        neighbouringPieces = [18,22,24];
                    break;
                case 24:
                        neighbouringPieces = [19,23,25];
                    break;
                case 25:
                        neighbouringPieces = [20,24];
                    break;
            }
            break;
    }
}

function selectNeighbour()
{
    var chosenNeighbour = 0;
    
    neighbours();
    
    //select a neighbour at random
    //alert(neighbouringPieces.length);
    
    chosenNeighbour = neighbouringPieces[Math.floor(Math.random()*neighbouringPieces.length)];
    
    return chosenNeighbour;
}

function isNeighbour(activeCell)
{
    var myNeighbour = 0;
    
    neighbours();
    
    //is the empty cell a neightbour of the active cell?
    var arrayLength = neighbouringPieces.length;
    for (var i = 0; i < arrayLength; i++) {
        if(activeCell == neighbouringPieces[i])
        {
            myNeighbour = 1;
            break;
        }
    }
    
    return myNeighbour;
}

/*handle events*/

$("#easycell1").click(function() {
    //alert("You clicked square 1");
    movePiece(1);
});

$("#easycell2").click(function() {
    //alert("You clicked square 2");
    movePiece(2);
});

$("#easycell3").click(function() {
    //alert("You clicked square 3");
    movePiece(3);
});

$("#easycell4").click(function() {
    //alert("You clicked square 4");
    movePiece(4);
});

$("#easycell5").click(function() {
    //alert("You clicked square 5");
    movePiece(5);
});

$("#easycell6").click(function() {
    //alert("You clicked square 6");
    movePiece(6);
});

$("#easycell7").click(function() {
    //alert("You clicked square 7");
    movePiece(7);
});

$("#easycell8").click(function() {
    //alert("You clicked square 8");
    movePiece(8);
});

$("#easycell9").click(function() {
    //alert("You clicked square 9");
    movePiece(9);
});

//medium level actions

$("#mediumcell1").click(function() {
    //alert("You clicked square 1");
    movePiece(1);
});

$("#mediumcell2").click(function() {
    //alert("You clicked square 2");
    movePiece(2);
});

$("#mediumcell3").click(function() {
    //alert("You clicked square 3");
    movePiece(3);
});

$("#mediumcell4").click(function() {
    //alert("You clicked square 4");
    movePiece(4);
});

$("#mediumcell5").click(function() {
    //alert("You clicked square 5");
    movePiece(5);
});

$("#mediumcell6").click(function() {
    //alert("You clicked square 6");
    movePiece(6);
});

$("#mediumcell7").click(function() {
    //alert("You clicked square 7");
    movePiece(7);
});

$("#mediumcell8").click(function() {
    //alert("You clicked square 8");
    movePiece(8);
});

$("#mediumcell9").click(function() {
    //alert("You clicked square 9");
    movePiece(9);
});

$("#mediumcell10").click(function() {
    //alert("You clicked square 10");
    movePiece(10);
});

$("#mediumcell11").click(function() {
    //alert("You clicked square 11");
    movePiece(11);
});

$("#mediumcell12").click(function() {
    //alert("You clicked square 12");
    movePiece(12);
});

$("#mediumcell13").click(function() {
    //alert("You clicked square 13");
    movePiece(13);
});

$("#mediumcell14").click(function() {
    //alert("You clicked square 14");
    movePiece(14);
});

$("#mediumcell15").click(function() {
    //alert("You clicked square 15");
    movePiece(15);
});

$("#mediumcell16").click(function() {
    //alert("You clicked square 16");
    movePiece(16);
});

//hard level actions

$("#hardcell1").click(function() {
    //alert("You clicked square 1");
    movePiece(1);
});

$("#hardcell2").click(function() {
    //alert("You clicked square 2");
    movePiece(2);
});

$("#hardcell3").click(function() {
    //alert("You clicked square 3");
    movePiece(3);
});

$("#hardcell4").click(function() {
    //alert("You clicked square 4");
    movePiece(4);
});

$("#hardcell5").click(function() {
    //alert("You clicked square 5");
    movePiece(5);
});

$("#hardcell6").click(function() {
    //alert("You clicked square 6");
    movePiece(6);
});

$("#hardcell7").click(function() {
    //alert("You clicked square 7");
    movePiece(7);
});

$("#hardcell8").click(function() {
    //alert("You clicked square 8");
    movePiece(8);
});

$("#hardcell9").click(function() {
    //alert("You clicked square 9");
    movePiece(9);
});

$("#hardcell10").click(function() {
    //alert("You clicked square 10");
    movePiece(10);
});

$("#hardcell11").click(function() {
    //alert("You clicked square 11");
    movePiece(11);
});

$("#hardcell12").click(function() {
    //alert("You clicked square 12");
    movePiece(12);
});

$("#hardcell13").click(function() {
    //alert("You clicked square 13");
    movePiece(13);
});

$("#hardcell14").click(function() {
    //alert("You clicked square 14");
    movePiece(14);
});

$("#hardcell15").click(function() {
    //alert("You clicked square 15");
    movePiece(15);
});

$("#hardcell16").click(function() {
    //alert("You clicked square 16");
    movePiece(16);
});

$("#hardcell17").click(function() {
    //alert("You clicked square 16");
    movePiece(17);
});

$("#hardcell18").click(function() {
    //alert("You clicked square 16");
    movePiece(18);
});

$("#hardcell19").click(function() {
    //alert("You clicked square 16");
    movePiece(19);
});

$("#hardcell20").click(function() {
    //alert("You clicked square 16");
    movePiece(20);
});

$("#hardcell21").click(function() {
    //alert("You clicked square 16");
    movePiece(21);
});

$("#hardcell22").click(function() {
    //alert("You clicked square 16");
    movePiece(22);
});

$("#hardcell23").click(function() {
    //alert("You clicked square 16");
    movePiece(23);
});

$("#hardcell24").click(function() {
    //alert("You clicked square 16");
    movePiece(24);
});

$("#hardcell25").click(function() {
    //alert("You clicked square 16");
    movePiece(25);
});

(function($){
    $.fn.moveTo = function(selector){
        return this.each(function(){
            var cl = $(this).clone();
            $(cl).appendTo(selector);
            $(this).remove();
        });
    };
})(jQuery);