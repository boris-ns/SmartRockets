class DNA {

    constructor() {
        this.genes = new Array(200);
        this.initGenes();
    }

    initGenes() {
        for (let i = 0; i < this.genes.length; ++i) {
            this.genes[i] = p5.Vector.random2D();
        }
    }
};