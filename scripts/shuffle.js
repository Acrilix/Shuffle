/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//alert("Test");
var puzzleGrid = []; //16 squares
var puzzlePieces = []; //15 pieces
var imgPath = "";
var emptyCell = 0;
var neighbouringPieces = []; //what pieces are neighbours of the current cell
var shuffleCount = 0;

$("#parrot").click(function() {
    prepareThePuzzle("parrot");
});
$("#cat").click(function() {
    prepareThePuzzle("cat");
});
$("#moon").click(function() {
    prepareThePuzzle("moon");
});
$("#rockies").click(function() {
    prepareThePuzzle("rockies");
});

$( "#test" ).click(function() {
    $( this ).slideUp();
});

function prepareThePuzzle(puzzleName)
{
    //alert("You've chosen the " + puzzleName + " puzzle.");
    
    //setup the puzzle grid itself
    puzzleGrid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
    
    //alert(puzzleGrid[0][0]);
    //alert(puzzleGrid[3][3]);
    
    //get the parrot puzzle pieces path
    switch (puzzleName)
    {
        case "parrot":
            imgPath = "img/parrot/";
            break;
        case "cat":
            imgPath = "img/cat/";
            break;
        case "moon":
            imgPath = "img/moon/";
            break;
        case "rockies":
            imgPath = "img/rockies/";
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

function loadPuzzle()
{   
    var rowCount = 0;
    var colCount = 0;
    var pieceCount = 0;
    var cellContents = "";
    
    //loop through each row
    for	(c = 0; c < 4; c++) {
        //alert("row:" + (r+1));
        
        //loop through each column
        for(r = 0; r < 4; r++)
        {
            //alert("col:" + (c+1));
            
            if(r === 0 && c === 0)
            {
                //don't put anything in the first cell when first display the puzzle.
                puzzlePieces[pieceCount] = [r,c]; //piece 0 is the empty cell!
                emptyCell = 1; //top left cell is also the starting point.
            }
            else
            {
                //alert(pieceCount);
            
                puzzlePieces[pieceCount] = [r,c];
            
                //cellContents = pieceCount + "<br/>";
                //cellContents = "<img id='piece" + pieceCount + "' src='" + imgPath + pieceCount + ".png'/>";
            
                //testing, display the piece No. in the div tag.
                //$("#cell" + (pieceCount + 1)).html(cellContents);
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
    //alert("shuffle: " + shuffleCount);
    if(shuffleCount < 50)
    {
        //shuffle the pieces until all have been moved at least once.

        //start at cell2
        //alert("activeCell " + activeCell + "moving to emptyCell " + emptyCell);
        movePiece(activeCell); //move to empty cell

        //identify what cells are around the new empty cell, randomly select one of them.
        activeCell = selectNeighbour();
        //alert("New activeCell " + activeCell);

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
    
    //move the image in the activeCell to the emptyCell.
    var kids = $("#cell" + activeCell).children();
    kids.detach().appendTo("#cell" + emptyCell);
    
    //reset emptyCell
    emptyCell = prevActive;
    activeCell = prevEmpty;
    
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



/*handle events*/

$("#cell1").click(function() {
    alert("You clicked square 1");
});

$("#cell2").click(function() {
    alert("You clicked square 2");
    
    var kids = $("#cell2").children();
    kids.detach().appendTo("#cell1");
});

$("#cell3").click(function() {
    alert("You clicked square 3");
});

$("#cell4").click(function() {
    alert("You clicked square 4");
});

$("#cell5").click(function() {
    alert("You clicked square 5");
});

$("#cell6").click(function() {
    alert("You clicked square 6");
});

$("#cell7").click(function() {
    alert("You clicked square 7");
});

$("#cell8").click(function() {
    alert("You clicked square 8");
});

$("#cell9").click(function() {
    alert("You clicked square 9");
});

$("#cell10").click(function() {
    alert("You clicked square 10");
});

$("#cell11").click(function() {
    alert("You clicked square 11");
});

$("#cell12").click(function() {
    alert("You clicked square 12");
});

$("#cell13").click(function() {
    alert("You clicked square 13");
});

$("#cell14").click(function() {
    alert("You clicked square 14");
});

$("#cell15").click(function() {
    alert("You clicked square 15");
});

$("#cell16").click(function() {
    alert("You clicked square 16");
});

$("#piece1").click(function() {
    alert("You clicked piece 1");
});

$("#piece2").click(function() {
    alert("You clicked piece 2");
});

$("#piece3").click(function() {
    alert("You clicked piece 3");
});

$("#piece4").click(function() {
    alert("You clicked piece 4");
});

$("#piece5").click(function() {
    alert("You clicked piece 5");
});

$("#piece6").click(function() {
    alert("You clicked piece 6");
});

$("#piece7").click(function() {
    alert("You clicked piece 7");
});

$("#piece8").click(function() {
    alert("You clicked piece 8");
});

$("#piece9").click(function() {
    alert("You clicked piece 9");
});

$("#piece10").click(function() {
    alert("You clicked piece 10");
});

$("#piece11").click(function() {
    alert("You clicked piece 11");
});

$("#piece12").click(function() {
    alert("You clicked piece 12");
});

$("#piece13").click(function() {
    alert("You clicked piece 13");
});

$("#piece14").click(function() {
    alert("You clicked piece 14");
});

$("#piece15").click(function() {
    alert("You clicked piece 15");
});
