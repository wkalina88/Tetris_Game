import './main.scss';
import { GameLoop } from './gameloop';
import { GameCanvas } from './gamecanvas';

class App {
    readonly boardWidth: number = 10;
    readonly boardHeight: number = 20;
    game: GameLoop;
    gameCanvas: GameCanvas;
    startButton: HTMLElement;
    resetButton: HTMLElement;
    gameOverLabel: HTMLElement;
    
    initialize(){
        // create new GameCanvas and GameLoop objects
        this.gameCanvas = new GameCanvas("canvas", 400, 800);
        this.gameOverLabel = document.getElementById("gameOverText");
        this.game = new GameLoop(this.gameCanvas, 10, 20);
        this.game.onGameOver = () => {
            this.gameOverLabel.style.display = "block";
        }

        this.startButton = document.getElementById("startButton");
        this.startButton.addEventListener("click", (e: MouseEvent) => {
            this.startButton.style.display= "none";
            this.resetButton.style.display= "block";
            this.game.start();
        });

        this.resetButton = document.getElementById("resetButton");
        this.resetButton.addEventListener("click", (e: MouseEvent) => {
            this.game.stop();
            this.gameOverLabel.style.display = "none";
            this.gameCanvas.setFocus();
            this.game.start();
        });

        //event listener
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.keyCode === 37) {
               // left arrow
                this.game.moveBlockHorizontally(-1);
            }
            else if (e.keyCode === 39) {
               // right arrow
               this.game.moveBlockHorizontally(1);
            }
        })

        document.addEventListener("keypress", (e: KeyboardEvent) => {
            if(e.keyCode === 32) {
                //space
                this.game.moveBlockVertically(1);
            }
        })

        //solution found on stackoverflow
        let down: boolean = false;
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if(down) return;
            down = true;
            if (e.keyCode === 38) {
                // uparrow
                this.game.rotateRight();
            }
            else if (e.keyCode === 40) {
                // down arrow
                this.game.rotateLeft();
            }
        }, false);
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            down = false;
        }, false);
    }
}

const newApp: App = new App;
newApp.initialize();

