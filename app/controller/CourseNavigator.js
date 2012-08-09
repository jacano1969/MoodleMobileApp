Ext.define('MoodleMobApp.controller.CourseNavigator', {
	extend: 'Ext.app.Controller',

	config: {
		models: [
			'MoodleMobApp.model.ModuleList',
			'MoodleMobApp.model.ModulesCount',
		],

		views: [
			'MoodleMobApp.view.ModuleList',
			'MoodleMobApp.view.Module',
		],

		refs: {
			navigator: '#course_navigator',
			courseList: '#course_list',
			moduleList: '#module_list',
		},

		control: {
			courseList: { itemtap: 'selectCourse' },
		}
	},
	
	init: function(){
		var courses_store = Ext.data.StoreManager.lookup('courses');
		// set listener for updating the course module stats
		courses_store.on('write', this.updateCourseStats, this, {single:true});
	},

	updateCourseStats: function() {
		// 'this' points to the courses_store
		// collect course ids
		var courses_store = Ext.data.StoreManager.lookup('courses');
		var course_ids = new Array();
		courses_store.each(function(entry) {
			course_ids.push(entry.getData().id);
		});
		// set the token for this request
		// any token will do, in this case the token
		// of the first course entry is used
		MoodleMobApp.Session.setCourseToken(courses_store.first().getData().token);
		// request the course modules count
		console.log('loading');
		var course_modules_count_store = MoodleMobApp.WebService.getCourseModulesCount(course_ids);
		course_modules_count_store.on(
				'load', 
				function(){
					console.log('loaded');
					course_modules_count_store.each(function(entry){
						var courses_store_entry = courses_store.getById(entry.getData().id);
						courses_store_entry.getData().modulestatus = entry.getData().modulescount + ' modules';
						courses_store_entry.getData().modules = entry.getData().modulescount;
						courses_store_entry.setDirty();
					});
					courses_store.sync();
				},
				this,
				{single: true}
		);

	},

	selectCourse: function(view, index, target, record) {
		var course_data = record.getData();
		// set the course token
		MoodleMobApp.Session.setCourseToken(course_data.token);
		// request course modules
		var course_modules_store = MoodleMobApp.WebService.getCourseModules(course_data);
		// display modules
		if(typeof this.getModuleList() == 'object') {
			this.getModuleList().setStore(course_modules_store);
			this.getNavigator().push(this.getModuleList());
		} else {
			this.getNavigator().push({
				xtype: 'modulelist',	
				store: course_modules_store
			});
		}
		
		var course_users_store = MoodleMobApp.WebService.getEnrolledUsers(course_data.id);
		// hook up the user releated stores
		var enrolled_users_store = Ext.data.StoreManager.lookup('enrolledusers');
		var users_store = Ext.data.StoreManager.lookup('users');

		// store the enrolled users
		course_users_store.load({
			callback: function() {
				if(this.data.getCount() > 0){
					// update the list of enrolled users for the current course
					var course_group = enrolled_users_store.getGroups(course_data.id.toString());
					if(typeof course_group == 'object') {
						enrolled_users_store.remove(course_group.children);
					}
					this.each(function(record){
						enrolled_users_store.add({'courseid': course_data.id, 'userid': record.getData().id});
						// if this user is not in the store add it 
						// else 
						// if a previous entry of this user exists and has been modified
						// then updated it by removing the previous entry otherwise skip the record
						var current_user = users_store.getById(record.getData().id);
						if(current_user == null){
							record.setDirty();
							users_store.add(record);
						} else if(typeof current_user == 'object' && current_user.getData().timemodified != record.getData().timemodified){
							users_store.remove(record);
							users_store.sync();
							record.setDirty();
							users_store.add(record);
						}
					});
					enrolled_users_store.sync();
					users_store.sync();
				}
			}
		});
	},

});
