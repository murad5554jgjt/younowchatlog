<?php



$servername="localhost";
$username="..."; 
$password= "...; 
$dbname = "...";



checkifnew();

    

function insertNew(){
    
$saved_username= $_GET["username"];
$saved_cardId =$_GET["cardId"] ;
$saved_userId =$_GET["ids"];
$conn = new mysqli('localhost','...','...' , '...');
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";



$sql =" INSERT INTO `cardsgiven`( `username`, `cards`, `active`) VALUES('" .$saved_username."','".$saved_cardId."',".'true' .")";






if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

}

function  checkifnew()
{


$conTest= new mysqli('localhost','...','...' , '...');
if ($conTest->connect_error) {
  die("Connection failed: " . $conTest->connect_error);
}

$result = mysqli_query($conTest, "SELECT username FROM cardsgiven where username='".$_GET["username"] ."'");


if( mysqli_affected_rows($conTest) >0 ){
$conTest->close();

    
    updateSql();
    
    
}else{
    
 insertNew();
    
    
}



    
}
function updateSql(){
    
    $conTest2= new mysqli('localhost','...','...' , '...');
        
        if ($conTest2->connect_error) {
            die("Connection failed: " . $conTest2->connect_error);
        }

    $getRow = "select cards from cardsgiven where username='" .$_GET["username"]. "' ";
    $result = mysqli_query($conTest2,$getRow);
    $rows = mysqli_fetch_row($result);
    $fromDb=  $rows[0]; 
    
    $newValues ="'". $fromDb . ",".$_GET["cardId"] ."'";
    
    $updateState ="Update cardsgiven SET cards=".$newValues. " where username='".$_GET["username"]."'" ;
    //echo $updateState;
    
    
    $runupdate =mysqli_query($conTest2,$updateState);

    if(mysqli_affected_rows($conTest2) >0){
        
        echo 'has been updated';
        
        
    }
    else
    {
        echo "something went wrong";
        
    }
    
    
}

?>



