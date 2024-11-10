// Skill Bars Animation
var skillBars = document.querySelectorAll('.skill-bar');
// Set initial width to 0% for animation effect
skillBars.forEach(function (bar) {
    bar.style.width = '0%';
});
function fillSkillBars() {
    skillBars.forEach(function (bar) {
        var skillLevel = bar.dataset.skill;
        if (skillLevel) {
            bar.style.width = "".concat(skillLevel, "%");
        }
    });
}
// Trigger animation when the skills section is in view
function checkScroll() {
    var skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        var rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            fillSkillBars();
            // Remove event listener to prevent multiple calls
            window.removeEventListener('scroll', checkScroll);
        }
    }
}
// Throttle function to limit the rate of execution
function throttle(func, limit) {
    var lastFunc;
    var lastRan;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        }
        else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(_this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
// Use the throttled function
window.addEventListener('scroll', throttle(checkScroll, 100));
