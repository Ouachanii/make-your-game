export class playerAnimation {
  constructor(spriteSheet, frameWidth, frameHeight, totalFrames) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.totalFrames = totalFrames;
    this.currentFrame = 0;
    this.animationSpeed = 140;
    this.lastFrameTime = 0;
    this.isAnimating = false;
    this.currentState = 'idle';
    this.direction = 'down';
    this.imageLoaded = false;

    this.spriteStates = {
      'idle': {
        'down': 0,
        'up': 4,
        'left': 8,
        'right': 12
      },
      'walking': {
        'down': [1, 2, 3],
        'left': [5, 6, 7],
        'up': [9, 10, 11],
        'right': [13, 14, 15]
      }
    };

    this.preloadImage();
  }

  // Preload the sprite sheet image
  preloadImage() {
    const img = new Image();
    img.onload = () => {
      this.imageLoaded = true;
      console.log('Sprite sheet loaded successfully');
    };
    img.onerror = () => {
      console.error('Failed to load sprite sheet:', this.spriteSheet);
      this.imageLoaded = false;
    };
    img.src = this.spriteSheet;
  }

  // Get the player position based on current state and direction
  getSpritePosition() {
    const state = this.spriteStates[this.currentState];
    if (!state) return 0;

    const directionData = state[this.direction];
    if (Array.isArray(directionData)) {
      return directionData[this.currentFrame % directionData.length];
    } else {
      return directionData || 0;
    }
  }

  // Calculate CSS background position for the sprite
  getBackgroundPosition() {
    const spriteIndex = this.getSpritePosition();
    const row = Math.floor(spriteIndex / 4);
    const col = spriteIndex % 4;

    const x = -col * this.frameWidth;
    const y = -row * this.frameHeight;

    return `${x}px ${y}px`;
  }

  // Update animation frame
  update(currentTime) {
    if (!this.isAnimating) return;

    if (currentTime - this.lastFrameTime >= this.animationSpeed) {
      this.currentFrame++;
      this.lastFrameTime = currentTime;
    }
  }

  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.currentFrame = 0;
      this.lastFrameTime = 0;
    }
  }

  setDirection(direction) {
    if (this.direction !== direction) {
      this.direction = direction;
      this.currentFrame = 0;
    }
  }

  start() {
    this.isAnimating = true;
  }

  stop() {
    this.isAnimating = false;
    this.currentFrame = 0;
  }

  applyToElement(element) {
    if (!element) return;

    if (!this.imageLoaded) {
      element.style.backgroundColor = 'transparent';
      return;
    }

    try {
      const bgPosition = this.getBackgroundPosition();
      element.style.backgroundImage = `url(${this.spriteSheet})`;
      element.style.backgroundSize = `${this.frameWidth * 4}px ${this.frameHeight * 4}px`;
      element.style.backgroundPosition = bgPosition;
      element.style.backgroundRepeat = 'no-repeat';
      
      if (element.dataset.lastBgPosition !== bgPosition) {
        element.dataset.lastBgPosition = bgPosition;
      }
    } catch (error) {
      console.error('Error applying sprite to element:', error);
      element.style.border = '2px solid red';
    }
  }
} 