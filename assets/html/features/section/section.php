<div>
	<div class="page-header">
		<h1 id="class">物件</h1>
	</div>
	<?php include "class/class.html"; ?>
	<?php include "class/function.html"; ?>
	<?php include "class/extend.html"; ?>
	<?php include "class/event.html"; ?>
	<?php include "class/import.html"; ?>
	<?php include "class/destroy.html"; ?>
	<?php include "class/plugin.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="core">擴充JSB</h1>
	</div>
	<p class="lead">擴充JSB是指對<code>JSB</code>全域變數進行擴充，目前JSBorn提供兩個內建的擴充:<code>Channel</code> 和 <code>Model</code>
	<div class="jsb-callout jsb-callout-info">
		<p>
			JSBorn內建的JSB擴充預設都不會載入，只有您需要使用到時才會載入</p>
		</p>
		<p>
			若要預設載入全域擴充，可以查看 JSB.setConfig
		</p>
		<p>
			若需要自行對<code>JSB</code>擴充，你可以到此查看 開發者 文件
		</p>
	</div>
	<hr>
	<?php include "core/channel.html"; ?>
	<hr>
	<?php include "core/model.html"; ?>
</div>
<div>
	<div class="page-header">
		<h1 id="plugin">擴充物件</h1>
	</div>
	<p class="lead">擴充物件是指對<code>物件/class</code>進行擴充，目前JSBorn提供兩個內建的插件:<code>Controller</code> 和 <code>Model</code>
	<div class="jsb-callout jsb-callout-info">
		<p>
			JSBorn內建的插件擴充預設都不會載入，只有您需要使用到時才會載入
		</p>
		<p>
			若要預設載入某些插件，可以查看 JSB.setConfig
		</p>
		<p>
			若需要自行開發插件，你可以到此查看 開發者 文件
		</p>
	</div>
	<hr>
	<?php include "plugin/controller.html"; ?>
	<hr>
	<?php include "plugin/model.html"; ?>
</div>