/*

USAGE: 
$(selector).watermark();
$(selector).watermark('This is my default text to use')
$(selector).watermark({
	value : 'This is my default text to use',
	class : 'the-class-to-add-to-the-element'
});

*/

// wrap our plugin inside an anonymous function.
// this means it runs instantly, so must always 
// be placed after our jquery include
(function($) {
	// add our plugin to the jquery namespace
	jQuery.fn.watermark = function(options) {
		// our plugin accepts a single argument called options. This can be a string or an object
		
		var isWatermark, defaults;

		isWatermark = ':text,textarea';
		
		// these are the default properties for our plugin
		defaults = {
			defaultValue : 'Enter a value',
			classToAdd : 'watermark-input'
		};
	
		// check to see if our options argument is a string
		if (typeof(options) === 'string') {
			// if it is, then create an object with the key 'value' set to our string
			options = {
				defaultValue : options
			};
		}
	
		// then using jquery.extend, map our options onto the default object
		options = $.extend(defaults, options);
	
		// return this.each allows method chaining as found in jquery
		return this.each(function() {
			// create a reference to 'this'
			var $self = $(this);
			
			if (!$self.is(isWatermark)) {
				return;
			}
			
			// add some data to the element - our default value and the class that gets added when using a watermark
			$self
				.data('defaultValue', options.defaultValue)
				.data('classToAdd', options.classToAdd)
				.bind('focus', function() { // bind a focus event handler onto the element
					// if the value of the element is our default value
					if ($self.val() === $self.data('defaultValue')) {
						// then remove the watermark class and set the value to ''
						$self.removeClass($self.data('classToAdd')).val('');
					}
				}).bind('blur', function() { // bind a blur event handler onto the element
					// if the value of the element is ''
					if ($self.val() === '') {
						// then add our watermark class and set the value to the default value
						$self.addClass($self.data('classToAdd')).val($self.data('defaultValue'));
					}
				}).trigger('blur'); // finally trigger the blur event to set the default value
		});
	};
})(jQuery); // pass jquery to our anonymous function
