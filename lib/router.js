AdminController = RouteController.extend(
{
	layoutTemplate: 'authLayout'
});

Router.map(function()
{

	this.route('Uploads', {
		path: '/',
		template: 'uploads',
		controller: 'AdminController'

	});


});