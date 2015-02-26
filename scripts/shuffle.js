/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var imgPath = "";
var emptyCell = 0;
var neighbouringPieces = []; //what pieces are neighbours of the current cell
var shuffleCount = 0;

$("#parrot").click(function() {
    prepareThePuzzle("parrot");
});
$("#flower").click(function() {
    prepareThePuzzle("flower");
});
$("#primate").click(function() {
    prepareThePuzzle("primate");
});
$("#rockies").click(function() {
    prepareThePuzzle("rockies");
});

$( "#completePuzzle" ).click(function() {
    clearGrid();
});

$( "#test" ).click(function() {
    $( this ).slideUp();
});

function prepareThePuzzle(puzzleName)
{
    //reset the display
    clearGrid();
    
    //get the parrot puzzle pieces path
    switch (puzzleName)
    {
        case "parrot":
            imgPath = "img/parrot/medium/";
            break;
        case "flower":
            imgPath = "img/flower/medium/";
            break;
        case "primate":
            imgPath = "img/primate/medium/";
            break;
        case "rockies":
            imgPath = "img/rockies/medium/";
            break;
    }
    
    //display img sections in order in the puzzle grid.
    loadPuzzle();
    
    //reset the shuffle counter
    shuffleCount = 0;
    
    //wait 1 second;
    //shuffle the pieces until all items have moved at least once.
    setTimeout(shufflePuzzle(2),1000);
    
    //start the clock running
    
}

function clearGrid()
{   
    var rowCount = 0;
    var colCount = 0;
    var cellCount = 1;
    
    //loop through each row
    for	(c = 0; c < 4; c++) {
 
        //loop through each column
        for(r = 0; r < 4; r++)
        {
            //go through each child of this cell.
            $("#cell" + cellCount).children('img').each(function () {
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

    if(pieceLength > 6)
    {
        pieceNo = parseInt(piece.substr(5,2));
    }
    else
    {
        pieceNo = parseInt(piece.substr(5,1));
    }
    
    $('#piece' + pieceNo).moveTo('#cell' + (pieceNo+1));
}

function loadPuzzle()
{   
    var rowCount = 0;
    var colCount = 0;
    var pieceCount = 0;
    
    //loop through each row
    for	(c = 0; c < 4; c++) {
        
        //loop through each column
        for(r = 0; r < 4; r++)
        {
            
            if(r === 0 && c === 0)
            {
                //don't put anything in the first cell when first display the puzzle.
                emptyCell = 1; //top left cell is also the starting point.
            }
            else
            {
                $("#piece" + pieceCount).attr("src",imgPath + pieceCount + ".png");
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
        var kids = $("#cell" + activeCell).children();
        kids.detach().appendTo("#cell" + emptyCell);

        //reset emptyCell
        emptyCell = prevActive;
        activeCell = prevEmpty;
    }
}

function selectNeighbour()
{
    var chosenNeighbour = 0;
    
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
    
    //select a neighbour at random
    //alert(neighbouringPieces.length);
    
    chosenNeighbour = neighbouringPieces[Math.floor(Math.random()*neighbouringPieces.length)];
    
    return chosenNeighbour;
}

function isNeighbour(activeCell)
{
    var myNeighbour = 0;
    
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

$("#cell1").click(function() {
    //alert("You clicked square 1");
    movePiece(1);
});

$("#cell2").click(function() {
    //alert("You clicked square 2");
    movePiece(2);
});

$("#cell3").click(function() {
    //alert("You clicked square 3");
    movePiece(3);
});

$("#cell4").click(function() {
    //alert("You clicked square 4");
    movePiece(4);
});

$("#cell5").click(function() {
    //alert("You clicked square 5");
    movePiece(5);
});

$("#cell6").click(function() {
    //alert("You clicked square 6");
    movePiece(6);
});

$("#cell7").click(function() {
    //alert("You clicked square 7");
    movePiece(7);
});

$("#cell8").click(function() {
    //alert("You clicked square 8");
    movePiece(8);
});

$("#cell9").click(function() {
    //alert("You clicked square 9");
    movePiece(9);
});

$("#cell10").click(function() {
    //alert("You clicked square 10");
    movePiece(10);
});

$("#cell11").click(function() {
    //alert("You clicked square 11");
    movePiece(11);
});

$("#cell12").click(function() {
    //alert("You clicked square 12");
    movePiece(12);
});

$("#cell13").click(function() {
    //alert("You clicked square 13");
    movePiece(13);
});

$("#cell14").click(function() {
    //alert("You clicked square 14");
    movePiece(14);
});

$("#cell15").click(function() {
    //alert("You clicked square 15");
    movePiece(15);
});

$("#cell16").click(function() {
    //alert("You clicked square 16");
    movePiece(16);
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