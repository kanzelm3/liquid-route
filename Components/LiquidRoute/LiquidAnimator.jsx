import { h, Component } from 'preact';

const defaultOpts = {
  duration: 300,
  fill: 'forwards',
  easing: 'ease-out'
};

export default class LiquidAnimator extends Component {
  constructor() {
    super();
    this.setContainer = this.setContainer.bind(this);
    this.setPageholder = this.setPageholder.bind(this);
  }
  componentWillEnter(cb) {
    this.props.onSetCurrentAnimation && this.props.onSetCurrentAnimation();
    const animation = this.props.getEntryAnimation();
    if (!this.pageholder.animate || !animation) {
      return cb();
    }
    const animationOptions = Object.assign({}, defaultOpts, animation.options);
    this.pageholder.animate(
      animation.animation,
      animationOptions
    ).onfinish = () => {
      cb();
    };
  }
  componentWillLeave(cb) {
    const animation = this.props.getExitAnimation();
    if (!this.pageholder.animate || !animation) {
      return cb();
    }
    const scrollY = window.scrollY;
    this.pageholder.style.position = 'absolute';
    this.container.style.transform = `translateY(${-scrollY}px)`;
    window.scrollY = 0;
    const animationOptions = Object.assign({}, defaultOpts, animation.options);

    this.pageholder.animate(
      animation.animation,
      animationOptions
    ).onfinish = () => {
      this.container.style.transform = '';
      this.pageholder.style.position = '';
      cb();
    };
  }
  setContainer(el) {
    this.container = el;
  }
  setPageholder(el) {
    this.pageholder = el;
  }
  render() {
    return (
      <div ref={this.setContainer} className="liquid-container">
        <div className="liquid-pageholder" ref={this.setPageholder}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
