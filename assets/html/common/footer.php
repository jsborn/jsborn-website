<footer id="jsb-footer" class="jsb-footer">
	<div class="container">
		<p>
			Designed and built  by
			<a href="http://twitter.com/tureki" target="_blank">@tureki</a>
		</p>
		<p>
			Code licensed under
			<a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License v2.0</a>
			, documentation under
			<a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>
			, Facebook page <a href="https://www.facebook.com/jsborn.org" target="_blank">JSBorn</a>
		</p>
	</div>
</footer>
<div id="fb-root"></div>
<script src="<?php echo DIR_ROOT; ?>/assets/js/jquery/jquery-1-10-2.js"></script>
<script src="<?php echo DIR_ROOT; ?>/assets/js/bootstrap/bootstrap-3.js"></script>
<script src="<?php echo DIR_ROOT; ?>/assets/js/prettify/prettify.js"></script>
<script src="<?php echo DIR_ROOT; ?>/assets/js/jsborn/jsborn.js"></script>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/all.js#xfbml=1&appId=177066082444122";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<script type="text/javascript">
		jQuery( document ).ready(function() {

			JSB.setConfig({
				console:true,
				createImport :true,
				importSetup:{
					library:'<?php echo DIR_ROOT; ?>/assets/js/jsborn/',
					source:'<?php echo DIR_ROOT; ?>/assets/js/'
				}
			});

			JSB.addListener('create',function(){
				console.log("create");
			});
			
			JSB.addListener('destroy',function(){
				console.log("destroy");
			});

			var cls = JSB.create("org.jsborn.common");
			
		});
	</script>
</body>
</html>