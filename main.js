document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.toggle');
    const menu = document.querySelector('nav ul');
    const landingContainer = document.getElementById('landing-container');
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        updateTextElementMargin();
    });

    // Content data
    const contentData = [
        {
            title: 'Hello World!',
            text: 'We are venom.......... quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita totam quia quasi commodi. Mollitia inventore sequi sapiente facilis commodi nemo voluptate blanditiis reprehenderit, natus, ratione ullam perferendis earum in dolor!'
        },
        {
            title: 'Welcome to PureCare',
            text: 'PureCare is dedicated to providing the best nursing services. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita totam quia quasi commodi.'
        },
        {
            title: 'Our Services',
            text: 'We offer a wide range of services to meet your needs. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita totam quia quasi commodi.'
        }
    ];

    // Generate HTML content
    function generateContent(index) {
        const content = contentData[index];
        return `
            <div class="landing" id="home">
                <div class="overlay">
                    <div class="text">
                        <i class="fas fa-angle-left change-background fa-2x" onclick="changeContent(${(index - 1 + contentData.length) % contentData.length})"></i>
                        <i class="fas fa-angle-right change-background fa-2x" onclick="changeContent(${(index + 1) % contentData.length})"></i>
                        <div class="content">
                            <h2>${content.title}<br></h2>
                            <p>${content.text}</p>
                        </div>
                    </div>
                </div>
                <ul class="bullets">
                    ${contentData.map((_, i) => `<li class="${i === index ? 'active' : ''}"></li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Change content function
    window.changeContent = function(index) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            updateTextElementMargin();
        setTimeout(() => {
            landingContainer.innerHTML = generateContent(index);
            animateBullets(index);
        }, 300); // Delay to allow menu to close first
    } else {
        landingContainer.innerHTML = generateContent(index);
        animateBullets(index);
    }
    };

    // Animate bullets function
    function animateBullets(activeIndex) {
        const bullets = document.querySelectorAll('.bullets li');
        bullets.forEach((bullet, index) => {
            bullet.classList.remove('active', 'inactive');
            if (index === activeIndex) {
                bullet.classList.add('active');
            } else {
                bullet.classList.add('inactive');
            }
        });
    }

    // Update text element margin
    function updateTextElementMargin() {
        const textElement = document.querySelector('.landing .text');
        if (textElement) {
            if (menu.classList.contains('active')) {
                const menuHeight = menu.scrollHeight;
                textElement.style.marginTop = `${0.4 * menuHeight}px`;
            } else {
                textElement.style.marginTop = '0';
            }
        }
    }

    // Initialize content
    changeContent(0);
    const serviceData = [
        {
            icon:'fas fa-desktop fa-3x',
            title:'Fast Handling',
            text:'adipisicing elit. Facilis saepe est sequi consequuntur illo libero eum eligendi, consectetur veniam, at voluptatem'
        },
        {
            icon: 'fas fa-cog fa-3x',
            title: 'Caring About You',
            text: 'adipisicing elit. Facilis saepe est sequi consequuntur illo libero eum eligendi, consectetur veniam, at voluptatem'
        },
        {
            icon: 'fas fa-pencil-ruler fa-3x',
            title: 'Immediate Calling',
            text: 'adipisicing elit. Facilis saepe est sequi consequuntur illo libero eum eligendi, consectetur veniam, at voluptatem'
        },
        {
            icon: 'fas fa-camera fa-3x',
            title: 'Effective Machines',
            text: 'adipisicing elit. Facilis saepe est sequi consequuntur illo libero eum eligendi, consectetur veniam, at voluptatem'
        }
    ];
    function generateServiceSection(){
        const serviceContainer = document.createElement('div');
        serviceContainer.className = 'services';
        serviceContainer.id = 'services';

        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';

        const mainHeadingDiv = document.createElement('div');
        mainHeadingDiv.className = 'main-heading';
        
        const heading = document.createElement('h2');
        heading.innerText = 'Services';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et earum vitae aliquid recusandae est, odio dicta facilis neque';

        mainHeadingDiv.appendChild(heading);
        mainHeadingDiv.appendChild(paragraph);

        const servicesContentDiv = document.createElement('div');
        servicesContentDiv.className = 'services-content';


        serviceData.forEach(service => {
            const srvDiv = document.createElement('div');
            srvDiv.className = 'srv';

            const icon = document.createElement('i');
            icon.className = service.icon;

            const textDiv = document.createElement('div');
            textDiv.className = 'text';


            const serviceTitle = document.createElement('h3');
            serviceTitle.innerText = service.title;

            const serviceText = document.createElement('p');
            serviceText.innerText = service.text;

            textDiv.appendChild(serviceTitle);
            textDiv.appendChild(serviceText);

            srvDiv.appendChild(icon);
            srvDiv.appendChild(textDiv);

            servicesContentDiv.appendChild(srvDiv);
        });
        containerDiv.appendChild(mainHeadingDiv);
        containerDiv.appendChild(servicesContentDiv);
        serviceContainer.appendChild(containerDiv); 

        return serviceContainer;
    }
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.appendChild(generateServiceSection());

    const designSection = document.querySelector('.design');

    const observer1 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it becomes visible
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    observer1.observe(designSection);
    const srvElements = document.querySelectorAll('.srv');

    const observer2 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(srvElements).indexOf(entry.target);
                if (index % 2 === 0) {
                    entry.target.classList.add('visible-left');
                } else {
                    entry.target.classList.add('visible-right');
                }
                observer.unobserve(entry.target); // Stop observing once it becomes visible
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    srvElements.forEach(srv => observer2.observe(srv));


    const filterButtons = document.querySelectorAll('.shuffle li');
    const portfolioItems = document.querySelectorAll('.port-content .box');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
           portfolioItems.forEach(item => {
    if (filter === 'all' || item.classList.contains(`filter-${filter}`)) {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
});
        });
    });
    const observer3 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(portfolioItems).indexOf(entry.target);
                if (index % 2 === 0) {
                    entry.target.classList.add('visible-left');
                } else {
                    entry.target.classList.add('visible-right');
                }
                observer.unobserve(entry.target); // Stop observing once it becomes visible
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    portfolioItems.forEach(item => observer3.observe(item));


    const moreButton = document.querySelector('.more');

    moreButton.addEventListener('click', function(event) {
        event.preventDefault();
        this.classList.add('loading');

        // Simulate a loading process (e.g., fetching data)
        setTimeout(() => {
            this.classList.remove('loading');
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 500); // Adjust the timeout duration as needed
    });


    const seeMoreBtn = document.getElementById('see-more-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const video = document.getElementById('background-video');

    // Smooth scroll to target section
    seeMoreBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const targetElement = document.getElementById('target-section');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });

    // Play/Pause control for the video
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });
    const statsData = [
        { icon: 'fas fa-users fa-3x', number: 757, text: 'Happy Clients' },
        { icon: 'fas fa-award fa-3x', number: 785, text: 'Awards' },
        { icon: 'fas fa-trophy fa-3x', number: 68, text: 'Winning' },
        { icon: 'fas fa-medkit fa-3x', number: 506, text: 'Projects' }
    ];

    // Generate the stats section dynamically
    const statsContainer = document.querySelector('.stats .container');
    statsData.forEach((stat, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
            <i class="${stat.icon}"></i>
            <div class="number">${stat.number}</div>
            <p>${stat.text}</p>
        `;
        statsContainer.appendChild(box);
    });

    // Stats Section Counting Animation
    const statNumbers = statsContainer.querySelectorAll('.number');
    const statBoxes = statsContainer.querySelectorAll('.box');

    const observer5 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(statBoxes).indexOf(entry.target);
                if (index % 2 === 0) {
                    entry.target.classList.add('visible-right');
                } else {
                    entry.target.classList.add('visible-left');
                }
                const numberElement = entry.target.querySelector('.number');
                if (numberElement) {
                    animateCount(numberElement);
                }
                observer.unobserve(entry.target); // Stop observing once it becomes visible
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    statBoxes.forEach(box => observer5.observe(box));

    function animateCount(element) {
        const target = +element.innerText;
        const duration = 3000; // Duration of the animation in milliseconds
        const start = 0;
        const increment = target / (duration / 16); // Assuming 60fps

        function updateCount() {
            const current = +element.innerText;
            if (current < target) {
                element.innerText = Math.ceil(current + increment);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target;
            }
        }

        element.innerText = start;
        updateCount();
    }


    fetch('testimonials.json')
    .then(response => response.json())
    .then(data => {
        const testimonialsData = data;

        // Generate testimonials content
        const testimonialsContainer = document.querySelector('.testi');
        const bulletsContainer = testimonialsContainer.querySelector('.bullets');
        const contentContainer = testimonialsContainer.querySelector('.content');
        const skillsContainer = document.querySelector('.our-skills'); // Initialize skillsContainer here

        function generateTestimonialContent(index) {
            const testimonial = testimonialsData[index];
            contentContainer.innerHTML = `
                <img src="${testimonial.img}" alt="testi">
                <div class="text">${testimonial.text}
                    <p>${testimonial.author}</p>
                </div>
            `;
            generateSkillsContent(testimonial.skills);
        }

        function generateBullets() {
            bulletsContainer.innerHTML = '';
            testimonialsData.forEach((_, index) => {
                const bullet = document.createElement('li');
                if (index === 0) bullet.classList.add('active');
                bullet.addEventListener('click', () => {
                    updateTestimonial(index);
                });
                bulletsContainer.appendChild(bullet);
            });
            updateBulletVisibility(0);
        }

        function updateTestimonial(index) {
            generateTestimonialContent(index);
            const bullets = bulletsContainer.querySelectorAll('li');
            bullets.forEach((bullet, i) => {
                bullet.classList.toggle('active', i === index);
            });
            updateBulletVisibility(index);
        }

        function updateBulletVisibility(activeIndex) {
            const bullets = bulletsContainer.querySelectorAll('li');
            bullets.forEach((bullet, i) => {
                const distance = Math.abs(i - activeIndex);
                if (distance === 0) {
                    bullet.style.opacity = '1';
                    bullet.style.display = 'inline-block';
                } else if (distance < 2) {
                    bullet.style.opacity = '0.5';
                    bullet.style.display = 'inline-block';
                } else if (distance < 4) {
                    bullet.style.opacity = '0.2';
                    bullet.style.display = 'inline-block';
                } else {
                    bullet.style.opacity = '0';
                    bullet.style.display = 'none';
                }
            });
        }
        
        function updateTestimonial(index) {
            generateTestimonialContent(index);
            const bullets = bulletsContainer.querySelectorAll('li');
            bullets.forEach((bullet, i) => {
                bullet.classList.toggle('active', i === index);
            });
            updateBulletVisibility(index);
        }

        generateTestimonialContent(0);
        generateBullets();

        // Add arrows for navigation
        const arrowLeft = document.createElement('div');
        arrowLeft.className = 'arrow arrow-left';
        arrowLeft.innerHTML = '&#9664;'; // Left arrow symbol
        arrowLeft.addEventListener('click', () => {
            const activeIndex = Array.from(bulletsContainer.children).findIndex(bullet => bullet.classList.contains('active'));
            const newIndex = (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
            updateTestimonial(newIndex);
        });

        const arrowRight = document.createElement('div');
        arrowRight.className = 'arrow arrow-right';
        arrowRight.innerHTML = '&#9654;'; // Right arrow symbol
        arrowRight.addEventListener('click', () => {
            const activeIndex = Array.from(bulletsContainer.children).findIndex(bullet => bullet.classList.contains('active'));
            const newIndex = (activeIndex + 1) % testimonialsData.length;
            updateTestimonial(newIndex);
        });

        testimonialsContainer.appendChild(arrowLeft);
        testimonialsContainer.appendChild(arrowRight);

        // Generate skills content
        function generateSkillsContent(skills) {
            skillsContainer.innerHTML = `
                <h2>Our Skills</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, natus exercitationem at velit asperiores aperiam veritatis iste quod distinctio neque officiis sunt reiciendis id accusamus tempora nihil, eligendi numquam sed?</p>
            `;
            skills.forEach(skill => {
                const holder = document.createElement('div');
                holder.className = 'holder';
                holder.innerHTML = `
                    <h4>${skill.skill}</h4>
                    <div class="prog">
                        <span style="width:0" data-progress="${skill.progress}"></span>
                        <div class="percentage">${skill.progress}</div>
                    </div>
                `;
                skillsContainer.appendChild(holder);
            });
        
            // Animate skills progress bars
            const observer6 = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const spans = entry.target.querySelectorAll('.prog span');
                        const percentages = entry.target.querySelectorAll('.prog .percentage');
                        spans.forEach(span => {
                            span.style.width = span.getAttribute('data-progress');
                        });
                        percentages.forEach(percentage => {
                            setTimeout(() => {
                                percentage.style.opacity = '1';
                                percentage.style.right = '10px';
                            }, 1000); // Delay to match the progress bar animation
                        });
                        observer.unobserve(entry.target); // Stop observing once it becomes visible
                    }
                });
            }, {
                threshold: 0.2 // Trigger when 20% of the element is visible
            });
        
            const skillHolders = skillsContainer.querySelectorAll('.holder');
            skillHolders.forEach(holder => observer6.observe(holder));
        }
    });

    const plans = document.querySelectorAll('.plan');
    plans.forEach(plan => {
        plan.addEventListener('click', function() {
            plans.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Smooth scroll to the contact section
    // const contactLink = document.querySelector('.contact-link');
    // contactLink.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     const contactSection = document.getElementById('contact');
    //     contactSection.scrollIntoView({ behavior: 'smooth' });
    // });

    // Animate the pricing plans when they come into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it becomes visible
            }
        });
    }, {
        threshold: 0.6 // Trigger when 20% of the element is visible
    });

    plans.forEach(plan => observer.observe(plan));







    const form = document.querySelector('.subs form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Subscription successful!');
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }




    const form2 = document.querySelector('.contact-form form');
    form2.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = form2.querySelector('#name').value.trim();
        const email = form2.querySelector('#email').value.trim();
        const message = form2.querySelector('#message').value.trim();
        const date = form2.querySelector('#date').value.trim();

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (name === '' || message === '' || date === '') {
            alert('Please fill out all fields.');
            return;
        }

        const data = {
            name: name,
            email: email,
            message: message,
            date: date
        };

            const response = await fetch('back-isormi0ds-noursalem2005s-projects.vercel.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
       
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    

    const links = document.querySelectorAll('.footer-links a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
        // Dynamic year update
    const yearElement = document.querySelector('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${currentYear} Your Company. All rights reserved.`;

    // Social media link tracking
    const socialLinks = document.querySelectorAll('.footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('click    ', function() {
            console.log(`Social media link clicked: ${this.href}`);
            // Here you can add your analytics tracking code
        });
    });
});
});
