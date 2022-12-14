// @ts-check

class Box {
    top
    static colors = ["cornflowerblue", "coral", "violet"]
    constructor(left) {
        this.element = document.createElement("div")
        this.element.classList.add("box")
        this.element.style.left = left + "px"
        this.color = Box.colors[Math.floor(Math.random() * Box.colors.length)]
        this.element.classList.add(this.color)
    }
    render = () => {
        return this.element
    }
    fall = () => {
        for (let i = this.top; i < 1000; i++) {
            setTimeout(() => {
                this.element.style.top = i + "px"
            }, i * 10)
        }
    }
}

class TopBox extends Box {
    constructor(left) {
        super(left)
        this.position = "top"
        this.top = 0
        this.element.style.top = "0"
    }
}

class MidBox extends Box {
    constructor(left) {
        super(left)
        this.position = "mid"
        this.top = 60
        this.element.style.top = "60px"
    }
}

class BottomBox extends Box {
    constructor(left) {
        super(left)
        this.position = "bottom"
        this.top = 120
        this.element.style.top = "120px"
    }
}

class PlayerArea {
    constructor(player) {
        this.player = player
        this.element = document.createElement("div")
        this.element.classList.add("playerArea")
        this.element.style.top = window.innerHeight - 230 + "px"
        this.element.addEventListener("mousemove", this.handleMouseMove)
    }
    render = () => {
        return this.element
    }
    handleMouseMove = (event) => {
        this.player.move(event)
    }
}

class Player {
    constructor() {
        this.element = document.createElement("div")
        this.element.classList.add("player")
        this.element.addEventListener("mousemove", this.move)
    }
    render = () => {
        return this.element
    }
    move = (event) => {
        if (event.clientX < window.innerWidth - 100) {
            this.element.style.left = event.clientX + "px"
            this.left = event.clientX
        }
    }
}

window.onload = () => {
    let points = 0
    const bloons = [[], [], []]
    const boxes = [TopBox, MidBox, BottomBox]
    boxes.forEach((box, i) => {
        for (let j = 0; j < 20; j++) {
            const b = new box(j * 60)
            bloons[i].push(b)
            document.body.appendChild(b.render())
        }
    })

    const player = new Player()
    document.body.appendChild(player.render())

    const playerArea = new PlayerArea(player)
    document.body.appendChild(playerArea.render())

    setInterval(() => {
        if (bloons[2].length > 0) {
            const bloon = bloons[2][Math.floor(Math.random() * bloons[2].length)]
            bloon.fall()
            bloons[2].splice(bloons[2].indexOf(bloon), 1)
        } else if (bloons[1].length > 0) {
            const bloon = bloons[1][Math.floor(Math.random() * bloons[1].length)]
            bloon.fall()
            bloons[1].splice(bloons[1].indexOf(bloon), 1)
        } else if (bloons[0].length > 0) {
            const bloon = bloons[0][Math.floor(Math.random() * bloons[0].length)]
            bloon.fall()
            bloons[0].splice(bloons[0].indexOf(bloon), 1)
        }
    }, 1000)
    setInterval(() => {
        bloons.forEach((bloon, i) => {
            bloon.forEach((b) => {
                if (b.top >= 999) {
                    bloons[i].splice(bloons[i].indexOf(b), 1)
                    b.element.remove()
                    points++
                    document.getElementById("points").innerText = points.toString()
                }
            })
        })
    }, 1000)
    setInterval(() => {
        bloons.forEach((bloon, i) => {
            bloon.forEach((b) => {
                if (b.left <= player.left + 10 && b.left >= player.left - 10 && b.top <= window.innerHeight - 300) {
                    bloons[i].splice(bloons[i].indexOf(b), 1)
                    b.element.remove()

                }
            })
        })
    }, 1000)
}