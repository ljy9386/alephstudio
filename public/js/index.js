// Reveal Animation on Scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Intersection Observer for better performance
function initRevealAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 한 번만 실행되도록 관찰 중단
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 모든 reveal 요소 관찰
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    reveals.forEach(element => {
        observer.observe(element);
    });
}

// 플로팅 버튼 항상 표시
function handleFloatingButton() {
    const floatingBtn = document.querySelector('.portfolio-floating-btn') || document.getElementById('portfolio-floating-btn');
    if (!floatingBtn) {
        console.log('Portfolio floating button not found');
        return;
    }

    // 항상 버튼 표시
    floatingBtn.style.setProperty('opacity', '1', 'important');
    floatingBtn.style.setProperty('visibility', 'visible', 'important');
    floatingBtn.style.setProperty('transform', 'translateY(0px)', 'important');
    floatingBtn.style.setProperty('pointer-events', 'auto', 'important');
    floatingBtn.style.setProperty('position', 'fixed', 'important');
    floatingBtn.style.setProperty('bottom', '40px', 'important');
    floatingBtn.style.setProperty('right', '40px', 'important');
    floatingBtn.style.setProperty('z-index', '99999', 'important');
}

// 스크롤 제어 함수들
let isScrollDisabled = false;
let isMouseOverAnimation = false;

function disableScroll() {
    if (!isScrollDisabled) {
        isScrollDisabled = true;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('no-scroll');
    }
}

function enableScroll() {
    if (isScrollDisabled) {
        isScrollDisabled = false;
        document.body.style.overflow = '';
        document.body.classList.remove('no-scroll');
    }
}

function handleAnimationAreaScroll() {
    const animationArea = document.querySelector('.hero-right');
    const threeContainer = document.querySelector('.three-container');
    
    if (!animationArea || !threeContainer) return;

    // 애니메이션 영역에서는 스크롤을 완전히 비활성화하지 않음
    // 대신 Three.js의 줌 기능만 비활성화
}

