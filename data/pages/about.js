const lipsumText = `<div>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit, diam vel ultricies ultrices, dui enim facilisis felis, nec tristique ipsum nibh sed leo. Mauris feugiat velit quis ex maximus, quis faucibus eros pulvinar. Nulla ornare lacinia bibendum. Donec vulputate euismod lectus, id ultrices mauris hendrerit a. In placerat nisi est. Curabitur vel felis at nibh faucibus volutpat. Suspendisse eget lacinia nisi. Maecenas euismod augue urna, nec mattis ipsum pulvinar et. Vivamus sem dolor, fermentum sit amet molestie sed, condimentum quis tortor. Mauris sagittis, lacus vitae iaculis iaculis, ante urna aliquet sapien, ac commodo dolor dui eu est. Proin at venenatis odio. Praesent in cursus ante. Donec urna sapien, dignissim a nisi sit amet, tempor tincidunt nisl. Mauris aliquet rutrum elit, suscipit semper lorem sollicitudin dignissim. Curabitur placerat turpis ante, interdum laoreet ligula gravida nec.</p>

<p>In gravida lobortis lectus et sodales. Curabitur porttitor aliquam magna, tempus luctus ipsum lacinia et. Aenean laoreet lorem in eros iaculis luctus. Nam efficitur tristique justo, nec aliquam ligula interdum eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet venenatis arcu ac luctus. Praesent ipsum lorem, imperdiet nec vestibulum vel, congue vitae dolor. Nulla malesuada nunc in tempor dapibus. Donec aliquet eu urna nec tincidunt. Ut mollis felis quis semper vulputate. Vestibulum eget ultrices dolor, sed mollis turpis.</p>

<p>Sed ut turpis felis. Quisque faucibus luctus erat, et egestas erat volutpat at. Suspendisse at eleifend orci, a maximus odio. Curabitur leo velit, aliquet in libero ac, tempus laoreet nibh. Praesent nec nunc rutrum, ultrices nulla eu, porta enim. Praesent egestas tincidunt luctus. Suspendisse ut porta felis. Vestibulum porttitor rutrum nibh, eu sodales libero pulvinar sit amet. Fusce velit magna, ullamcorper lobortis egestas ut, pellentesque in leo. Nullam tortor magna, dapibus sit amet tortor id, rhoncus convallis sapien. Mauris vitae aliquam erat. Maecenas augue nisl, luctus scelerisque arcu a, rutrum vestibulum nunc. Nulla arcu nulla, commodo quis rhoncus vitae, semper luctus sapien.</p>

<p>Mauris imperdiet dolor ac ipsum efficitur, id fermentum mauris iaculis. Donec suscipit fringilla viverra. Suspendisse sodales libero consequat rhoncus hendrerit. Nam tincidunt dictum lorem in faucibus. Sed malesuada ultrices pharetra. Vestibulum placerat at orci non porta. Curabitur quis nulla magna. Sed rutrum, ipsum quis aliquet mollis, purus metus ullamcorper mi, ac mollis dui augue at sem. Curabitur tempus dolor quis gravida consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>

<p>Etiam facilisis vulputate pretium. Duis a finibus lorem. Sed vel nibh nec ante scelerisque auctor. Pellentesque tincidunt pretium turpis. Aliquam vehicula aliquam mauris, ut consectetur tellus egestas quis. In pellentesque tellus quam, at suscipit mauris scelerisque vel. Etiam bibendum augue eget nisi pharetra accumsan. Integer suscipit, ex a sollicitudin iaculis, nisi justo varius elit, et ornare dolor nibh in ante. Aliquam aliquet libero dolor. Integer eget ipsum vel arcu tincidunt condimentum et at lorem. Quisque nunc ante, accumsan eget mollis sed, tempor ut ante. Aenean tincidunt varius nulla sed faucibus. Nunc ante arcu, finibus id dapibus in, porta id ipsum. Phasellus vulputate neque ac arcu sollicitudin varius.</p>

<p>Proin feugiat metus ut lorem cursus, non congue erat blandit. Ut diam leo, scelerisque at accumsan ac, hendrerit sed justo. Etiam ultricies dui erat, dictum ultricies justo condimentum non. Cras molestie justo lectus, quis posuere massa eleifend non. Proin eu feugiat dui. Etiam quis commodo tortor, eget facilisis dolor. Fusce vel varius tortor. Mauris vitae porttitor nunc, ultrices finibus justo. Praesent in quam a ligula commodo suscipit sed ut eros.</p>

<p>Morbi porta eu mi id porta. Proin ligula quam, egestas vitae nisl sed, rutrum scelerisque est. Morbi vitae tristique est, et auctor velit. Nullam vestibulum lacus a felis dignissim, ac dignissim felis mattis. Sed vestibulum leo in ligula suscipit consequat at sit amet lectus. Nullam nisl purus, luctus non tristique quis, commodo sed velit. Vivamus nec elit a velit pulvinar convallis non ut odio. Morbi ac libero et felis commodo tincidunt eu vel lacus. Aliquam et porttitor nisl, at auctor odio. Sed magna risus, vestibulum id scelerisque non, pharetra id mi. Cras id leo venenatis, elementum nisi quis, consequat metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tempor purus neque, eu rhoncus quam semper vel.</p>
</div>`;

module.exports = {
	url: '/about',
	title: 'About Open Publishing Platform',
	description: 'Open Publishing Platform is an open solution to the typical journal publishing workflow.',
	template: 'oneColumnReadingWidth',
	content: [
		{
			type: 'html',
			value: lipsumText,
		},
	]
};
