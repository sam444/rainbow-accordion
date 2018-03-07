import {Component} from "rainbowui-core";

export default class Section extends Component {

	renderComponent(){
		return <noscript/>;
	}

};

Section.propTypes = $.extend({}, Component.propTypes, {
});


Section.defaultProps =  $.extend({}, Component.defaultProps, {
});