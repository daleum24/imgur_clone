ImgurClone.Views.UserHeaderView = Backbone.View.extend({
	initialize: function(){
		this.uploadForm = new ImgurClone.Views.UploadFormView();
		this.$el.addClass("signed-in-header")
		
	},
	
	tagName: "section",
	
	events: {
		"click #home_link" : "home_link",
		"click #image_upload" : "show_upload_form",
		"click #my-images" : "navigate_to_myImages",
		"click #my-favorites" : "navigate_to_favorites",
		"click #my-regions" : "navigate_to_regions",
		"click #logout" : "logout",
		"click #test" : "test"
	},
	
	test:function(event){
		event.preventDefault()
		$.fancybox("#initial_update_form")
	},
	
	home_link: function(event){
		event.preventDefault();
		Backbone.history.navigate("", {trigger:true});
	},
	
	show_upload_form: function(event){
		event.preventDefault();
		$.fancybox("#image_selection_container", {
			helpers: {
				overlay: {
					css: {'background' : 'rgba(7, 0, 2, 0.90)'}
				}
			}
		})
		
		var $fileselect = $(".fancybox-inner p#fileselect_p")
		
		$fileselect.one("click", function(event){
			$('#fileupload').click()
			$.fancybox.close()
		})
	},
	
	navigate_to_myImages: function(event){
		event.preventDefault();
		Backbone.history.navigate("#myImages", {trigger:true})
	},
	
	navigate_to_favorites: function(event){
		event.preventDefault();
		Backbone.history.navigate("#favorites", {trigger:true})
	},
	
	navigate_to_regions: function(event){
		event.preventDefault();
		Backbone.history.navigate("#regions", {trigger:true})
	},
	
	logout: function(event){
		event.preventDefault();
		$.ajax({
			url: "/session",
			method: "DELETE",
			success: function(){
				window.location.href = window.location.origin
			}
		})	
	},
	
	template: JST["user_header_view"],
	
	upload_form: JST["photo_upload_form"](),
	
	render: function(){
		this.$el.append(this.template({users: ImgurClone.UsersCollection, user_id: ImgurClone.user_id}));
		this.$el.append(this.uploadForm.render().$el);
		return this;
	}
	
	
});