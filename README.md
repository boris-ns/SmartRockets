# Smart Rockets
Rockets need to find a way between obstacles to the target using genetic algorithm.
Everything you need to know about genetic algorithms you can find here <https://en.wikipedia.org/wiki/Genetic_algorithm>. In this simulation there are 3 levels for rockets to beat. You can change parameteres of algorithm through simulation. <br />
Each rocket has genes (array of N elements) where each element is 2D vector.
Fitness function is distance between target and rocket. New generation is selected using rejection sampling method. Each new rocket takes 1 part of genes from parent1 and other part from parent2. This doesn't mean it takes 50-50 genes, because "middle" point is a random number.

## Live preview
You can check out live preview at <https://boris-ns.github.io/SmartRockets/>

