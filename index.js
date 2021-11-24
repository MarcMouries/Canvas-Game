const canvas = document.querySelector('canvas')

const ctx = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {

        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity

    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {

        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity

    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const cx = canvas.width / 2
const cy = canvas.height / 2

const player = new Player(cx, cy, 30, 'blue');

const projectiles = []
const enemies = []

function spawnEnemies() {
    setInterval(() => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const color = 'green'
        
        
        const angle = Math.atan2(
            cy - y, 
            cx - x
        )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000) 
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update()
    })

    enemies.forEach((Enemy) => {
        Enemy.update()
    })
}

addEventListener('click', (event) => 
    {
        const angle = Math.atan2(
            event.clientY - cy, 
            event.clientX - cx
        )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        }
        projectiles.push(
        new Projectile(
            cx,
            cy,
            5,
            'red',
            velocity
        ))
})

animate()
spawnEnemies()