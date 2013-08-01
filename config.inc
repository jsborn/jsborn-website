<?php 
	
	if($_SERVER["DOCUMENT_ROOT"]==dirname(__FILE__)){
		define("DIR_ROOT","/");
	}else{
		define("DIR_ROOT",str_replace($_SERVER["DOCUMENT_ROOT"],"",dirname(__FILE__)));
	}
	
	define("DIR_BASE",dirname(__FILE__));

?>