// Loading Animation Functions
function initLoadingAnimation() {
    const letters = document.querySelectorAll('.welcome-text .letter');
    const loadingSpinner = document.getElementById('loading-spinner');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    let currentLetterIndex = 0;
    
    // 글자 하나씩 타이핑 애니메이션
    function animateNextLetter() {
        if (currentLetterIndex < letters.length) {
            const letter = letters[currentLetterIndex];
            letter.classList.add('animate');
            
            // 다음 글자 애니메이션 (50ms 간격 = 0.05초)
            setTimeout(() => {
                currentLetterIndex++;
                animateNextLetter();
            }, 50);
        } else {
            // 모든 글자 타이핑 완료 후 로딩 스피너 표시
            setTimeout(() => {
                showLoadingSpinner();
            }, 500);
        }
    }
    
    // 로딩 스피너 표시
    function showLoadingSpinner() {
        loadingSpinner.classList.add('show');
        
        // 1초 후 메인 페이지 표시
        setTimeout(() => {
            revealMainContent();
        }, 1000);
    }
    
    // 메인 콘텐츠 리빌 애니메이션
    function revealMainContent() {
        // 로딩 화면 페이드아웃
        loadingScreen.classList.add('fade-out');
        
        // 메인 콘텐츠 리빌
        setTimeout(() => {
            mainContent.classList.add('reveal');
            
            // VIEW PORTFOLIO 버튼 표시 (로딩 완료)
            setTimeout(() => {
                document.body.classList.remove('loading-screen-active');
                showPortfolioButton();
            }, 400); // 페이드아웃 시작 후 400ms 지연
            
            // 로딩 화면 완전 제거
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 200);
    }
    
    // 애니메이션 시작 (페이지 로드 후 300ms 지연)
    setTimeout(() => {
        animateNextLetter(); // 바로 타이핑 시작
    }, 300);
}

// VIEW PORTFOLIO 버튼 표시 함수
function showPortfolioButton() {
    const portfolioBtn = document.getElementById('portfolio-floating-btn');
    if (portfolioBtn) {
        // 클래스 제거
        portfolioBtn.classList.remove('loading-hidden');
        
        // 인라인 스타일로 직접 제어 (CSS !important 우회)
        portfolioBtn.style.display = 'block';
        portfolioBtn.style.opacity = '0'; // 먼저 투명하게
        portfolioBtn.style.visibility = 'visible';
        portfolioBtn.style.transform = 'translateY(30px)';
        portfolioBtn.style.pointerEvents = 'auto';
        portfolioBtn.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 약간의 지연 후 애니메이션 시작
        setTimeout(() => {
            portfolioBtn.style.opacity = '1';
            portfolioBtn.style.transform = 'translateY(0px)';
        }, 100);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // VIEW PORTFOLIO 버튼 초기 숨김 처리 (강제)
    const portfolioBtn = document.getElementById('portfolio-floating-btn');
    if (portfolioBtn) {
        portfolioBtn.style.opacity = '0';
        portfolioBtn.style.visibility = 'hidden';
        portfolioBtn.style.transform = 'translateY(30px)';
        portfolioBtn.style.pointerEvents = 'none';
        portfolioBtn.style.display = 'none';
        portfolioBtn.classList.add('loading-hidden');
    }
    
    // 로딩 애니메이션 초기화
    initLoadingAnimation();
    // 환경 플래그: 모바일 및 모션 축소 선호 여부
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 스크롤 제어 초기화
    handleAnimationAreaScroll();
    
    // 기본적으로 스크롤 활성화
    enableScroll();

    // Intersection Observer 사용 (더 나은 성능)
    if ('IntersectionObserver' in window) {
        initRevealAnimation();
    } else {
        // 폴백: 스크롤 이벤트 사용
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // 초기 실행
    }

    // 플로팅 버튼 초기 상태 설정 (항상 표시)
    const floatingBtn = document.querySelector('.portfolio-floating-btn');
    if (floatingBtn) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.visibility = 'visible';
        floatingBtn.style.transform = 'translateY(0px)';
        floatingBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // 스크롤 이벤트에 플로팅 버튼 효과 추가 (여러 방법으로 확실하게)
    const scrollHandler = function() {
        requestAnimationFrame(handleFloatingButton);
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    document.addEventListener('scroll', scrollHandler, { passive: true });
    document.body.addEventListener('scroll', scrollHandler, { passive: true });
    
    // 초기 실행 (여러 번 시도)
    setTimeout(handleFloatingButton, 100);
    setTimeout(handleFloatingButton, 500);
    setTimeout(handleFloatingButton, 1000);
    
    // 추가 확인을 위한 이벤트들
    window.addEventListener('resize', handleFloatingButton);
    window.addEventListener('load', handleFloatingButton);
    
    // 강제로 버튼이 항상 보이도록 테스트
    console.log('Setting up floating button...');
    const testBtn = document.querySelector('.portfolio-floating-btn') || document.getElementById('portfolio-floating-btn');
    if (testBtn) {
        console.log('Button found, setting up...');
        testBtn.style.setProperty('position', 'fixed', 'important');
        testBtn.style.setProperty('bottom', '40px', 'important');
        testBtn.style.setProperty('right', '40px', 'important');
        testBtn.style.setProperty('z-index', '99999', 'important');
    }

    // Three.js 3D 텍스트 애니메이션 (안정적인 CDN 방식)
    function initThreeJS() {
        const container = document.getElementById('three-container');
        if (!container) {
            console.log('Container not found');
            return;
        }

        if (typeof THREE === 'undefined') {
            console.log('Three.js not loaded');
            return;
        }

        console.log('Starting Three.js 3D text animation');

        let camera, scene, renderer, mouse = { x: 0, y: 0 };
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let isMainHovered = false;
        let mainBasePosition = { x: 0, y: 0, z: 5 };

        function init() {
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 0, 5);
            
            // 카메라 위치 고정 (줌 비활성화)
            const originalCameraZ = camera.position.z;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xfafafa);

            // 조명 설정 (미니멀하고 부드러운 조명)
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);

            // ALEPHSTUDIO 포트폴리오에 맞는 3D 애니메이션 생성
            createPortfolioAnimation();

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setClearColor(0xfafafa, 1);
            // 모바일에서는 픽셀 비율을 낮춰 성능 최적화
            const maxPixelRatio = isMobile ? 1.25 : Math.min(2, window.devicePixelRatio);
            renderer.setPixelRatio(maxPixelRatio);
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            console.log('Portfolio 3D animation rendered successfully');

            // 마우스 이벤트
            container.addEventListener('mousemove', onMouseMove);
            container.addEventListener('mousedown', onMouseDown);
            container.addEventListener('mouseup', onMouseUp);
            container.addEventListener('mouseenter', onMainMouseEnter);
            container.addEventListener('mouseleave', onMainMouseLeave);
            container.addEventListener('wheel', onWheel);
            window.addEventListener('resize', onWindowResize);

            // 애니메이션 시작
            animate();
        }

        function onMouseMove(event) {
            // 마우스 위치를 정확하게 계산 (X축만 반전, Y축 정상)
            mouse.x = -((event.clientX / container.clientWidth) * 2 - 1);
            mouse.y = ((event.clientY / container.clientHeight) * 2 - 1);
        }

        function onMainMouseEnter() {
            isMainHovered = true;
        }

        function onMainMouseLeave() {
            isMainHovered = false;
            mouse.x = 0;
            mouse.y = 0;
        }

        function onMouseDown(event) {
            // 드래그 기능 비활성화
        }

        function onMouseUp(event) {
            // 드래그 기능 비활성화
        }

        function onWheel(event) {
            // 애니메이션 영역에서는 줌만 비활성화, 스크롤은 허용
            // preventDefault()를 호출하지 않아서 스크롤이 정상 작동
            // 줌 기능은 비활성화됨 (카메라 z축 위치가 고정되어 있음)
        }

        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        function animate() {
            // 접근성 설정: 모션 축소 선호 시 1프레임만 렌더링
            if (prefersReducedMotion) {
                renderer.render(scene, camera);
                return;
            }
            requestAnimationFrame(animate);

            // 마우스 위치에 따른 부드러운 카메라 이동 (x, y축만) - 호버 시에만 적용
            if (isMainHovered) {
                const mouseInfluence = 0.5; // 마우스 움직임 크게 증가
                const targetX = mouse.x * mouseInfluence; // 정상 방향
                const targetY = mouse.y * mouseInfluence; // 정상 방향

                // 부드러운 보간을 위한 easing
                const easing = 0.1; // 반응성 증가
                camera.position.x += (targetX - camera.position.x) * easing;
                camera.position.y += (targetY - camera.position.y) * easing;
            } else {
                // 호버 해제 시 중앙으로 부드럽게 복귀
                camera.position.x += (mainBasePosition.x - camera.position.x) * 0.05;
                camera.position.y += (mainBasePosition.y - camera.position.y) * 0.05;
            }
            
            // z축 위치 고정 (줌 비활성화)
            camera.position.z = 5;

            // ALEPHSTUDIO 텍스트 오브젝트들이 마우스에 반응하도록 회전
            if (window.portfolioGroup && window.portfolioGroup.children) {
                window.portfolioGroup.children.forEach((child, index) => {
                    if (child.rotation && child.userData && child.userData.letter) {
                        const userData = child.userData;
                        const currentTime = Date.now();
                        
                        // 하늘에서 떨어지는 애니메이션 시작
                        if (!userData.hasStarted && currentTime > userData.animationDelay) {
                            userData.hasStarted = true;
                            userData.isAnimating = true;
                            userData.startTime = currentTime;
                            console.log(`Letter ${userData.letter} animation started`);
                        }
                        
                        if (userData.isAnimating && userData.hasStarted) {
                            const elapsed = currentTime - userData.startTime;
                            const progress = Math.min(elapsed / userData.animationDuration, 1);
                            
                            // 간단한 easing 함수 (easeOutCubic)
                            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
                            const easedProgress = easeOutCubic(progress);
                            
                            // 위치 보간 (하늘에서 목표 위치로)
                            child.position.lerpVectors(userData.startPosition, userData.targetPosition, easedProgress);
                            
                            // 떨어지는 동안 회전 효과
                            if (progress < 1) {
                                child.rotation.x += 0.02;
                                child.rotation.z += 0.01;
                            }
                            
                            // 애니메이션 완료 후 마우스 반응 활성화
                            if (progress >= 1) {
                                userData.isAnimating = false;
                                userData.animationProgress = 1;
                                
                                // 최종 위치로 정확히 설정
                                child.position.copy(userData.targetPosition);
                                console.log(`Letter ${userData.letter} animation completed`);
                            }
                        }
                        
                        // 애니메이션 완료 후 마우스 반응 효과
                        if (!userData.isAnimating && userData.animationProgress >= 1) {
                            if (isMainHovered) {
                                // 마우스 반응 효과 - 정상 방향
                                const rotationSpeed = 0.06 + (index * 0.003); // 회전 속도 크게 증가
                                child.rotation.x += mouse.y * rotationSpeed; // 상하 마우스 움직임에 x축 회전 (정상)
                                child.rotation.y += mouse.x * rotationSpeed; // 좌우 마우스 움직임에 y축 회전 (정상)
                                
                                // 마우스 위치에 따른 추가 위치 변화 - 정상 방향
                                const mouseInfluence = 0.3; // 위치 변화 영향력 크게 증가
                                const targetX = userData.originalPosition.x + mouse.x * mouseInfluence; // 정상 방향
                                const targetZ = userData.originalPosition.z + mouse.y * mouseInfluence; // 정상 방향
                                
                                child.position.x += (targetX - child.position.x) * 0.035; // 보간 속도 증가
                                child.position.z += (targetZ - child.position.z) * 0.035; // 보간 속도 증가
                            } else {
                                // 호버 해제 시 원래 위치로 복귀
                                child.position.x += (userData.originalPosition.x - child.position.x) * 0.05;
                                child.position.z += (userData.originalPosition.z - child.position.z) * 0.05;
                            }
                            
                            // 부드러운 떠다니는 효과 (항상 유지)
                            child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
                        }
                    }
                });
            }

            renderer.render(scene, camera);
        }

        // ALEPHSTUDIO 포트폴리오 3D 애니메이션 생성
        function createPortfolioAnimation() {
            const group = new THREE.Group();
            
            // 1. ALEPHSTUDIO 3D 텍스트 생성
            createALEPHSTUDIOText(group);
            
            // 2. 부드러운 파티클 시스템 (창의적 요소)
            createParticleSystem(group);
            
            scene.add(group);
            
            // 전역 변수로 그룹 참조 저장
            window.portfolioGroup = group;
        }

        function createALEPHSTUDIOText(group) {
            // ALEPHSTUDIO 3D 텍스트 생성 (Canvas 2D 텍스트 사용)
            const text = "ALEPHSTUDIO";
            const letters = text.split('');
            
            letters.forEach((letter, index) => {
                // Canvas를 사용한 2D 텍스트 렌더링
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 128;
                canvas.height = 128;
                
                // 텍스트 스타일 설정
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 80px Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // 텍스트 그리기
                ctx.fillText(letter, canvas.width/2, canvas.height/2);
                
                // Canvas를 텍스처로 변환
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                
                // 3D 평면에 텍스처 적용
                const geometry = new THREE.PlaneGeometry(0.3, 0.3);
                const material = new THREE.MeshPhongMaterial({ 
                    map: texture,
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.DoubleSide
                });
                const letterMesh = new THREE.Mesh(geometry, material);
                
                // 최종 위치 (하늘에서 떨어질 목표 위치)
                const finalX = (index - letters.length / 2) * 0.35;
                const finalY = Math.sin(index * 0.5) * 0.1;
                const finalZ = Math.cos(index * 0.3) * 0.1;
                
                // 시작 위치 (하늘 위에서 시작) - 더 높게
                const startY = finalY + 10; // 하늘에서 10만큼 위에서 시작
                const startX = finalX + (Math.random() - 0.5) * 3; // 좌우로 더 흩어져서 시작
                const startZ = finalZ + (Math.random() - 0.5) * 3;
                
                // 초기 위치 설정 (하늘에서 시작)
                letterMesh.position.set(startX, startY, startZ);
                
                // 각 글자마다 다른 회전
                letterMesh.rotation.set(
                    index * 0.1,
                    index * 0.15,
                    index * 0.05
                );
                
                // 마우스 반응을 위한 사용자 정의 속성
                letterMesh.userData = {
                    originalPosition: new THREE.Vector3(finalX, finalY, finalZ),
                    originalRotation: letterMesh.rotation.clone(),
                    index: index,
                    letter: letter,
                    // 애니메이션 속성
                    startPosition: new THREE.Vector3(startX, startY, startZ),
                    targetPosition: new THREE.Vector3(finalX, finalY, finalZ),
                    animationProgress: 0,
                    animationDelay: index * 200, // 각 글자마다 200ms씩 지연
                    animationDuration: 1500, // 1.5초 동안 애니메이션
                    isAnimating: false,
                    startTime: 0,
                    hasStarted: false
                };
                
                group.add(letterMesh);
            });
        }

        function createParticleSystem(group) {
            // 마우스 반응형 파티클 시스템
            const particleCount = isMobile ? 40 : 80;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                
                // 위치
                positions[i3] = (Math.random() - 0.5) * 6;
                positions[i3 + 1] = (Math.random() - 0.5) * 6;
                positions[i3 + 2] = (Math.random() - 0.5) * 3;
                
                // 속도 (마우스 반응용)
                velocities[i3] = (Math.random() - 0.5) * 0.02;
                velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
                velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
                
                // 색상 (그라데이션)
                const intensity = Math.random() * 0.3 + 0.1;
                colors[i3] = intensity;
                colors[i3 + 1] = intensity;
                colors[i3 + 2] = intensity;
            }
            
            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.015,
                vertexColors: true,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });
            
            const particleSystem = new THREE.Points(particles, material);
            particleSystem.userData = {
                originalPositions: positions.slice(),
                velocities: velocities.slice()
            };
            group.add(particleSystem);
        }


        // 초기화
        init();
    }

    // Three.js 로드 확인 후 실행
    if (typeof THREE !== 'undefined') {
        console.log('Three.js is available, initializing...');
        initThreeJS();
        initAboutShader();
    } else {
        console.log('Three.js not available, waiting...');
        const checkThree = setInterval(() => {
            if (typeof THREE !== 'undefined') {
                clearInterval(checkThree);
                console.log('Three.js loaded, initializing...');
                initThreeJS();
                initAboutShader();
            }
        }, 100);
    }

    // About 섹션 3D 아트 애니메이션 초기화
    function initAboutShader() {
        console.log('initAboutShader called');
        
        const container = document.getElementById('about-shader-container');
        if (!container) {
            console.error('About shader container not found');
            return;
        }

        console.log('Container found:', container);

        if (typeof THREE === 'undefined') {
            console.error('Three.js not available for about shader');
            return;
        }

        console.log('Starting About section 3D art animation');

        let aboutCamera, aboutScene, aboutRenderer, aboutMouse = { x: 0, y: 0 };
        let animationObjects = [];
        let animationTime = 0;
        let isAboutHovered = false;
        let aboutBasePosition = { x: 0, y: 0, z: 8 };

        function initAbout() {
            aboutCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            aboutCamera.position.set(0, 0, 8);

            aboutScene = new THREE.Scene();
            aboutScene.background = new THREE.Color(0xfafafa);

            // 조명 설정
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            aboutScene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            aboutScene.add(directionalLight);

            const pointLight1 = new THREE.PointLight(0xff6b6b, 1, 100);
            pointLight1.position.set(-5, 5, 5);
            aboutScene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 100);
            pointLight2.position.set(5, -5, 5);
            aboutScene.add(pointLight2);

            aboutRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            aboutRenderer.setClearColor(0xfafafa, 1);
            const maxPixelRatio = isMobile ? 1.25 : Math.min(2, window.devicePixelRatio);
            aboutRenderer.setPixelRatio(maxPixelRatio);
            aboutRenderer.setSize(container.clientWidth, container.clientHeight);
            aboutRenderer.shadowMap.enabled = true;
            aboutRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(aboutRenderer.domElement);

            console.log('About 3D animation rendered successfully');
            console.log('Container size:', container.clientWidth, container.clientHeight);
            console.log('Scene children count:', aboutScene.children.length);

            // 마우스 이벤트
            container.addEventListener('mousemove', onAboutMouseMove);
            container.addEventListener('mouseenter', onAboutMouseEnter);
            container.addEventListener('mouseleave', onAboutMouseLeave);
            window.addEventListener('resize', onAboutWindowResize);

            // 복잡한 3D 기하학적 구조 생성
            createComplexGeometry();

            // 애니메이션 시작
            animateAbout();
        }

        function createComplexGeometry() {
            // 1. 메인 토러스 구조
            const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
            const torusMaterial = new THREE.MeshPhongMaterial({
                color: 0xff6b6b,
                transparent: true,
                opacity: 0.8,
                wireframe: false
            });
            const torus = new THREE.Mesh(torusGeometry, torusMaterial);
            torus.position.set(0, 0, 0);
            torus.castShadow = true;
            torus.receiveShadow = true;
            aboutScene.add(torus);
            animationObjects.push({ mesh: torus, type: 'torus', speed: 0.01 });

            // 2. 회전하는 작은 구들
            for (let i = 0; i < (isMobile ? 4 : 8); i++) {
                const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
                const sphereMaterial = new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHSL(i / 8, 0.8, 0.6),
                    transparent: true,
                    opacity: 0.9
                });
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                
                const angle = (i / 8) * Math.PI * 2;
                sphere.position.set(
                    Math.cos(angle) * 2.5,
                    Math.sin(angle) * 2.5,
                    Math.sin(animationTime + i) * 0.5
                );
                sphere.castShadow = true;
                aboutScene.add(sphere);
                animationObjects.push({ 
                    mesh: sphere, 
                    type: 'sphere', 
                    speed: 0.02 + i * 0.005,
                    radius: 2.5,
                    angle: angle
                });
            }

            // 3. 복잡한 육면체 구조
            for (let i = 0; i < (isMobile ? 6 : 12); i++) {
                const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
                const boxMaterial = new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHSL(0.1 + i * 0.05, 0.7, 0.5),
                    transparent: true,
                    opacity: 0.7
                });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                
                const angle = (i / 12) * Math.PI * 2;
                const radius = 3 + Math.sin(i) * 0.5;
                box.position.set(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    Math.cos(animationTime + i * 0.5) * 1
                );
                box.rotation.set(
                    animationTime + i * 0.1,
                    animationTime * 0.5 + i * 0.2,
                    animationTime * 0.3 + i * 0.15
                );
                box.castShadow = true;
                aboutScene.add(box);
                animationObjects.push({ 
                    mesh: box, 
                    type: 'box', 
                    speed: 0.015 + i * 0.003,
                    radius: radius,
                    angle: angle
                });
            }

            // 4. 복잡한 나선 구조
            const helixGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
            const helixMaterial = new THREE.MeshPhongMaterial({
                color: 0x4ecdc4,
                transparent: true,
                opacity: 0.6
            });
            
            for (let i = 0; i < (isMobile ? 10 : 20); i++) {
                const helix = new THREE.Mesh(helixGeometry, helixMaterial);
                helix.position.set(
                    Math.cos(i * 0.3) * 1.5,
                    (i - 10) * 0.2,
                    Math.sin(i * 0.3) * 1.5
                );
                helix.rotation.z = i * 0.3;
                helix.castShadow = true;
                aboutScene.add(helix);
                animationObjects.push({ 
                    mesh: helix, 
                    type: 'helix', 
                    speed: 0.008 + i * 0.001,
                    index: i
                });
            }

            // 5. 파티클 시스템
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = isMobile ? 100 : 200;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 10;
                positions[i3 + 1] = (Math.random() - 0.5) * 10;
                positions[i3 + 2] = (Math.random() - 0.5) * 10;

                const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particleMaterial = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            const particles = new THREE.Points(particleGeometry, particleMaterial);
            aboutScene.add(particles);
            animationObjects.push({ 
                mesh: particles, 
                type: 'particles', 
                speed: 0.005
            });
        }

        function onAboutMouseMove(event) {
            const rect = container.getBoundingClientRect();
            // X축만 반전, Y축 정상
            aboutMouse.x = -(((event.clientX - rect.left) / rect.width) * 2 - 1);
            aboutMouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        }

        function onAboutMouseEnter() {
            isAboutHovered = true;
        }

        function onAboutMouseLeave() {
            isAboutHovered = false;
            aboutMouse.x = 0;
            aboutMouse.y = 0;
        }

        function onAboutWindowResize() {
            aboutCamera.aspect = container.clientWidth / container.clientHeight;
            aboutCamera.updateProjectionMatrix();
            aboutRenderer.setSize(container.clientWidth, container.clientHeight);
        }

        function animateAbout() {
            requestAnimationFrame(animateAbout);
            animationTime += 0.016;

            // 카메라 애니메이션
            aboutCamera.position.x = Math.sin(animationTime * 0.1) * 2;
            aboutCamera.position.y = Math.cos(animationTime * 0.1) * 2;
            aboutCamera.position.z = 8 + Math.sin(animationTime * 0.05) * 2;
            aboutCamera.lookAt(0, 0, 0);

            // 마우스 반응 - 호버 시에만 적용 (방향 정상화)
            if (isAboutHovered) {
                aboutCamera.position.x += aboutMouse.x * 2;
                aboutCamera.position.y += aboutMouse.y * 2;
            } else {
                // 호버 해제 시 중앙으로 부드럽게 복귀
                aboutCamera.position.x += (aboutBasePosition.x - aboutCamera.position.x) * 0.05;
                aboutCamera.position.y += (aboutBasePosition.y - aboutCamera.position.y) * 0.05;
            }

            // 각 객체별 애니메이션
            animationObjects.forEach(obj => {
                const mesh = obj.mesh;
                
                switch(obj.type) {
                    case 'torus':
                        mesh.rotation.x += obj.speed;
                        mesh.rotation.y += obj.speed * 0.5;
                        mesh.scale.setScalar(1 + Math.sin(animationTime * 2) * 0.1);
                        break;
                        
                    case 'sphere':
                        const newAngle = obj.angle + animationTime * obj.speed;
                        mesh.position.x = Math.cos(newAngle) * obj.radius;
                        mesh.position.y = Math.sin(newAngle) * obj.radius;
                        mesh.position.z = Math.sin(animationTime + obj.angle) * 0.5;
                        mesh.rotation.x += obj.speed;
                        mesh.rotation.y += obj.speed * 0.7;
                        break;
                        
                    case 'box':
                        const boxAngle = obj.angle + animationTime * obj.speed;
                        mesh.position.x = Math.cos(boxAngle) * obj.radius;
                        mesh.position.y = Math.sin(boxAngle) * obj.radius;
                        mesh.position.z = Math.cos(animationTime + obj.angle) * 1;
                        mesh.rotation.x += obj.speed;
                        mesh.rotation.y += obj.speed * 0.5;
                        mesh.rotation.z += obj.speed * 0.3;
                        break;
                        
                    case 'helix':
                        mesh.rotation.z += obj.speed;
                        mesh.position.y = Math.sin(animationTime + obj.index * 0.5) * 0.5;
                        break;
                        
                    case 'particles':
                        const positions = mesh.geometry.attributes.position.array;
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i + 1] += Math.sin(animationTime + i * 0.01) * 0.01;
                            positions[i + 2] += Math.cos(animationTime + i * 0.01) * 0.01;
                        }
                        mesh.geometry.attributes.position.needsUpdate = true;
                        mesh.rotation.y += obj.speed;
                        break;
                }
            });

            if (aboutRenderer && aboutScene && aboutCamera) {
                aboutRenderer.render(aboutScene, aboutCamera);
            } else {
                console.error('Renderer, scene, or camera not initialized');
            }
        }

        // 초기화
        initAbout();
    }

    // Works 섹션 3D 아트 애니메이션 초기화
    function initWorksAnimation() {
        console.log('initWorksAnimation called');
        
        const container = document.getElementById('works-3d-container');
        if (!container) {
            console.error('Works 3D container not found');
            return;
        }

        console.log('Works container found:', container);

        if (typeof THREE === 'undefined') {
            console.error('Three.js not available for works animation');
            return;
        }

        console.log('Starting Works section 3D animation');

        let worksCamera, worksScene, worksRenderer, worksMouse = { x: 0, y: 0 };
        let worksAnimationObjects = [];
        let worksAnimationTime = 0;
        let isWorksHovered = false;
        let worksBasePosition = { x: 0, y: 0, z: 10 };

        function initWorks() {
            // 카메라 설정
            worksCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            worksCamera.position.set(0, 0, 10);

            // 씬 생성
            worksScene = new THREE.Scene();
            worksScene.background = new THREE.Color(0xfafafa);

            // 조명 설정 - 더 세련된 조명
            const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
            worksScene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 10, 5);
            directionalLight.castShadow = true;
            worksScene.add(directionalLight);

            // 포인트 라이트들 - 개발자의 창의성을 표현
            const pointLight1 = new THREE.PointLight(0x00ff88, 0.8, 50);
            pointLight1.position.set(-8, 5, 8);
            worksScene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0xff3366, 0.8, 50);
            pointLight2.position.set(8, -5, 8);
            worksScene.add(pointLight2);

            const pointLight3 = new THREE.PointLight(0x3366ff, 0.6, 40);
            pointLight3.position.set(0, 8, -5);
            worksScene.add(pointLight3);

            // 렌더러 설정
            worksRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            worksRenderer.setClearColor(0xfafafa, 1);
            const maxPixelRatio = isMobile ? 1.25 : Math.min(2, window.devicePixelRatio);
            worksRenderer.setPixelRatio(maxPixelRatio);
            worksRenderer.setSize(container.clientWidth, container.clientHeight);
            worksRenderer.shadowMap.enabled = true;
            worksRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
            container.appendChild(worksRenderer.domElement);

            console.log('Works 3D animation rendered successfully');
            console.log('Container size:', container.clientWidth, container.clientHeight);

            // 이벤트 리스너
            container.addEventListener('mousemove', onWorksMouseMove);
            container.addEventListener('mouseenter', onWorksMouseEnter);
            container.addEventListener('mouseleave', onWorksMouseLeave);
            window.addEventListener('resize', onWorksWindowResize);

            // 복잡한 3D 기하학적 구조 생성 - 개발자의 정체성 표현
            createDeveloperGeometry();

            // 애니메이션 시작
            animateWorks();
        }

        function createDeveloperGeometry() {
            // 1. 중앙 코드 스피어 - 개발자의 핵심
            const codeGeometry = new THREE.IcosahedronGeometry(1.2, 2);
            const codeMaterial = new THREE.MeshPhongMaterial({
                color: 0x333333,
                wireframe: true,
                transparent: true,
                opacity: 0.8
            });
            const codeSphere = new THREE.Mesh(codeGeometry, codeMaterial);
            codeSphere.position.set(0, 0, 0);
            codeSphere.castShadow = true;
            worksScene.add(codeSphere);
            worksAnimationObjects.push({ 
                mesh: codeSphere, 
                type: 'core', 
                speed: 0.005 
            });

            // 2. 데이터 노드들 - 기술 스택을 표현
            const techStack = [
                { color: 0xe34f26, name: 'HTML' },    // HTML 오렌지
                { color: 0x1572b6, name: 'CSS' },     // CSS 블루
                { color: 0xf7df1e, name: 'JS' },      // JavaScript 옐로우
                { color: 0x61dafb, name: 'React' },   // React 시안
                { color: 0x339933, name: 'Node' },    // Node.js 그린
                { color: 0x764abc, name: 'Redux' },   // Redux 퍼플
                { color: 0xff6b6b, name: 'Design' },  // 디자인 레드
                { color: 0x4ecdc4, name: 'UX' }       // UX 틸
            ];

            const limitedTech = isMobile ? techStack.slice(0, 5) : techStack;
            limitedTech.forEach((tech, i) => {
                const nodeGeometry = new THREE.OctahedronGeometry(0.3);
                const nodeMaterial = new THREE.MeshPhongMaterial({
                    color: tech.color,
                    transparent: true,
                    opacity: 0.9
                });
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                
                const angle = (i / techStack.length) * Math.PI * 2;
                const radius = 3;
                node.position.set(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    Math.sin(worksAnimationTime + i) * 0.5
                );
                node.castShadow = true;
                worksScene.add(node);
                worksAnimationObjects.push({ 
                    mesh: node, 
                    type: 'tech', 
                    speed: 0.02 + i * 0.003,
                    radius: radius,
                    angle: angle,
                    color: tech.color
                });
            });

            // 3. 연결 라인들 - 네트워크와 연결성
            const connections = [];
            for (let i = 0; i < (isMobile ? 10 : 20); i++) {
                const points = [];
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 4
                ));
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 4
                ));

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: 0x666666,
                    transparent: true,
                    opacity: 0.3
                });
                const line = new THREE.Line(geometry, material);
                worksScene.add(line);
                worksAnimationObjects.push({ 
                    mesh: line, 
                    type: 'connection', 
                    speed: 0.001 + i * 0.0005
                });
            }

            // 4. 창의적인 기하학 구조들
            for (let i = 0; i < (isMobile ? 8 : 15); i++) {
                const geometries = [
                    new THREE.TetrahedronGeometry(0.4),
                    new THREE.ConeGeometry(0.3, 0.8, 6),
                    new THREE.CylinderGeometry(0.2, 0.3, 0.6, 8)
                ];
                
                const geometry = geometries[i % 3];
                const material = new THREE.MeshPhongMaterial({
                    color: new THREE.Color().setHSL(i / 15, 0.8, 0.6),
                    transparent: true,
                    opacity: 0.7
                });
                const mesh = new THREE.Mesh(geometry, material);
                
                const angle = (i / 15) * Math.PI * 2;
                const radius = 4.5 + Math.sin(i) * 0.8;
                mesh.position.set(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    Math.cos(worksAnimationTime + i * 0.3) * 1.5
                );
                mesh.rotation.set(
                    worksAnimationTime + i * 0.1,
                    worksAnimationTime * 0.7 + i * 0.15,
                    worksAnimationTime * 0.5 + i * 0.2
                );
                mesh.castShadow = true;
                worksScene.add(mesh);
                worksAnimationObjects.push({ 
                    mesh: mesh, 
                    type: 'creative', 
                    speed: 0.012 + i * 0.002,
                    radius: radius,
                    angle: angle
                });
            }

            // 5. 플로팅 파티클 클라우드 - 아이디어와 영감
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = isMobile ? 150 : 300;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 0.5) * 15;
                positions[i3 + 1] = (Math.random() - 0.5) * 15;
                positions[i3 + 2] = (Math.random() - 0.5) * 10;

                const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.7);
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const particleMaterial = new THREE.PointsMaterial({
                size: 0.03,
                vertexColors: true,
                transparent: true,
                opacity: 0.6
            });

            const particles = new THREE.Points(particleGeometry, particleMaterial);
            worksScene.add(particles);
            worksAnimationObjects.push({ 
                mesh: particles, 
                type: 'particles', 
                speed: 0.003
            });
        }

        function onWorksMouseMove(event) {
            const rect = container.getBoundingClientRect();
            // X축만 반전, Y축 정상
            worksMouse.x = -(((event.clientX - rect.left) / rect.width) * 2 - 1);
            worksMouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        }

        function onWorksMouseEnter() {
            isWorksHovered = true;
        }

        function onWorksMouseLeave() {
            isWorksHovered = false;
            worksMouse.x = 0;
            worksMouse.y = 0;
        }

        function onWorksWindowResize() {
            worksCamera.aspect = container.clientWidth / container.clientHeight;
            worksCamera.updateProjectionMatrix();
            worksRenderer.setSize(container.clientWidth, container.clientHeight);
        }

        function animateWorks() {
            requestAnimationFrame(animateWorks);
            worksAnimationTime += 0.016;

            // 카메라 애니메이션 - 더 부드럽고 세련된 움직임
            worksCamera.position.x = Math.sin(worksAnimationTime * 0.05) * 3;
            worksCamera.position.y = Math.cos(worksAnimationTime * 0.08) * 2;
            worksCamera.position.z = 10 + Math.sin(worksAnimationTime * 0.03) * 1.5;
            worksCamera.lookAt(0, 0, 0);

            // 마우스 반응 - 호버 시에만 적용
            if (isWorksHovered) {
                worksCamera.position.x += worksMouse.x * 1.5;
                worksCamera.position.y += worksMouse.y * 1.5;
            } else {
                // 호버 해제 시 중앙으로 부드럽게 복귀
                worksCamera.position.x += (worksBasePosition.x - worksCamera.position.x) * 0.05;
                worksCamera.position.y += (worksBasePosition.y - worksCamera.position.y) * 0.05;
            }

            // 각 객체별 애니메이션
            worksAnimationObjects.forEach(obj => {
                const mesh = obj.mesh;
                
                switch(obj.type) {
                    case 'core':
                        mesh.rotation.x += obj.speed;
                        mesh.rotation.y += obj.speed * 0.7;
                        mesh.rotation.z += obj.speed * 0.5;
                        mesh.scale.setScalar(1 + Math.sin(worksAnimationTime * 1.5) * 0.05);
                        break;
                        
                    case 'tech':
                        const techAngle = obj.angle + worksAnimationTime * obj.speed;
                        mesh.position.x = Math.cos(techAngle) * obj.radius;
                        mesh.position.y = Math.sin(techAngle) * obj.radius;
                        mesh.position.z = Math.sin(worksAnimationTime * 2 + obj.angle) * 0.8;
                        mesh.rotation.x += obj.speed * 0.5;
                        mesh.rotation.y += obj.speed * 0.8;
                        mesh.rotation.z += obj.speed * 0.3;
                        break;
                        
                    case 'creative':
                        const creativeAngle = obj.angle + worksAnimationTime * obj.speed;
                        mesh.position.x = Math.cos(creativeAngle) * obj.radius;
                        mesh.position.y = Math.sin(creativeAngle) * obj.radius;
                        mesh.position.z = Math.cos(worksAnimationTime + obj.angle) * 1.5;
                        mesh.rotation.x += obj.speed;
                        mesh.rotation.y += obj.speed * 0.6;
                        mesh.rotation.z += obj.speed * 0.4;
                        break;
                        
                    case 'connection':
                        mesh.rotation.z += obj.speed;
                        mesh.material.opacity = 0.1 + Math.sin(worksAnimationTime * 3 + mesh.position.x) * 0.2;
                        break;
                        
                    case 'particles':
                        const positions = mesh.geometry.attributes.position.array;
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i] += Math.sin(worksAnimationTime + i * 0.01) * 0.005;
                            positions[i + 1] += Math.cos(worksAnimationTime + i * 0.01) * 0.005;
                            positions[i + 2] += Math.sin(worksAnimationTime * 0.5 + i * 0.02) * 0.003;
                        }
                        mesh.geometry.attributes.position.needsUpdate = true;
                        mesh.rotation.y += obj.speed;
                        break;
                }
            });

            if (worksRenderer && worksScene && worksCamera) {
                worksRenderer.render(worksScene, worksCamera);
            }
        }

        // 초기화
        initWorks();
    }

    // Works 애니메이션 초기화 호출
    if (document.getElementById('works-3d-container')) {
        setTimeout(() => {
            if (typeof THREE !== 'undefined') {
                initWorksAnimation();
            }
        }, 100);
    }

    // 3D 인터랙티브 카드 갤러리 초기화
    if (document.getElementById('carousel-3d-container')) {
        init3DCarousel();
    }
});

