/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//alert("Test");

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
    var puzzlePieces = []; //16 pieces initially
    
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
    
    //display them in order in the puzzle grid.
    
    //shuffle the pieces until all items have moved at least once.
    
    //start the clock running
    
}





