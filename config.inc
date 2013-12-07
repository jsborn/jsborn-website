<?php 
	
	$__str_dir = str_replace('\\','/',dirname(__FILE__));

	if($_SERVER["DOCUMENT_ROOT"]==$__str_dir){
		define("DIR_ROOT","");
	}else{
		define("DIR_ROOT",str_replace($_SERVER["DOCUMENT_ROOT"],"",$__str_dir));
	}
	
	define("DIR_BASE",dirname(__FILE__));

?>