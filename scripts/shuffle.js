/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//alert("Test");
var puzzleGrid = []; //16 squares
var puzzlePieces = []; //15 pieces

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
    alert("You've chosen the " + puzzleName + " puzzle.");
    
    var imgPath = "";
    puzzleGrid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]];
    
    alert(puzzleGrid[0][0]);
    alert(puzzleGrid[3][3]);
    
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
    
    //get the parrot puzzle pieces.
    puzzlePieces = loadPuzzle(puzzlePieces);
    
    //display them in order in the puzzle grid.
    
    //shuffle the pieces until all items have moved at least once.
    
    //start the clock running
    
}

function loadPuzzle(puzzlePieces)
{
    //prepare the array
    
    var rowCount = 0;
    var colCount = 0;
    var pieceCount = 0;
    
    //loop through each row
    for	(c = 0; c < 4; c++) {
        //alert("row:" + (r+1));
        
        //loop through each column
        for(r = 0; r < 4; r++)
        {
            //alert("col:" + (c+1));
            
            if(r == 0 && c == 0)
            {
                //don't put anything in the first cell when first display the puzzle.
                puzzlePieces[pieceCount] = [r,c]; //piece 0 is the empty cell!
            }
            else
            {
                //alert(pieceCount);
            
                puzzlePieces[pieceCount] = [r,c];
            
                //testing, display the piece No. in the div tag.
                $("#cell" + (pieceCount + 1)).html(pieceCount);
            }
            
            pieceCount++;
            colCount++;
        }
        
        rowCount++;
    }
  
    return puzzlePieces;
}





