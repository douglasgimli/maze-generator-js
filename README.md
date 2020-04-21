# Maze Generator
## Hunt and Kill Algorithm Implementation

_This is a repository with only and one purpose: STUDYING. So don't expect to find any rocket science code in here (maybe just a virtual rocket to blow the maze)._

I went out of coding for a few months while I've dedicated myself to full-time entrepreneurship running a tech company, but as any developer from heart, code was bowling in my veins, so I need to back coding anyhow.

While reading a few posts on twitter and Reddit I came across [@munificent's](https://github.com/munificent) blog post about ["Rooms and Mazes: A Procedural Dungeon Generator"](http://journal.stuffwithstuff.com/2014/12/21/rooms-and-mazes/) and I got amazed by the great content and challenge there presented, so a few hours later there I was buying an IDE to iPad (thanks [play.js](https://apps.apple.com/us/app/play-js-javascript-ide/id1423330822)!) and having my first line of codes being written.

I got to be honest, was not easy to implement even the easiest part of the tutorial, not because of the algorithm itself, but I got scrambled for a few hours trying to figure out a solution to print the map with the walls and floor tiles. So I've made some research and I've found other great posts related to maze generators:

[Maze Classification by Walter D. Pullen](http://www.astrolog.org/labyrnth/algrithm.htm)

[Maze Generation: Hunt-and-Kill algorithm by Jamis Buck](http://weblog.jamisbuck.org/2011/1/24/maze-generation-hunt-and-kill-algorithm)

[Visualizing Algorithms by Mike Bostock](https://bost.ocks.org/mike/algorithms/#maze-generation)

And there it was, the solution was simple as the question, I was focusing myself on the walls and tiles, but I've should also care about the connections, so I few minutes after this revelation, there it was, my first ever maze generated using the hunt and kill algorithm.

This is yet a work in progress, I'm still wondering if it will progress to a full game or not, so let's see...

# Usage

`node ./maze-generator.js`

# Visual Output

![Maze Generator](https://raw.githubusercontent.com/douglasgimli/maze-generator-js/master/examples/maze-generator-js.gif "Maze Generator")