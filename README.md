# dragIt
RxJs - Demo
Simple Mouse Event Based Game using RxJS, FireBase, Arduino, Jhonny Five

## Overview
This is a simple demo game using RxJs. The idea is to generate Event Streams of mouseDown, mouseUp events. This eventStreamSubscription is used to track the mouse pointer's current position.

## How To Install

Check out the project

````
bower install
````

Open the index.html

## How To Play

![dragIt](http://fritzing.org/media/fritzing-repo/projects/d/drag-it/images/dragIt.png)

Drag the Green Ball towards the Green Bar at the top, without touching the side walls.

You have 3 Lives. For each wrong try(touching the side walls) a Life will be reduced. 

Once you reach the top you get a Success Message.

## Firebase

Life Count and Success Flag are sync with Firebase in realtime.

## Arduino - Jhonny Five Implementation

Jhonny Five Module polls Firebase, when the lifeCount reaches 0, the led(13) is turned off.

When the ball reaches the target, Success Flag is set to True and Big LED(9) turns on.