// 3D 회전 목마식 갤러리 시스템
function init3DCarousel() {
    const projectsData = [
        {
            title: "DESK Project Book",
            date: "August, 2014 / Touchable",
            type: "Book",
            role: "Author",
            image: "../img/1.png",
            link: "../../../Étoile Fashion Magazine/Étoile Fashion Magazine/frontend/html/index.html"
        },
        {
            title: "Étoile Fashion Magazine",
            date: "March, 2024 / Digital",
            type: "Web Design",
            role: "Designer & Developer",
            image: "../img/2.png",
            link: "../../../Étoile Fashion Magazine/Étoile Fashion Magazine/frontend/html/index.html"
        },
        {
            title: "Maylily Portfolio",
            date: "January, 2024 / Interactive",
            type: "Website",
            role: "Full Stack Developer",
            image: "../img/3.png",
            link: "https://maylily.kr/"
        },
        {
            title: "Creative Project",
            date: "December, 2023 / Concept",
            type: "Branding",
            role: "Creative Director",
            image: "../img/4.png",
            link: "#"
        }
    ];

    let currentIndex = 0;
    let isTransitioning = false;
    const totalCards = 4;

    const carousel = document.getElementById('carousel-3d');
    const cards = document.querySelectorAll('.carousel-card');
    const infoPanel = document.getElementById('project-info-panel');
    const container = document.getElementById('carousel-3d-container');

    // 초기 설정
    updateCarousel();
    showProjectInfo();

    // 스크롤 이벤트 제거 - 클릭으로만 변경

    // 카드 클릭 이벤트
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (isTransitioning) return;
            
            const cardIndex = parseInt(card.dataset.index);
            const diff = cardIndex - currentIndex;
            
            if (diff !== 0) {
                rotateCarousel(diff);
            } else {
                // 현재 카드 클릭 시 프로젝트 실행
                const project = projectsData[currentIndex];
                if (project.link !== '#') {
                    window.open(project.link, '_blank');
                }
            }
        });
    });

    // 회전 목마 회전 함수
    function rotateCarousel(direction) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex = (currentIndex + direction + totalCards) % totalCards;
        
        updateCarousel();
        updateProjectInfo();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // 캐러셀 업데이트
    function updateCarousel() {
        const rotationY = currentIndex * -90; // 90도씩 회전
        carousel.style.transform = `rotateY(${rotationY}deg)`;
        
        // 포커스된 카드 표시
        cards.forEach((card, index) => {
            const cardIndex = parseInt(card.dataset.index);
            if (cardIndex === currentIndex) {
                card.classList.add('focused');
            } else {
                card.classList.remove('focused');
            }
        });
    }

    // 프로젝트 정보 업데이트
    function updateProjectInfo() {
        const project = projectsData[currentIndex];
        
        document.getElementById('info-title').textContent = project.title;
        document.getElementById('info-meta').textContent = project.date;
        document.getElementById('info-type').textContent = project.type;
        document.getElementById('info-role').textContent = project.role;
        
        // 런치 버튼 링크 설정
        const launchBtn = document.getElementById('launch-btn');
        launchBtn.onclick = () => {
            if (project.link !== '#') {
                window.open(project.link, '_blank');
            }
        };
    }

    // 프로젝트 정보 패널 표시
    function showProjectInfo() {
        setTimeout(() => {
            infoPanel.classList.add('show');
            updateProjectInfo();
        }, 800);
    }

    // 키보드 네비게이션 제거 - 클릭으로만 변경
}

