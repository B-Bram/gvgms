<?php

$data = $_POST;
/*
foreach ( $data as $key => $val ) {
	echo $key .' : '. $val.'<br>';
}
*/
$filepath = "../datas/guild.json";
$filedata = json_encode($data);

$fp = fopen( $filepath, "a" );
@flock($fp,LOCK_EX);
//rewind( $fp ); // ファイルポインタを先頭に戻す
@fwrite( $fp, $filedata, strlen($filedata) );
flock($fp,LOCK_UN);
fclose( $fp );

readfile($filepath);
echo json_encode($data);
?>