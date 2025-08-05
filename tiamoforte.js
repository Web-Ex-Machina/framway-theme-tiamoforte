if (document.body.classList.contains('home')){
	document.documentElement.style.setProperty('--viewport-padding-top','0px');
}

// PARALLAX
if (document.querySelector('body.home .heroFW')) {
	let logo = document.querySelector('body.home .heroFW .hero__logo img');
	let cta = document.querySelector('body.home .heroFW .hero__cta');
	let ctaText = cta.querySelector('.cta__text');
	let ctaButton = cta.querySelector('.cta__button');
	let videoWrapper = document.querySelector('body.home .heroFW .cta__video');
	let video = videoWrapper.querySelector('video');
	let heroFigure = document.querySelector('body.home .heroFW .heroFW__figure');

	let closeVideo = document.createElement('div');
	closeVideo.classList.add('cta__close');
	closeVideo.innerHTML = '<svg width="40" height="40" viewbox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="currentColor" stroke-width="4" /></svg>';
	videoWrapper.appendChild(closeVideo);

	heroFigure.classList.add('prlx');
	heroFigure.dataset.speed = 0.25;
	logo.classList.add('prlx');
	logo.dataset.speed  = 0.5;

	// ctaText.dataset.speed   = 1.25;
	// ctaButton.dataset.speed   = 1.5;

	let playVideo = function(){
		let timeVideoAppearing = (parseFloat(getComputedStyle(videoWrapper).transitionDuration) + parseFloat(getComputedStyle(videoWrapper).transitionDelay))*1000;
		document.body.classList.add('play-video');
		setTimeout(()=>{
			video.play()
		},timeVideoAppearing)
	}
	let stopVideo = function(){
		video.pause();
		document.body.classList.remove('play-video');
	}

	cta.addEventListener('click',()=>{
		if (window.scrollY > 0) {
			window.onscrollend = function(){
				playVideo()
				window.onscrollend = null;
			}
			window.scrollTo({top:0,behavior: "smooth",})
		} else {
			playVideo()
		}
	});
	closeVideo.addEventListener('click',stopVideo);

}

!function(){window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame||window.oCancelAnimationFrame,window.SimpleParallax=function(a){this.elementList=[],this.transformVendor=this.getTransformVender(),this.offset=0,this.setupScrollHandler();var b=this;requestAnimationFrame(function(){b.animate(b)}),void 0!==a&&this.addElement(a)},window.SimpleParallax.prototype.setupScrollHandler=function(){var a=this;window.addEventListener("scroll",function(){a.offset=this.pageYOffset})},window.SimpleParallax.prototype.animate=function(a){for(var b=a.elementList.length,c=0;c<b;c++){var d=a.elementList[c].offset()*a.elementList[c].speed;a.elementList[c].element.offsetTop>window.innerHeight&&(d+=(a.elementList[c].element.offsetTop+a.elementList[c].element.offsetHeight-window.innerHeight)*a.elementList[c].speed);var e=-(a.offset*a.elementList[c].speed-d);a.elementList[c].element.style[a.transformVendor]="translate3d(0px, "+e+"px, 0px)"}requestAnimationFrame(function(){a.animate(a)})},window.SimpleParallax.prototype.getTransformVender=function(){for(var a,b=["webkitTransform","MozTransform","msTransform","OTransform","transform"],c=0;c<b.length;c++)void 0!==document.body.style[b[c]]&&(a=b[c]);return a},window.SimpleParallax.prototype.addElement=function(a){if(void 0!==a&&"object"==typeof a){if(Array.isArray(a)===!1){var b=a;a=[b]}for(var c=a.length||0,d=0;d<c;d++){if(void 0===a[d].element)return;var e={element:a[d].element,speed:.5,offset:function(){return 0}};void 0!==a[d].speed&&(e.speed=a[d].speed),void 0!==a[d].offset&&(e.offset=a[d].offset);var f=this.isElementInList(a[d].element);f&&this.elementList.splice(f,1),this.elementList.push(e)}}},window.SimpleParallax.prototype.isElementInList=function(a){for(var b=this.elementList.length,c=0;c<b;c++)if(this.elementList[c].element===a)return c;return!1}}();
document.querySelectorAll('.prlx').forEach((el)=>{
	let parallax = new SimpleParallax({
	  element: el,
	  speed: el.dataset.speed ? el.dataset.speed : 0.5,

	});
})