// 부드러운 스크롤 (선택사항)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form은 index.html에서 직접 처리됨 (MongoDB 연동)

// Music Widget Control System
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const musicWidget = document.getElementById('music-widget');
    const musicIcon = document.getElementById('music-icon');
    const musicToggle = document.getElementById('music-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const toggleText = musicToggle.querySelector('.toggle-text');
    
    let isPlaying = false;
    let userInteracted = false;
    let hoverTimeout = null;
    let isManuallyOpened = false;
    let autoplayAttempted = false;
    
    // 초기 설정 - 강제 자동 재생
    if (audio) {
        audio.volume = 0.75; // 75% 볼륨으로 시작
        audio.muted = false;
        
        // 볼륨 슬라이더 초기값도 75로 설정
        if (volumeSlider) {
            volumeSlider.value = 75;
            volumeValue.textContent = '75';
        }
        
        // 즉시 강제 자동 재생 시도 (HTML autoplay 보조)
        forceAutoplay();
        
        // 오디오 로드 완료 시 추가 재생 시도
        audio.addEventListener('loadeddata', function() {
            console.log('Background music loaded successfully');
            forceAutoplay();
        });
        
        // 메타데이터 로드 완료 시에도 재생 시도
        audio.addEventListener('canplaythrough', function() {
            forceAutoplay();
        });
        
        // 오디오 로드 실패 시 (알림 제거)
        audio.addEventListener('error', function(e) {
            console.log('Background music failed to load:', e);
            // 알림 문구 완전 제거
        });
    }
    
    // 강제 자동 재생 함수 (브라우저 정책 우회 시도)
    function forceAutoplay() {
        if (!audio) return;
        
        console.log('Force autoplay attempt...');
        
        // 여러 방법으로 강제 재생 시도
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Force autoplay successful');
                isPlaying = true;
                updateUIState();
                // 모든 알림 문구 제거 - 깔끔한 자동 재생
            }).catch(error => {
                console.log('Force autoplay blocked, trying alternative methods...');
                
                // 대안 방법 1: 짧은 지연 후 재시도
                setTimeout(() => {
                    audio.play().catch(() => {
                        console.log('All autoplay methods failed - user interaction required');
                        isPlaying = false;
                        updateUIState();
                        // 실패 시에도 알림 문구 표시하지 않음
                    });
                }, 100);
            });
        }
    }
    
    // UI 상태 업데이트 함수
    function updateUIState() {
        if (isPlaying) {
            toggleText.textContent = 'PAUSE';
            musicToggle.classList.add('playing');
            // 재생 중이어도 기본적으로 컨트롤 패널은 숨김 상태 유지
        } else {
            toggleText.textContent = 'PLAY';
            musicToggle.classList.remove('playing');
        }
        
        // 수동으로 열린 상태가 아니면 항상 숨김
        if (!isManuallyOpened) {
            musicWidget.classList.remove('active', 'manually-opened');
        }
    }
    
    // 모든 알림 툴팁 함수 제거 - 미니멀 디자인 유지
    
    // 음악 아이콘 클릭 이벤트 (패널 토글)
    if (musicIcon) {
        musicIcon.addEventListener('click', function() {
            userInteracted = true;
            
            // 수동으로 열린 상태 토글
            if (!isManuallyOpened) {
                isManuallyOpened = true;
                musicWidget.classList.add('manually-opened');
                clearTimeout(hoverTimeout);
            } else {
                // 이미 열린 상태에서 클릭하면 음악 토글
                toggleMusic();
            }
        });
    }
    
    // 재생/정지 버튼 클릭 이벤트
    if (musicToggle) {
        musicToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // 이벤트 버블링 방지
            userInteracted = true;
            toggleMusic();
        });
    }
    
    // 볼륨 슬라이더 이벤트
    if (volumeSlider && volumeValue) {
        volumeSlider.addEventListener('input', function(e) {
            e.stopPropagation(); // 이벤트 버블링 방지
            const volume = this.value / 100;
            if (audio) {
                audio.volume = volume;
            }
            volumeValue.textContent = this.value;
            
            // 볼륨 조절 시 패널 열린 상태 유지
            isManuallyOpened = true;
            clearTimeout(hoverTimeout);
        });
        
        // 볼륨 슬라이더 클릭 시 패널 닫힘 방지
        volumeSlider.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 음악 재생/정지 토글 함수
    function toggleMusic() {
        if (!audio) return;
        
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            toggleText.textContent = 'PLAY';
            musicToggle.classList.remove('playing');
            musicWidget.classList.remove('active');
        } else {
            // 사용자 상호작용 후에만 재생 시도
            if (userInteracted) {
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isPlaying = true;
                        toggleText.textContent = 'PAUSE';
                        musicToggle.classList.add('playing');
                        musicWidget.classList.add('active');
                        console.log('Background music started playing');
                    }).catch(error => {
                        console.log('Audio play failed:', error);
                        // 자동재생이 차단된 경우의 처리
                        isPlaying = false;
                        toggleText.textContent = 'PLAY';
                        musicToggle.classList.remove('playing');
                    });
                }
            }
        }
    }
    
    // 음악 종료 시 이벤트
    if (audio) {
        audio.addEventListener('ended', function() {
            // loop 속성이 있으므로 자동으로 반복됨
            // 하지만 혹시 모를 경우를 대비한 처리
            if (isPlaying) {
                audio.currentTime = 0;
                audio.play();
            }
        });
        
        // 재생 시작 이벤트
        audio.addEventListener('play', function() {
            isPlaying = true;
            toggleText.textContent = 'PAUSE';
            musicToggle.classList.add('playing');
        });
        
        // 일시정지 이벤트
        audio.addEventListener('pause', function() {
            isPlaying = false;
            toggleText.textContent = 'PLAY';
            musicToggle.classList.remove('playing');
        });
    }
    
    // 간단한 호버 제어 로직 - 기본적으로 항상 숨김
    if (musicWidget) {
        // 위젯 외부 클릭 시 수동 열림 상태 해제
        document.addEventListener('click', function(e) {
            if (!musicWidget.contains(e.target)) {
                isManuallyOpened = false;
                musicWidget.classList.remove('manually-opened');
            }
        });
        
        // 위젯 내부 클릭 시 이벤트 버블링 방지
        musicWidget.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 패널 강제 닫기 함수 (ESC 키 등)
    function closePanel() {
        isManuallyOpened = false;
        musicWidget.classList.remove('manually-opened');
    }
    
    // 키보드 단축키
    document.addEventListener('keydown', function(e) {
        // Spacebar로 음악 토글 (다른 입력 필드에 포커스가 없을 때만)
        if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            userInteracted = true;
            toggleMusic();
        }
        
        // ESC 키로 패널 닫기
        if (e.code === 'Escape') {
            closePanel();
        }
    });
    
    // 페이지 가시성 변경 시 처리 (탭 전환 등)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            // 페이지가 숨겨질 때 음악 일시정지 (선택사항)
            // audio.pause();
        } else if (!document.hidden && isPlaying) {
            // 페이지가 다시 보일 때 음악 재개 (선택사항)
            // audio.play();
        }
    });
    
    // 페이지 완전 로드 후 최종 강제 재생 시도
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (audio && !isPlaying) {
                console.log('Final force autoplay attempt after page load...');
                forceAutoplay();
            }
        }, 500);
    });
    
    // 사용자 첫 상호작용 시 재생 보장
    document.addEventListener('click', function() {
        if (audio && !isPlaying && !userInteracted) {
            userInteracted = true;
            forceAutoplay();
        }
    }, { once: true });
    
    // 디버깅용 콘솔 로그
    console.log('Music Widget initialized with FORCE AUTOPLAY');
    console.log('- HTML autoplay attribute enabled');
    console.log('- Multiple force autoplay attempts');
    console.log('- All notification tooltips removed');
    console.log('- Initial volume: 75%');
    console.log('- For practice/learning purposes only');
});
