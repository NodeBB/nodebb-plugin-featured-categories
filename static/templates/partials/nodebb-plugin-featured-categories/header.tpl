<!-- Featured Categories plugin -->
<ul class="categories">
	<p>Featured Categories</p>
</ul>

<div class="row featured-categories" itemscope itemtype="http://www.schema.org/ItemList">
	<!-- BEGIN featuredCategories -->
	<div component="categories/category" class="<!-- IF featuredCategories.class -->{featuredCategories.class}<!-- ELSE -->col-md-3 col-sm-6 col-xs-12<!-- ENDIF featuredCategories.class --> category-item" data-cid="{featuredCategories.cid}" data-numRecentReplies="{featuredCategories.numRecentReplies}">
		<meta itemprop="name" content="{featuredCategories.name}">

		<div class="category-icon">
			<a style="color: {featuredCategories.color};" href="{config.relative_path}/category/{featuredCategories.slug}" itemprop="url">
				<div
					id="category-{featuredCategories.cid}" class="category-header category-header-image-{featuredCategories.imageClass}"
					style="
						<!-- IF featuredCategories.backgroundImage -->background-image: url({featuredCategories.backgroundImage});<!-- ENDIF featuredCategories.backgroundImage -->
						<!-- IF featuredCategories.bgColor -->background-color: {featuredCategories.bgColor};<!-- ENDIF featuredCategories.bgColor -->
						color: {featuredCategories.color};
					"
				>
					<!-- IF featuredCategories.icon -->
					<div><i class="fa {featuredCategories.icon} fa-4x hidden-xs"></i></div>
					<!-- ENDIF featuredCategories.icon -->
				</div>
			</a>

			<div class="category-box">
				<div class="category-info" style="color: {featuredCategories.color};">
					<a href="{config.relative_path}/category/{featuredCategories.slug}" itemprop="url" style="color: {featuredCategories.color};">
						<h4><!-- IF featuredCategories.icon --><i class="fa {featuredCategories.icon} visible-xs-inline"></i> <!-- ENDIF featuredCategories.icon -->{featuredCategories.name}</h4>
						<div class="description" itemprop="description"><strong>{featuredCategories.description}</strong> <span class="timeago" title="{featuredCategories.relativeTime}"></span></div>
					</a>
				</div>
			</div>

			<span class="post-count" style="color: {featuredCategories.color};">{featuredCategories.totalPostCount}</span>
		</div>
	</div>
	<!-- END featuredCategories -->
</div>
<br />