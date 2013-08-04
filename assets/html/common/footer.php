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
<script type="text/javascript">
	jQuery(document).ready(function() {
			
		JSB.setConfig({
			console: true,
			createImport: true,
			importSetup: {
				library: '<?php echo DIR_ROOT; ?>/assets/js/',
				source: '<?php echo DIR_ROOT; ?>/assets/js/',
				parserURL:function(url){
					console.log(url);
					return url;
				}
			}
		});

		JSB.addListener('create', function() {
			// console.log(arguments);
			// console.log("create");
		});

		JSB.addListener('destroy', function() {
			// console.log(arguments);
			// console.log("destroy");
		});

		window.cls = JSB.create("org.jsborn.common");

		window.fbAsyncInit = function() {
		FB.init({
			appId: '223395717811146',
			status: true,
			xfbml: true
		});

		FB.Event.subscribe('xfbml.render', function() {
			$("#social-like-btn").show();
		});
		
	};
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/zh_TW/all.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	});
</script>
</body>
</html>