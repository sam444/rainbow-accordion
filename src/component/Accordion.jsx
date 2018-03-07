import { Component, UICell } from "rainbowui-core";
import { ELUtil, Util } from "rainbow-foundation-tools";
import PropTypes from 'prop-types';

export default class Accordion extends Component {

	renderComponent() {
		let children = this.props.children;
		let _self = this, sectionArray = [];

		if (React.Children.count(children) == 0) {
			return null;
		}

		else if (React.Children.count(children) == 1) {
			if ($.isArray(children) && children.length == 1) {
				sectionArray.push(this.getSectionElement(children[0], 0));
			} else {
				sectionArray.push(this.getSectionElement(children, 0));
			}
		}

		else {
			children.map(function (child, index) {
				sectionArray.push(_self.getSectionElement(child, index));
			});
		}

		return (<div id={this.componentId} role="tablist">{sectionArray}</div>);
	}

	/**
	 * Get section element
	 */
	getSectionElement(child, index) {
		let _self = this;

		return (
			<div className="card accordion">
				<div className="card-header" role="tab" id={"heading_" + _self.componentId + index}>
					<UICell type="row">
						<UICell width="9">
							<h5 class="mb-0">
								<a data-toggle="collapse" data-parent={_self.componentId} href={"#collapse_" + this.componentId + index} aria-expanded={_self.getCollapseExpanded(child.props.active)} aria-controls={"collapse_" + _self.componentId + index}>
									{child.props.accordionTitle}
								</a>
							</h5>
						</UICell>
						<UICell width="3">
							<div className='cardFunction' style={{ textAlign: 'right' }}>
								{child.props.functions}
							</div>
						</UICell>
					</UICell>
				</div>

				<div id={"collapse_" + _self.componentId + index} className={"collapse " + _self.getCollapseStatus(child.props.active)} role="tabpanel" data-parent={"#" + this.componentId} aria-labelledby={"heading_" + _self.componentId + index}>
					<div className="card-block">
						{child.props.children}
					</div>
				</div>
			</div>
		);
	}

	/**
	 * Get collapse status
	 */
	getCollapseStatus(active) {
		return (active == "true") ? "show" : "";
	}

	getCollapseExpanded(active) {
		return (active == "true") ? "true" : "false";
	}

	componentDidMount() {
		if (ELUtil.parseBoolValue(this.props.mutex)) {
			const component = $("#" + this.componentId);
			component.find("a[data-toggle='collapse']").bind('click', function () {
				component.find("div[role='tabpanel']").attr("class", 'collapse');
				$(this).attr("class", 'collapse show');
			});
		}
	}

};

Accordion.propTypes = $.extend({}, Component.propTypes, {
	mutex: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});


Accordion.defaultProps = $.extend({}, Component.defaultProps, {
	mutex: false
});