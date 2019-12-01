/* Cria o canvas
    ctx = Context (Contexto)
*/
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

/* Imagem de Fundo
    bg = Background (Plano de Fundo)
    Ready = Pronto
    onload = Quando tudo estiver carregado
*/
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = 'images/background.png';

// Imagem do Herói
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = 'images/bomb.png';

// Imagem do Monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = 'images/ie.png';

/* Objetos do  Jogo
    Caught = Pego
*/
const hero = {
    speed: 256 // movimento em pixels por segundo
};
const monster = {};
let monstersCaught = 0;

/* Controle do teclado
    Down = Pressionadas
    Up = Soltar
*/
const keysDown = {};

window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
}, false);

// Reseta o jogo quando o jogador pega o monstro
const reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Posiciona o monstro randomicamente na tela
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Atualizar os objetos do jogo
const update = function (modifier) {
    if (38 in keysDown) { // Pressionando a seta para cima
        hero.y -= hero.speed * modifier; // ou hero.y = hero.y - (hero.speed * modifier);
    }  
    if (40 in keysDown) { // Pressionando a seta para baixo
        hero.y += hero.speed * modifier; // ou hero.y = hero.y + (hero.speed * modifier);
    }
    if (37 in keysDown) { // Pressionando a seta para a esquerda    
        hero.x -= hero.speed * modifier; // ou hero.x = hero.x - (hero.speed * modifier);
    }
    if (39 in keysDown) { // Pressionando a seta para a direita // ou hero.x = hero.x + (hero.speed * modifier);
        hero.x += hero.speed * modifier;
    }
    if (87 in keysDown) { // Pressionando a seta para cima
        hero.y -= hero.speed * modifier; // ou hero.y = hero.y - (hero.speed * modifier);
    }  
    if (83 in keysDown) { // Pressionando a seta para baixo
        hero.y += hero.speed * modifier; // ou hero.y = hero.y + (hero.speed * modifier);
    }
    if (65 in keysDown) { // Pressionando a seta para a esquerda    
        hero.x -= hero.speed * modifier; // ou hero.x = hero.x - (hero.speed * modifier);
    }
    if (68 in keysDown) { // Pressionando a seta para a direita // ou hero.x = hero.x + (hero.speed * modifier);
        hero.x += hero.speed * modifier;
    }

    // Os personagens se encostaram ?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    } 
};

// Renderizar tudo
const render = function name(params) {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Pontuação
    ctx.fillStyle = 'rgb(250, 250, 250)';
    ctx.font = '24px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Pessoas salvas: ' + monstersCaught, 32, 32);
};

// Controla o loop do jogo
const main = function () {
    const now = Date.now(); // 32000
    const delta = now - then; // 2000

    update(delta / 1000); // 2000/1000 = 2
    render();

    then = now; // 32000

    // Executa isso o mais breve possível
    requestAnimationFrame(main); /* Loop: now = 34000, 36000 e assim por diante aumentando de 2000 em 2000 e
                                then é o valor anterior 32000, 34000 mesma coisa que o de cima 
                                */
};

// Suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Que comece o jogo!
let  then = Date.now(); // 30000
reset();
main();