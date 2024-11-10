// Skill Bars Animation
const skillBars = document.querySelectorAll<HTMLElement>('.skill-bar');

// Set initial width to 0% for animation effect
skillBars.forEach(bar => {
  bar.style.width = '0%';
});

function fillSkillBars(): void {
  skillBars.forEach((bar) => {
    const skillLevel = bar.dataset.skill;
    if (skillLevel) {
      bar.style.width = `${skillLevel}%`;
    }
  });
}

// Trigger animation when the skills section is in view
function checkScroll(): void {
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      fillSkillBars();
      // Remove event listener to prevent multiple calls
      window.removeEventListener('scroll', checkScroll);
    }
  }
}

// Throttle function to limit the rate of execution
function throttle(func: Function, limit: number) {
  let lastFunc: number;
  let lastRan: number;

  return function(...args: any) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Use the throttled function
window.addEventListener('scroll', throttle(checkScroll, 100));
