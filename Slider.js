/**
 * Fade-In-Out-Slider
 * Github: https://github.com/yehuya/fade-In-Out-Slider
 */

function Slider(settings){
    this.settings = {
        id: null,
        dots: true,
        intervalTime: 3000,
        transition: null,
        start: 0,
        stopAndMoveOnSlideClick: true
    };

    for(var p in this.settings){
        if(settings.hasOwnProperty(p)) this.settings[p] = settings[p];
    }

    this.now = this.settings.start; 
    this.init();    
}

Slider.prototype.init = function(){
    this.elements();
    this.css();
    this.carousel();
}

Slider.prototype.elements = function(){
    this.slider = document.getElementById(this.settings.id);
    if(!(this.slider instanceof HTMLElement)) throw new Error("Slider element not found");
    
    this.slider.classList.add("y_slider");

    this.slides = this.addClassToChildren();
    this.dots = this.createDots();
}

Slider.prototype.addClassToChildren = function(){
    for(var i = 0 ; i < this.slider.children.length ; i ++){
        var slide = this.slider.children[i];
        slide.classList.add("y_slide");
        
        if(this.settings.stopAndMoveOnSlideClick) this.slideClick(slide);
    }

    return this.slider.querySelectorAll(".y_slide"); 
}

Slider.prototype.css = function(){
    if(!this.settings.transition) return;
    for(var i = 0 ; i < this.slides.length ; i++){
        this.slides[i].style.transition = this.settings.transition;
        if(this.settings.dots) this.dots[i].style.transition = this.settings.transition;
    }
}

Slider.prototype.createDots = function(){
    if(!this.settings.dots) return [];

        var self = this;
        var dotsDiv = document.createElement("div");
        dotsDiv.classList.add("y_dots");
    
        for(var i = 0 ; i < this.slides.length ; i++){
            (function(index){
                var dot = document.createElement("span");
                dot.addEventListener("click", function(){
                    self.dotClick(index);
                });
    
                dotsDiv.appendChild(dot);
            })(i);
        }
    
        this.slider.appendChild(dotsDiv);
    
        return dotsDiv.children;
}

Slider.prototype.movement = function(){
    if(this.now > this.slides.length - 1) this.now = 0;
    var active = this.slider.querySelectorAll(".active");

    for(var i = 0 ; i < active.length ; i++){
        active[i].classList.remove("active");
    }
    
    if(this.settings.dots) this.dots[this.now].classList.add("active");
    this.slides[this.now++].classList.add("active");
}

Slider.prototype.carousel = function(){    
    this.movement();
    this.interval = setInterval(this.movement.bind(this), this.settings.intervalTime);
}

Slider.prototype.dotClick = function(index){
    clearInterval(this.interval);
    this.now = index;
    this.carousel();
}

Slider.prototype.slideClick = function(slideElement){
    var self = this;

    slideElement.addEventListener("mousedown", function(){
        clearInterval(self.interval);
    });

    slideElement.addEventListener("mouseup", function(){
        self.carousel();
    });
}
