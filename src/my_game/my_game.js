"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Minion from "./objects/minion.js";
import FreezingBullet from "./RTP_game_objects/freezingBullet.js/freezingBullet.js";
import FreezingHero from "./RTP_game_objects/freezingHero/freezingHero.js";
import FreezingMinion from "./RTP_game_objects/freezingMinion/freezingMinion.js";
class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.mMsg = null;
        this.kMinionSprite = "assets/minion_sprite.png";
        this.mMinion = null;
        this.mNewMinion = null;
        this.mNewHero = null;



        this.mLineSet = [];
        this.mCurrentLine = null;
        this.mP1 = null;

        this.mNewLineSet = [];

        this.mShowLine = true;

        this.mCurrentLine = null;
        this.currentLinePosition = null;

        this.bulletSet = [];

        this.newBullet = null;
        this.currentFreezeState = false;
    }
    load() {
        engine.texture.load(this.kMinionSprite);
    }
    unload() {
        engine.texture.unload(this.kMinionSprite);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(30, 30), // position of the camera
            100,                       // width of camera
            [0, 0, 960, 720]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([.8, .8, .8, 1]);
                // sets the background to gray
    
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(50, 66);
        this.mMsg.setTextHeight(2);

        this.mTopMsg = new engine.FontRenderable("Status Message");
        this.mTopMsg.setColor([0, 0, 0, 1]);
        this.mTopMsg.getXform().setPosition(-18, -2);
        this.mTopMsg.setTextHeight(2);

        this.mHeroMsg = new engine.FontRenderable("Status Message");
        this.mHeroMsg.setColor([0, 0, 0, 1]);
        this.mHeroMsg.getXform().setPosition(-18, -5);
        this.mHeroMsg.setTextHeight(2);

        


        this.mNewMinion = new FreezingMinion(this.kMinionSprite,-15,60,.2);
        this.mNewMinion.processKeyClicked();
        this.mNewMinion.processKeyPressed();

        this.mNewHero = new FreezingHero(this.kMinionSprite,-15,25, this.bulletSet);


        
        this.mMinion = new Minion(this.kMinionSprite,-15,0,.2);



        this.mOne = new engine.FontRenderable("Status Message");
        this.mOne.setColor([0,0,0, 1]);
        this.mOne.getXform().setPosition(30, 30);
        this.mOne.setTextHeight(2);

        this.mTwo = new engine.FontRenderable("Status Message");
        this.mTwo.setColor([0,0,0, 1]);
        this.mTwo.getXform().setPosition(40, 20);
        this.mTwo.setTextHeight(2);

        this.mThree = new engine.FontRenderable("Status Message");
        this.mThree.setColor([0,0,0, 1]);
        this.mThree.getXform().setPosition(40, 60);
        this.mThree.setTextHeight(2);

        this.mFour = new engine.FontRenderable("Status Message");
        this.mFour.setColor([0,0,0, 1]);
        this.mFour.getXform().setPosition(23, 0);
        this.mFour.setTextHeight(2);



        this.makeLines();
    }


    makeLines() {
        this.mCurrentLine = new engine.LineRenderable();
        this.mCurrentLine.setFirstVertex(-20,54);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        this.mCurrentLine.setSecondVertex(0,54);
        this.mLineSet.push(this.mCurrentLine);

        this.mCurrentLine = new engine.LineRenderable();
        this.mCurrentLine.setFirstVertex(0,54);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        this.mCurrentLine.setSecondVertex(0,45);
        this.mLineSet.push(this.mCurrentLine);

        this.mCurrentLine = new engine.LineRenderable();
        this.mCurrentLine.setFirstVertex(0,45);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        this.mCurrentLine.setSecondVertex(23,45);
        this.mLineSet.push(this.mCurrentLine);

        this.mCurrentLine = new engine.LineRenderable();
        this.mCurrentLine.setFirstVertex(12,55);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        this.mCurrentLine.setSecondVertex(12,70);
        this.mLineSet.push(this.mCurrentLine);

        this.mCurrentLine = new engine.LineRenderable();
        this.mCurrentLine.setFirstVertex(23,54);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        this.mCurrentLine.setSecondVertex(23,45);
        this.mLineSet.push(this.mCurrentLine);
        
        this.mCurrentLine = new engine.LineRenderable();
        this.mCurrentLine.setFirstVertex(80,54);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        this.mCurrentLine.setSecondVertex(23,54);
        this.mLineSet.push(this.mCurrentLine);

        
        
    }
    
    
    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mMinion.draw(camera);
        this.mNewMinion.draw(camera);
        this.mNewHero.draw(camera);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        

        this.mCamera.setViewAndCameraMatrix();
        
        
        this._drawCamera(this.mCamera);
        this.mHeroMsg.draw(this.mCamera);
        this.mMsg.draw(this.mCamera);   // only draw status in the main camera
        this.mTopMsg.draw(this.mCamera);
        this.mOne.draw(this.mCamera);
        this.mTwo.draw(this.mCamera);
        this.mThree.draw(this.mCamera);
        this.mFour.draw(this.mCamera);
        
        // console.log(this.bulletSet.length);
        let i, l;
        for (i = 0; i < this.bulletSet.length; i++) {
            l = this.bulletSet[i];
            l.draw(this.mCamera);
        }
        // console.log(this.mNewLineSet.length);
        for (i = 0; i < this.mNewLineSet.length; i++) {
            l = this.mNewLineSet[i];
            l.draw(this.mCamera);
        }

        for (i = 0; i < this.mLineSet.length; i++) {
            l = this.mLineSet[i];
            l.draw(this.mCamera);
        }
        
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
        let msg = "";
        let topmsg = "";
        let heromsg = "";

        this.mMinion.update();
        this.mNewMinion.update();
        this.mNewHero.update();
        let i, l;
        for (i = 0; i < this.bulletSet.length; i++) {
            this.bulletSet[i].update();
        }

        if(engine.input.isKeyClicked(engine.input.keys.P)){
            this.currentFreezeState = !this.currentFreezeState;
        } 
        this.mNewMinion.freezeState = this.currentFreezeState;
        this.mNewHero.freezeState = this.currentFreezeState;
        for (i = 0; i < this.bulletSet.length; i++) {
            this.bulletSet[i].freezeState = this.currentFreezeState;
        }
        // console.log(this.mNewHero.getKeysClickedInfo());

        if(this.mNewHero.stateInfo.length == 0) {
            this.currentLinePosition = this.mNewHero.mRenderComponent.getXform().getPosition();
            this.mNewLineSet.splice(0,this.mNewLineSet.length);
            // console.log(this.currentLinePosition);
        }

        if(engine.input.isButtonClicked(engine.input.eMouseButton.eLeft) &&
        this.mNewHero.isFrozen()){
            this.mNewHero.insertCommand("MoveToMouse");
            this.mNewHero.insertCommand([this.mCamera.mouseWCX().toFixed(1), this.mCamera.mouseWCY().toFixed(1)]);

            this.mCurrentLine = new engine.LineRenderable();
            this.mCurrentLine.setFirstVertex(this.currentLinePosition[0],this.currentLinePosition[1]);
            this.mCurrentLine.setPointSize(5.0);
            this.mCurrentLine.setShowLine(true);
            this.mCurrentLine.setColor([0,0,1,1]);
            this.mCurrentLine.setSecondVertex(this.mCamera.mouseWCX().toFixed(1),this.mCamera.mouseWCY().toFixed(1));
            this.mNewLineSet.push(this.mCurrentLine);
            this.currentLinePosition = [this.mCamera.mouseWCX().toFixed(2),this.mCamera.mouseWCY().toFixed(2)];
            
        }


        if(engine.input.isButtonClicked(engine.input.eMouseButton.eMiddle) && 
        this.mNewHero.isFrozen()) {

            let cameraPos = [this.mCamera.mouseWCX().toFixed(1),this.mCamera.mouseWCY().toFixed(1)];
            this.mNewHero.insertCommand("HeroAttack");
            this.mNewHero.insertCommand([this.mCamera.mouseWCX().toFixed(1), this.mCamera.mouseWCY().toFixed(1)]);

            //inital position
            this.mCurrentLine = new engine.LineRenderable();
            this.mCurrentLine.setFirstVertex(this.currentLinePosition[0],this.currentLinePosition[1]);
            this.mCurrentLine.setPointSize(5.0);
            this.mCurrentLine.setShowLine(true);
            this.mCurrentLine.setColor([0,0,1,1]);
            this.mCurrentLine.setSecondVertex(cameraPos[0],cameraPos[1]);
            this.mNewLineSet.push(this.mCurrentLine);
           




            this.mCurrentLine = new engine.LineRenderable();
            this.mCurrentLine.setFirstVertex((cameraPos[0] - (-5)),(cameraPos[1] - (-5)));
            this.mCurrentLine.setPointSize(5.0);
            this.mCurrentLine.setShowLine(true);
            this.mCurrentLine.setColor([1,0,0,1]);
            this.mCurrentLine.setSecondVertex(cameraPos[0] - 5,cameraPos[1] - -5);
            this.mNewLineSet.push(this.mCurrentLine);

            this.mCurrentLine = new engine.LineRenderable();
            this.mCurrentLine.setFirstVertex((cameraPos[0] - (-5)),(cameraPos[1] - (-5)));
            this.mCurrentLine.setPointSize(5.0);
            this.mCurrentLine.setShowLine(true);
            this.mCurrentLine.setColor([1,0,0,1]);
            this.mCurrentLine.setSecondVertex(cameraPos[0] - -5,cameraPos[1] - 5);
            this.mNewLineSet.push(this.mCurrentLine);

            this.mCurrentLine = new engine.LineRenderable();
            this.mCurrentLine.setFirstVertex((cameraPos[0] - 5),(cameraPos[1] - (-5)));
            this.mCurrentLine.setPointSize(5.0);
            this.mCurrentLine.setShowLine(true);
            this.mCurrentLine.setColor([1,0,0,1]);
            this.mCurrentLine.setSecondVertex(cameraPos[0] - 5,cameraPos[1] - 5);
            this.mNewLineSet.push(this.mCurrentLine);

            this.mCurrentLine = new engine.LineRenderable();
            this.mCurrentLine.setFirstVertex((cameraPos[0] - 5),(cameraPos[1] - 5));
            this.mCurrentLine.setPointSize(5.0);
            this.mCurrentLine.setShowLine(true);
            this.mCurrentLine.setColor([1,0,0,1]);
            this.mCurrentLine.setSecondVertex(cameraPos[0] - (-5),cameraPos[1] - 5);
            this.mNewLineSet.push(this.mCurrentLine);

            

            



            
            this.currentLinePosition = [this.mCamera.mouseWCX().toFixed(2),this.mCamera.mouseWCY().toFixed(2)];

        }
        
        

       
        msg = "Minion Input: " + this.mNewMinion.getKeysClickedInfo();  
        // console.log(this.mNewMinion.getKeysClickedInfo());
        

        topmsg = "Pause State: " + this.mNewMinion.freezeState;

        heromsg = "Hero Input: " + this.mNewHero.getKeysClickedInfo();
        this.mHeroMsg.setText(heromsg);
        this.mMsg.setText(topmsg);
        this.mTopMsg.setText(msg);
        this.mOne.setText("1");
        this.mTwo.setText("2");
        this.mThree.setText("3");
        this.mFour.setText("4");
        
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}